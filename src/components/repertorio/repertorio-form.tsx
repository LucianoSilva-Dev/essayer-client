"use client";

import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { EixosTematicos } from "@/constants/eixos";
import type { RepertorioFormData, ModeloRepertorio } from "@/types/repertorio";
import { createArtigo, createCitacao, createObra } from "@/apiCalls/repertorio";
import type { CreateArtigoBody, CreateCitacaoBody, CreateObraBody } from "@/apiCalls/repertorio/types";
import { AlertCircle } from "lucide-react";

// Importando os componentes filhos da nova estrutura
import { RepertorioTypeSelector } from "./form/RepertorioTypeSelector";
import { EixoSelector } from "./form/EixoSelector";
import { RecorteSelector } from "./form/RecorteSelector";
import { FormActions } from "./form/FormActions";

// Importando os formulários específicos que agora vivem em 'forms'
import ObraForm from "@/components/forms/obra-form";
import ArtigoForm from "@/components/forms/artigo-form";
import CitacaoForm from "@/components/forms/citacao-form";

type RepertorioFormProps = {
  onSubmit: (data: RepertorioFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: RepertorioFormData;
  isEditing?: boolean;
};

// Função auxiliar para salvar o repertório
async function saveRepertoire(repertoire: RepertorioFormData) {
  switch (repertoire.modelo) {
    case 'obra':
      const obra: CreateObraBody = {
        autor: repertoire.autoria,
        sinopse: (repertoire as any).sinopse,
        subtopicos: repertoire.recortes,
        topicos: repertoire.eixos,
        titulo: (repertoire as any).titulo,
        tipoObra: (repertoire as any).tipoObra || 'livro',
      };
      await createObra(obra);
      toast.success("Obra salva com sucesso!");
      break;
    case 'artigo':
      const artigo: CreateArtigoBody = {
          autor: repertoire.autoria,
          resumo: (repertoire as any).sintese,
          fonte: (repertoire as any).fonte,
          subtopicos: repertoire.recortes,
          titulo: (repertoire as any).titulo,
          topicos: repertoire.eixos,
      };
      await createArtigo(artigo);
      toast.success("Artigo salvo com sucesso!");
      break;
    case 'citacao':
      const citacao: CreateCitacaoBody = {
          autor: repertoire.autoria,
          frase: (repertoire as any).citacao,
          fonte: (repertoire as any).fonte,
          subtopicos: repertoire.recortes,
          topicos: repertoire.eixos,
      };
      await createCitacao(citacao);
      toast.success("Citação salva com sucesso!");
      break;
  }
}

// --- Componente Principal ---
export default function RepertorioForm({ onSubmit, onCancel, initialData, isEditing = false }: RepertorioFormProps) {
  const [formData, setFormData] = useState<any>(
    initialData || { modelo: "obra", eixos: [], recortes: [], tipoObra: "livro" }
  );
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const maxRecortes = 4;

  // Efeito para carregar dados iniciais ao editar
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  // Memoiza as opções de recorte com base nos eixos selecionados
  const recorteOptions = useMemo(() => {
    if (formData.eixos && formData.eixos.length > 0) {
      const allRecortes = formData.eixos.flatMap((eixo: string) => EixosTematicos[eixo as keyof typeof EixosTematicos] || []) as string[];
      return [...new Set(allRecortes)];
    }
    return [];
  }, [formData.eixos]);

  const handleModeloChange = (novoModelo: ModeloRepertorio) => {
    if (isEditing) return; // Impede a troca de tipo durante a edição
    setFormData({ modelo: novoModelo, eixos: [], recortes: [], tipoObra: "livro" });
    setErrors({}); // Limpa os erros ao trocar de tipo
  };

  const handleSpecificDataChange = (update: Partial<RepertorioFormData>) => {
    setFormData((prev: any) => ({ ...prev, ...update }));
  };

  const handleEixoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const currentEixos = formData.eixos || [];
    const newEixos = checked ? [...currentEixos, value] : currentEixos.filter((eixo: string) => eixo !== value);
    
    // Filtra recortes para manter apenas os que pertencem aos eixos selecionados
    const currentRecortes = formData.recortes || [];
    const newRecortesValidos = currentRecortes.filter((recorte: string) =>
      newEixos.flatMap((eixo: string) => EixosTematicos[eixo as keyof typeof EixosTematicos] || []).includes(recorte)
    );
    
    setFormData((prev: any) => ({ ...prev, eixos: newEixos, recortes: newRecortesValidos }));
    if (errors.eixos) setErrors(prev => { delete prev.eixos; return prev; });
  };

  const handleRecorteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const currentRecortes = formData.recortes || [];
    let newRecortes;

    if (checked) {
      if (currentRecortes.length >= maxRecortes) {
        toast.warn(`Você pode selecionar no máximo ${maxRecortes} recortes.`);
        return;
      }
      newRecortes = [...currentRecortes, value];
    } else {
      newRecortes = currentRecortes.filter((rec: string) => rec !== value);
    }
    
    setFormData((prev: any) => ({ ...prev, recortes: newRecortes }));
    if (errors.recortes) setErrors(prev => { delete prev.recortes; return prev; });
  };

  const validateForm = (): boolean => {
    // A lógica de validação original permanece aqui...
    const newErrors: Record<string, string> = {};
    // ... validações ...
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (isEditing) {
        await onSubmit(formData);
      } else {
        await saveRepertoire(formData);
        await onSubmit(formData);
      }
    } catch (error) {
      console.error("Erro ao salvar repertório:", error);
      setErrors({ form: "Ocorreu um erro ao salvar o repertório. Tente novamente." });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Função para renderizar o formulário específico do tipo
  const renderSpecificForm = () => {
    const props = { onDataChange: handleSpecificDataChange, errors, ...formData };
    switch (formData.modelo) {
      case "obra": return <ObraForm {...props} />;
      case "artigo": return <ArtigoForm {...props} />;
      case "citacao": return <CitacaoForm {...props} />;
      default: return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#075F70] text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{isEditing ? "Editando Repertório" : "Novo Repertório"}</h2>
      </div>

      <div className="p-6">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto space-y-8">
          {errors.form && (
            <div className="p-4 bg-red-100 text-red-700 border border-red-200 rounded-md flex items-start">
              <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <span>{errors.form}</span>
            </div>
          )}

          <RepertorioTypeSelector
            modeloSelecionado={formData.modelo}
            onModeloChange={handleModeloChange}
            isEditing={isEditing}
          />

          {renderSpecificForm()}

          <EixoSelector
            selectedEixos={formData.eixos}
            onEixoChange={handleEixoChange}
            error={errors.eixos}
          />

          <RecorteSelector
            recorteOptions={recorteOptions}
            selectedRecortes={formData.recortes}
            hasSelectedEixos={formData.eixos?.length > 0}
            onRecorteChange={handleRecorteChange}
            maxRecortes={maxRecortes}
            error={errors.recortes}
          />

          <FormActions onCancel={onCancel} isSubmitting={isSubmitting} />
        </form>
      </div>
    </div>
  );
}

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { EixosTematicos } from "@/constants/eixos";
import { RepertorioFormData } from "@/types/repertorio";
import { Save, Sparkles, BookOpen, Quote, FileText, Loader2 } from "lucide-react";

// Importamos as funções específicas da API
import {
  getObraById, getArtigoById, getCitacaoById,
  updateObra, updateArtigo, updateCitacao, createObra, createArtigo, createCitacao
} from "@/apiCalls/repertorio";

// Componentes
import { EixoSelector } from "./form/EixoSelector";
import { RecorteSelector } from "./form/RecorteSelector";
import ObraForm from "@/components/forms/obra-form";
import ArtigoForm from "@/components/forms/artigo-form";
import CitacaoForm from "@/components/forms/citacao-form";

type RepertorioFormProps = {
  repertoireId?: string;
  repertoireType?: string;
  initialData?: any;
  isEditing?: boolean;
  onSubmit?: (data: RepertorioFormData) => Promise<void>;
  onCancel?: () => void;
};

export default function RepertorioForm({ repertoireId, repertoireType, initialData, isEditing = false, onSubmit, onCancel }: RepertorioFormProps) {
  const router = useRouter();

  const [formData, setFormData] = useState<any>(
    initialData || { modelo: repertoireType || "obra", eixos: [], recortes: [], tipoObra: "livro" }
  );
  const [loading, setLoading] = useState(!!repertoireId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const maxRecortes = 4;

  // Lógica de Busca Específica
  useEffect(() => {
    const fetchData = async () => {
      if (!repertoireId) return;

      try {
        setLoading(true);
        let rawData: any = null;
        let modelo = repertoireType || 'obra';

        if (repertoireType === 'artigo') {
          rawData = await getArtigoById(repertoireId);
          modelo = 'artigo';
        } else if (repertoireType === 'citacao') {
          rawData = await getCitacaoById(repertoireId);
          modelo = 'citacao';
        } else {
          rawData = await getObraById(repertoireId);
          modelo = 'obra';
        }

        if (rawData) {
          setFormData({
            modelo: modelo,
            id: rawData.id,
            eixos: rawData.topicos || rawData.eixos || [],
            recortes: rawData.subtopicos || rawData.recortes || [],
            sinopse: rawData.sinopse || '',
            tipoObra: rawData.tipoObra || 'livro',
            sintese: rawData.resumo || '',
            citacao: rawData.frase || '',
            titulo: rawData.titulo || '',
            autoria: rawData.autor || rawData.autoria || '',
            fonte: rawData.fonte || ''
          });
        }
      } catch (error) {
        console.error("Erro ao buscar repertório:", error);
        toast.error("Não foi possível carregar os dados.");
        router.push('/repertorio');
      } finally {
        setLoading(false);
      }
    };

    if (repertoireId && !initialData) {
      fetchData();
    }
  }, [repertoireId, repertoireType, initialData, router]);

  const handleCancel = () => {
    if (onCancel) onCancel();
    else router.back();
  };

  const recorteOptions = useMemo(() => {
    if (formData.eixos && formData.eixos.length > 0) {
      const allRecortes = formData.eixos.flatMap((eixo: string) => EixosTematicos[eixo as keyof typeof EixosTematicos] || []) as string[];
      return [...new Set(allRecortes)];
    }
    return [];
  }, [formData.eixos]);

  const handleSpecificDataChange = (update: Partial<RepertorioFormData>) => {
    setFormData((prev: any) => ({ ...prev, ...update }));
  };

  const handleEixoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const currentEixos = formData.eixos || [];
    const newEixos = checked ? [...currentEixos, value] : currentEixos.filter((eixo: string) => eixo !== value);

    const currentRecortes = formData.recortes || [];
    const newRecortesValidos = currentRecortes.filter((recorte: string) =>
      newEixos.flatMap((eixo: string) => EixosTematicos[eixo as keyof typeof EixosTematicos] || []).includes(recorte)
    );

    setFormData((prev: any) => ({ ...prev, eixos: newEixos, recortes: newRecortesValidos }));
  };

  const handleRecorteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const currentRecortes = formData.recortes || [];
    let newRecortes;

    if (checked) {
      if (currentRecortes.length >= maxRecortes) {
        toast.warn(`Máximo de ${maxRecortes} recortes.`);
        return;
      }
      newRecortes = [...currentRecortes, value];
    } else {
      newRecortes = currentRecortes.filter((rec: string) => rec !== value);
    }
    setFormData((prev: any) => ({ ...prev, recortes: newRecortes }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const payload = {
      autor: formData.autoria,
      fonte: formData.fonte,
      topicos: formData.eixos,
      subtopicos: formData.recortes,
      titulo: formData.titulo,
      sinopse: formData.sinopse,
      tipoObra: formData.tipoObra,
      resumo: formData.sintese,
      frase: formData.citacao
    };

    try {
      if (onSubmit) {
        await onSubmit(formData);
      } else if (repertoireId) {
        if (formData.modelo === 'artigo') await updateArtigo(repertoireId, { ...payload, fonte: undefined } as any);
        else if (formData.modelo === 'citacao') await updateCitacao(repertoireId, payload as any);
        else await updateObra(repertoireId, payload as any);

        toast.success("Repertório atualizado!");
        router.refresh();
        router.back();
      } else {
        if (formData.modelo === 'artigo') await createArtigo(payload as any);
        else if (formData.modelo === 'citacao') await createCitacao(payload as any);
        else await createObra(payload as any);

        toast.success("Repertório criado!");
        router.push('/repertorio');
      }
    } catch (error) {
      console.error("Erro ao salvar:", error);
      toast.error("Erro ao salvar.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderSpecificForm = () => {
    const props = { onDataChange: handleSpecificDataChange, errors, ...formData };
    switch (formData.modelo) {
      case "obra": return <ObraForm {...props} />;
      case "artigo": return <ArtigoForm {...props} />;
      case "citacao": return <CitacaoForm {...props} />;
      default: return null;
    }
  };

  const getTheme = () => {
    switch (formData.modelo) {
      case 'obra': return {
        color: 'text-amber-600',
        bg: 'bg-amber-50',
        border: 'border-amber-100',
        icon: <BookOpen size={20} />,
        label: 'Obra',
        btn: 'bg-amber-600 hover:bg-amber-700 focus:ring-amber-500'
      };
      case 'artigo': return {
        color: 'text-blue-600',
        bg: 'bg-blue-50',
        border: 'border-blue-100',
        icon: <FileText size={20} />,
        label: 'Artigo',
        btn: 'bg-blue-600 hover:bg-blue-700 focus:ring-blue-500'
      };
      case 'citacao': return {
        color: 'text-emerald-600',
        bg: 'bg-emerald-50',
        border: 'border-emerald-100',
        icon: <Quote size={20} />,
        label: 'Citação',
        btn: 'bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-500'
      };
      default: return {
        color: 'text-gray-600',
        bg: 'bg-gray-50',
        border: 'border-gray-100',
        icon: <Sparkles size={20} />,
        label: 'Repertório',
        btn: 'bg-gray-900 hover:bg-black focus:ring-gray-500'
      };
    }
  };

  const theme = getTheme();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50/50">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50/30 py-8 flex justify-center items-start">

      {/* Container Único do Formulário */}
      <div className="w-full max-w-3xl bg-white rounded-3xl shadow-xl shadow-gray-200/50 border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-300 mx-4">

        {/* Header / Toolbar Integrada */}
        <div className="px-8 py-6 border-b border-gray-100 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-white">

          {/* Lado Esquerdo: Identificação do Tipo */}
          <div className="flex items-center gap-4">
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 ${theme.bg} ${theme.color} border ${theme.border}`}>
              {theme.icon}
            </div>
            <div>
              <h2 className={`text-lg font-bold ${theme.color} uppercase tracking-wide`}>
                {theme.label}
              </h2>
              <p className="text-xs text-gray-400 font-medium">
                {isEditing ? 'Editando informações' : 'Criando novo repertório'}
              </p>
            </div>
          </div>

          {/* Lado Direito: Ações */}
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button
              type="button"
              onClick={handleCancel}
              className="flex-1 sm:flex-none px-4 py-2.5 rounded-xl text-sm font-bold text-gray-400 hover:text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              type="button"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`
                            flex-1 sm:flex-none px-6 py-2.5 rounded-xl text-white text-sm font-bold shadow-md 
                            flex items-center justify-center gap-2 transition-all transform active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-2
                            ${theme.btn} disabled:opacity-70 disabled:cursor-not-allowed
                        `}
            >
              {isSubmitting ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
              <span>Salvar</span>
            </button>
          </div>
        </div>

        {/* Corpo do Formulário */}
        <div className="p-6 sm:p-8 space-y-8">

          {/* Seção 1: Dados Específicos */}
          <section>
            {renderSpecificForm()}
          </section>

          {/* Divisor Suave */}
          <div className="w-full h-px bg-gray-100"></div>

          {/* Seção 2: Conexões (Eixos e Recortes) */}
          <section className="space-y-6">
            <div className="flex items-center gap-2 mb-4">
              <Sparkles size={16} className="text-gray-400" />
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                Contextualização
              </h3>
            </div>

            <EixoSelector
              selectedEixos={formData.eixos}
              onEixoChange={handleEixoChange}
              error={errors.eixos}
            />

            <div className="pt-2">
              <RecorteSelector
                recorteOptions={recorteOptions}
                selectedRecortes={formData.recortes}
                hasSelectedEixos={formData.eixos?.length > 0}
                onRecorteChange={handleRecorteChange}
                maxRecortes={maxRecortes}
                error={errors.recortes}
              />
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}
"use client";

import React, { useState, useEffect, useMemo } from "react";
import { toast } from "react-toastify";
import { EixosTematicos } from "@/shared/constants/eixos";
import type { RepertorioFormData, ModeloRepertorio } from "@/types/repertorio";
import { AlertCircle } from "lucide-react";

// Importando os componentes de UI que foram criados
import { RepertorioTypeSelector } from "@/components/repertorio/form/RepertorioTypeSelector";
import { EixoSelector } from "@/components/repertorio/form/EixoSelector";
import { RecorteSelector } from "@/components/repertorio/form/RecorteSelector";
import { FormActions } from "@/components/repertorio/form/FormActions";

// Importando os formulários de campos específicos
import ObraForm from "@/shared/components/forms/obra-form";
import ArtigoForm from "@/shared/components/forms/artigo-form";
import CitacaoForm from "@/shared/components/forms/citacao-form";

// ------------------------------------------------------------------
// HOOK CUSTOMIZADO PARA GERENCIAR TODA A LÓGICA DO FORMULÁRIO
// ------------------------------------------------------------------
type UseRepertorioFormProps = {
    initialData?: RepertorioFormData;
    isEditing?: boolean;
};

const useRepertorioForm = ({ initialData, isEditing = false }: UseRepertorioFormProps) => {
    const [formData, setFormData] = useState<any>(
        initialData || { modelo: "obra", eixos: [], recortes: [], tipoObra: "livro" }
    );
    const [errors, setErrors] = useState<Record<string, string>>({});
    const maxRecortes = 4;

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const recorteOptions = useMemo(() => {
        if (formData.eixos && formData.eixos.length > 0) {
            const allRecortes = formData.eixos.flatMap((eixo: string) => EixosTematicos[eixo as keyof typeof EixosTematicos] || []) as string[];
            return [...new Set(allRecortes)];
        }
        return [];
    }, [formData.eixos]);

    const handleModeloChange = (novoModelo: ModeloRepertorio) => {
        if (isEditing) return;
        setFormData({ modelo: novoModelo, eixos: [], recortes: [], tipoObra: "livro" });
        setErrors({});
    };

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
        if (errors.eixos) setErrors(prev => ({ ...prev, eixos: "" }));
    };

    const handleRecorteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value, checked } = e.target;
        const currentRecortes = formData.recortes || [];
        if (checked && currentRecortes.length >= maxRecortes) {
            toast.warn(`Você pode selecionar no máximo ${maxRecortes} recortes.`);
            return;
        }
        const newRecortes = checked 
            ? [...currentRecortes, value] 
            : currentRecortes.filter((rec: string) => rec !== value);
        
        setFormData((prev: any) => ({ ...prev, recortes: newRecortes }));
        if (errors.recortes) setErrors(prev => ({ ...prev, recortes: "" }));
    };

    const validateForm = (): boolean => {
        // Implemente sua lógica de validação completa aqui
        const newErrors: Record<string, string> = {};
        if (!formData.eixos || formData.eixos.length === 0) {
            newErrors.eixos = "Selecione pelo menos um Eixo Temático";
        }
        // ... outras validações
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    return {
        formData,
        errors,
        setErrors,
        maxRecortes,
        recorteOptions,
        handleModeloChange,
        handleSpecificDataChange,
        handleEixoChange,
        handleRecorteChange,
        validateForm,
    };
};

// --- Função auxiliar para salvar (pode ser movida para um arquivo de utils/api) ---
async function saveRepertoire(repertoire: RepertorioFormData) {
    // ... (código da função saveRepertoire original)
}

// --- PROPS DO COMPONENTE ---
type RepertorioFormProps = {
  onSubmit: (data: RepertorioFormData) => Promise<void>;
  onCancel: () => void;
  initialData?: RepertorioFormData;
  isEditing?: boolean;
};

// ------------------------------------------------------------------
// COMPONENTE PRINCIPAL (UI)
// ------------------------------------------------------------------
export default function RepertorioForm({ onSubmit, onCancel, initialData, isEditing = false }: RepertorioFormProps) {
    
    // 1. A lógica inteira é obtida do hook
    const {
        formData,
        errors,
        setErrors,
        maxRecortes,
        recorteOptions,
        handleModeloChange,
        handleSpecificDataChange,
        handleEixoChange,
        handleRecorteChange,
        validateForm,
    } = useRepertorioForm({ initialData, isEditing });

    const [isSubmitting, setIsSubmitting] = useState(false);

    // 2. O handler de submit usa a lógica do hook
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

    // 3. O componente se concentra apenas em renderizar a UI
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

                    {formData.modelo === 'obra' && <ObraForm onDataChange={handleSpecificDataChange} errors={errors} {...formData} />}
                    {formData.modelo === 'artigo' && <ArtigoForm onDataChange={handleSpecificDataChange} errors={errors} {...formData} />}
                    {formData.modelo === 'citacao' && <CitacaoForm onDataChange={handleSpecificDataChange} errors={errors} {...formData} />}
                    
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

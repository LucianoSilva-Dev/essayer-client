/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Save, X, AlertCircle, BookOpen, FileText, Quote } from "lucide-react"
import type { RepertorioFormData, ModeloRepertorio } from "@/../types/repertorio"
import ObraForm from "../forms/obra-form"
import ArtigoForm from "../forms/artigo-form"
import CitacaoForm from "../forms/citacao-form"
import { toast } from "react-toastify"
import { EixosTematicos } from "../../constants/eixos"
import { CreateArtigoBody, CreateCitacaoBody, CreateObraBody } from "../../apiCalls/repertorio/types"
import { createArtigo, createCitacao, createObra } from "../../apiCalls/repertorio"

type RepertorioFormProps = {
  onSubmit: (data: RepertorioFormData) => Promise<void>
  onCancel: () => void
  initialData?: RepertorioFormData
  isEditing?: boolean; // ADICIONADO
}

const EixoOptions = Object.keys(EixosTematicos);

const modelos = [
  {
    id: "obra" as ModeloRepertorio,
    nome: "Obra",
    descricao: "Livros, filmes, peças teatrais e outras obras artísticas",
    icone: BookOpen,
  },
  {
    id: "artigo" as ModeloRepertorio,
    nome: "Artigo",
    descricao: "Artigos científicos, jornalísticos e acadêmicos",
    icone: FileText,
  },
  {
    id: "citacao" as ModeloRepertorio,
    nome: "Citação",
    descricao: "Citações de autores, personalidades e pensadores",
    icone: Quote,
  },
]

async function saveRepertoire(repertoire: RepertorioFormData) {
  switch (repertoire.modelo) {
    case 'obra':
      try {
        const obra: CreateObraBody = {
          autor: repertoire.autoria,
          sinopse: repertoire.sinopse,
          subtopicos: repertoire.recortes,
          topicos: repertoire.eixos,
          titulo: repertoire.titulo,
          tipoObra: repertoire.tipoObra || 'livro', // Garante um valor padrão
        }

        await createObra(obra)
        toast.success("Obra salva com sucesso!")
      } catch { }
      break;
    case 'artigo':
      try {
        const artigo: CreateArtigoBody = {
          autor: repertoire.autoria,
          resumo: repertoire.sintese,
          fonte: repertoire.fonte,
          subtopicos: repertoire.recortes,
          titulo: repertoire.titulo,
          topicos: repertoire.eixos,
        }

        await createArtigo(artigo)
        toast.success("Artigo salvo com sucesso!")
      } catch { }
      break;
    case 'citacao':
      try {
        const citacao: CreateCitacaoBody = {
          autor: repertoire.autoria,
          frase: repertoire.citacao,
          fonte: repertoire.fonte,
          subtopicos: repertoire.recortes,
          topicos: repertoire.eixos,
        }
        await createCitacao(citacao)
        toast.success("Citação salva com sucesso!")
      } catch { }
      break;
  }
}

export default function RepertorioForm({ onSubmit, onCancel, initialData, isEditing = false }: RepertorioFormProps) { // ADICIONADO isEditing
  const [modeloSelecionado, setModeloSelecionado] = useState<ModeloRepertorio>(initialData?.modelo || "obra")
  const [formData, setFormData] = useState<any>(
    initialData || {
      modelo: "obra",
      eixos: [],
      recortes: [],
      tipoObra: "livro",
    },
  )

  const [recorteOptions, setRecorteOptions] = useState<string[]>([]);
  const maxRecortes = 4;

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview] = useState(false)

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
      setModeloSelecionado(initialData.modelo);
    }
  }, [initialData]);

  useEffect(() => {
    if (formData.eixos && formData.eixos.length > 0) {
      const allRecortes = formData.eixos.flatMap((eixo: string) => EixosTematicos[eixo as keyof typeof EixosTematicos] || [])
      const uniqueRecortes = [...new Set(allRecortes)]
      setRecorteOptions(uniqueRecortes as string[]);
    } else {
      setRecorteOptions([]);
    }
  }, [formData.eixos]);


  const handleModeloChange = (novoModelo: ModeloRepertorio) => {
    // MODIFICADO: Impede a troca se estiver editando
    if (isEditing) return;

    setModeloSelecionado(novoModelo)
    setFormData((prev: any) => ({
      ...prev,
      modelo: novoModelo,
      titulo: "",
      autoria: "",
      sinopse: "",
      fonte: "",
      sintese: "",
      citacao: "",
      tipoObra: "livro",
    }))
  }

  const handleSpecificDataChange = (update: Partial<RepertorioFormData>) => {
    setFormData((prev: any) => ({ ...prev, ...update }))
  }

  const handleEixoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    const currentEixos = formData.eixos || [];

    let newEixos;

    if (checked) {
      newEixos = [...currentEixos, value];
    } else {
      newEixos = currentEixos.filter((eixo: string) => eixo !== value);
    }

    // MODIFICADO: Garante que os recortes sejam mantidos corretamente ao desmarcar um eixo
    const currentRecortes = formData.recortes || [];
    const newRecortesValidos = currentRecortes.filter((recorte: string) =>
      newEixos.flatMap((eixo: string) => EixosTematicos[eixo as keyof typeof EixosTematicos] || []).includes(recorte)
    );

    setFormData((prev: any) => ({
      ...prev,
      eixos: newEixos,
      recortes: newRecortesValidos,
    }));

    if (errors.eixos) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.eixos;
        return newErrors;
      });
    }
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

    setFormData((prev: any) => ({
      ...prev,
      recortes: newRecortes,
    }));

    if (errors.recortes) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors.recortes;
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.eixos || formData.eixos.length === 0) {
      newErrors.eixos = "Selecione pelo menos um Eixo Temático"
    }

    if (recorteOptions.length > 0) {
      if (!formData.recortes || formData.recortes.length === 0) {
        newErrors.recortes = "Selecione pelo menos um Recorte";
      } else if (formData.recortes.length > maxRecortes) {
        newErrors.recortes = `Você só pode selecionar até ${maxRecortes} recortes.`;
      }
    }

    switch (modeloSelecionado) {
      case "obra":
        if (!formData.titulo?.trim()) newErrors.titulo = "O título é obrigatório"
        if (!formData.autoria?.trim()) newErrors.autoria = "A autoria é obrigatória"
        if (!formData.sinopse?.trim()) newErrors.sinopse = "A sinopse é obrigatória"
        if (!formData.tipoObra) newErrors.tipoObra = "O tipo da obra é obrigatório"
        break
      case "artigo":
        if (!formData.titulo?.trim()) newErrors.titulo = "O título é obrigatório"
        if (!formData.autoria?.trim()) newErrors.autoria = "A autoria é obrigatória"
        if (!formData.sintese?.trim()) newErrors.sintese = "A síntese é obrigatória"
        if (!formData.fonte?.trim()) newErrors.fonte = "A fonte é obrigatória"
        break
      case "citacao":
        if (!formData.autoria?.trim()) newErrors.autoria = "A autoria é obrigatória"
        if (!formData.citacao?.trim()) newErrors.citacao = "A citação é obrigatória"
        if (!formData.fonte?.trim()) newErrors.fonte = "A fonte é obrigatória"
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      if (isEditing) {
        await onSubmit(formData);
      } else {
        await saveRepertoire(formData);
        await onSubmit(formData)
      }
    } catch (error) {
      console.error("Erro ao salvar repertório:", error)
      setErrors({
        form: "Ocorreu um erro ao salvar o repertório. Tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const renderSpecificForm = () => {
    switch (modeloSelecionado) {
      case "obra":
        return <ObraForm
          onDataChange={handleSpecificDataChange}
          errors={errors}
          titulo={formData.titulo || ''}
          autoria={formData.autoria || ''}
          sinopse={formData.sinopse || ''}
          tipoObra={formData.tipoObra || 'livro'}
        />
      case "artigo":
        return <ArtigoForm
          onDataChange={handleSpecificDataChange}
          errors={errors}
          titulo={formData.titulo || ''}
          autoria={formData.autoria || ''}
          sintese={formData.sintese || ''}
          fonte={formData.fonte || ''}
        />
      case "citacao":
        return <CitacaoForm
          onDataChange={handleSpecificDataChange}
          errors={errors}
          autoria={formData.autoria || ''}
          citacao={formData.citacao || ''}
          fonte={formData.fonte || ''}
        />
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#075F70] text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">{isEditing ? "Editando Repertório" : "Novo Repertório"}</h2>
      </div>

      <div className={`${showPreview ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "block"} p-6`}>
        <form onSubmit={handleSubmit} className={showPreview ? "" : "max-w-3xl mx-auto"}>
          {errors.form && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-200 rounded-md flex items-start">
              <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <span>{errors.form}</span>
            </div>
          )}

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {/* MODIFICADO */}
              {isEditing ? "Tipo de Repertório" : "Escolha o tipo de repertório"}
            </label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {modelos.map((modelo) => {
                const IconeModelo = modelo.icone
                return (
                  <button
                    key={modelo.id}
                    type="button"
                    onClick={() => handleModeloChange(modelo.id)}
                    disabled={isEditing}
                    className={`p-4 border-2 rounded-lg text-left transition-colors shadow-md ${modeloSelecionado === modelo.id
                      ? "border-teal-600 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300 "
                      } disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:shadow-lg disabled:bg-gray-100 disable:hover:shadow-lg disabled:hover:border-gray-200`}
                  >
                    <div className="flex items-center mb-2">
                      <IconeModelo
                        size={20}
                        className={modeloSelecionado === modelo.id ? "text-teal-600" : "text-gray-400"}
                      />
                      <span className={`ml-2 font-medium ${modeloSelecionado === modelo.id ? "text-teal-600" : "text-gray-700"}`}>
                        {modelo.nome}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{modelo.descricao}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {renderSpecificForm()}

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Eixos Temáticos <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {EixoOptions.map((eixo) => (
                <label key={eixo} className="flex items-center space-x-2 p-2 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name="eixos"
                    value={eixo}
                    checked={formData.eixos?.includes(eixo) || false}
                    onChange={handleEixoChange}
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">{eixo}</span>
                </label>
              ))}
            </div>
            {errors.eixos && <p className="mt-1 text-sm text-red-500">{errors.eixos}</p>}
          </div>

          <div className="mb-5">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Recortes <span className="text-red-500">*</span> (mín. 1, máx. {maxRecortes})
            </label>
            <div className={`grid grid-cols-2 md:grid-cols-3 gap-2 ${!formData.eixos || formData.eixos.length === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}>
              {recorteOptions.map((recorte) => (
                <label key={recorte} className="flex items-center space-x-2 p-2 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    name="recortes"
                    value={recorte}
                    checked={formData.recortes?.includes(recorte) || false}
                    onChange={handleRecorteChange}
                    disabled={!formData.eixos || formData.eixos.length === 0}
                    className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
                  />
                  <span className="text-sm text-gray-700">{recorte}</span>
                </label>
              ))}
            </div>
            {errors.recortes && <p className="mt-1 text-sm text-red-500">{errors.recortes}</p>}
          </div>


          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              <X size={18} className="mr-2" />
              Cancelar
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="flex items-center px-4 py-2 border border-transparent rounded-md text-white bg-[#CA9C60] hover:bg-[#a68050] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
            >
              <Save size={18} className="mr-2" />
              {isSubmitting ? "Salvando..." : "Salvar Repertório"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
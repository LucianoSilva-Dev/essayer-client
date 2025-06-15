"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Save, Eye, EyeOff, X, Check, AlertCircle, BookOpen, FileText, Quote } from "lucide-react"
import type { RepertorioFormData, ModeloRepertorio } from "@/../types/repertorio"
import ObraForm from "../forms/obra-form"
import ArtigoForm from "../forms/artigo-form"
import CitacaoForm from "../forms/citacao-form"
import { CreateArtigoBody, CreateCitacaoBody, CreateObraBody } from "../../api/repertorio/types"
import { createArtigo, createCitacao, createObra } from "../../api/repertorio"
import { toast } from "react-toastify"
import { redirect } from 'next/navigation'

type RepertorioFormProps = {
  onSubmit: (data: RepertorioFormData) => Promise<void>
  onCancel: () => void
  initialData?: RepertorioFormData
}

const eixo = [
  "Política",
  "Educação",
  "Saúde",
  "Meio Ambiente",
  "Cultura e Artes",
  "Ciência e Tecnologia",
  "Direitos Humanos",
  "Ética e Moral",
]

const recorte = [
  "Filosofia",
  "Sociologia",
  "História",
  "Literatura",
  "Ciência",
  "Tecnologia",
  "Atualidades",
  "Outro",
]

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
          subtopicos: [repertoire.recorte],
          topico: repertoire.eixo,
          titulo: repertoire.titulo,
          tipoObra: 'livro',
        }

        await createObra(obra)
        toast.success("Obra salva com sucesso!")
      } catch (e) { }
      break;
    case 'artigo':
      try {
        const artigo: CreateArtigoBody = {
          autor: repertoire.autoria,
          resumo: repertoire.sintese,
          fonte: repertoire.fonte,
          subtopicos: [repertoire.recorte],
          titulo: repertoire.titulo,
          topico: repertoire.eixo,
        }

        await createArtigo(artigo)
        toast.success("Artigo salvo com sucesso!")
      } catch (e) { }
      break;
    case 'citacao':
      try {
        const citacao: CreateCitacaoBody = {
          autor: repertoire.autoria,
          frase: repertoire.citacao,
          fonte: repertoire.fonte,
          subtopicos: [repertoire.recorte],
          topico: repertoire.eixo,
        }
        await createCitacao(citacao)
        toast.success("Citação salva com sucesso!")
      } catch (e) { }
      break;
  }
}

export default function RepertorioForm({ onSubmit, onCancel, initialData }: RepertorioFormProps) {
  const [modeloSelecionado, setModeloSelecionado] = useState<ModeloRepertorio>(initialData?.modelo || "obra")
  const [formData, setFormData] = useState<any>(
    initialData || {
      modelo: "obra",
      eixo: "",
      recorte: "",
    },
  )

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)

  // Inicializar campos específicos do modelo quando o modelo muda
  const handleModeloChange = (novoModelo: ModeloRepertorio) => {
    setModeloSelecionado(novoModelo)
    setFormData({
      modelo: novoModelo,
      eixo: formData.eixo || "",
      recorte: formData.recorte || "",
    })
  }

  const handleSpecificDataChange = (specificData: any) => {
    setFormData((prev: any) => ({ ...prev, ...specificData }))

    // Limpar erros dos campos específicos
    Object.keys(specificData).forEach((field) => {
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev }
          delete newErrors[field]
          return newErrors
        })
      }
    })
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: value }))

    // Limpar erro quando o campo é editado
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setFormData((prev: any) => ({ ...prev, [name]: checked }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.eixo) {
      newErrors.eixo = "Selecione um Eixo Temático"
    }

    if (!formData.recorte) {
      newErrors.recorte = "Selecione um Recorte"
    }

    // Validação específica por modelo
    switch (modeloSelecionado) {
      case "obra":
        if (!formData.titulo?.trim()) {
          newErrors.titulo = "O título é obrigatório"
        }
        if (!formData.autoria?.trim()) {
          newErrors.autoria = "A autoria é obrigatória"
        }
        if (!formData.sinopse?.trim()) {
          newErrors.sinopse = "A sinopse é obrigatória"
        }
        if (!formData.fonte?.trim()) {
          newErrors.fonte = "A fonte é obrigatória"
        }
        break

      case "artigo":
        if (!formData.titulo?.trim()) {
          newErrors.titulo = "O título é obrigatório"
        }
        if (!formData.autoria?.trim()) {
          newErrors.autoria = "A autoria é obrigatória"
        }
        if (!formData.sintese?.trim()) {
          newErrors.sintese = "A síntese é obrigatória"
        }
        if (!formData.fonte?.trim()) {
          newErrors.fonte = "A fonte é obrigatória"
        }
        break

      case "citacao":
        if (!formData.autoria?.trim()) {
          newErrors.autoria = "A autoria é obrigatória"
        }
        if (!formData.citacao?.trim()) {
          newErrors.citacao = "A citação é obrigatória"
        }
        if (!formData.fonte?.trim()) {
          newErrors.fonte = "A fonte é obrigatória"
        }
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
      (async () => {
        await saveRepertoire(formData)
        redirect('/main')
      })()
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
        return <ObraForm initialData={formData} onDataChange={handleSpecificDataChange} errors={errors} />
      case "artigo":
        return <ArtigoForm initialData={formData} onDataChange={handleSpecificDataChange} errors={errors} />
      case "citacao":
        return <CitacaoForm initialData={formData} onDataChange={handleSpecificDataChange} errors={errors} />
      default:
        return null
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-[#075F70] text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Novo Repertório</h2>

      </div>

      <div className={`${showPreview ? "grid grid-cols-1 lg:grid-cols-2 gap-6" : "block"} p-6`}>
        {/* Formulário */}
        <form onSubmit={handleSubmit} className={showPreview ? "" : "max-w-3xl mx-auto"}>
          {errors.form && (
            <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-200 rounded-md flex items-start">
              <AlertCircle size={20} className="mr-2 flex-shrink-0 mt-0.5" />
              <span>{errors.form}</span>
            </div>
          )}

          {/* Seleção de Modelo */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Escolha o tipo de repertório</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {modelos.map((modelo) => {
                const IconeModelo = modelo.icone
                return (
                  <button
                    key={modelo.id}
                    type="button"
                    onClick={() => handleModeloChange(modelo.id)}
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${modeloSelecionado === modelo.id
                      ? "border-teal-600 bg-teal-50"
                      : "border-gray-200 hover:border-gray-300"
                      }`}
                  >
                    <div className="flex items-center mb-2">
                      <IconeModelo
                        size={20}
                        className={modeloSelecionado === modelo.id ? "text-teal-600" : "text-gray-400"}
                      />
                      <span
                        className={`ml-2 font-medium ${modeloSelecionado === modelo.id ? "text-teal-600" : "text-gray-700"
                          }`}
                      >
                        {modelo.nome}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">{modelo.descricao}</p>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Campos específicos do modelo */}
          {renderSpecificForm()}

          {/* Eixo Temático */}
          <div className="mb-5">
            <label htmlFor="eixo" className="block text-sm font-medium text-gray-700 mb-1">
              Eixo Temático <span className="text-red-500">*</span>
            </label>
            <select
              id="eixo"
              name="eixo"
              value={formData.eixo}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.eixo ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 bg-white`}
            >
              <option value="">Selecione um Eixo Temático</option>
              {eixo.map((eix) => (
                <option key={eix} value={eix}>
                  {eix}
                </option>
              ))}
            </select>
            {errors.eixo && <p className="mt-1 text-sm text-red-500">{errors.eixo}</p>}
          </div>

          {/* Recortes */}
          <div className="mb-5">
            <label htmlFor="recorte" className="block text-sm font-medium text-gray-700 mb-1">
              Recorte <span className="text-red-500">*</span>
            </label>
            <select
              id="recorte"
              name="recorte"
              value={formData.recorte}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.recorte ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 bg-white`}
            >
              <option value="">Selecione um Recorte</option>
              {recorte.map((rec) => (
                <option key={rec} value={rec}>
                  {rec}
                </option>
              ))}
            </select>
            {errors.recorte && <p className="mt-1 text-sm text-red-500">{errors.recorte}</p>}
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

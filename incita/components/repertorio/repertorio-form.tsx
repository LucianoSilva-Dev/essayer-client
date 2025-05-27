"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Save, Eye, EyeOff, X, AlertCircle, BookOpen, FileText, Quote } from "lucide-react"
import type { RepertorioFormData, ModeloRepertorio } from "@/../types/repertorio"
import ObraForm from "../forms/obra-form"
import ArtigoForm from "../forms/artigo-form"
import CitacaoForm from "../forms/citacao-form"

type RepertorioFormProps = {
  onSubmit: (data: RepertorioFormData) => Promise<void>
  onCancel: () => void
  initialData?: RepertorioFormData
}

const categorias = [
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

export default function RepertorioForm({ onSubmit, onCancel, initialData }: RepertorioFormProps) {
  const [modeloSelecionado, setModeloSelecionado] = useState<ModeloRepertorio>(initialData?.modelo || "obra")
  const [formData, setFormData] = useState<any>(
    initialData || {
      modelo: "obra",
      categoria: "",
      tags: [],
      isPublico: true,
    },
  )

  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showPreview, setShowPreview] = useState(false)
  const [tagInput, setTagInput] = useState("")
  const tagInputRef = useRef<HTMLInputElement>(null)

  // Inicializar campos específicos do modelo quando o modelo muda
  const handleModeloChange = (novoModelo: ModeloRepertorio) => {
    setModeloSelecionado(novoModelo)
    setFormData({
      modelo: novoModelo,
      categoria: formData.categoria || "",
      tags: formData.tags || [],
      isPublico: formData.isPublico ?? true,
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

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData((prev: any) => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()],
      }))
      setTagInput("")
      tagInputRef.current?.focus()
    }
  }

  const removeTag = (tagToRemove: string) => {
    setFormData((prev: any) => ({
      ...prev,
      tags: prev.tags.filter((tag: string) => tag !== tagToRemove),
    }))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      addTag()
    }
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.categoria) {
      newErrors.categoria = "Selecione uma categoria"
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
      await onSubmit(formData as RepertorioFormData)
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
      <div className="bg-gray-800 text-white p-4 flex justify-between items-center">
        <h2 className="text-xl font-semibold">Novo Repertório</h2>
        <button
          type="button"
          onClick={() => setShowPreview(!showPreview)}
          className="flex items-center text-sm bg-gray-700 hover:bg-gray-600 px-3 py-1 rounded-md transition-colors"
        >
          {showPreview ? (
            <>
              <EyeOff size={16} className="mr-2" />
              Ocultar Pré-visualização
            </>
          ) : (
            <>
              <Eye size={16} className="mr-2" />
              Pré-visualizar
            </>
          )}
        </button>
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
                    className={`p-4 border-2 rounded-lg text-left transition-colors ${
                      modeloSelecionado === modelo.id
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
                        className={`ml-2 font-medium ${
                          modeloSelecionado === modelo.id ? "text-teal-600" : "text-gray-700"
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

          {/* Categoria */}
          <div className="mb-5">
            <label htmlFor="categoria" className="block text-sm font-medium text-gray-700 mb-1">
              Categoria <span className="text-red-500">*</span>
            </label>
            <select
              id="categoria"
              name="categoria"
              value={formData.categoria}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.categoria ? "border-red-500" : "border-gray-300"
              } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 bg-white`}
            >
              <option value="">Selecione uma categoria</option>
              {categorias.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.categoria && <p className="mt-1 text-sm text-red-500">{errors.categoria}</p>}
          </div>

          {/* Tags */}
          <div className="mb-5">
            <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex items-center">
              <input
                type="text"
                id="tags"
                ref={tagInputRef}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-1 focus:ring-teal-600"
                placeholder="Adicione tags relevantes e pressione Enter"
              />
              <button
                type="button"
                onClick={addTag}
                className="px-3 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-r-md border border-gray-300 border-l-0"
              >
                Adicionar
              </button>
            </div>

            {formData.tags && formData.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((tag: string) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-teal-100 text-teal-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1.5 text-teal-600 hover:text-teal-800"
                    >
                      <X size={14} />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Público/Privado */}
          <div className="mb-8">
            <div className="flex items-center">
              <input
                type="checkbox"
                id="isPublico"
                name="isPublico"
                checked={formData.isPublico}
                onChange={handleCheckboxChange}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="isPublico" className="ml-2 block text-sm text-gray-700">
                Tornar este repertório público
              </label>
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Repertórios públicos podem ser vistos e utilizados por todos os usuários da plataforma.
            </p>
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
              className="flex items-center px-4 py-2 border border-transparent rounded-md text-white bg-teal-800 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 disabled:opacity-50"
            >
              <Save size={18} className="mr-2" />
              {isSubmitting ? "Salvando..." : "Salvar Repertório"}
            </button>
          </div>
        </form>

        {/* Pré-visualização */}
        {showPreview && (
          <div className="border border-gray-200 rounded-lg p-4">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Pré-visualização</h3>
            <div className="bg-gray-100 rounded-lg p-4 text-center text-gray-500">
              Pré-visualização do card será exibida aqui
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

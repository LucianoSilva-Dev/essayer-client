"use client"

import { useState, useEffect } from "react"
import { useParams, useRouter } from "next/navigation"
import { ArrowLeft, User, Calendar, Tag } from "lucide-react"
import { useAdmin } from "@/../contexts/admin-context"
import type { RepertorioPendente } from "@/../types/admin"

export default function RepertorioDetailPage() {
  const params = useParams()
  const router = useRouter()
  const { repertoriosPendentes, aprovarRepertorio, recusarRepertorio } = useAdmin()
  const [repertorio, setRepertorio] = useState<RepertorioPendente | null>(null)
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const id = params.id as string

  useEffect(() => {
    const rep = repertoriosPendentes.find((r) => r.id === id)
    if (rep) {
      setRepertorio(rep)
      setFeedback(rep.status.feedbackAdmin || "")
    } else {
      router.push("/admin")
    }
  }, [id, repertoriosPendentes, router])

  const handleAprovar = async () => {
    if (!repertorio) return
    setIsSubmitting(true)
    aprovarRepertorio(repertorio.id, feedback)
    setIsSubmitting(false)
    router.push("/admin")
  }

  const handleRecusar = async () => {
    if (!repertorio) return
    if (!feedback.trim()) {
      alert("Por favor, forneça um feedback para a recusa.")
      return
    }
    setIsSubmitting(true)
    recusarRepertorio(repertorio.id, feedback)
    setIsSubmitting(false)
    router.push("/admin")
  }

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pendente":
        return "bg-orange-100 text-orange-800"
      case "aprovado":
        return "bg-green-100 text-green-800"
      case "recusado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (!repertorio) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Carregando repertório...</p>
        </div>
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <button
            onClick={() => router.push("/admin")}
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 mb-4"
          >
            <ArrowLeft size={20} />
            <span>Voltar</span>
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Revisar Repertório</h1>
              <p className="text-gray-600">Analise o conteúdo e aprove ou recuse a publicação</p>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(repertorio.status.status)}`}>
              {repertorio.status.status === "pendente"
                ? "Pendente"
                : repertorio.status.status === "aprovado"
                  ? "Aprovado"
                  : "Recusado"}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Conteúdo principal */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              {/* Informações do autor */}
              <div className="flex items-center space-x-4 mb-6 p-4 bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                  <User size={24} className="text-white" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{repertorio.autorNome}</h3>
                  <p className="text-sm text-gray-600">{repertorio.autorEmail}</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="flex items-center space-x-1 text-sm text-gray-500">
                    <Calendar size={14} />
                    <span>{formatDate(repertorio.dataSubmissao)}</span>
                  </div>
                </div>
              </div>

              {/* Título e categoria */}
              <div className="mb-6">
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-2xl font-bold text-gray-900">{repertorio.titulo}</h2>
                  <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                    #{repertorio.categoria}
                  </span>
                </div>
              </div>

              {/* Conteúdo */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Conteúdo</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700 whitespace-pre-line">{repertorio.conteudo}</p>
                </div>
              </div>

              {/* Fonte */}
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-3">Fonte</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <p className="text-gray-700">{repertorio.fonte}</p>
                </div>
              </div>

              {/* Tags */}
              {repertorio.tags.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {repertorio.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center space-x-1 px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        <Tag size={14} />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar de ações */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-8">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Feedback do administrador</h3>

              <textarea
                value={feedback}
                onChange={(e) => setFeedback(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 mb-6"
                rows={6}
                placeholder="Adicionar mensagem de retorno"
              />

              {repertorio.status.status === "pendente" && (
                <div className="space-y-3">
                  <button
                    onClick={handleRecusar}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 disabled:opacity-50 transition-colors"
                  >
                    Recusar publicação
                  </button>
                  <button
                    onClick={handleAprovar}
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50 transition-colors"
                  >
                    Autorizar publicação
                  </button>
                </div>
              )}

              {repertorio.status.feedbackAdmin && repertorio.status.status !== "pendente" && (
                <div className="mt-6 p-4 bg-gray-50 rounded-lg">
                  <h4 className="font-medium text-gray-900 mb-2">Feedback Anterior</h4>
                  <p className="text-gray-700 text-sm">{repertorio.status.feedbackAdmin}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

"use client"
import { FileText, User, Calendar } from "lucide-react"
import { useAdmin } from "../../contexts/admin-context"
import { useRouter } from "next/navigation"

interface RepertoriosListProps {
  status: "pendentes" | "aprovados" | "recusados"
}

export default function RepertoriosList({ status }: RepertoriosListProps) {
  const { getRepertoriosPorStatus } = useAdmin()
  const router = useRouter()

  const repertorios = getRepertoriosPorStatus(
    status === "pendentes" ? "pendente" : status === "aprovados" ? "aprovado" : "recusado",
  )

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
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

  const getCategoryColor = (categoria: string) => {
    const colors = {
      Filosofia: "bg-blue-100 text-blue-800",
      Sociologia: "bg-green-100 text-green-800",
      História: "bg-purple-100 text-purple-800",
      Literatura: "bg-orange-100 text-orange-800",
      Ciência: "bg-cyan-100 text-cyan-800",
      Tecnologia: "bg-gray-100 text-gray-800",
      Atualidades: "bg-red-100 text-red-800",
      Outro: "bg-yellow-100 text-yellow-800",
    }
    return colors[categoria as keyof typeof colors] || colors["Outro"]
  }

  if (repertorios.length === 0) {
    return (
      <div className="p-8 text-center">
        <FileText size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhum repertório {status === "pendentes" ? "pendente" : status.slice(0, -1)}
        </h3>
        <p className="text-gray-500">
          {status === "pendentes" ? "Não há repertórios aguardando aprovação." : `Não há repertórios ${status}.`}
        </p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repertorios.map((repertorio) => (
          <div
            key={repertorio.id}
            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => router.push(`/admin/repertorio/${repertorio.id}`)}
          >
            {/* Header do card */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-gray-800 rounded-full flex items-center justify-center">
                  <User size={14} className="text-white" />
                </div>
                <span className="text-sm font-medium text-gray-700">Nome</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar size={14} className="text-gray-400" />
                <span className="text-xs text-gray-500">{formatDate(repertorio.dataSubmissao)}</span>
              </div>
            </div>

            {/* Status e categoria */}
            <div className="flex items-center justify-between mb-3">
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(repertorio.status.status)}`}
              >
                {repertorio.status.status === "pendente"
                  ? "Pendente"
                  : repertorio.status.status === "aprovado"
                    ? "Aprovado"
                    : "Recusado"}
              </span>
              <span
                className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(repertorio.categoria)}`}
              >
                #{repertorio.categoria}
              </span>
            </div>

            {/* Título */}
            <h3 className="font-bold text-gray-900 mb-2">{repertorio.titulo}</h3>

            {/* Autor */}
            <p className="text-sm text-gray-600 mb-3">Professor: {repertorio.autorNome}</p>

            {/* Conteúdo preview */}
            <p className="text-sm text-gray-700 line-clamp-3 mb-3">
              {repertorio.conteudo.length > 100 ? `${repertorio.conteudo.substring(0, 100)}...` : repertorio.conteudo}
            </p>

            {/* Fonte */}
            <p className="text-xs text-gray-500 mb-3">
              <span className="font-medium">Fonte:</span> {repertorio.fonte}
            </p>

            {/* Tags */}
            {repertorio.tags.length > 0 && (
              <div className="flex flex-wrap gap-1">
                {repertorio.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    {tag}
                  </span>
                ))}
                {repertorio.tags.length > 3 && (
                  <span className="inline-block px-2 py-1 bg-gray-100 text-gray-600 rounded-full text-xs">
                    +{repertorio.tags.length - 3}
                  </span>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

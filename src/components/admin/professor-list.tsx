"use client"

import { useState } from "react"
import { User, Mail, ExternalLink } from "lucide-react"
import { useAdmin } from "../../contexts/admin-context"
import type { ProfessorPendente } from "../../types/admin"

interface ProfessoresListProps {
  status: undefined | "aprovados" | "recusados"
}

export default function ProfessoresList({ status }: ProfessoresListProps) {
  const { getProfessoresPorStatus } = useAdmin()
  const [selectedProfessor, setSelectedProfessor] = useState<ProfessorPendente | null>(null)

  const professores = getProfessoresPorStatus(
    status === undefined ? undefined : status === "aprovados" ? "aprovado" : "recusado",
  )

  const formatDate = (dateString: string) => {
    return new Intl.DateTimeFormat("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(dateString))
  }

  const getStatusColor = (status: string | undefined) => {
    switch (status) {
      case undefined:
        return "bg-orange-100 text-orange-800"
      case "aprovado":
        return "bg-green-100 text-green-800"
      case "recusado":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  if (professores.length === 0) {
    return (
      <div className="p-8 text-center">
        <User size={48} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">
          Nenhum professor {status === undefined ? undefined : status.slice(0, -1)}
        </h3>
        <p className="text-gray-500">
          {status === undefined
            ? "Não há solicitações de professores aguardando aprovação."
            : `Não há professores ${status}.`}
        </p>
      </div>
    )
  }

  return (
    <div className="p-6">
      <div className="space-y-4">
        {professores.map((professor) => (
          <div
            key={professor.id}
            className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50 transition-colors cursor-pointer"
            onClick={() => setSelectedProfessor(professor)}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                  <User size={24} className="text-gray-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">
                    {professor.nome}
                  </h3>
                  <div className="flex items-center space-x-2 text-sm text-gray-500">
                    <Mail size={14} />
                          <span>
                            {professor.email.length > 19
                              ? professor.email.slice(0, 19) + '...'
                              : professor.email}
                          </span>
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span
                  className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(professor.status)}`}
                >
                  {professor.status === undefined
                    ? "pendente"
                    : professor.status === "aprovado"
                      ? "Aprovado"
                      : "Recusado"}
                </span>
                <p className="text-xs text-gray-500 mt-1">{formatDate(professor.dataSubmissao)}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal de detalhes do professor */}
      {selectedProfessor && <ProfessorModal professor={selectedProfessor} onClose={() => setSelectedProfessor(null)} />}
    </div>
  )
}

interface ProfessorModalProps {
  professor: ProfessorPendente
  onClose: () => void
}

function ProfessorModal({ professor, onClose }: ProfessorModalProps) {
  const { aprovarProfessor, recusarProfessor } = useAdmin()
  const [feedback, setFeedback] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleAprovar = async () => {
    setIsSubmitting(true)
    aprovarProfessor(professor.id, feedback)
    setIsSubmitting(false)
    onClose()
  }

  const handleRecusar = async () => {
    if (!feedback.trim()) {
      alert("Por favor, forneça um feedback para a recusa.")
      return
    }
    setIsSubmitting(true)
    recusarProfessor(professor.id, feedback)
    setIsSubmitting(false)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Detalhes do Professor</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              ✕
            </button>
          </div>

          <div className="space-y-4 mb-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nome</label>
                <div className="bg-gray-100 rounded-lg p-3">{professor.nome}</div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <div className="bg-gray-100 rounded-lg p-3">{professor.email}</div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Currículo Lattes</label>
              <div className="bg-gray-100 rounded-lg p-3">
                <a
                  href={professor.curriculoLattes}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-teal-600 hover:text-teal-700 flex items-center space-x-1"
                >
                  <span>{professor.curriculoLattes}</span>
                  <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>

          {professor.status === undefined && (
            <>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Feedback do administrador</label>
                <textarea
                  value={feedback}
                  onChange={(e) => setFeedback(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
                  rows={4}
                  placeholder="Adicionar mensagem de retorno"
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={handleRecusar}
                  disabled={isSubmitting}
                  className="px-6 py-2 border border-red-300 text-red-700 rounded-lg hover:bg-red-50 disabled:opacity-50"
                >
                  Recusar educador
                </button>
                <button
                  onClick={handleAprovar}
                  disabled={isSubmitting}
                  className="px-6 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 disabled:opacity-50"
                >
                  Autorizar educador
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}

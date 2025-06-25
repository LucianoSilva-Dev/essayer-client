"use client"

import { useState } from "react"
import { Users, FileText, Clock, CheckCircle, XCircle } from "lucide-react"
import { useAdmin } from "../../../contexts/admin-context"
import ProfessoresList from "../../../components/admin/professor-list"
import RepertoriosList from "../../../components/admin/repertorio-list"


type TabType = "educadores" | "repertorios"
type StatusType = "pendentes" | "aprovados" | "recusados" 

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<TabType>("educadores")
  const [activeStatus, setActiveStatus] = useState<StatusType>("pendentes")
  const { getRepertoriosPorStatus, getProfessoresPorStatus } = useAdmin()

  const getStatusCounts = () => {
    if (activeTab === "educadores") {
      return {
        pendentes: getProfessoresPorStatus(undefined).length,
        aprovados: getProfessoresPorStatus("aprovado").length,
        recusados: getProfessoresPorStatus("recusado").length,
      }
    } else {
      return {
        pendentes: getRepertoriosPorStatus("pendente").length,
        aprovados: getRepertoriosPorStatus("aprovado").length,
        recusados: getRepertoriosPorStatus("recusado").length,
      }
    }
  }

  const counts = getStatusCounts()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie solicitações de educadores e repertórios</p>
        </div>

        {/* Tabs principais */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab("educadores")}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === "educadores"
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <Users size={18} />
                  <span>Educadores</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab("repertorios")}
                className={`py-4 px-2 border-b-2 font-medium text-sm ${
                  activeTab === "repertorios"
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center space-x-2">
                  <FileText size={18} />
                  <span>Repertórios</span>
                </div>
              </button>
            </nav>
          </div>

          {/* Sub-tabs de status */}
          <div className="px-6 py-4">
            <div className="flex space-x-6">
              <button
                onClick={() => setActiveStatus("pendentes")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeStatus === "pendentes" ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <Clock size={16} />
                <span>Requisições pendentes</span>
                <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-xs">{counts.pendentes}</span>
              </button>
              <button
                onClick={() => setActiveStatus("aprovados")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeStatus === "aprovados" ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <CheckCircle size={16} />
                <span>Requisições autorizadas</span>
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">{counts.aprovados}</span>
              </button>
              <button
                onClick={() => setActiveStatus("recusados")}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                  activeStatus === "recusados" ? "bg-red-100 text-red-700" : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <XCircle size={16} />
                <span>Requisições recusadas</span>
                <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full text-xs">{counts.recusados}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Conteúdo */}
        <div className="bg-white rounded-lg shadow-sm">
          {activeTab === "educadores" ? (
            <ProfessoresList status={activeStatus == "pendentes" ? undefined : activeStatus} />
          ) : (
            <RepertoriosList status={activeStatus} />
          )}
        </div>
      </div>
    </main>
  )
}

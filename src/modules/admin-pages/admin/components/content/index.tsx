"use client"

import { useState } from "react"
import { Users, Clock, CheckCircle, XCircle } from "lucide-react"
import { useAdmin } from "@/shared/contexts/admin-context"
import ProfessoresList from "@/modules/admin-pages/admin/components/professores-list"
import RepertoriosList from "@/modules/admin-pages/admin/components/repertorio-list"
import { useAuth } from "@/shared/contexts/auth-context"
import { redirect } from "next/navigation"


type TabType = "educadores" | "repertorios"
type StatusType = "pendentes" | "aprovados" | "recusados" 

export default function AdminPage() {
  const {userData} = useAuth()
  const [activeTab, setActiveTab] = useState<TabType>("educadores")
  const [activeStatus, setActiveStatus] = useState<StatusType>("pendentes")
  const { getRepertoriosPorStatus, getProfessoresPorStatus } = useAdmin()
  const [isLoading] = useState(false)

  if(userData?.role !== "admin"){
    redirect('/home')
  }

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
      <div className="container mx-auto px-2 sm:px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Painel Administrativo</h1>
          <p className="text-gray-600">Gerencie solicitações de educadores e repertórios</p>
        </div>

        {/* Tabs principais */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="border-b border-gray-200">
            <nav
              className="flex flex-nowrap overflow-x-auto space-x-2 sm:space-x-8 px-2 sm:px-6"
              role="tablist"
              aria-label="Painel de navegação principal"
            >
              <button
                onClick={() => setActiveTab("educadores")}
                className={`py-4 px-2 border-b-2 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  activeTab === "educadores"
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                role="tab"
                aria-selected={activeTab === "educadores"}
                tabIndex={activeTab === "educadores" ? 0 : -1}
              >
                <div className="flex items-center space-x-2">
                  <Users size={18} />
                  <span>Educadores</span>
                </div>
              </button>
              {/* <button
                onClick={() => setActiveTab("repertorios")}
                className={`py-4 px-2 border-b-2 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-teal-500 ${
                  activeTab === "repertorios"
                    ? "border-teal-500 text-teal-600"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                role="tab"
                aria-selected={activeTab === "repertorios"}
                tabIndex={activeTab === "repertorios" ? 0 : -1}
              >
                <div className="flex items-center space-x-2">
                  <FileText size={18} />
                  <span>Repertórios</span>
                </div>
              </button> */}
            </nav>
          </div>

          {/* Sub-tabs de status */}
          <div className="px-6 py-4">
            <div className="flex flex-nowrap overflow-x-auto space-x-2 sm:space-x-6">
              <button
                onClick={() => setActiveStatus("pendentes")}
                className={`cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-orange-500 ${
                  activeStatus === "pendentes" ? "bg-orange-100 text-orange-700" : "text-gray-600 hover:bg-gray-100"
                }`}
                role="tab"
                aria-selected={activeStatus === "pendentes"}
                tabIndex={activeStatus === "pendentes" ? 0 : -1}
                aria-label="Requisições pendentes"
              >
                <Clock size={16} />
                <span>Requisições pendentes</span>
                <span className="bg-orange-200 text-orange-800 px-2 py-1 rounded-full text-xs">{counts.pendentes}</span>
              </button>
              <button
                onClick={() => setActiveStatus("aprovados")}
                className={`cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 ${
                  activeStatus === "aprovados" ? "bg-green-100 text-green-700" : "text-gray-600 hover:bg-gray-100"
                }`}
                role="tab"
                aria-selected={activeStatus === "aprovados"}
                tabIndex={activeStatus === "aprovados" ? 0 : -1}
                aria-label="Requisições autorizadas"
              >
                <CheckCircle size={16} />
                <span>Requisições autorizadas</span>
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full text-xs">{counts.aprovados}</span>
              </button>
              <button
                onClick={() => setActiveStatus("recusados")}
                className={`cursor-pointer flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 ${
                  activeStatus === "recusados" ? "bg-red-100 text-red-700" : "text-gray-600 hover:bg-gray-100"
                }`}
                role="tab"
                aria-selected={activeStatus === "recusados"}
                tabIndex={activeStatus === "recusados" ? 0 : -1}
                aria-label="Requisições recusadas"
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
          {isLoading ? (
            <div className="p-8">
              <div className="space-y-4">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="animate-pulse flex items-center space-x-4">
                    <div className="rounded-full bg-gray-200 h-10 w-10" />
                    <div className="flex-1">
                      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2" />
                      <div className="h-3 bg-gray-200 rounded w-1/3" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : activeTab === "educadores" ? (
            <ProfessoresList status={activeStatus == "pendentes" ? undefined : activeStatus} />
          ) : (
            <RepertoriosList status={activeStatus}/>
          )}
        </div>
      </div>
    </main>
  )
}
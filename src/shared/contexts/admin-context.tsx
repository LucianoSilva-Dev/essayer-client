"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect, useCallback } from "react"
import { useAuth } from "./auth-context"
import type { RepertorioPendente, ProfessorPendente } from "../../types/admin"
import { getAllRequisicaoProfessor, updateStatus } from "../../lib/apiCalls/requisicao-professor"
import { GetRequisicaoProfessorResponse } from "../../lib/apiCalls/requisicao-professor/types"

const mountProfessor = (requisicao: GetRequisicaoProfessorResponse): ProfessorPendente => {
  if (requisicao.requisitante) {
    return {
      id: requisicao.id,
      nome: requisicao.requisitante.nome,
      email: requisicao.requisitante.email,
      status: requisicao.status,
      curriculoLattes: requisicao.lattes,
      dataSubmissao: requisicao.createdAt
    } 
  } else {
    return {
      id: requisicao.id,
      nome: "[excluído]",
      email: "[excluído]",
      status: requisicao.status,
      curriculoLattes: requisicao.lattes,
      dataSubmissao: requisicao.createdAt
    }
  }
}

interface AdminContextType {
  repertoriosPendentes: RepertorioPendente[]
  professoresPendentes: ProfessorPendente[]
  aprovarRepertorio: (id: string, feedback?: string) => void
  recusarRepertorio: (id: string, feedback: string) => void
  aprovarProfessor: (id: string, feedback?: string) => void
  recusarProfessor: (id: string, feedback: string) => void
  getRepertoriosPorStatus: (status: "pendente" | "aprovado" | "recusado") => RepertorioPendente[]
  getProfessoresPorStatus: (status: undefined | "aprovado" | "recusado") => ProfessorPendente[]
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [repertoriosPendentes, setRepertoriosPendentes] = useState<RepertorioPendente[]>([])
  const [professoresPendentes, setProfessoresPendentes] = useState<ProfessorPendente[]>([])
  const { userData } = useAuth()

  const getProfessores = useCallback(async () => {
    try {
      const requisicoes = await getAllRequisicaoProfessor()

      const professores = requisicoes
        .filter(req => req.requisitante)
        .map(req => mountProfessor(req))

      setProfessoresPendentes(professores)
    } catch (e) {
      console.log(e);
    }
  }, [])

  // Carregar dados iniciais
  useEffect(() => {
    if (userData?.cargo === "admin") {
      getProfessores()
    }
  }, [getProfessores, userData])



  const aprovarRepertorio = (id: string, feedback?: string) => {
    setRepertoriosPendentes((prev) =>
      prev.map((rep) =>
        rep.id === id
          ? {
            ...rep,
            status: {
              ...rep.status,
              status: "aprovado",
              dataRevisao: new Date().toISOString(),
              feedbackAdmin: feedback,
            },
          }
          : rep,
      ),
    )
  }

  const recusarRepertorio = (id: string, feedback: string) => {
    setRepertoriosPendentes((prev) =>
      prev.map((rep) =>
        rep.id === id
          ? {
            ...rep,
            status: {
              ...rep.status,
              status: "recusado",
              dataRevisao: new Date().toISOString(),
              feedbackAdmin: feedback,
            },
          }
          : rep,
      ),
    )
  }

  const aprovarProfessor = async (id: string) => {
    try{
      await updateStatus(id, {status: "aprovado"})
    } catch(e) {
      console.log(e);
    }
    getProfessores()
  }

  const recusarProfessor = async (id: string, feedback: string) => {
    try{
      await updateStatus(id, {status: "recusado", motivo: feedback})
    } catch(e) {
      console.log(e);
    }
    getProfessores()
  }

  const getRepertoriosPorStatus = (status: "pendente" | "aprovado" | "recusado") => {
    return repertoriosPendentes.filter((rep) => rep.status.status === status)
  }

  const getProfessoresPorStatus = (status: undefined | "aprovado" | "recusado") => {
    return professoresPendentes.filter((prof) => prof.status === status)
  }

  return (
    <AdminContext.Provider
      value={{
        repertoriosPendentes,
        professoresPendentes,
        aprovarRepertorio,
        recusarRepertorio,
        aprovarProfessor,
        recusarProfessor,
        getRepertoriosPorStatus,
        getProfessoresPorStatus,
      }}
    >
      {children}
    </AdminContext.Provider>
  )
}

export function useAdmin() {
  const context = useContext(AdminContext)
  if (context === undefined) {
    throw new Error("useAdmin deve ser usado dentro de um AdminProvider")
  }
  return context
}

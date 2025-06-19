"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { RepertorioPendente, ProfessorPendente } from "../types/admin"

interface AdminContextType {
  repertoriosPendentes: RepertorioPendente[]
  professoresPendentes: ProfessorPendente[]
  aprovarRepertorio: (id: string, feedback?: string) => void
  recusarRepertorio: (id: string, feedback: string) => void
  aprovarProfessor: (id: string, feedback?: string) => void
  recusarProfessor: (id: string, feedback: string) => void
  getRepertoriosPorStatus: (status: "pendente" | "aprovado" | "recusado") => RepertorioPendente[]
  getProfessoresPorStatus: (status: "pendente" | "aprovado" | "recusado") => ProfessorPendente[]
}

const AdminContext = createContext<AdminContextType | undefined>(undefined)

export function AdminProvider({ children }: { children: React.ReactNode }) {
  const [repertoriosPendentes, setRepertoriosPendentes] = useState<RepertorioPendente[]>([])
  const [professoresPendentes, setProfessoresPendentes] = useState<ProfessorPendente[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Carregar dados iniciais
  useEffect(() => {
    // Dados de exemplo para repertórios pendentes
    const repertoriosExemplo: RepertorioPendente[] = [
      {
        id: "rep1",
        titulo: "Jean Jacques Rousseau",
        conteudo:
          "Lorem ipsum dolor sit amet. Qui iure iusto et dignissimos fugiat in vel sit qui reprehenderit omnis sed Aut in qui fugiat in vel dignissimos iusto consequatur expedita vel sit amet. Lorem ipsum dolor sit amet. Qui iure iusto et dignissimos fugiat in vel sit qui reprehenderit omnis sed Aut in qui fugiat in vel dignissimos iusto consequatur expedita vel sit amet.",
        fonte: "Lorem ipsum omnis",
        categoria: "Filosofia",
        tags: ["filosofia", "contrato social"],
        autorId: "prof1",
        autorNome: "Luciano do Nascimento Silva",
        autorEmail: "luciano@email.com",
        dataSubmissao: new Date().toISOString(),
        status: {
          id: "status1",
          status: "pendente",
          dataSubmissao: new Date().toISOString(),
        },
      },
      {
        id: "rep2",
        titulo: "Perfeição",
        conteudo:
          "Lorem ipsum dolor sit amet. Qui iure iusto et dignissimos fugiat in vel sit qui reprehenderit omnis sed Aut in qui fugiat in vel dignissimos iusto consequatur expedita vel sit amet.",
        fonte: "Obra clássica",
        categoria: "Literatura",
        tags: ["literatura", "clássico"],
        autorId: "prof2",
        autorNome: "Maria Silva",
        autorEmail: "maria@email.com",
        dataSubmissao: new Date().toISOString(),
        status: {
          id: "status2",
          status: "aprovado",
          dataSubmissao: new Date().toISOString(),
          dataRevisao: new Date().toISOString(),
        },
      },
      {
        id: "rep3",
        titulo: "O Oriente contra Ocidente",
        conteudo:
          "Lorem ipsum dolor sit amet. Qui iure iusto et dignissimos fugiat in vel sit qui reprehenderit omnis sed Aut in qui fugiat in vel dignissimos iusto consequatur expedita vel sit amet.",
        fonte: "Por Obra de Carvalho",
        categoria: "História",
        tags: ["história", "oriente", "ocidente"],
        autorId: "prof3",
        autorNome: "João Santos",
        autorEmail: "joao@email.com",
        dataSubmissao: new Date().toISOString(),
        status: {
          id: "status3",
          status: "recusado",
          dataSubmissao: new Date().toISOString(),
          dataRevisao: new Date().toISOString(),
          feedbackAdmin: "Conteúdo precisa de mais referências acadêmicas.",
        },
      },
    ]

    // Dados de exemplo para professores pendentes
    const professoresExemplo: ProfessorPendente[] = [
      {
        id: "prof1",
        nome: "João",
        sobrenome: "Silva",
        email: "joao.silva@email.com",
        curriculoLattes: "http://lattes.cnpq.br/1234567890",
        instituicao: "UFMG",
        areaAtuacao: "filosofia",
        dataSubmissao: new Date().toISOString(),
        status: "pendente",
      },
      {
        id: "prof2",
        nome: "Maria",
        sobrenome: "Santos",
        email: "maria.santos@email.com",
        curriculoLattes: "http://lattes.cnpq.br/0987654321",
        instituicao: "USP",
        areaAtuacao: "literatura",
        dataSubmissao: new Date().toISOString(),
        status: "aprovado",
      },
    ]

    setRepertoriosPendentes(repertoriosExemplo)
    setProfessoresPendentes(professoresExemplo)
    setIsLoaded(true)
  }, [])

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

  const aprovarProfessor = (id: string, feedback?: string) => {
    setProfessoresPendentes((prev) =>
      prev.map((prof) =>
        prof.id === id
          ? {
              ...prof,
              status: "aprovado",
              feedbackAdmin: feedback,
            }
          : prof,
      ),
    )
  }

  const recusarProfessor = (id: string, feedback: string) => {
    setProfessoresPendentes((prev) =>
      prev.map((prof) =>
        prof.id === id
          ? {
              ...prof,
              status: "recusado",
              feedbackAdmin: feedback,
            }
          : prof,
      ),
    )
  }

  const getRepertoriosPorStatus = (status: "pendente" | "aprovado" | "recusado") => {
    return repertoriosPendentes.filter((rep) => rep.status.status === status)
  }

  const getProfessoresPorStatus = (status: "pendente" | "aprovado" | "recusado") => {
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

"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import axios from "axios"
import { API_BASE_URL } from "@/app/constants"
import { handleAxiosError } from "@/app/utils"
import { promises } from "dns"

export interface CitacaoData {
  author: string
  content: string
  font: string
}

export interface Citacao extends CitacaoData {
  id: string
}

interface CitacaoContextType {
  citacoes: Citacao[]
  adicionarCitacao: (data: CitacaoData) => Promise<Citacao>
  toggleFavorito: (id: string) => void
  favoritos: string[]
  getCitations: () => Promise<void>
  pesquisar: (termo: string) => Citacao[]
}

const CitacaoContext = createContext<CitacaoContextType | undefined>(undefined)

export function CitacaoProvider({ children }: { children: React.ReactNode }) {
  const [citacoes, setCitacoes] = useState<Citacao[]>([])
  const [favoritos, setFavoritos] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Carregar dados do localStorage na inicialização
  const getCitations = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/background`)
      setCitacoes(response.data)
    } catch (e) {
      handleAxiosError(e)
    } finally {
      setIsLoaded(true)
    }
  }

  // Salvar dados no localStorage quando houver mudanças
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("citacoes", JSON.stringify(citacoes))
      localStorage.setItem("citacoesFavoritas", JSON.stringify(favoritos))
    }
  }, [citacoes, favoritos, isLoaded])

  // Adicionar nova citação
  const adicionarCitacao = async (data: CitacaoData): Promise<Citacao> => {
    const novaCitacao: Citacao = {
      ...data,
      id: Date.now().toString(),
    }

    setCitacoes((prev) => [novaCitacao, ...prev])
    return novaCitacao
  }

  

  // Adicionar/remover dos favoritos
  const toggleFavorito = (id: string) => {
    setFavoritos((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]))
  }

  // Pesquisar por termo
  const pesquisar = (termo: string): Citacao[] => {
    if (!termo.trim()) return citacoes

    const termoBusca = termo.toLowerCase().trim()
    return citacoes.filter(
      (cit) =>
        cit.content.toLowerCase().includes(termoBusca) ||
        cit.author.toLowerCase().includes(termoBusca) ||
        cit.font.toLowerCase().includes(termoBusca),
    )
  }

  return (
    <CitacaoContext.Provider
      value={{
        citacoes,
        adicionarCitacao,
        toggleFavorito,
        getCitations,
        favoritos,
        pesquisar,
      }}
    >
      {children}
    </CitacaoContext.Provider>
  )
}

export function useCitacao() {
  const context = useContext(CitacaoContext)
  if (context === undefined) {
    throw new Error("useCitacao deve ser usado dentro de um CitacaoProvider")
  }
  return context
}

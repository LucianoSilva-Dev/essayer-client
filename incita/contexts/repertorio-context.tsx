"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import type { Repertorio, RepertorioFormData } from "@/../types/repertorio"

interface RepertorioContextType {
  repertorios: Repertorio[]
  adicionarRepertorio: (data: RepertorioFormData) => Promise<Repertorio>
  toggleFavorito: (id: string) => void
  favoritos: string[]
  filtrarPorRecorte: (recorte: string | null) => Repertorio[]
  filtrarPorEixo: (eixo: string | null) => Repertorio[]
  filtrarPorModelo: (modelo: string | null) => Repertorio[]
  pesquisar: (termo: string) => Repertorio[]
  buscarPorId: (id: string) => Repertorio | undefined
}

const RepertorioContext = createContext<RepertorioContextType | undefined>(undefined)

export function RepertorioProvider({ children }: { children: React.ReactNode }) {
  const [repertorios, setRepertorios] = useState<Repertorio[]>([])
  const [favoritos, setFavoritos] = useState<string[]>([])
  const [isLoaded, setIsLoaded] = useState(false)

  // Carregar dados do localStorage na inicialização
  useEffect(() => {
    const storedRepertorios = localStorage.getItem("repertorios")
    const storedFavoritos = localStorage.getItem("favoritos")

    if (storedRepertorios) {
      setRepertorios(JSON.parse(storedRepertorios))
    } else {
      // Dados iniciais de exemplo com os novos modelos
      setRepertorios([
        {
          id: "1",
          modelo: "obra",
          titulo: "1984",
          autoria: "George Orwell",
          sinopse:
            "Um romance distópico que retrata uma sociedade totalitária onde o governo controla todos os aspectos da vida dos cidadãos. A obra explora temas como vigilância, manipulação da verdade e perda da individualidade.",
          fonte: "Editora Companhia das Letras, 2009",
          eixo: "Artes e Cultura",
          recorte: "Literatura",
          isPublico: true,
          comentarios: 10,
        },

        {
          id: "2",
          modelo: "artigo",
          titulo: "Os Impactos da Inteligência Artificial na Sociedade Contemporânea",
          autoria: "Dr. João Silva",
          sintese:
            "O artigo analisa como a inteligência artificial está transformando diversos setores da sociedade, desde o mercado de trabalho até a educação. Discute os benefícios e desafios éticos que emergem com essa tecnologia, propondo diretrizes para um desenvolvimento responsável da IA.",
          fonte: "Revista Brasileira de Tecnologia, vol. 15, n. 3, 2023",
          eixo: "Tecnologia",
          recorte: "Inteligência Artificial",
          isPublico: true,
          comentarios: 5,
        },
        
        {
          id: "3",
          modelo: "citacao",
          autoria: "Nelson Mandela",
          citacao: "A educação é a arma mais poderosa que você pode usar para mudar o mundo.",
          fonte: "Discurso na Universidade de Witwatersrand, 2003",
          eixo: "Artes e Cultura",
          recorte: "Filosofia",
          isPublico: true,
          comentarios: 12,
        },
      ])
    }

    if (storedFavoritos) {
      setFavoritos(JSON.parse(storedFavoritos))
    }

    setIsLoaded(true)
  }, [])

  // Salvar dados no localStorage quando houver mudanças
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("repertorios", JSON.stringify(repertorios))
      localStorage.setItem("favoritos", JSON.stringify(favoritos))
    }
  }, [repertorios, favoritos, isLoaded])

  // Adicionar novo repertório
  const adicionarRepertorio = async (data: RepertorioFormData): Promise<Repertorio> => {
    const novoRepertorio: Repertorio = {
      ...data,
      id: Date.now().toString(),
      comentarios: 0,
    } as Repertorio

    setRepertorios((prev) => [novoRepertorio, ...prev])
    return novoRepertorio
  }

  // Adicionar/remover dos favoritos
  const toggleFavorito = (id: string) => {
    setFavoritos((prev) => (prev.includes(id) ? prev.filter((favId) => favId !== id) : [...prev, id]))
  }

  // Filtrar por Eixo Temático
  const filtrarPorRecorte = (recorte: string | null): Repertorio[] => {
    if (!recorte) return repertorios
    return repertorios.filter((rep) => rep.recorte === recorte)
  }
  const filtrarPorEixo = (eixo: string | null): Repertorio[] => {
    if (!eixo) return repertorios
    return repertorios.filter((rep) => rep.eixo === eixo)
  }

  // Filtrar por modelo
  const filtrarPorModelo = (modelo: string | null): Repertorio[] => {
    if (!modelo) return repertorios
    return repertorios.filter((rep) => rep.modelo === modelo)
  }

  // Pesquisar por termo
  const pesquisar = (termo: string): Repertorio[] => {
    if (!termo.trim()) return repertorios

    const termoBusca = termo.toLowerCase().trim()
    return repertorios.filter((rep) => {
      // Busca comum em todos os modelos
      const buscaComum =
        rep.eixo.toLowerCase().includes(termoBusca) ||
        rep.recorte.toLowerCase().includes(termoBusca)

      // Busca específica por modelo
      switch (rep.modelo) {
        case "obra":
          return (
            buscaComum ||
            rep.titulo.toLowerCase().includes(termoBusca) ||
            rep.autoria.toLowerCase().includes(termoBusca) ||
            rep.sinopse.toLowerCase().includes(termoBusca) ||
            rep.fonte.toLowerCase().includes(termoBusca)
          )

        case "artigo":
          return (
            buscaComum ||
            rep.titulo.toLowerCase().includes(termoBusca) ||
            rep.autoria.toLowerCase().includes(termoBusca) ||
            rep.sintese.toLowerCase().includes(termoBusca) ||
            rep.fonte.toLowerCase().includes(termoBusca)
          )

        case "citacao":
          return (
            buscaComum ||
            rep.autoria.toLowerCase().includes(termoBusca) ||
            rep.citacao.toLowerCase().includes(termoBusca) ||
            rep.fonte.toLowerCase().includes(termoBusca)
          )

        default:
          return buscaComum
      }
    })
  }

  // Buscar repertório por ID
  const buscarPorId = (id: string): Repertorio | undefined => {
    return repertorios.find((rep) => rep.id === id)
  }

  return (
    <RepertorioContext.Provider
      value={{
        repertorios,
        adicionarRepertorio,
        toggleFavorito,
        favoritos,
        filtrarPorEixo,
        filtrarPorRecorte,
        filtrarPorModelo,
        pesquisar,
        buscarPorId,
      }}
    >
      {children}
    </RepertorioContext.Provider>
  )
}

export function useRepertorio() {
  const context = useContext(RepertorioContext)
  if (context === undefined) {
    throw new Error("useRepertorio deve ser usado dentro de um RepertorioProvider")
  }
  return context
}

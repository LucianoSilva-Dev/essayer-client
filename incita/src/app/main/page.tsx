"use client"

import type React from "react"

import { useState } from "react"
import { Search, Filter, Plus, BookOpen, FileText, Quote } from "lucide-react"
import Link from "next/link"
import { useRepertorio } from "@/../contexts/repertorio-context"
import RepertorioCard from "@/../components/repertorio/repertorio-card"
import type { ModeloRepertorio } from "@/../types/repertorio"

const categorias = [
  "Todos",
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
    id: "todos",
    nome: "Todos os Modelos",
    icone: Filter,
    cor: "bg-gray-100 text-gray-700 border-gray-200",
  },
  {
    id: "obra" as ModeloRepertorio,
    nome: "Obra",
    icone: BookOpen,
    cor: "bg-blue-100 text-blue-700 border-blue-200",
  },
  {
    id: "artigo" as ModeloRepertorio,
    nome: "Artigo",
    icone: FileText,
    cor: "bg-green-100 text-green-700 border-green-200",
  },
  {
    id: "citacao" as ModeloRepertorio,
    nome: "Citação",
    icone: Quote,
    cor: "bg-purple-100 text-purple-700 border-purple-200",
  },
]

export default function Home() {
  const { repertorios, pesquisar, filtrarPorCategoria, filtrarPorModelo, favoritos } = useRepertorio()
  const [termoBusca, setTermoBusca] = useState("")
  const [categoriaAtiva, setCategoriaAtiva] = useState<string | null>(null)
  const [modeloAtivo, setModeloAtivo] = useState<string | null>(null)
  const [tipoVisualizacao, setTipoVisualizacao] = useState<"todos" | "salvos">("todos")
  const [showFilters, setShowFilters] = useState(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
  }

  // Aplicar filtros em sequência
  let repertoriosFiltrados = repertorios

  // Filtrar por categoria
  if (categoriaAtiva && categoriaAtiva !== "Todos") {
    repertoriosFiltrados = filtrarPorCategoria(categoriaAtiva)
  }

  // Filtrar por modelo
  if (modeloAtivo && modeloAtivo !== "todos") {
    repertoriosFiltrados = repertoriosFiltrados.filter((rep) => rep.modelo === modeloAtivo)
  }

  // Filtrar por tipo (todos ou salvos)
  if (tipoVisualizacao === "salvos") {
    repertoriosFiltrados = repertoriosFiltrados.filter((rep) => favoritos.includes(rep.id))
  }

  // Aplicar busca por último
  if (termoBusca) {
    const resultadosBusca = pesquisar(termoBusca)
    repertoriosFiltrados = resultadosBusca.filter((rep) => {
      const passaCategoria = !categoriaAtiva || categoriaAtiva === "Todos" || rep.categoria === categoriaAtiva
      const passaModelo = !modeloAtivo || modeloAtivo === "todos" || rep.modelo === modeloAtivo
      const passaTipo = tipoVisualizacao === "todos" || favoritos.includes(rep.id)
      return passaCategoria && passaModelo && passaTipo
    })
  }

  const limparFiltros = () => {
    setCategoriaAtiva(null)
    setModeloAtivo(null)
    setTermoBusca("")
  }

  const contarFiltrosAtivos = () => {
    let count = 0
    if (categoriaAtiva && categoriaAtiva !== "Todos") count++
    if (modeloAtivo && modeloAtivo !== "todos") count++
    if (termoBusca) count++
    return count
  }

  const filtrosAtivos = contarFiltrosAtivos()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Título principal */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Pronto para turbinar
            <br />
            suas redações?
          </h1>

          {/* Botões de alternância */}
          <div className="flex justify-center gap-4 mb-8">
            <button
              onClick={() => setTipoVisualizacao("salvos")}
              className={`px-6 py-3 rounded-full border-2 transition-colors ${
                tipoVisualizacao === "salvos"
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-teal-600 border-teal-600 hover:bg-teal-50"
              }`}
            >
              Repertórios salvos
            </button>
            <button
              onClick={() => setTipoVisualizacao("todos")}
              className={`px-6 py-3 rounded-full border-2 transition-colors ${
                tipoVisualizacao === "todos"
                  ? "bg-teal-600 text-white border-teal-600"
                  : "bg-white text-teal-600 border-teal-600 hover:bg-teal-50"
              }`}
            >
              Repertórios
            </button>
          </div>

          {/* Barra de pesquisa */}
          <div className="max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex items-center bg-white rounded-full border border-gray-300 shadow-sm">
                <div className="pl-4">
                  <Search className="text-gray-400" size={20} />
                </div>
                <input
                  type="text"
                  placeholder="Pesquise por palavra-chave, título, autor ou obra"
                  className="flex-1 py-4 px-4 bg-transparent focus:outline-none text-gray-700"
                  value={termoBusca}
                  onChange={(e) => setTermoBusca(e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className={`pr-4 transition-colors relative ${
                    showFilters ? "text-teal-600" : "text-gray-400 hover:text-gray-600"
                  }`}
                >
                  <Filter size={20} />
                  {filtrosAtivos > 0 && (
                    <span className="absolute -top-1 -right-1 bg-teal-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {filtrosAtivos}
                    </span>
                  )}
                </button>
              </div>
            </form>

            {/* Filtros expandidos */}
            {showFilters && (
              <div className="mt-4 p-6 bg-white rounded-lg border border-gray-200 shadow-sm">
                {/* Filtros por Modelo */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Filtrar por Tipo</h3>
                  <div className="flex flex-wrap gap-2">
                    {modelos.map((modelo) => {
                      const IconeModelo = modelo.icone
                      const isActive = modeloAtivo === modelo.id
                      return (
                        <button
                          key={modelo.id}
                          onClick={() => setModeloAtivo(isActive ? null : modelo.id)}
                          className={`flex items-center px-3 py-2 text-sm rounded-full border transition-colors ${
                            isActive ? modelo.cor : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                          }`}
                        >
                          <IconeModelo size={14} className="mr-1.5" />
                          {modelo.nome}
                        </button>
                      )
                    })}
                  </div>
                </div>

                {/* Filtros por Categoria */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium text-gray-700 mb-3">Filtrar por Categoria</h3>
                  <div className="flex flex-wrap gap-2">
                    {categorias.map((categoria) => (
                      <button
                        key={categoria}
                        onClick={() => setCategoriaAtiva(categoria === "Todos" ? null : categoria)}
                        className={`px-3 py-2 text-sm rounded-full border transition-colors ${
                          (categoria === "Todos" && categoriaAtiva === null) || categoria === categoriaAtiva
                            ? "bg-teal-100 text-teal-700 border-teal-200"
                            : "bg-gray-50 text-gray-700 border-gray-200 hover:bg-gray-100"
                        }`}
                      >
                        {categoria}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Ações dos filtros */}
                <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                  <div className="text-sm text-gray-500">
                    {filtrosAtivos > 0 ? `${filtrosAtivos} filtro(s) ativo(s)` : "Nenhum filtro ativo"}
                  </div>
                  {filtrosAtivos > 0 && (
                    <button onClick={limparFiltros} className="text-sm text-teal-600 hover:text-teal-700 font-medium">
                      Limpar filtros
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Seção de repertórios */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-800">
                {tipoVisualizacao === "salvos" ? "Repertórios salvos" : "Repertórios disponíveis"}
              </h2>
              {filtrosAtivos > 0 && (
                <p className="text-sm text-gray-600 mt-1">
                  {repertoriosFiltrados.length} resultado(s) encontrado(s)
                  {modeloAtivo && modeloAtivo !== "todos" && (
                    <span className="ml-1">
                      • Tipo: <span className="font-medium">{modelos.find((m) => m.id === modeloAtivo)?.nome}</span>
                    </span>
                  )}
                  {categoriaAtiva && categoriaAtiva !== "Todos" && (
                    <span className="ml-1">
                      • Categoria: <span className="font-medium">{categoriaAtiva}</span>
                    </span>
                  )}
                </p>
              )}
            </div>
          </div>

          {/* Filtros ativos visíveis */}
          {filtrosAtivos > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {modeloAtivo && modeloAtivo !== "todos" && (
                <div className="flex items-center bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm">
                  <Quote size={14} className="mr-1" />
                  Tipo: {modelos.find((m) => m.id === modeloAtivo)?.nome}
                  <button onClick={() => setModeloAtivo(null)} className="ml-2 text-purple-500 hover:text-purple-700">
                    ×
                  </button>
                </div>
              )}
              {categoriaAtiva && categoriaAtiva !== "Todos" && (
                <div className="flex items-center bg-teal-100 text-teal-700 px-3 py-1 rounded-full text-sm">
                  Categoria: {categoriaAtiva}
                  <button onClick={() => setCategoriaAtiva(null)} className="ml-2 text-teal-500 hover:text-teal-700">
                    ×
                  </button>
                </div>
              )}
              {termoBusca && (
                <div className="flex items-center bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                  Busca: "{termoBusca}"
                  <button onClick={() => setTermoBusca("")} className="ml-2 text-blue-500 hover:text-blue-700">
                    ×
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Mensagem quando não há resultados */}
          {repertoriosFiltrados.length === 0 && (
            <div className="text-center py-12">
              <div className="bg-white rounded-lg shadow-sm p-8">
                <p className="text-gray-500 mb-4">
                  {filtrosAtivos > 0
                    ? "Nenhum repertório encontrado com os filtros aplicados."
                    : tipoVisualizacao === "salvos"
                      ? "Você ainda não tem repertórios salvos."
                      : "Nenhum repertório encontrado."}
                </p>
                {filtrosAtivos > 0 ? (
                  <button
                    onClick={limparFiltros}
                    className="inline-flex items-center px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 transition-colors mr-3"
                  >
                    Limpar filtros
                  </button>
                ) : null}
                <Link
                  href="/adicionar"
                  className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
                >
                  <Plus size={18} className="mr-2" />
                  Adicionar novo repertório
                </Link>
              </div>
            </div>
          )}

          {/* Grid de cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {repertoriosFiltrados.map((repertorio) => (
              <RepertorioCard key={repertorio.id} repertorio={repertorio} />
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}

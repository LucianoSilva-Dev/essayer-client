export type ModeloRepertorio = "obra" | "artigo" | "citacao"

export interface RepertorioBase {
  id: string
  modelo: ModeloRepertorio
  eixo: string
  recorte: string
  isPublico: boolean
  comentarios: number
}

export interface RepertorioObra extends RepertorioBase {
  modelo: "obra"
  titulo: string
  autoria: string
  sinopse: string
  fonte: string
}

export interface RepertorioArtigo extends RepertorioBase {
  modelo: "artigo"
  titulo: string
  autoria: string
  sintese: string
  fonte: string
}

export interface RepertorioCitacao extends RepertorioBase {
  modelo: "citacao"
  autoria: string
  citacao: string
  fonte: string
}

export type Repertorio = RepertorioObra | RepertorioArtigo | RepertorioCitacao

export type RepertorioFormData =
  | Omit<RepertorioObra, "id" | "comentarios">
  | Omit<RepertorioArtigo, "id" | "comentarios">
  | Omit<RepertorioCitacao, "id" | "comentarios">

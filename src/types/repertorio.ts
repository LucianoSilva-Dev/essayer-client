// Frontend/types/repertorio.ts
import type { Comentario, PerfilUsuario } from "./types";

export type ModeloRepertorio = "obra" | "artigo" | "citacao"

// Interfaces para os tipos específicos de repertório
export interface Obra {
  id: string
  modelo: "obra"
  titulo: string
  autoria: string
  sinopse: string
  eixos: string[] 
  recortes: string[]
  isPublico: boolean
  totalLikes: number
  tipoObra: 'livro' | 'filme' | 'música' | 'teatro'
  favoritadoPeloUsuario: boolean
  likeDoUsuario: boolean
  criador: PerfilUsuario
  totalComentarios: number
  comentarios: Comentario[]
}

export interface Artigo {
  id: string
  modelo: "artigo"
  titulo: string
  autoria: string
  sintese: string
  fonte: string
  eixos: string[]
  recortes: string[]
  isPublico: boolean
  totalLikes: number
  favoritadoPeloUsuario: boolean
  likeDoUsuario: boolean
  criador: PerfilUsuario
  totalComentarios: number
  comentarios: Comentario[]
}

export interface Citacao {
  id: string
  modelo: "citacao"
  autoria: string
  citacao: string
  fonte?: string 
  eixos: string[]
  recortes: string[]
  isPublico: boolean
  totalLikes: number
  favoritadoPeloUsuario: boolean
  likeDoUsuario: boolean
  criador: PerfilUsuario
  totalComentarios: number
  comentarios: Comentario[]
}

// Tipo union para Repertorio
export type Repertorio = Obra | Artigo | Citacao

// Form Data para criação/edição de Repertório
export type RepertorioFormData = {
  modelo: ModeloRepertorio
  autoria: string
  eixos: string[] 
  recortes: string[]
  isPublico: boolean 
} & (
  | {
      modelo: "obra"
      titulo: string
      sinopse: string
      tipoObra: 'livro' | 'filme' | 'música' | 'teatro'
    }
  | {
      modelo: "artigo"
      titulo: string
      sintese: string
      fonte: string
    }
  | {
      modelo: "citacao"
      citacao: string
      fonte?: string 
    }
)
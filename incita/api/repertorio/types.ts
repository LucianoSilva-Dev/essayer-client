import { Comentario, Paginacao, PerfilUsuario } from '../types';

// --- Tipos de Repertório ---

export interface ObraDocument {
  tipoRepertorio: 'Obra';
  id: string;
  totalLikes: number;
  titulo: string;
  sinopse: string;
  autor: string;
  criador: PerfilUsuario;
  tipoObra: 'livro' | 'filme' | 'música' | 'teatro';
  subtopicos: string[];
  topico: string;
  favoritadoPeloUsuario: boolean;
  likeDoUsuario: boolean;
}

export interface ArtigoDocument {
  tipoRepertorio: 'Artigo';
  id: string;
  totalLikes: number;
  titulo: string;
  fonte: string;
  resumo: string;
  criador: PerfilUsuario;
  subtopicos: string[];
  topico: string;
  favoritadoPeloUsuario: boolean;
  likeDoUsuario: boolean;
}

export interface CitacaoDocument {
  tipoRepertorio: 'Citacao';
  id: string;
  totalLikes: number;
  frase: string;
  autor: string;
  fonte?: string;
  criador: PerfilUsuario;
  subtopicos: string[];
  topico: string;
  favoritadoPeloUsuario: boolean;
  likeDoUsuario: boolean;
}

export type RepertorioDocument = ObraDocument | ArtigoDocument | CitacaoDocument;

// --- Respostas de API ---

export interface GetAllRepertoriosResponse {
  documentos: RepertorioDocument[];
  paginacao: Paginacao;
}

// --- Corpos de Requisição (Body) ---

export interface CreateComentarioBody {
  texto: string;
}

export interface CreateCitacaoBody {
  frase: string;
  autor: string;
  subtopicos: string[];
  topico: string;
  fonte?: string;
}

export interface UpdateCitacaoBody extends Partial<CreateCitacaoBody> {}

export interface CreateArtigoBody {
  titulo: string;
  resumo: string;
  autor: string;
  fonte: string;
  subtopicos: string[];
  topico: string;
}

export interface UpdateArtigoBody extends Partial<CreateArtigoBody> {}

export interface CreateObraBody {
  titulo: string;
  sinopse: string;
  autor: string;
  tipoObra: 'livro' | 'filme' | 'música' | 'teatro';
  subtopicos: string[];
  topico: string;
}

export interface UpdateObraBody extends Partial<CreateObraBody> {}
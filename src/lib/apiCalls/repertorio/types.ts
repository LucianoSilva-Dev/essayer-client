import { Comentario, Paginacao, PerfilUsuario } from '../../../types/types';

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
  topicos: string[];
  favoritadoPeloUsuario: boolean;
  likeDoUsuario: boolean;
  totalComentarios?: number;
  comentarios?: Comentario[];
}

export interface ArtigoDocument {
  tipoRepertorio: 'Artigo';
  id: string;
  totalLikes: number;
  titulo: string;
  fonte: string;
  resumo: string;
  autor: string;
  criador: PerfilUsuario;
  subtopicos: string[];
  topicos: string[];
  favoritadoPeloUsuario: boolean;
  likeDoUsuario: boolean;
  totalComentarios?: number;
  comentarios?: Comentario[];
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
  topicos: string[];
  favoritadoPeloUsuario: boolean;
  likeDoUsuario: boolean;
  totalComentarios?: number;
  comentarios?: Comentario[];
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
  fixar?: boolean;
}

export interface UpdateComentarioBody {
  texto?: string;
  fixar?: boolean;
}

export interface CreateCitacaoBody {
  frase: string;
  autor: string;
  subtopicos: string[];
  topicos: string[];
  fonte?: string;
}

export type UpdateCitacaoBody = Partial<CreateCitacaoBody>;

export interface CreateArtigoBody {
  titulo: string;
  resumo: string;
  autor: string;
  fonte?: string;
  subtopicos: string[];
  topicos: string[];
}

export type UpdateArtigoBody = Partial<CreateArtigoBody>;

export interface CreateObraBody {
  titulo: string;
  sinopse: string;
  autor: string;
  tipoObra: 'livro' | 'filme' | 'música' | 'teatro';
  subtopicos: string[];
  topicos: string[];
}

export interface CreateRepertorioResponse {
  id: string;
}

export type UpdateObraBody = Partial<CreateObraBody>;

// --- Tipos Baseados na Resposta do NestJS ---

export interface PerfilUsuarioSimplificado {
  id: string;
  name: string;
  image?: string | null;
}

export interface RepertoireBase {
  id: string;
  author: string;
  creator: PerfilUsuarioSimplificado;
  totalLikes: number;
  comments: PerfilUsuarioSimplificado[]; // O backend retorna um array com os usuários dos comentários
  totalComments: number;
  subtopics: string[];
  topics: string[];
  favourited: boolean;
  liked: boolean;
}

export interface WorkDocument extends RepertoireBase {
  repertoireType: 'WORK';
  workType: string; // Tipo vindo do Prisma (ex: 'LIVRO', 'FILME', etc)
  title: string;
  synopsis: string;
}

export interface ArticleDocument extends RepertoireBase {
  repertoireType: 'ARTICLE';
  title: string;
  abstract: string;
  source: string | null;
}

export interface CitationDocument extends RepertoireBase {
  repertoireType: 'CITATION';
  quote: string;
  source: string | null;
}

export type RepertoireDocument = WorkDocument | ArticleDocument | CitationDocument;

// --- Respostas de API ---

export interface PaginationInfo {
  offset: number;
  limit: number;
  nextPageUrl: string | null;
  previousPageUrl: string | null;
  totalDocuments: number;
}

export interface GetAllRepertoiresResponse {
  documents: RepertoireDocument[];
  pagination: PaginationInfo;
}
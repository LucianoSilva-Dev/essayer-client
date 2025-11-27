import apiClient from '../api-client';
import { GenericSuccessResponse } from '../types';
import type {
  ArtigoDocument,
  CitacaoDocument,
  CreateArtigoBody,
  CreateCitacaoBody,
  CreateComentarioBody,
  CreateObraBody,
  CreateRepertorioResponse,
  GetAllRepertoriosResponse,
  ObraDocument,
  UpdateArtigoBody,
  UpdateCitacaoBody,
  UpdateComentarioBody, // ADICIONADO
  UpdateObraBody,
} from './types';

// --- Serviços Gerais de Repertório ---

/**
 * Busca todos os repertórios com filtros, ordenação e paginação.
 */
export const getAllRepertorios = async (queryString?: string): Promise<GetAllRepertoriosResponse | null> => {
  const response = await apiClient.get<GetAllRepertoriosResponse | null>(`/repertorio${queryString ? queryString : ''}`);
  return response.data;
};

/**
 * Retorna os IDs dos repertórios para a query informada.
 * Se fetchAllPages for true, itera sobre as páginas disponíveis e agrega todos os ids.
 */
export const getRepertoriosIds = async (queryString?: string, fetchAllPages = false): Promise<string[]> => {
  const formatQuery = (q?: string) => (q && q.startsWith('?') ? q : q ? `?${q}` : '');

  if (!fetchAllPages) {
    const res = await getAllRepertorios(formatQuery(queryString));
    return res?.documentos.map(d => d.id) ?? [];
  }

  // busca todas as páginas listadas em paginacao.pagesUrl
  const first = await getAllRepertorios(formatQuery(queryString));
  const idsSet = new Set<string>();
  if (first?.documentos) first.documentos.forEach(d => idsSet.add(d.id));

  const pages = first?.paginacao.pagesUrl ?? [];
  // pages normalmente contém query strings (ex: "limit=10&offset=10"); iteramos e buscamos cada
  for (const pageQ of pages) {
    try {
      // evita repetir a página já buscada
      const q = formatQuery(pageQ);
      const res = await getAllRepertorios(q);
      if (res?.documentos) res.documentos.forEach(d => idsSet.add(d.id));
    } catch (e) {
      // se uma página falhar, continuamos com as demais
      // opcional: logar o erro
      // console.warn('Falha ao buscar página de repertórios', pageQ, e);
    }
  }

  return Array.from(idsSet);
};

/**
 * Deleta um repertório pelo seu ID.
 */
export const deleteRepertorio = async (id: string): Promise<GenericSuccessResponse> => {
  const response = await apiClient.delete<GenericSuccessResponse>(`/repertorio/${id}`);
  return response.data;
};

// --- Serviços de Citação ---

export const getCitacaoById = async (id: string): Promise<CitacaoDocument> => {
  const response = await apiClient.get<CitacaoDocument>(`/repertorio/citacao/${id}`);
  return response.data;
};

export const createCitacao = async (data: CreateCitacaoBody): Promise<CreateRepertorioResponse> => {
  const response = await apiClient.post<CreateRepertorioResponse>('/repertorio/citacao', data);
  return response.data;
};

export const updateCitacao = async (id: string, data: UpdateCitacaoBody): Promise<GenericSuccessResponse> => {
  const response = await apiClient.put<GenericSuccessResponse>(`/repertorio/citacao/${id}`, data);
  return response.data;
};

// --- Serviços de Artigo ---

export const getArtigoById = async (id: string): Promise<ArtigoDocument> => {
  const response = await apiClient.get<ArtigoDocument>(`/repertorio/artigo/${id}`);
  return response.data;
};

export const createArtigo = async (data: CreateArtigoBody): Promise<CreateRepertorioResponse> => {
  const response = await apiClient.post<CreateRepertorioResponse>('/repertorio/artigo', data);
  return response.data;
};

export const updateArtigo = async (id: string, data: UpdateArtigoBody): Promise<GenericSuccessResponse> => {
  const response = await apiClient.put<GenericSuccessResponse>(`/repertorio/artigo/${id}`, data);
  return response.data;
};

// --- Serviços de Obra ---

export const getObraById = async (id: string): Promise<ObraDocument> => {
  const response = await apiClient.get<ObraDocument>(`/repertorio/obra/${id}`);
  return response.data;
};

export const createObra = async (data: CreateObraBody): Promise<CreateRepertorioResponse> => {
  const response = await apiClient.post<CreateRepertorioResponse>('/repertorio/obra', data);
  return response.data;
};

export const updateObra = async (id: string, data: UpdateObraBody): Promise<GenericSuccessResponse> => {
  const response = await apiClient.put<GenericSuccessResponse>(`/repertorio/obra/${id}`, data);
  return response.data;
};

// --- Interações (Comentário, Like, Favorito) ---

export const addComentario = async (repertorioId: string, data: CreateComentarioBody): Promise<GenericSuccessResponse> => {
  const response = await apiClient.post(`/repertorio/${repertorioId}/comentario`, data);
  return response.data;
};

export const updateComentario = async (repertorioId: string, comentarioId: string, data: UpdateComentarioBody): Promise<GenericSuccessResponse> => {
  const response = await apiClient.put(`/repertorio/${repertorioId}/comentario/${comentarioId}`, data);
  return response.data;
};

export const deleteComentario = async (repertorioId: string, comentarioId: string): Promise<GenericSuccessResponse> => {
  const response = await apiClient.delete(`/repertorio/${repertorioId}/comentario/${comentarioId}`);
  return response.data;
};

export const fixarComentario = async (RepertorioId: string, comentarioId: string, fixar: boolean): Promise<GenericSuccessResponse> => {
  const response = await apiClient.put(`/repertorio/${RepertorioId}/comentario/${comentarioId}/fixar`, { fixar })
  return response.data
}

export const addLike = (repertorioId: string): Promise<GenericSuccessResponse> => apiClient.post(`/repertorio/${repertorioId}/like`);
export const removeLike = (repertorioId: string): Promise<GenericSuccessResponse> => apiClient.delete(`/repertorio/${repertorioId}/like`);

export const addFavorito = (repertorioId: string): Promise<GenericSuccessResponse> => apiClient.post(`/repertorio/${repertorioId}/favorito`);
export const removeFavorito = (repertorioId: string): Promise<GenericSuccessResponse> => apiClient.delete(`/repertorio/${repertorioId}/favorito`);
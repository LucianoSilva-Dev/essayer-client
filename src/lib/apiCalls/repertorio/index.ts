import apiClient from '../../http/api-client';
import { GenericSuccessResponse } from '../../../types/types';
import type {
  ArtigoDocument,
  CitacaoDocument,
  CreateArtigoBody,
  CreateCitacaoBody,
  CreateComentarioBody,
  CreateObraBody,
  CreateRepertorioResponse,
  ObraDocument,
  UpdateArtigoBody,
  UpdateCitacaoBody,
  UpdateComentarioBody,
  UpdateObraBody,
  RepertoireDocument,
  GetAllRepertoiresResponse,
} from './types';

// --- Serviços Gerais de Repertório ---

/**
 * Busca todos os repertórios com filtros, ordenação e paginação.
 */
export const getAllRepertoires = async (queryString?: string): Promise<GetAllRepertoiresResponse | null> => {
  const response = await apiClient.get<GetAllRepertoiresResponse | null>(`/repertoire${queryString ? queryString : ''}`);
  return response.data;
};

/**
 * Retorna os IDs dos repertórios para a query informada.
 * Atualizado para iterar usando o `nextPageUrl` do novo padrão de paginação do backend.
 */
export const getRepertoriosIds = async (queryString?: string, fetchAllPages = false): Promise<string[]> => {
  const formatQuery = (q?: string) => (q && q.startsWith('?') ? q : q ? `?${q}` : '');

  if (!fetchAllPages) {
    const res = await getAllRepertoires(formatQuery(queryString));
    return res?.documents.map(d => d.id) ?? [];
  }

  const idsSet = new Set<string>();
  let currentQuery = formatQuery(queryString);
  let hasNextPage = true;

  while (hasNextPage) {
    try {
      const res = await getAllRepertoires(currentQuery);

      if (res?.documents) {
        res.documents.forEach(d => idsSet.add(d.id));
      }

      // Se houver próxima página, extrai a nova query string para o próximo ciclo
      if (res?.pagination.nextPageUrl) {
        // Usamos uma base dummy apenas para facilitar o parse da query string nativamente
        const url = new URL(res.pagination.nextPageUrl, 'http://dummy.com');
        currentQuery = `?${url.searchParams.toString()}`;
      } else {
        hasNextPage = false;
      }
    } catch (e) {
      console.warn('Falha ao buscar página de repertórios na busca em lote', e);
      hasNextPage = false; // Interrompe em caso de erro para não travar num loop
    }
  }

  return Array.from(idsSet);
};

/**
 * Busca detalhes de vários repertórios por uma lista de IDs.
 */
export const getRepertoriosBulk = async (ids: string[]): Promise<RepertoireDocument[]> => {
  const params = new URLSearchParams();
  ids.forEach(id => params.append('ids', id));

  // Rota atualizada para inglês e tipagem nova
  const response = await apiClient.get<RepertoireDocument[]>(`/repertoire/bulk-search?${params.toString()}`);
  return response.data;
};

/**
 * Deleta um repertório pelo seu ID.
 */
export const deleteRepertorio = async (id: string): Promise<GenericSuccessResponse> => {
  const response = await apiClient.delete<GenericSuccessResponse>(`/repertoire/${id}`);
  return response.data;
};

// --- Serviços de Citação ---
// NOTA: Presumi que os endpoints separados foram para a raiz /citation. Ajuste se for /repertoire/citation

export const getCitacaoById = async (id: string): Promise<CitacaoDocument> => {
  const response = await apiClient.get<CitacaoDocument>(`/citation/${id}`);
  return response.data;
};

export const createCitacao = async (data: CreateCitacaoBody): Promise<CreateRepertorioResponse> => {
  // Tradução do payload caso o backend da Citação também exija inglês
  const payload = {
    quote: data.frase,
    author: data.autor,
    subtopics: data.subtopicos,
    topics: data.topicos,
    source: data.fonte
  };
  const response = await apiClient.post<CreateRepertorioResponse>('/citation', payload);
  return response.data;
};

export const updateCitacao = async (id: string, data: UpdateCitacaoBody): Promise<GenericSuccessResponse> => {
  const payload = {
    quote: data.frase,
    author: data.autor,
    subtopics: data.subtopicos,
    topics: data.topicos,
    source: data.fonte
  };
  const response = await apiClient.put<GenericSuccessResponse>(`/citation/${id}`, payload);
  return response.data;
};

// --- Serviços de Artigo ---
// NOTA: Presumi /article

export const getArtigoById = async (id: string): Promise<ArtigoDocument> => {
  const response = await apiClient.get<ArtigoDocument>(`/article/${id}`);
  return response.data;
};

export const createArtigo = async (data: CreateArtigoBody): Promise<CreateRepertorioResponse> => {
  const payload = {
    title: data.titulo,
    abstract: data.resumo,
    author: data.autor,
    source: data.fonte,
    subtopics: data.subtopicos,
    topics: data.topicos
  };
  const response = await apiClient.post<CreateRepertorioResponse>('/article', payload);
  return response.data;
};

export const updateArtigo = async (id: string, data: UpdateArtigoBody): Promise<GenericSuccessResponse> => {
  const payload = {
    title: data.titulo,
    abstract: data.resumo,
    author: data.autor,
    source: data.fonte,
    subtopics: data.subtopicos,
    topics: data.topicos
  };
  const response = await apiClient.put<GenericSuccessResponse>(`/article/${id}`, payload);
  return response.data;
};

// --- Serviços de Obra ---
// NOTA: Presumi /work

export const getObraById = async (id: string): Promise<ObraDocument> => {
  const response = await apiClient.get<ObraDocument>(`/work/${id}`);
  return response.data;
};

export const createObra = async (data: CreateObraBody): Promise<CreateRepertorioResponse> => {
  const payload = {
    title: data.titulo,
    synopsis: data.sinopse,
    author: data.autor,
    // Ajustado para os Enums exatos do Zod/Prisma
    workType: data.tipoObra === 'livro' ? 'BOOK' :
      data.tipoObra === 'filme' ? 'FILM' :
        data.tipoObra === 'música' ? 'MUSIC' : 'PLAY',
    subtopics: data.subtopicos,
    topics: data.topicos
  };
  const response = await apiClient.post<CreateRepertorioResponse>('/work', payload);
  return response.data;
};

export const updateObra = async (id: string, data: UpdateObraBody): Promise<GenericSuccessResponse> => {
  const payload = {
    title: data.titulo,
    synopsis: data.sinopse,
    author: data.autor,
    // Ajustado para os Enums exatos do Zod/Prisma
    workType: data.tipoObra === 'livro' ? 'BOOK' :
      data.tipoObra === 'filme' ? 'FILM' :
        data.tipoObra === 'música' ? 'MUSIC' :
          data.tipoObra === 'teatro' ? 'PLAY' : undefined,
    subtopics: data.subtopicos,
    topics: data.topicos
  };
  const response = await apiClient.put<GenericSuccessResponse>(`/work/${id}`, payload);
  return response.data;
};

// --- Interações (Comentário, Like, Favorito) ---

export const addComentario = async (repertorioId: string, data: CreateComentarioBody): Promise<GenericSuccessResponse> => {
  // Traduzindo as chaves do body para o CreateCommentDto do backend
  const payload = { text: data.texto, fix: data.fixar };
  const response = await apiClient.post(`/repertoire/${repertorioId}/comment`, payload);
  return response.data;
};

export const updateComentario = async (repertorioId: string, comentarioId: string, data: UpdateComentarioBody): Promise<GenericSuccessResponse> => {
  // A rota de update de comentário no backend NÃO recebe o ID do repertório
  const payload = { text: data.texto };
  const response = await apiClient.put(`/repertoire/comment/${comentarioId}`, payload);
  return response.data;
};

export const deleteComentario = async (repertorioId: string, comentarioId: string): Promise<GenericSuccessResponse> => {
  // A rota de delete de comentário no backend NÃO recebe o ID do repertório
  const response = await apiClient.delete(`/repertoire/comment/${comentarioId}`);
  return response.data;
};

export const fixarComentario = async (repertorioId: string, comentarioId: string, fixar: boolean): Promise<GenericSuccessResponse> => {
  // Traduzindo a chave do body para o FixCommentDto do backend
  const response = await apiClient.put(`/repertoire/${repertorioId}/comment/${comentarioId}/fix`, { fix: fixar });
  return response.data;
};

export const addLike = (repertorioId: string): Promise<GenericSuccessResponse> => apiClient.post(`/repertoire/${repertorioId}/like`);
export const removeLike = (repertorioId: string): Promise<GenericSuccessResponse> => apiClient.delete(`/repertoire/${repertorioId}/like`);

export const addFavorito = (repertorioId: string): Promise<GenericSuccessResponse> => apiClient.post(`/repertoire/${repertorioId}/favorite`);
export const removeFavorito = (repertorioId: string): Promise<GenericSuccessResponse> => apiClient.delete(`/repertoire/${repertorioId}/favorite`);
import apiClient from '../api-client';
import { CorrigirRedacaoLivreBody, CreateRedacaoLivreBody, CreateRedacaoLivreResponse, RedacaoLivreDoc, UpdateRedacaoLivreBody } from './types';

export const createRedacaoLivre = async (data: CreateRedacaoLivreBody): Promise<CreateRedacaoLivreResponse> => {
  const response = await apiClient.post<CreateRedacaoLivreResponse>('/usuario/redacao', data);
  return response.data;
}

export const getAllRedacaoLivre = async (): Promise<RedacaoLivreDoc[]> => {
  const response = await apiClient.get<RedacaoLivreDoc[]>('/usuario/redacao');
  return response.data;
}

export const getRedacaoLivre = async (id: string): Promise<RedacaoLivreDoc> => {
  const response = await apiClient.get<RedacaoLivreDoc>(`/usuario/redacao/${id}`);
  return response.data;
}

export const updateRedacaoLivre = async (id: string, data: UpdateRedacaoLivreBody): Promise<void> => {
  const response = await apiClient.put<void>(`/usuario/redacao/${id}`, data);
  return response.data;
}

export const corrigirRedacaoLivre = async (id: string, data: CorrigirRedacaoLivreBody): Promise<void> => {
  const response = await apiClient.post<void>(`usuario/redacao/${id}/corrigir`, data)
  return response.data
}
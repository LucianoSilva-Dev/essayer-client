import apiClient from '../api-client';
import type { GenericSuccessResponse } from '../types';
import type { CreateTurmaBody, GetAtividadesRecentesReponse, GetTurmasCriadasResponse } from './types';

/**
 * Cria uma nova turma.
 * @param data - Dados da turma (nome, escola e iconeId).
 * @returns Mensagem de sucesso.
 */
export const createTurma = async (data: CreateTurmaBody): Promise<GenericSuccessResponse> => {
  const response = await apiClient.post<GenericSuccessResponse>('/turma', {
    ...data,
    iconeId: String(data.iconeId), // Converte o ID para string, como o backend espera
  });
  return response.data;
};

/**
 * Busca as turmas criadas pelo professor logado.
 * @returns Uma lista paginada de turmas.
 */
export const getTurmasCriadas = async (queryString?: string): Promise<GetTurmasCriadasResponse> => {
  const response = await apiClient.get<GetTurmasCriadasResponse>(`/turma/criadas?${queryString || ''}`);
  return response.data;
}

export const entrarTurma = async (codigoConvite: string): Promise<string> => {
  const response = await apiClient.post<string>('/turma/solicitar-entrada', { codigoConvite });
  return response.data;
}

export const getAtividadesRecentes = async (): Promise<GetAtividadesRecentesReponse[]> => {
  const response = await apiClient.get<GetAtividadesRecentesReponse[]>('/atividade/recentes')
  return response.data
}

export async function getTurmasAluno() {
  const res = await apiClient.get("/turma/");
  return res.data;
}

export async function getTurmaById(id: string) {
  const res = await apiClient.get(`/turma/${id}`);
  return res.data;
}

export async function getAtividadesByTurma(id: string) {
  const res = await apiClient.get(`/turma/${id}/atividades`);
  return res.data;
}

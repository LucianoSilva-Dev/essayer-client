import apiClient from '../api-client';
import type { GenericSuccessResponse } from '../types';
import type { CreateTurmaBody } from './types';

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
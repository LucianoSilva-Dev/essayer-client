// src/apiCalls/turma-aberta-prof/index.ts
import apiClient from '../../http/api-client';
import { GenericSuccessResponse } from '../../../types/types';
import type {
  Turma,
  Aluno,
  PedidoEntrada,
  ConviteResponse,
  UpdateTurmaBody,
} from './types';
import { AtividadeBasica } from '../turma/types'; // Importa AtividadeBasica para o retorno de getAtividadesTurma

/**
 * Obtém detalhes completos de uma turma específica pelo ID.
 * Endpoint: GET /turma/{id}
 */
export const getTurmaById = async (id: string): Promise<Turma> => {
  const { data } = await apiClient.get<Turma>(`/turma/${id}`);
  return data;
};

/**
 * Atualiza os dados de uma turma.
 * Endpoint: PUT /turma/{id}
 */
export const updateTurma = async (id: string, updateData: UpdateTurmaBody): Promise<void> => {
  // A API retorna 204 No Content
  await apiClient.put(`/turma/${id}`, updateData);
};

/**
 * Exclui uma turma.
 * Endpoint: DELETE /turma/{id}
 */
export const deleteTurma = async (id: string): Promise<void> => {
  // A API retorna 204 No Content
  await apiClient.delete(`/turma/${id}`);
};

/**
 * Lista todos os alunos (membros) de uma turma.
 * Endpoint: GET /turma/{id}/alunos
 */
export const getAlunosTurma = async (id: string): Promise<Aluno[]> => {
  const { data } = await apiClient.get<Aluno[]>(`/turma/${id}/alunos`);
  return Array.isArray(data) ? data : []; // Garante retorno de array
};

/**
 * Remove um aluno específico da turma.
 * Endpoint: DELETE /turma/{id}/alunos/{alunoId}
 */
export const removeAluno = async (turmaId: string, alunoId: string): Promise<void> => {
  // A API retorna 204 No Content
  await apiClient.delete(`/turma/${turmaId}/alunos/${alunoId}`);
};

/**
 * Obtém a lista BÁSICA de atividades de uma turma.
 * Endpoint: GET /turma/{id}/atividades
 * Retorna: AtividadeBasica[] (sem detalhes específicos do professor como quem respondeu)
 */
export const getAtividadesTurma = async (turmaId: string, titulo?: string): Promise<AtividadeBasica[]> => {
    const params = new URLSearchParams();
    if (titulo) {
        params.append('titulo', titulo);
    }
    const queryString = params.toString();
    const { data } = await apiClient.get<AtividadeBasica[]>(`/turma/${turmaId}/atividades${queryString ? `?${queryString}` : ''}`);
    return Array.isArray(data) ? data : []; // Garante retorno de array
};


/**
 * Obtém os pedidos de entrada pendentes para uma turma.
 * Endpoint: GET /turma/{id}/pedidos
 */
export const getPedidosEntrada = async (id: string): Promise<PedidoEntrada[]> => {
  const { data } = await apiClient.get<PedidoEntrada[]>(`/turma/${id}/pedidos`);
  return Array.isArray(data) ? data : []; // Garante retorno de array
};

/**
 * Aprova o pedido de entrada de um aluno.
 * Endpoint: POST /turma/{id}/pedidos/{alunoId}/aprovar
 */
export const aprovarPedido = async (turmaId: string, alunoId: string): Promise<GenericSuccessResponse> => {
  // API retorna 200 OK com { message: string }
  const { data } = await apiClient.post<GenericSuccessResponse>(`/turma/${turmaId}/pedidos/${alunoId}/aprovar`);
  return data;
};

/**
 * Recusa o pedido de entrada de um aluno.
 * Endpoint: DELETE /turma/{id}/pedidos/{alunoId}/recusar
 */
export const recusarPedido = async (turmaId: string, alunoId: string): Promise<void> => {
  // A API retorna 204 No Content
  await apiClient.delete(`/turma/${turmaId}/pedidos/${alunoId}/recusar`);
};

/**
 * Obtém o código de convite atual da turma.
 * Endpoint: GET /turma/{id}/convite
 */
export const getCodigoConvite = async (id: string): Promise<ConviteResponse> => {
  const { data } = await apiClient.get<ConviteResponse>(`/turma/${id}/convite`);
  return data; // Retorna { codigoConvite: "..." }
};

/**
 * Gera um novo código de convite para a turma.
 * Endpoint: POST /turma/{id}/regenerar-codigo
 */
export const regenerarCodigoConvite = async (id: string): Promise<ConviteResponse> => {
  const { data } = await apiClient.post<ConviteResponse>(`/turma/${id}/regenerar-codigo`);
  return data; // Retorna { codigo: "..." }
};

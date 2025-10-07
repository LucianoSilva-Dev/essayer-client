import apiClient from "../api-client";
import {
  Turma,
  Aluno,
  Atividade,
  PedidoEntrada,
  ConviteResponse,
} from "./types";

// Obtém detalhes da turma
export const getTurmaById = async (id: string): Promise<Turma> => {
  const { data } = await apiClient.get(`/turma/${id}`);
  return data;
};

// Lista alunos da turma
export const getAlunosTurma = async (id: string): Promise<Aluno[]> => {
  const { data } = await apiClient.get(`/turma/${id}/alunos`);
  return data;
};

// Remove aluno da turma
export const removeAluno = async (id: string, alunoId: string): Promise<void> => {
  await apiClient.delete(`/turma/${id}/alunos/${alunoId}`);
};

// Obtém atividades da turma
export const getAtividadesTurma = async (id: string): Promise<Atividade[]> => {
  const { data } = await apiClient.get(`/turma/${id}/atividades`);
  return data;
};

// Obtém pedidos de entrada pendentes
export const getPedidosEntrada = async (id: string): Promise<PedidoEntrada[]> => {
  const { data } = await apiClient.get(`/turma/${id}/pedidos`);
  return data;
};

// Aprova pedido de entrada
export const aprovarPedido = async (id: string, alunoId: string): Promise<void> => {
  await apiClient.post(`/turma/${id}/pedidos/${alunoId}/aprovar`);
};

// Recusa pedido de entrada
export const recusarPedido = async (id: string, alunoId: string): Promise<void> => {
  await apiClient.delete(`/turma/${id}/pedidos/${alunoId}/recusar`);
};

// Obtém código de convite
export const getCodigoConvite = async (id: string): Promise<ConviteResponse> => {
  const { data } = await apiClient.get(`/turma/${id}/convite`);
  return data;
};

// Gera novo código de convite
export const regenerarCodigoConvite = async (id: string): Promise<ConviteResponse> => {
  const { data } = await apiClient.post(`/turma/${id}/regenerar-codigo`);
  return data;
};

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

// --- Helpers de mapeamento ---

function mapClassToTurma(cls: any): Turma {
  return {
    id: cls.id,
    nome: cls.name,
    escola: cls.school,
    iconeId: cls.iconId,
    criador: {
      id: cls.creator?.id,
      nome: cls.creator?.name,
      imagem: cls.creator?.image,
    } as any,
    membros: (cls.members ?? []).map((m: any) => ({
      id: m.id,
      nome: m.name,
      fotoPath: m.image ?? null,
    })),
    totalMembros: cls.totalMembers ?? 0,
  };
}

function mapMemberToAluno(member: any): Aluno {
  return {
    id: member.id,
    nome: member.name,
    fotoPath: member.image ?? null,
  };
}

function mapActivityToAtividade(activity: any): AtividadeBasica {
  return {
    id: activity.id,
    titulo: activity.title,
    descricao: activity.description,
    tipoAtividade: activity.activityType === 'ESSAY' ? 'Redacao' : activity.activityType,
    status: activity.status ?? '',
    dataLimite: activity.deadline,
  };
}

/**
 * Obtém detalhes completos de uma turma específica pelo ID.
 * Endpoint: GET /class/{id}
 */
export const getTurmaById = async (id: string): Promise<Turma> => {
  const { data } = await apiClient.get<any>(`/class/${id}`);
  return mapClassToTurma(data);
};

/**
 * Atualiza os dados de uma turma.
 * Endpoint: PATCH /class/{id}
 */
export const updateTurma = async (id: string, updateData: UpdateTurmaBody): Promise<void> => {
  const body: any = {};
  if (updateData.nome !== undefined) body.name = updateData.nome;
  if (updateData.iconeId !== undefined) body.iconId = updateData.iconeId;
  if (updateData.escola !== undefined) body.school = updateData.escola;
  await apiClient.patch(`/class/${id}`, body);
};

/**
 * Exclui uma turma.
 * Endpoint: DELETE /class/{id}
 */
export const deleteTurma = async (id: string): Promise<void> => {
  await apiClient.delete(`/class/${id}`);
};

/**
 * Lista todos os alunos (membros) de uma turma.
 * Endpoint: GET /class/{id}/students
 */
export const getAlunosTurma = async (id: string): Promise<Aluno[]> => {
  const { data } = await apiClient.get<any[]>(`/class/${id}/students`);
  return Array.isArray(data) ? data.map(mapMemberToAluno) : [];
};

/**
 * Remove um aluno específico da turma.
 * Endpoint: DELETE /class/{id}/students/{studentId}
 */
export const removeAluno = async (turmaId: string, alunoId: string): Promise<void> => {
  await apiClient.delete(`/class/${turmaId}/students/${alunoId}`);
};

/**
 * Obtém a lista BÁSICA de atividades de uma turma.
 * Endpoint: GET /class/{id}/activities
 * Retorna: AtividadeBasica[] (sem detalhes específicos do professor como quem respondeu)
 */
export const getAtividadesTurma = async (turmaId: string, titulo?: string): Promise<AtividadeBasica[]> => {
    const params = new URLSearchParams();
    if (titulo) {
        params.append('title', titulo);
    }
    const queryString = params.toString();
    const { data } = await apiClient.get<any[]>(`/class/${turmaId}/activities${queryString ? `?${queryString}` : ''}`);
    const arr = Array.isArray(data) ? data : [];
    return arr.map(mapActivityToAtividade);
};


/**
 * Obtém os pedidos de entrada pendentes para uma turma.
 * Endpoint: GET /class/{id}/requests
 */
export const getPedidosEntrada = async (id: string): Promise<PedidoEntrada[]> => {
  const { data } = await apiClient.get<any[]>(`/class/${id}/requests`);
  return Array.isArray(data) ? data.map(mapMemberToAluno) : [];
};

/**
 * Aprova o pedido de entrada de um aluno.
 * Endpoint: POST /class/{id}/requests/{studentId}/approve
 */
export const aprovarPedido = async (turmaId: string, alunoId: string): Promise<GenericSuccessResponse> => {
  const { data } = await apiClient.post<GenericSuccessResponse>(`/class/${turmaId}/requests/${alunoId}/approve`);
  return data;
};

/**
 * Recusa o pedido de entrada de um aluno.
 * Endpoint: DELETE /class/{id}/requests/{studentId}/reject
 */
export const recusarPedido = async (turmaId: string, alunoId: string): Promise<void> => {
  await apiClient.delete(`/class/${turmaId}/requests/${alunoId}/reject`);
};

/**
 * Obtém o código de convite atual da turma.
 * Endpoint: GET /class/{id}/invite
 */
export const getCodigoConvite = async (id: string): Promise<ConviteResponse> => {
  const { data } = await apiClient.get<any>(`/class/${id}/invite`);
  return { codigoConvite: data.code };
};

/**
 * Gera um novo código de convite para a turma.
 * Endpoint: POST /class/{id}/regenerate-code
 */
export const regenerarCodigoConvite = async (id: string): Promise<ConviteResponse> => {
  const { data } = await apiClient.post<any>(`/class/${id}/regenerate-code`);
  return { codigo: data.code };
};

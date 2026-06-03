// src/apiCalls/turma/index.ts
import apiClient from '../../http/api-client';
import type { GenericSuccessResponse } from '../../../types/types';
import type {
  CreateTurmaBody,
  GetAtividadesByTurmaResponse, // Retorna AtividadeBasica[]
  GetAtividadesRecentesReponse,
  GetCorrecoesByTurma,          // Retorna Correcao[]
  GetTurmasCriadasResponse,
  GetTurmasMatriculadasResponse,
  Turma,                          // Tipo para /turma/{id}
  AtividadeProfessor              // Tipo para /turma/{id}/atividades/criador
} from './types'; // Importando todos os tipos necessários de types.ts

// --- Helpers de mapeamento ---

function mapClassToTurma(cls: any): any {
  return {
    id: cls.id,
    nome: cls.name,
    escola: cls.school,
    iconeId: cls.iconId,
    criador: cls.creator ? {
      id: cls.creator.id,
      nome: cls.creator.name,
      imagem: cls.creator.image,
    } : undefined,
    membros: (cls.members ?? []).map((m: any) => ({
      id: m.id,
      nome: m.name,
      imagem: m.image,
    })),
    totalMembros: cls.totalMembers ?? cls._count?.members ?? 0,
  };
}

function mapActivityToAtividade(activity: any): any {
  return {
    id: activity.id,
    titulo: activity.title,
    descricao: activity.description,
    tipoAtividade: activity.activityType === 'ESSAY' ? 'Redacao' : activity.activityType,
    status: mapActivityStatus(activity.status),
    dataLimite: activity.deadline,
  };
}

function mapActivityStatus(status: string): string {
  switch (status) {
    case 'Completed': return 'concluida';
    case 'Pending': return 'pendente';
    case 'In Progress': return 'pendente';
    case 'Overdue': return 'encerrada';
    default: return status;
  }
}

function mapCreatorActivity(activity: any): AtividadeProfessor {
  return {
    id: activity.id,
    titulo: activity.title,
    descricao: activity.description,
    tipoAtividade: activity.activityType === 'ESSAY' ? 'Redacao' : activity.activityType,
    status: '',
    dataLimite: activity.deadline,
    usuariosResponderam: (activity.usersResponded ?? []).map((u: any) => ({
      id: u.id,
      nome: u.name,
      imagem: u.image,
    })),
    totalMembros: activity.totalMembers ?? 0,
  };
}

function mapFeedbackToCorrecao(fb: any): any {
  return {
    id: fb.id,
    visto: fb.seen,
    feedback: fb.feedback ? JSON.stringify(fb.feedback) : '',
    data: fb.date,
    atividade: fb.activity ? {
      id: fb.activity.id,
      titulo: fb.activity.title,
      tipoAtividade: fb.activity.activityType === 'ESSAY' ? 'Redacao' : fb.activity.activityType,
    } : undefined,
  };
}

/**
 * Cria uma nova turma.
 */
export const createTurma = async (data: CreateTurmaBody): Promise<GenericSuccessResponse> => {
  const response = await apiClient.post<GenericSuccessResponse>('/class', {
    name: data.nome,
    school: data.escola,
    iconId: String(data.iconeId),
  });
  return response.data;
};

/**
 * Busca as turmas criadas pelo professor logado.
 */
export const getTurmasCriadas = async (queryString?: string): Promise<GetTurmasCriadasResponse> => {
  const response = await apiClient.get<any>(`/class/created?${queryString || ''}`);
  const data = response.data;
  return {
    documentos: (data.documents ?? []).map((cls: any) => ({
      id: cls.id,
      nome: cls.name,
      escola: cls.school,
      iconeId: cls.iconId,
    })),
    paginacao: data.pagination ? {
      offset: data.pagination.offset,
      limit: data.pagination.limit,
      nextPageUrl: data.pagination.nextPageUrl,
      previousPageUrl: data.pagination.previousPageUrl,
      totalDocuments: data.pagination.totalDocuments,
      pagesUrl: data.pagination.pagesUrl,
    } : undefined as any,
  };
};

/**
 * Aluno solicita entrada em uma turma usando código.
 */
export const entrarTurma = async (codigoConvite: string): Promise<GenericSuccessResponse> => {
  const response = await apiClient.post<GenericSuccessResponse>('/class/request-entry', { inviteCode: codigoConvite });
  return response.data;
};

/**
 * Retorna as quatro atividades mais recentes das turmas do professor.
 */
export const getAtividadesRecentes = async (): Promise<GetAtividadesRecentesReponse[]> => {
  const response = await apiClient.get<any[]>('/activity/recent');
  return (response.data ?? []).map((a: any) => ({
    id: a.id,
    titulo: a.title,
    descricao: a.description,
    respostas: a.submittedResponses,
    totalAlunos: a.totalStudents,
    createdAt: a.createdAt,
  }));
};

/**
 * Busca as turmas em que o aluno está matriculado.
 */
export async function getTurmasAluno() {
  const res = await apiClient.get<any>("/class");
  const data = res.data;
  return {
    documentos: (data.documents ?? []).map((cls: any) => ({
      id: cls.id,
      nome: cls.name,
      escola: cls.school,
      iconeId: cls.iconId,
      criador: cls.creator ? {
        id: cls.creator.id,
        nome: cls.creator.name,
        imagem: cls.creator.image,
      } : undefined,
    })),
    paginacao: data.pagination ? {
      offset: data.pagination.offset,
      limit: data.pagination.limit,
      nextPageUrl: data.pagination.nextPageUrl,
      previousPageUrl: data.pagination.previousPageUrl,
      totalDocuments: data.pagination.totalDocuments,
      pagesUrl: data.pagination.pagesUrl,
    } : undefined as any,
  } as GetTurmasMatriculadasResponse;
}

/**
 * Busca os detalhes de uma turma específica pelo ID.
 * Endpoint: /class/{id}
 */
export async function getTurmaById(id: string): Promise<Turma> {
  const res = await apiClient.get<any>(`/class/${id}`);
  return mapClassToTurma(res.data) as Turma;
}

/**
 * Busca a lista básica de atividades para uma turma (visão do aluno/geral).
 * Endpoint: /class/{id}/activities
 * Retorna: AtividadeBasica[]
 */
export async function getAtividadesByTurma(id: string): Promise<GetAtividadesByTurmaResponse> {
  const res = await apiClient.get<any[]>(`/class/${id}/activities`);
  return (res.data ?? []).map(mapActivityToAtividade) as GetAtividadesByTurmaResponse;
}

/**
 * Busca a lista de atividades para uma turma (visão do criador/professor).
 * Endpoint: /class/{id}/activities/creator
 * Retorna: AtividadeProfessor[]
 */
export async function getAtividadesCriador(id: string, titulo?: string): Promise<AtividadeProfessor[]> {
  const params = new URLSearchParams();
  if (titulo) {
    params.append('title', titulo);
  }
  const queryString = params.toString();
  const response = await apiClient.get<any[]>(`/class/${id}/activities/creator${queryString ? `?${queryString}` : ''}`);
  return (response.data ?? []).map(mapCreatorActivity);
}


/**
 * Busca as correções/feedbacks disponíveis para o usuário na turma especificada.
 * Endpoint: /class/{id}/activities/feedbacks
 * Retorna: Correcao[]
 */
export const getCorrecoesByTurma = async (turmaId: string): Promise<GetCorrecoesByTurma> => {
  const res = await apiClient.get<any[]>(`/class/${turmaId}/activities/feedbacks`);
  return (res.data ?? []).map(mapFeedbackToCorrecao) as GetCorrecoesByTurma;
}

// Funções relacionadas a membros da turma (aprovar, recusar, remover, listar pedidos, convite)
// Podem permanecer aqui ou ir para um arquivo apiCalls/membros.ts, por exemplo.
// Por enquanto, vou deixá-las aqui por simplicidade, já que estão sob /turma/{id}/...

export {
  getAlunosTurma,
  removeAluno,
  getPedidosEntrada,
  aprovarPedido,
  recusarPedido,
  getCodigoConvite,
  regenerarCodigoConvite
} from '../turma-aberta-prof'; // Reexporta as funções que já estavam no outro arquivo

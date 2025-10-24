// src/apiCalls/turma/index.ts
import apiClient from '../api-client';
import type { GenericSuccessResponse } from '../types';
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

/**
 * Cria uma nova turma.
 */
export const createTurma = async (data: CreateTurmaBody): Promise<GenericSuccessResponse> => {
  const response = await apiClient.post<GenericSuccessResponse>('/turma', {
    ...data,
    iconeId: String(data.iconeId),
  });
  return response.data;
};

/**
 * Busca as turmas criadas pelo professor logado.
 */
export const getTurmasCriadas = async (queryString?: string): Promise<GetTurmasCriadasResponse> => {
  const response = await apiClient.get<GetTurmasCriadasResponse>(`/turma/criadas?${queryString || ''}`);
  return response.data;
};

/**
 * Aluno solicita entrada em uma turma usando código.
 */
export const entrarTurma = async (codigoConvite: string): Promise<GenericSuccessResponse> => { // Ajustado para GenericSuccessResponse baseado no schema
  const response = await apiClient.post<GenericSuccessResponse>('/turma/solicitar-entrada', { codigoConvite });
  return response.data; // A API retorna 200 OK sem corpo, mas tratamos como sucesso
};

/**
 * Retorna as quatro atividades mais recentes das turmas do professor.
 */
export const getAtividadesRecentes = async (): Promise<GetAtividadesRecentesReponse[]> => {
  const response = await apiClient.get<GetAtividadesRecentesReponse[]>('/atividade/recentes');
  return response.data;
};

/**
 * Busca as turmas em que o aluno está matriculado.
 */
export async function getTurmasAluno() {
  const res = await apiClient.get<GetTurmasMatriculadasResponse>("/turma/");
  return res.data;
}

/**
 * Busca os detalhes de uma turma específica pelo ID.
 * Endpoint: /turma/{id}
 */
export async function getTurmaById(id: string): Promise<Turma> {
  const res = await apiClient.get<Turma>(`/turma/${id}`);
  return res.data;
}

/**
 * Busca a lista básica de atividades para uma turma (visão do aluno/geral).
 * Endpoint: /turma/{id}/atividades
 * Retorna: AtividadeBasica[]
 */
export async function getAtividadesByTurma(id: string): Promise<GetAtividadesByTurmaResponse> {
  const res = await apiClient.get<GetAtividadesByTurmaResponse>(`/turma/${id}/atividades`);
  // O tipo GetAtividadesByTurmaResponse já é Array<AtividadeBasica>
  return res.data;
}

/**
 * Busca a lista de atividades para uma turma (visão do criador/professor).
 * Endpoint: /turma/{id}/atividades/criador
 * Retorna: AtividadeProfessor[]
 */
export async function getAtividadesCriador(id: string, titulo?: string): Promise<AtividadeProfessor[]> {
    const params = new URLSearchParams();
    if (titulo) {
        params.append('titulo', titulo);
    }
    const queryString = params.toString();
    const response = await apiClient.get<AtividadeProfessor[]>(`/turma/${id}/atividades/criador${queryString ? `?${queryString}` : ''}`);
    return response.data;
}


/**
 * Busca as correções/feedbacks disponíveis para o usuário na turma especificada.
 * Endpoint: /turma/{id}/atividades/feedbacks
 * Retorna: Correcao[]
 */
export const getCorrecoesByTurma = async (turmaId: string): Promise<GetCorrecoesByTurma> => {
  const res = await apiClient.get<GetCorrecoesByTurma>(`/turma/${turmaId}/atividades/feedbacks`);
   // O tipo GetCorrecoesByTurma já é Array<Correcao>
  return res.data;
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

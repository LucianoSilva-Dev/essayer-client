// src/apiCalls/tarefas/index.ts
import apiClient from '../../http/api-client';
import { GenericSuccessResponse } from '../../../types/types'; // Importar se necessário para retornos vazios
import {
    CreateRedacaoBody,
    CreateRedacaoResponse,
    UpdateRedacaoBody,
    GetRedacaoDetalhesResponse,
    GetRespostasRedacaoResponse,
    IniciarRedacaoResponse,
    EnviarRedacaoResponse,
    EnviarRespostaRedacaoBody,
    UpdateFeedbackBody,
    UpdateFeedbackResponse,
    GetCorrecaoRedacaoResponse
} from './types'; // Importa os tipos definidos localmente
import { MinhaTarefaAtiva } from './types';

// --- Helpers de mapeamento ---

function mapGetDetalhesResponse(data: any): GetRedacaoDetalhesResponse {
  return {
    id: data.id,
    titulo: data.title,
    descricao: data.description,
    tipoAtividade: 'Redacao',
    status: data.status ?? '',
    dataLimite: data.deadline,
    tema: data.theme,
    tempoLimiteEmMinutos: data.timeLimitInMinutes,
    turma: data.turma, // não retornado no GET essay/:id
    respostas: data.respostas ?? [],
  };
}

function mapCorrecaoResponse(data: any): GetCorrecaoRedacaoResponse {
  return {
    id: data.id,
    titulo: data.title,
    tema: data.theme,
    texto: data.text ?? '',
    feedback: data.feedback ? {
      notaC1: data.feedback.gradeC1,
      notaC2: data.feedback.gradeC2,
      notaC3: data.feedback.gradeC3,
      notaC4: data.feedback.gradeC4,
      notaC5: data.feedback.gradeC5,
      feedbackC1: data.feedback.feedbackC1,
      feedbackC2: data.feedback.feedbackC2,
      feedbackC3: data.feedback.feedbackC3,
      feedbackC4: data.feedback.feedbackC4,
      feedbackC5: data.feedback.feedbackC5,
    } : undefined as any,
  };
}

function mapRespostasResponse(data: any): GetRespostasRedacaoResponse {
  return {
    documentos: (data.documents ?? []).map((doc: any) => ({
      id: doc.id,
      aluno: {
        id: doc.studentId,
        nome: doc.studentName,
      },
      texto: doc.text,
      dataEnvio: doc.answerDate,
      feedback: doc.hasFeedback ? {} : undefined,
      tempoEmMinutos: doc.tempoEmMinutos,
    })),
  };
}

function mapMinhaTarefaAtiva(data: any): MinhaTarefaAtiva {
  return {
    id: data.id,
    titulo: data.title,
    descricao: data.description,
    tipoAtividade: data.activityType === 'ESSAY' ? 'Redacao' : data.activityType,
    status: mapStatus(data.status),
    dataLimite: data.deadline,
    turma: {
      id: data.class.id,
      nome: data.class.name,
      iconeId: data.class.iconId ?? '',
    },
  };
}

function mapStatus(status: string): string {
  switch (status) {
    case 'NOT_STARTED': return 'pendente';
    case 'IN_PROGRESS': return 'pendente';
    case 'SUBMITTED': return 'concluida';
    default: return status;
  }
}

/**
 * Cria uma nova atividade de Redação.
 * Endpoint: POST /activity/essay
 */
export const createAtividadeRedacao = async (data: CreateRedacaoBody): Promise<CreateRedacaoResponse> => {
    const response = await apiClient.post<CreateRedacaoResponse>('/activity/essay', {
        title: data.titulo,
        description: data.descricao,
        classId: data.turma,
        theme: data.tema,
        deadline: data.dataLimite,
        timeLimitInMinutes: data.tempoLimiteEmMinutos,
    });
    return response.data;
};

/**
 * Busca os detalhes de uma atividade de Redação específica.
 * Endpoint: GET /activity/essay/{id}
 */
export const getAtividadeRedacaoDetalhes = async (id: string): Promise<GetRedacaoDetalhesResponse> => {
    const response = await apiClient.get<any>(`/activity/essay/${id}`);
    return mapGetDetalhesResponse(response.data);
};

/**
 * Busca a correção de uma atividade de Redação para um aluno específico.
 * Endpoint: GET /activity/essay/{id}/correction/{studentId}
 */
export const getCorrecaoRedacao = async (id: string, alunoId: string): Promise<GetCorrecaoRedacaoResponse> => {
    const response = await apiClient.get<any>(`/activity/essay/${id}/correction/${alunoId}`);
    return mapCorrecaoResponse(response.data);
};

/**
 * Atualiza uma atividade de Redação existente.
 * Endpoint: PATCH /activity/essay/{id}
 */
export const updateAtividadeRedacao = async (id: string, data: UpdateRedacaoBody): Promise<GenericSuccessResponse> => {
    const body: any = {};
    if (data.titulo !== undefined) body.title = data.titulo;
    if (data.descricao !== undefined) body.description = data.descricao;
    if (data.tema !== undefined) body.theme = data.tema;
    if (data.dataLimite !== undefined) body.deadline = data.dataLimite;
    if (data.tempoLimiteEmMinutos !== undefined) body.timeLimitInMinutes = data.tempoLimiteEmMinutos;

    const response = await apiClient.patch<GenericSuccessResponse>(`/activity/essay/${id}`, body);
    return response.data;
};

/**
 * Deleta uma atividade (qualquer tipo).
 * Endpoint: DELETE /activity/{id}
 */
export const deleteAtividade = async (id: string): Promise<void> => {
    await apiClient.delete(`/activity/${id}`);
};

/**
 * Busca todas as respostas para uma atividade de Redação.
 * Endpoint: GET /activity/essay/{id}/answers
 */
export const getRespostasRedacao = async (id: string, offset?: number, limit?: number): Promise<GetRespostasRedacaoResponse> => {
     const params = new URLSearchParams();
    if (offset !== undefined) params.append('offset', String(offset));
    if (limit !== undefined) params.append('limit', String(limit));
    const queryString = params.toString();
    const response = await apiClient.get<any>(`/activity/essay/${id}/answers${queryString ? `?${queryString}` : ''}`);
    return mapRespostasResponse(response.data);
};


/**
 * Marca o início da resposta de uma redação pelo aluno.
 * Endpoint: POST /activity/essay/{id}/start
 */
export const iniciarRespostaRedacao = async (id: string): Promise<IniciarRedacaoResponse> => {
    const response = await apiClient.post<IniciarRedacaoResponse>(`/activity/essay/${id}/start`);
    return response.data;
};

/**
 * Envia o texto final da resposta de uma redação pelo aluno.
 * Endpoint: POST /activity/essay/{id}/send
 */
export const enviarRespostaRedacao = async (id: string, data: EnviarRespostaRedacaoBody): Promise<EnviarRedacaoResponse> => {
    const response = await apiClient.post<EnviarRedacaoResponse>(`/activity/essay/${id}/send`, {
        text: data.texto,
    });
    return response.data;
};

/**
 * Adiciona ou atualiza o feedback do professor para uma resposta específica.
 * Endpoint: PUT /activity/answers/{respostaId}/feedback
 */
export const updateFeedbackResposta = async (respostaId: string, data: UpdateFeedbackBody): Promise<UpdateFeedbackResponse> => {
    const response = await apiClient.put<UpdateFeedbackResponse>(`/activity/answers/${respostaId}/feedback`, {
        gradeC1: data.notaC1,
        gradeC2: data.notaC2,
        gradeC3: data.notaC3,
        gradeC4: data.notaC4,
        gradeC5: data.notaC5,
        feedbackC1: data.feedbackC1,
        feedbackC2: data.feedbackC2,
        feedbackC3: data.feedbackC3,
        feedbackC4: data.feedbackC4,
        feedbackC5: data.feedbackC5,
    });
    return response.data;
};

/**
 * Busca todas as tarefas ativas para o usuário logado.
 * Endpoint: GET /activity
 */
export const getMinhasAtividadesAtivas = async (): Promise<MinhaTarefaAtiva[]> => {
  try {
    const response = await apiClient.get<any[]>('/activity');
    const data = Array.isArray(response.data) ? response.data : [];
    return data.map(mapMinhaTarefaAtiva);
  } catch (error) {
    console.error("Erro ao buscar atividades ativas:", error);
    return [];
  }
};
// src/apiCalls/tarefas/index.ts
import apiClient from '../api-client';
import { GenericSuccessResponse } from '../types'; // Importar se necessário para retornos vazios
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
    UpdateFeedbackResponse
} from './types'; // Importa os tipos definidos localmente
import { MinhaTarefaAtiva } from './types';

/**
 * Cria uma nova atividade de Redação.
 * Endpoint: POST /atividade/redacao
 */
export const createAtividadeRedacao = async (data: CreateRedacaoBody): Promise<CreateRedacaoResponse> => {
    // A API retorna 201, o corpo pode ser vazio ou conter ID, ajustar conforme necessidade
    const response = await apiClient.post<CreateRedacaoResponse>('/atividade/redacao', data);
    return response.data; // Ou retornar algo como { success: true } se o corpo for vazio
};

/**
 * Busca os detalhes de uma atividade de Redação específica.
 * Endpoint: GET /atividade/redacao/{id}
 */
export const getAtividadeRedacaoDetalhes = async (id: string): Promise<GetRedacaoDetalhesResponse> => {
    const response = await apiClient.get<GetRedacaoDetalhesResponse>(`/atividade/redacao/${id}`);
    return response.data;
};

/**
 * Atualiza uma atividade de Redação existente.
 * Endpoint: PUT /atividade/redacao/{id}
 */
export const updateAtividadeRedacao = async (id: string, data: UpdateRedacaoBody): Promise<GenericSuccessResponse> => {
    // A API retorna 200 OK sem corpo específico no schema
    const response = await apiClient.put<GenericSuccessResponse>(`/atividade/redacao/${id}`, data);
    return response.data; // Ou retornar algo indicando sucesso
};

/**
 * Deleta uma atividade (qualquer tipo).
 * Endpoint: DELETE /atividade/{id}
 */
export const deleteAtividade = async (id: string): Promise<void> => {
    // A API retorna 204 No Content
    await apiClient.delete(`/atividade/${id}`);
    // Não retorna nada em caso de sucesso
};

/**
 * Busca todas as respostas para uma atividade de Redação.
 * Endpoint: GET /atividade/redacao/{id}/respostas
 */
export const getRespostasRedacao = async (id: string, offset?: number, limit?: number): Promise<GetRespostasRedacaoResponse> => {
     const params = new URLSearchParams();
    if (offset !== undefined) params.append('offset', String(offset));
    if (limit !== undefined) params.append('limit', String(limit));
    const queryString = params.toString();
    const response = await apiClient.get<GetRespostasRedacaoResponse>(`/atividade/redacao/${id}/respostas${queryString ? `?${queryString}` : ''}`);
    return response.data; // Adapte se a API não retornar um objeto com 'documentos'
};


/**
 * Marca o início da resposta de uma redação pelo aluno.
 * Endpoint: POST /atividade/redacao/{id}/iniciar
 */
export const iniciarRespostaRedacao = async (id: string): Promise<IniciarRedacaoResponse> => {
    // A API retorna 200 OK sem corpo específico no schema
    const response = await apiClient.post<IniciarRedacaoResponse>(`/atividade/redacao/${id}/iniciar`);
    return response.data; // Ou retornar algo indicando sucesso
};

/**
 * Envia o texto final da resposta de uma redação pelo aluno.
 * Endpoint: POST /atividade/redacao/{id}/enviar
 */
export const enviarRespostaRedacao = async (id: string, data: EnviarRespostaRedacaoBody): Promise<EnviarRedacaoResponse> => {
     // A API retorna 200 OK sem corpo específico no schema
    const response = await apiClient.post<EnviarRedacaoResponse>(`/atividade/redacao/${id}/enviar`, data);
    return response.data; // Ou retornar algo indicando sucesso
};

/**
 * Adiciona ou atualiza o feedback do professor para uma resposta específica.
 * Endpoint: PUT /atividade/respostas/{respostaId}/feedback
 */
export const updateFeedbackResposta = async (respostaId: string, data: UpdateFeedbackBody): Promise<UpdateFeedbackResponse> => {
    const response = await apiClient.put<UpdateFeedbackResponse>(`/atividade/respostas/${respostaId}/feedback`, data);
    return response.data;
};

/**
 * Busca todas as tarefas ativas para o usuário logado.
 * Endpoint: GET /atividade/
 */
export const getMinhasAtividadesAtivas = async (): Promise<MinhaTarefaAtiva[]> => {
  // A API pode retornar diretamente o array ou um objeto com { documentos: [...] }
  // Ajuste conforme a resposta real da sua API.
  try {
    const response = await apiClient.get<MinhaTarefaAtiva[]>('/atividade/');
    // Se a API retornar { documentos: [...] } descomente a linha abaixo:
    // return Array.isArray(response.data.documentos) ? response.data.documentos : [];
    return Array.isArray(response.data) ? response.data : []; // Assume que retorna o array diretamente
  } catch (error) {
    console.error("Erro ao buscar atividades ativas:", error);
    // Retorna array vazio em caso de erro para não quebrar a UI
    return [];
  }
};
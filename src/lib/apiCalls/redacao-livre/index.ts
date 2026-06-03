import apiClient from '../../http/api-client';
import { CorrigirRedacaoLivreBody, CreateRedacaoLivreBody, CreateRedacaoLivreResponse, RedacaoLivreDoc, UpdateRedacaoLivreBody } from './types';

const statusMap: Record<string, "finalizada" | "erro" | "pendente"> = {
  FINISHED: "finalizada",
  ERROR: "erro",
  PENDING: "pendente",
};

function mapEssayResponse(essay: any): RedacaoLivreDoc {
  return {
    id: essay.id,
    tema: essay.theme,
    texto: essay.text,
    duracao: essay.duration,
    finalizada: essay.finished,
    dataRealizacao: essay.date ? new Date(essay.date) : undefined,
    correcoesIA: (essay.corrections ?? []).map((c: any) => ({
      id: c.id,
      texto: c.text ?? '',
      tema: c.theme ?? '',
      status: statusMap[c.status] ?? c.status,
      createdAt: new Date(c.createdAt),
      notaC1: c.gradeC1 ?? 0,
      notaC2: c.gradeC2 ?? 0,
      notaC3: c.gradeC3 ?? 0,
      notaC4: c.gradeC4 ?? 0,
      notaC5: c.gradeC5 ?? 0,
      feedbackC1: c.feedbackC1 ?? '',
      feedbackC2: c.feedbackC2 ?? '',
      feedbackC3: c.feedbackC3 ?? '',
      feedbackC4: c.feedbackC4 ?? '',
      feedbackC5: c.feedbackC5 ?? '',
    })),
    updatedAt: new Date(essay.updatedAt),
  };
}

export const createRedacaoLivre = async (data: CreateRedacaoLivreBody): Promise<CreateRedacaoLivreResponse> => {
  const response = await apiClient.post<CreateRedacaoLivreResponse>('/user-essay', {
    theme: data.tema,
    duration: data.duracao,
  });
  return response.data;
}

export const getAllRedacaoLivre = async (queryString?: string): Promise<RedacaoLivreDoc[]> => {
  const response = await apiClient.get<any[]>(`/user-essay${queryString ? `?theme=${queryString}` : ''}`);
  return response.data.map(mapEssayResponse);
}

export const getRedacaoLivre = async (id: string): Promise<RedacaoLivreDoc> => {
  const response = await apiClient.get<any>(`/user-essay/${id}`);
  return mapEssayResponse(response.data);
}

export const updateRedacaoLivre = async (id: string, data: UpdateRedacaoLivreBody): Promise<void> => {
  const response = await apiClient.patch<void>(`/user-essay/${id}`, {
    text: data.texto,
    duration: data.duracao,
    finished: data.finalizada,
    date: data.dataRealizacao,
  });
  return response.data;
}

export const corrigirRedacaoLivre = async (id: string, data: CorrigirRedacaoLivreBody): Promise<void> => {
  const response = await apiClient.post<void>(`/user-essay/${id}/correct`, {
    theme: data.tema,
    essayText: data.textoRedacao,
  })
  return response.data
}

export const deleteRedacaoLivre = async (id: string): Promise<void> => {
  const response = await apiClient.delete<void>(`/user-essay/${id}`)
  return response.data
}

export const deleteCorrecaoRedacaoLivre = async (idRedacao: string, idCorrecao: string): Promise<void> => {
  const response = await apiClient.delete<void>(`/user-essay/${idRedacao}/correction/${idCorrecao}`)
  return response.data
}

export const retryCorrecaoRedacaoLivre = async (idRedacao: string, idCorrecao: string): Promise<void> => {
  const response = await apiClient.post<void>(`/user-essay/${idRedacao}/correction/${idCorrecao}/retry`)
  return response.data
}
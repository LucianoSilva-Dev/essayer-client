import { Correcao } from '@/types/turma';
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
/**
 * Busca as correções disponíveis para o aluno na turma especificada.
 * @param turmaId - O ID da turma.
 * @returns Uma lista de correções.
 */
export const getCorrecoesByTurma = async (turmaId: string): Promise<Correcao[]> => {
  // Mock enquanto a api não está pronta
  const mockCorrecoes: Correcao[] = [
  {
    id: "corr1",
    visto: false,
    titulo: "Redação sobre IA",
    descricao: "Os impactos da inteligência artificial no mercado de trabalho",
    criadoEm: "2025-10-21T10:00:00Z",
    feedbackProfessor: "Bom desenvolvimento, mas faltou aprofundar nas consequências éticas.",
  },
  {
    id: "corr2",
    visto: true,
    titulo: "Análise Crítica - Artigo X",
    descricao: "Análise crítica sobre o artigo 'A Sociedade do Cansaço'",
    criadoEm: "2025-10-15T14:30:00Z",
    feedbackProfessor: "Análise bem estruturada, parabéns!",
  },
  {
    id: "corr3",
    visto: false,
    titulo: "Redação Modelo ENEM",
    descricao: "Desafios para a valorização de comunidades e povos tradicionais no Brasil",
    criadoEm: "2025-10-18T09:15:00Z",
    feedbackProfessor: "Introdução precisa ser refeita. Argumentos precisam de mais repertório.",
  },
   {
    id: "corr4",
    visto: true,
    titulo: "Resenha do Filme Y",
    descricao: "Resenha crítica sobre o filme 'Parasita'",
    criadoEm: "2025-09-28T11:00:00Z",
    feedbackProfessor: "Ótima análise dos simbolismos do filme.",
  },
];

return new Promise((resolve) => {
  setTimeout(() => {
    resolve(mockCorrecoes);
  }, 500);
});
}

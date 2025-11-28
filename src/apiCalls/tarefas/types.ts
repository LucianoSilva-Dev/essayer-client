// src/apiCalls/tarefas/types.ts
import { AtividadeRedacaoDetalhada, AtividadeBasica } from "../turma/types";
import { GenericSuccessResponse, PerfilUsuario } from "../types";

// --- Tipos para Respostas ---

export interface Feedback {
  notaC1: number;
  notaC2: number;
  notaC3: number;
  notaC4: number;
  notaC5: number;
  feedbackC1: string;
  feedbackC2: string;
  feedbackC3: string;
  feedbackC4: string;
  feedbackC5: string;
}

export interface RespostaAtividade {
  id: string;
  aluno: PerfilUsuario;
  texto?: string;
  dataEnvio: string;
  feedback?: Feedback;
  tempoEmMinutos?: number | null;
}

// --- Tipos de Request Body ---

export interface CreateRedacaoBody {
  titulo: string;
  descricao: string;
  turma: string;
  tema: string;
  dataLimite?: string;
  tempoLimiteEmMinutos?: number;
  repertoriosApoio?: string[];
}

export type UpdateRedacaoBody = Partial<Omit<CreateRedacaoBody, 'turma'>>;

export interface EnviarRespostaRedacaoBody {
    texto: string;
    tempoEmMinutos: number;
}

// --- Tipos de Response ---

export type GetRedacaoDetalhesResponse = AtividadeRedacaoDetalhada;

export interface GetCorrecaoRedacaoResponse {
  id: string;
  titulo: string;
  tema: string;
  texto: string;
  feedback: Feedback;
}

export interface GetRespostasRedacaoResponse {
  documentos: RespostaAtividade[];
}

export type CreateRedacaoResponse = GenericSuccessResponse | { id: string };

export type IniciarRedacaoResponse = GenericSuccessResponse;

export type EnviarRedacaoResponse = GenericSuccessResponse;

export type UpdateFeedbackResponse = GenericSuccessResponse;

export type UpdateFeedbackBody = Feedback;

export interface MinhaTarefaAtiva extends AtividadeBasica {
  turma: {
    id: string;
    nome: string;
    iconeId: string;
  };
}
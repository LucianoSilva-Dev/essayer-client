// src/apiCalls/tarefas/types.ts
// Reutiliza tipos se possível, certifique-se que estão exportados de turma/types
import { AtividadeRedacaoDetalhada, AtividadeBasica } from "../turma/types";
import { GenericSuccessResponse, PerfilUsuario } from "../types"; // Import PerfilUsuario

// --- Tipos para Respostas ---
/**
 * Interface para a resposta de uma atividade (conforme /atividade/redacao/{id})
 * Adicionado export
 */

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
  aluno: PerfilUsuario; // Pode ser o objeto PerfilUsuario ou apenas o ID, verificar API
  texto?: string; // Pode não vir na listagem, tornar opcional? Verificar API /respostas
  dataEnvio: string; // ISO 8601 string
  feedback?: Feedback;
  tempoEmMinutos?: number | null; // Adicionado do /atividade/redacao/{id}/respostas
  // Adicionar outros campos se a API fornecer (ex: nota)
}


// --- Tipos de Request Body ---

export interface CreateRedacaoBody {
  titulo: string;
  descricao: string;
  turma: string; // ID da turma
  tema: string;
  dataLimite?: string; // ISO 8601 string ou undefined
  tempoLimiteEmMinutos?: number;
  repertoriosApoio?: string[]; // Array de IDs
}

// UpdateRedacaoBody pode ser um Partial da CreateRedacaoBody, mas excluindo 'turma'
export type UpdateRedacaoBody = Partial<Omit<CreateRedacaoBody, 'turma'>>;

export interface EnviarRespostaRedacaoBody {
  texto: string;
}

export interface UpdateFeedbackBody {
  feedback: string;
}

// --- Tipos de Resposta de API ---

// Para GET /atividade/redacao/{id}, podemos reutilizar AtividadeRedacaoDetalhada
export type GetRedacaoDetalhesResponse = AtividadeRedacaoDetalhada;

// Para GET /atividade/redacao/{id}/respostas
export interface GetRespostasRedacaoResponse {
  documentos: RespostaAtividade[];
  // Adicionar paginacao: Paginacao; se a API retornar paginação aqui
}

// Para POST /atividade/redacao (resposta é 201 Created sem corpo específico no schema)
export type CreateRedacaoResponse = GenericSuccessResponse | { id: string }; // Ajustar conforme a resposta real da API

// Para POST /atividade/redacao/{id}/iniciar (resposta é 200 OK sem corpo no schema)
export type IniciarRedacaoResponse = GenericSuccessResponse;

// Para POST /atividade/redacao/{id}/enviar (resposta é 200 OK sem corpo no schema)
export type EnviarRedacaoResponse = GenericSuccessResponse;

// Para PUT /atividade/respostas/{id}/feedback (resposta é 200 OK com { message: string })
export type UpdateFeedbackResponse = GenericSuccessResponse;

// Para DELETE /atividade/{id} (resposta é 204 No Content)
// Não precisa de tipo específico, a ausência de erro indica sucesso.

export interface MinhaTarefaAtiva extends AtividadeBasica {
  turma: {
    id: string;
    nome: string;
    iconeId: string; // Ou number, dependendo da API real
  };
  // Adicione outros campos se a API /atividade/ retornar mais dados relevantes
}
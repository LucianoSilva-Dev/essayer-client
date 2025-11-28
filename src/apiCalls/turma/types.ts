import { Feedback } from "../tarefas/types";
import { Paginacao, PerfilUsuario } from "../types";

// --- Tipos de Turma (mantidos como estavam) ---
export interface CreateTurmaBody {
  nome: string;
  escola?: string;
  iconeId: number;
}

export interface TurmaCriadaProfessor {
  id: string;
  nome: string;
  escola: string | null;
  iconeId: string;
}

export interface TurmaMatriculadaAluno extends TurmaCriadaProfessor {
  criador: PerfilUsuario
}

export interface Turma extends TurmaMatriculadaAluno {
  membros: PerfilUsuario[];
  totalMembros: number;
}


// --- Tipos de Atividade ---

/**
 * Interface básica para listas de atividades (ex: /turma/{id}/atividades)
 * Inclui os campos essenciais para exibição em listas.
 */
export interface AtividadeBasica {
  id: string;
  titulo: string;
  tipoAtividade: "Redacao" | string; // Permite "Redacao" ou outras strings se houver mais tipos
  descricao: string;
  status: string; // Ex: 'pendente', 'concluída', 'encerrada' (verificar valores exatos da API)
  dataLimite: string | null; // API retorna como string ISO 8601 ou null
}

/**
 * Interface detalhada para uma atividade do tipo Redação (ex: /atividade/redacao/{id})
 * Inclui campos específicos como tema, tempo limite, etc.
 */
export interface AtividadeRedacaoDetalhada extends AtividadeBasica {
  tipoAtividade: "Redacao"; 
  turma: { 
    id: string;
    nome: string;
  };
  tema: string;
  
  // ADICIONADO: Propriedade que estava faltando
  eixoTematico?: string; 

  tempoLimiteEmMinutos?: number | null; 
  repertoriosApoio?: string[]; // Considere tipar melhor se tiver a interface de Repertorio
  respostas: RespostaAtividade[]; 
}

/**
 * Interface para a resposta de uma atividade (conforme /atividade/redacao/{id})
 */
export interface RespostaAtividade {
  id: string;
  aluno: PerfilUsuario; // Pode ser o objeto PerfilUsuario ou apenas o ID, verificar API
  texto: string;
  dataEnvio: string; // ISO 8601 string
  feedback?: Feedback;
  tempoEmMinutos?: number | null; // Adicionado do /atividade/redacao/{id}/respostas
  // Adicionar outros campos se a API fornecer (ex: nota)
}


/**
 * Interface para a visualização do professor (ex: /turma/{id}/atividades/criador)
 * Pode incluir informações sobre quem respondeu.
 */
export interface AtividadeProfessor extends AtividadeBasica {
  usuariosResponderam: PerfilUsuario[]; // Lista de usuários que responderam
  totalMembros: number
  // Adicionar outros campos específicos da visão do professor, se houver
}

// --- Tipos de Correção/Feedback ---

/**
 * Interface para correções/feedbacks (ex: /turma/{id}/atividades/feedbacks)
 */
export interface Correcao {
  id: string;
  visto: boolean;
  feedback: string;
  data: string; // ISO 8601 string
  // Referência simplificada à atividade original
  atividade: Pick<AtividadeBasica, 'id' | 'titulo' | 'tipoAtividade'>;
}

// --- Tipos para Respostas de API (mantidos como estavam) ---

export interface GetTurmasCriadasResponse {
  documentos: TurmaCriadaProfessor[];
  paginacao: Paginacao;
}

export interface GetTurmasMatriculadasResponse {
  documentos: TurmaMatriculadaAluno[];
  paginacao: Paginacao;
}

// O tipo de retorno para getAtividadesByTurma já usa AtividadeBasica[] implicitamente
export interface GetAtividadesByTurmaResponse extends Array<AtividadeBasica> { }

// O tipo de retorno para getCorrecoesByTurma já usa Correcao[] implicitamente
export interface GetCorrecoesByTurma extends Array<Correcao> { }

export interface GetAtividadesRecentesReponse {
  id: string;
  titulo: string;
  descricao: string;
  respostas: Number; // Verificar se é Number ou number
  totalAlunos: Number; // Verificar se é Number ou number
  createdAt: string; // API retorna string ISO 8601
}

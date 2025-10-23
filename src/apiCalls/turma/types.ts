import { Paginacao, PerfilUsuario } from "../types";

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

export interface AtividadeBasica {
  id: string;
  titulo: string;
  tipoAtividade: string;
  descricao: string;
  status: string;
  dataLimite: string;
}

export interface Correcao {
  id: string;
  visto: boolean;
  feedback: string;
  data: string;
  atividade: Pick<AtividadeBasica, 'id' | 'titulo' | 'tipoAtividade'>;
}

export interface GetTurmasCriadasResponse {
  documentos: TurmaCriadaProfessor[];
  paginacao: Paginacao;
}

export interface GetTurmasMatriculadasResponse {
  documentos: TurmaMatriculadaAluno[];
  paginacao: Paginacao;
}

export interface GetAtividadesByTurmaResponse extends Array<AtividadeBasica> {}

export interface GetCorrecoesByTurma extends Array<Correcao> {}

export interface GetAtividadesRecentesReponse {
  id: string;
  titulo: string;
  descricao: string;
  respostas: Number;
  totalAlunos: Number;
  createdAt: Date;
}
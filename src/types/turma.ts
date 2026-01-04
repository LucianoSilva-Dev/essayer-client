// TypeScript types based on the API schema

import { PerfilUsuario } from "@/types/types"

export interface Turma {
  id: string
  nome: string
  descricao: string
  professorId: string
  criador: PerfilUsuario
  criadoEm: string
  atualizadoEm: string
}

export interface TurmaDetalhada extends Turma {
  membros: PerfilUsuario[];
  
}

export interface Tarefa {
  dataLimite: string
  titulo: string
  status: string
  id: string
  turmaId: string
  tema: string
  descricao: string
  dataEntrega: string
  criadoEm: string
  atualizadoEm: string
}

export interface Envio {
  id: string
  tarefaId: string
  alunoId: string
  conteudo: string
  tempoGasto: number // in minutes
  criadoEm: string
  atualizadoEm: string
}

export interface Correcao {
  id: string,
  visto: boolean,
  titulo: string,
  descricao: string,
  criadoEm: string,
  feedbackProfessor: string,
}

// Extended types with computed data
export interface TarefaWithStats extends Tarefa {
  totalEnvios: number
  totalAlunos: number
  envios: Envio[]
}



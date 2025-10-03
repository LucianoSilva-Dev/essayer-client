// TypeScript types based on the API schema

export type UserType = "PROFESSOR" | "ALUNO"

export interface User {
  id: string
  nome: string
  email: string
  tipo: UserType
  criadoEm: string
  atualizadoEm: string
}

export interface Turma {
  id: string
  nome: string
  descricao: string
  professorId: string
  criadoEm: string
  atualizadoEm: string
}

export interface Tarefa {
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

export interface Integrante {
  id: string
  nome: string
  email: string
  tipo: UserType
}

// Extended types with computed data
export interface TarefaWithStats extends Tarefa {
  totalEnvios: number
  totalAlunos: number
  envios: Envio[]
}

export interface EnvioWithAluno extends Envio {
  aluno: User
}

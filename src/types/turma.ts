// TypeScript types based on the API schema

import { PerfilUsuario } from "@/apiCalls/types"

export interface Turma {
  id: string
  nome: string

  professorId: string
  criador: PerfilUsuario
  criadoEm: string
  atualizadoEm: string
}

export interface TurmaDetalhada extends Turma {
  membros: PerfilUsuario[];
  
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



// Extended types with computed data
export interface TarefaWithStats extends Tarefa {
  totalEnvios: number
  totalAlunos: number
  envios: Envio[]
}



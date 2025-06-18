export interface RepertorioStatus {
  id: string
  status: "pendente" | "aprovado" | "recusado"
  dataSubmissao: string
  dataRevisao?: string
  feedbackAdmin?: string
  revisorId?: string
}

export interface RepertorioPendente {
  id: string
  titulo: string
  conteudo: string
  fonte: string
  categoria: string
  tags: string[]
  autorId: string
  autorNome: string
  autorEmail: string
  dataSubmissao: string
  status: RepertorioStatus
}

export interface ProfessorPendente {
  id: string
  nome: string
  sobrenome: string
  email: string
  curriculoLattes: string
  instituicao?: string
  areaAtuacao?: string
  dataSubmissao: string
  status: "pendente" | "aprovado" | "recusado"
  feedbackAdmin?: string
}

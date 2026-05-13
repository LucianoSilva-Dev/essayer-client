export interface BaseUser {
  nome: string
  sobrenome: string
  email: string
  senha: string
  aceitouTermos: boolean
}

export interface Aluno extends BaseUser {
  tipo: "student"
  escola?: string
  serie?: string
}

export interface Professor extends BaseUser {
  tipo: "professor"
  curriculoLattes: string
  instituicao?: string
  areaAtuacao?: string
}

export type UserRegistration = Aluno | Professor

export type UserType = "student" | "professor"


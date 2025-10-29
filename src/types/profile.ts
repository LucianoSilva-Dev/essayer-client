export interface BaseProfile {
  id: string
  nome: string
  email: string
  avatar?: string
}

export interface AlunoProfile extends BaseProfile {
  tipo: "aluno"
}

export interface ProfessorProfile extends BaseProfile {
  tipo: "professor"
  curriculoLattes?: string
}

export interface AdminProfile extends BaseProfile {
  tipo: "admin"
}

export type UserProfile = AlunoProfile | ProfessorProfile | AdminProfile

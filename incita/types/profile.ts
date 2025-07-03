export interface BaseProfile {
  id: string
  nome: string
  sobrenome?: string
  email: string
  avatar?: string
  bio?: string
  dataCadastro: string
  ultimoAcesso?: string
}

export interface AlunoProfile extends BaseProfile {
  tipo: "aluno"
  escola?: string
  serie?: string
  nivel?: "iniciante" | "intermediario" | "avancado"
  estatisticas?: {
    repertoriosCriados: number
    repertoriosFavoritos: number
    citacoesCriadas: number
    pontuacao: number
    redacoesEscritas: number
  }
  conquistas?: string[]
  metasMensais?: {
    repertorios: number
    redacoes: number
  }
}

export interface ProfessorProfile extends BaseProfile {
  tipo: "professor"
  curriculoLattes?: string
  instituicao?: string
  areaAtuacao?: string
  titulacao?: "graduacao" | "especializacao" | "mestrado" | "doutorado" | "pos-doutorado"
  experiencia?: number // anos
  estatisticas?: {
    repertoriosCompartilhados: number
    alunosOrientados: number
    materiaisPublicados: number
    avaliacoes: number
    notaMedia: number
  }
  especialidades?: string[]
  disponibilidade?: {
    orientacao: boolean
    consultoria: boolean
    aulas: boolean
  }
}

export interface AdminProfile extends BaseProfile {
  tipo: "admin"
}

export type UserProfile = AlunoProfile | ProfessorProfile | AdminProfile

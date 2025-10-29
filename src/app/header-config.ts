import { HeaderConfig } from './header-types'

export const headerConfig: Record<string, HeaderConfig> = {
  // Rotas estáticas
  '/main': {
    currentPage: 'Repertórios',
    backPage: undefined
  },
  '/profile': {
    currentPage: 'Meu Perfil',
    backPage: '/main'
  },
  '/profile/editar': {
    currentPage: 'Editar Perfil',
    backPage: '/profile'
  },
  '/adicionar': {
    currentPage: 'Adicionar Repertório',
    backPage: '/main'
  },
  '/admin': {
    currentPage: 'Admin',
    backPage: '/main'
  },
  '/turmas_professor': {
    currentPage: 'Minhas Turmas',
    backPage: undefined
  },
  '/turmas_aluno': {
    currentPage: 'Minhas Turmas',
    backPage: undefined
  },
  '/criar_turma': {
    currentPage: 'Criar Turma',
    backPage: '/turmas_professor'
  },
  '/entrar_turma': {
    currentPage: 'Entrar em Turma',
    backPage: '/turmas_aluno'
  },
  '/faq': {
    currentPage: 'FAQ',
    backPage: '/main'
  },

  // Rotas dinâmicas
  '/repertorio/[id]': {
    currentPage: (params: Record<string, string>, repertorioData?: any) =>
      repertorioData?.titulo || 'Repertório',
    backPage: '/main',
    dynamicData: true
  },
  '/repertorio/[id]/editar': {
    currentPage: 'Editar Repertório',
    description: (params: Record<string, string>, repertorioData?: any) =>
      repertorioData?.titulo || 'Carregando...',
    backPage: (params: Record<string, string>) => `/repertorio/${params.id}`,
    dynamicData: true
  },
  '/turma_aberta_prof/[turmaId]': {
    currentPage: (params: Record<string, string>, turmaData?: any) =>
      turmaData?.nome || 'Turma',
    description: (params: Record<string, string>, turmaData?: any) => {
      if (!turmaData) return 'Carregando...'

      const escola = turmaData?.escola
      const criador = turmaData?.criador?.nome

      // Se tiver escola, mostra escola + criador
      if (escola) {
        return criador ? `${escola} • Criada por ${criador}` : escola
      }

      // Se não tiver escola, mostra apenas criador
      return criador ? `Criada por ${criador}` : 'Turma'
    },
    backPage: '/turmas_professor',
    dynamicData: true
  },
  '/turma_aberta_aluno/[turmaId]': {
    currentPage: (params: Record<string, string>, turmaData?: any) =>
      turmaData?.nome || 'Turma',
    description: (params: Record<string, string>, turmaData?: any) => {
      if (!turmaData) return 'Carregando...'

      const escola = turmaData?.escola
      const criador = turmaData?.criador?.nome

      // Se tiver escola, mostra escola + criador
      if (escola) {
        return criador ? `${escola} • Professor: ${criador}` : escola
      }

      // Se não tiver escola, mostra apenas criador
      return criador ? `Professor: ${criador}` : 'Turma'
    },
    backPage: '/turmas_aluno',
    dynamicData: true
  },
}
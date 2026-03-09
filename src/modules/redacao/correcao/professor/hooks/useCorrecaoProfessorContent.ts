'use client'

import { useEffect, useState } from 'react'
import { RedacaoLivreDoc } from '@/lib/apiCalls/redacao-livre/types'
import { getCorrecaoRedacao } from '@/lib/apiCalls/tarefas'
import { useAuth } from '@/shared/contexts/auth-context'
import { mockRedacaoComCorrecaoProfessor } from '../../constants/mockCorrecaoProfessor'

interface UseCorrecaoProfessorPageProps {
  id: string
  alunoId?: string
  initialData?: RedacaoLivreDoc
}

export function useCorrecaoProfessorContent({
  id,
  alunoId,
  initialData,
}: UseCorrecaoProfessorPageProps) {
  const { userData } = useAuth()

  const [data, setData] = useState<RedacaoLivreDoc | null>(initialData || null)
  const [loading, setLoading] = useState(!initialData)

  // MOCK TOGGLE
  const [usePendingMock, setUsePendingMock] = useState(false)

  const [activeCompetenciaId, setActiveCompetenciaId] = useState('c1')
  const [feedback, setFeedback] = useState<string>('')

  useEffect(() => {
    if (initialData) {
      setData(initialData)
      setLoading(false)
      return
    }

    if (id === 'mock-id') {
      const mockData = { ...mockRedacaoComCorrecaoProfessor }

      if (
        usePendingMock &&
        mockData.correcoesIA &&
        mockData.correcoesIA.length > 0
      ) {
        mockData.correcoesIA = [
          {
            ...mockData.correcoesIA[0],
            status: 'pendente',
            notaC1: 0,
            notaC2: 0,
            notaC3: 0,
            notaC4: 0,
            notaC5: 0,
            feedbackC1: '',
            feedbackC2: '',
            feedbackC3: '',
            feedbackC4: '',
            feedbackC5: '',
          },
        ]
      }

      setData(mockData)
      setLoading(false)
      return
    }

    const fetchData = async () => {
      try {
        const targetAlunoId = alunoId || userData?.id

        if (!targetAlunoId) {
          console.error('Aluno ID não encontrado')
          return
        }

        const response = await getCorrecaoRedacao(id, targetAlunoId)

        const isPendente =
          !response.feedback ||
          (!response.feedback.notaC1 && !response.feedback.feedbackC1)

        const adaptedData: RedacaoLivreDoc = {
          id: response.id,
          tema: response.tema,
          texto: response.texto,
          finalizada: true,
          updatedAt: new Date(),
          correcoesIA: [
            {
              id: response.id,
              texto: response.texto,
              tema: response.tema,
              status: isPendente ? 'pendente' : 'finalizada',
              createdAt: new Date(),
              notaC1: response.feedback?.notaC1 || 0,
              notaC2: response.feedback?.notaC2 || 0,
              notaC3: response.feedback?.notaC3 || 0,
              notaC4: response.feedback?.notaC4 || 0,
              notaC5: response.feedback?.notaC5 || 0,
              feedbackC1: response.feedback?.feedbackC1 || '',
              feedbackC2: response.feedback?.feedbackC2 || '',
              feedbackC3: response.feedback?.feedbackC3 || '',
              feedbackC4: response.feedback?.feedbackC4 || '',
              feedbackC5: response.feedback?.feedbackC5 || '',
            },
          ],
        }

        setData(adaptedData)
      } catch (error) {
        console.error('Erro ao buscar redação:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [id, alunoId, initialData, usePendingMock, userData])

  const correcao = data?.correcoesIA ? data.correcoesIA[0] : null

  useEffect(() => {
    if (!correcao) return

    switch (activeCompetenciaId) {
      case 'c1':
        setFeedback(correcao.feedbackC1 || '')
        break
      case 'c2':
        setFeedback(correcao.feedbackC2 || '')
        break
      case 'c3':
        setFeedback(correcao.feedbackC3 || '')
        break
      case 'c4':
        setFeedback(correcao.feedbackC4 || '')
        break
      case 'c5':
        setFeedback(correcao.feedbackC5 || '')
        break
      default:
        setFeedback('')
    }
  }, [activeCompetenciaId, correcao])

  return {
    data,
    correcao,
    loading,

    activeCompetenciaId,
    feedback,

    usePendingMock,
    setUsePendingMock,
    setActiveCompetenciaId,
  }
}

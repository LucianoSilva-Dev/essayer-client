'use client'

import { useEffect, useState } from 'react'
import { CorrecaoHeader } from '../correcao/CorrecaoHeader'
import { RedacaoOriginalCard } from '../correcao/RedacaoOriginalCard'
import { AnaliseFeedback } from '../correcao/AnaliseFeedback'
import { CompetenciasProfessorSection } from './CompetenciasProfessorSection'
import { mockRedacaoComCorrecaoProfessor } from './mocks'
import { CorrecaoIA, RedacaoLivreDoc } from '@/apiCalls/redacao-livre/types'
import { getAtividadeRedacaoDetalhes } from '@/apiCalls/tarefas'

interface CorrecaoProfessorPageProps {
  id: string
  initialData?: RedacaoLivreDoc
}

export function CorrecaoProfessorPage({ id, initialData }: CorrecaoProfessorPageProps) {
  const [data, setData] = useState<RedacaoLivreDoc | null>(initialData || null)
  const [loading, setLoading] = useState(!initialData)
  
  // MOCK TOGGLE: Altere para 'true' para ver o estado pendente
  const [usePendingMock, setUsePendingMock] = useState(false)

  useEffect(() => {
    if (initialData) {
        setData(initialData)
        setLoading(false)
        return
    }

    // Se for o ID do mock, usa o mock
    if (id === 'mock-id') {
        const mockData = { ...mockRedacaoComCorrecaoProfessor }
        if (usePendingMock && mockData.correcoesIA && mockData.correcoesIA.length > 0) {
            mockData.correcoesIA = [{
                ...mockData.correcoesIA[0],
                status: 'pendente',
                notaC1: 0, notaC2: 0, notaC3: 0, notaC4: 0, notaC5: 0,
                feedbackC1: "", feedbackC2: "", feedbackC3: "", feedbackC4: "", feedbackC5: ""
            }]
        }
        setData(mockData)
        setLoading(false)
        return
    }

    // Fetch real data
    const fetchData = async () => {
        try {
            const response = await getAtividadeRedacaoDetalhes(id)
            // Adapter: A resposta da API de tarefas pode precisar de adaptação para RedacaoLivreDoc
            // Por enquanto, assumimos que a estrutura é compatível ou que o componente espera RedacaoLivreDoc
            // Se getAtividadeRedacaoDetalhes retornar algo diferente, precisaremos adaptar aqui.
            // Verificando types.ts, GetRedacaoDetalhesResponse parece compatível ou precisaremos de cast.
            setData(response as unknown as RedacaoLivreDoc) 
        } catch (error) {
            console.error("Erro ao buscar redação:", error)
        } finally {
            setLoading(false)
        }
    }

    fetchData()
  }, [id, initialData, usePendingMock])

  const correcao = data?.correcoesIA ? data.correcoesIA[0] : null

  const [activeCompetenciaId, setActiveCompetenciaId] = useState('c1')
  const [feedback, setFeedback] = useState<string>("")

  useEffect(() => {
    if (!correcao) return

    switch (activeCompetenciaId) {
      case 'c1':
        setFeedback(correcao.feedbackC1 || "")
        break
      case 'c2':
        setFeedback(correcao.feedbackC2 || "")
        break
      case 'c3':
        setFeedback(correcao.feedbackC3 || "")
        break
      case 'c4':
        setFeedback(correcao.feedbackC4 || "")
        break
      case 'c5':
        setFeedback(correcao.feedbackC5 || "")
        break
      default:
        setFeedback("")
    }
  }, [activeCompetenciaId, correcao])

  if (loading) return <div className="p-10 text-center">Carregando...</div>
  if (!data || !correcao) return <div className="p-10 text-center">Redação não encontrada.</div>

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      {/* Botão para testar o mock (apenas em dev/mock) */}
      {id === 'mock-id' && (
        <button 
            onClick={() => setUsePendingMock(!usePendingMock)}
            className="fixed bottom-4 right-4 z-50 bg-gray-800 text-white px-4 py-2 rounded-full text-xs opacity-50 hover:opacity-100 transition-opacity"
        >
            {usePendingMock ? 'Ver Corrigida' : 'Ver Pendente'}
        </button>
      )}

      <CorrecaoHeader />

      <RedacaoOriginalCard 
        idRedacao={data.id || ''} 
        idCorrecao={correcao.id || ''} 
        textoRedacao={correcao.texto || ""} 
        temaRedacao={data.tema || ""} 
        showActions={false}
      />

      <CompetenciasProfessorSection
        correcao={correcao}
        activeCompetenciaId={activeCompetenciaId}
        onSelectCompetencia={setActiveCompetenciaId}
      />

      {feedback && (
        <AnaliseFeedback
          title={`Análise do professor sobre a competência ${activeCompetenciaId.replace('c', '')}`}
          feedback={feedback}
        />
      )}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { CorrecaoHeader } from '../correcao/CorrecaoHeader'
import { RedacaoOriginalCard } from '../correcao/RedacaoOriginalCard'
import { AnaliseFeedback } from '../correcao/AnaliseFeedback'
import { CompetenciasProfessorSection } from './CompetenciasProfessorSection'
import { mockRedacaoComCorrecaoProfessor } from './mocks'
import { CorrecaoIA } from '@/apiCalls/redacao-livre/types'

export function CorrecaoProfessorPage({ id }: { id: string }) {
  // Em um cenário real, buscaríamos os dados da API usando o ID
  // const [data, setData] = useState<RedacaoLivreDoc | null>(null)
  const data = mockRedacaoComCorrecaoProfessor
  const correcao = data.correcoesIA ? data.correcoesIA[0] : null

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

  if (!correcao) return <div>Carregando...</div>

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
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

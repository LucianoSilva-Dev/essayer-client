'use client'

import { useEffect, useState } from 'react'
import { CorrecaoHeader } from './CorrecaoHeader'
import { RedacaoOriginalCard } from './RedacaoOriginalCard'
import { CompetenciasSection } from './CompetenciasSection'
import { AnaliseFeedback } from './AnaliseFeedback'

// Imports da API e Tipos
import { CorrecaoIA, RedacaoLivreDoc } from '@/apiCalls/redacao-livre/types'
import { getRedacaoLivre } from '@/apiCalls/redacao-livre'

export function CorrecaoRedacaoPage({ id }: { id: string }) {
  const competencias = ['c1', 'c2', 'c3', 'c4', 'c5']

  const [data, setData] = useState<RedacaoLivreDoc | null>(null)
  
  // Estado da competência ativa (C1, C2, etc)
  const [activeCompetenciaId, setActiveCompetenciaId] = useState(competencias[0])
  
  // NOVO: Estado para saber QUAL versão da correção o usuário escolheu no dropdown
  const [correcaoAtual, setCorrecaoAtual] = useState<CorrecaoIA | null>(null)
  
  const [feedback, setFeedback] = useState<string>("")

  // 1. Busca os dados iniciais na API
  useEffect(() => {
    (async () => {
      const response = await getRedacaoLivre(id)
      setData(response)
      
      // Assim que carregar, define a correção mais recente (index 0) como a atual
      if (response.correcoesIA && response.correcoesIA.length > 0) {
        setCorrecaoAtual(response.correcoesIA[0])
      }
    })()
  }, [id])

  // 2. Atualiza o texto da IA sempre que a Competência OU a Correção Atual mudar
  useEffect(() => {
    // Se ainda não tiver uma correção selecionada, não faz nada
    if (!correcaoAtual) return

    switch (activeCompetenciaId) {
      case 'c1':
        setFeedback(correcaoAtual.feedbackC1 || "")
        break
      case 'c2':
        setFeedback(correcaoAtual.feedbackC2 || "")
        break
      case 'c3':
        setFeedback(correcaoAtual.feedbackC3 || "")
        break
      case 'c4':
        setFeedback(correcaoAtual.feedbackC4 || "")
        break
      case 'c5':
        setFeedback(correcaoAtual.feedbackC5 || "")
        break
      default:
        setFeedback("")
    }
  }, [activeCompetenciaId, correcaoAtual]) // <--- O segredo está aqui: dependência 'correcaoAtual'

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <CorrecaoHeader />

      <RedacaoOriginalCard 
        idRedacao={data?.id || ''} 
        // Passamos o ID e Texto da correção ATUAL selecionada no dropdown
        idCorrecao={correcaoAtual?.id || ''} 
        textoRedacao={correcaoAtual?.texto || ""} 
        temaRedacao={data?.tema || ""} 
      />

      <CompetenciasSection
        // Passamos a lista completa para o dropdown montar o histórico
        correcoes={data?.correcoesIA || []}
        
        activeCompetenciaId={activeCompetenciaId}
        onSelectCompetencia={setActiveCompetenciaId}
        
        // Conexão entre Pai e Filho: O pai manda a atual, e o filho avisa quando mudar
        correcaoSelecionada={correcaoAtual}
        onTrocarCorrecao={setCorrecaoAtual}
      />

      {feedback && (
        <AnaliseFeedback
          feedback={feedback}
        />
      )}
    </div>
  )
}
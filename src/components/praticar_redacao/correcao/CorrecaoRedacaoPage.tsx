'use client'

import { useEffect, useState } from 'react'
import { CorrecaoHeader } from './CorrecaoHeader'
import { RedacaoOriginalCard } from './RedacaoOriginalCard'
import { CompetenciasSection } from './CompetenciasSection'
import { AnaliseInteligenciaArtificial } from './AnaliseInteligenciaArtificial'

// Importamos os dados mockados
import { mockCorrecao } from './mock'
import { CorrecaoIA, RedacaoLivreDoc } from '@/apiCalls/redacao-livre/types'
import { getRedacaoLivre } from '@/apiCalls/redacao-livre'

// Futuramente, você receberá 'redacaoID' como prop ou via useParams
// e fará um fetch para buscar estes dados.
//
// Ex:
// import { useQuery } from 'react-query'
// import { getCorrecao } from '@/apiCalls/correcoes'
// import { useParams } from 'next/navigation'
//
// export function CorrecaoRedacaoPage() {
//   const params = useParams()
//   const { data: correcao, isLoading } = useQuery(
//     ['correcao', params.redacaoID],
//     () => getCorrecao(params.redacaoID as string)
//   )
//
//   if (isLoading || !correcao) {
//     return <p>Carregando correção...</p>
//   }
//
// ... resto do componente ...

export function CorrecaoRedacaoPage({ id }: { id: string }) {
  const competencias = ['c1', 'c2', 'c3', 'c4', 'c5']

  const [data, setData] = useState<RedacaoLivreDoc | null>(null)
  const [activeCompetenciaId, setActiveCompetenciaId] = useState(competencias[0])
  const [feedback, setFeedback] = useState<string>("")

  useEffect(() => {
    switch (activeCompetenciaId) {
      case 'c1':
        setFeedback(data?.correcoesIA[0].feedbackC1 || "")
        break
      case 'c2':
        setFeedback(data?.correcoesIA[0].feedbackC2 || "")
        break
      case 'c3':
        setFeedback(data?.correcoesIA[0].feedbackC3 || "")
        break
      case 'c4':
        setFeedback(data?.correcoesIA[0].feedbackC4 || "")
        break
      case 'c5':
        setFeedback(data?.correcoesIA[0].feedbackC5 || "")
        break
    }
  }, [activeCompetenciaId])

  useEffect(() => {
    (async () => {
      const response = await getRedacaoLivre(id)
      setData(response)
      setFeedback(response.correcoesIA[0].feedbackC1)
    })()
  }, [])

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <CorrecaoHeader />

      <RedacaoOriginalCard textoRedacao={data?.correcoesIA[0].texto || ""} temaRedacao={data?.tema || ""} />

      <CompetenciasSection
        correcoes={data?.correcoesIA || []}
        activeCompetenciaId={activeCompetenciaId}
        onSelectCompetencia={setActiveCompetenciaId}
      />

      {feedback && (
        <AnaliseInteligenciaArtificial
          feedback={feedback}
        />
      )}
    </div>
  )
}
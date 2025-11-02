'use client'

import { useState } from 'react'
import { CorrecaoHeader } from './CorrecaoHeader'
import { RedacaoOriginalCard } from './RedacaoOriginalCard'
import { CompetenciasSection } from './CompetenciasSection'
import { AnaliseInteligenciaArtificial } from './AnaliseInteligenciaArtificial'

// Importamos os dados mockados
import { mockCorrecao } from './mock'

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

export function CorrecaoRedacaoPage() {
  // Por enquanto, usamos o mock
  const correcao = mockCorrecao

  const [activeCompetenciaId, setActiveCompetenciaId] = useState(
    correcao.competencias[0].id,
  )

  const competenciaSelecionada = correcao.competencias.find(
    (c) => c.id === activeCompetenciaId,
  )

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <CorrecaoHeader />

      <RedacaoOriginalCard textoRedacao={correcao.textoRedacao} />

      <CompetenciasSection
        competencias={correcao.competencias}
        notaTotal={correcao.notaTotal}
        totalCorrecoes={correcao.totalCorrecoes}
        activeCompetenciaId={activeCompetenciaId}
        onSelectCompetencia={setActiveCompetenciaId}
      />

      {competenciaSelecionada && (
        <AnaliseInteligenciaArtificial
          competenciaSelecionada={competenciaSelecionada}
        />
      )}
    </div>
  )
}
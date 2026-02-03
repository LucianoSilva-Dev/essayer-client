'use client'

import { CorrecaoHeader } from '../../../correcao-redacao/components/correcao-header'
import { AnaliseFeedback } from '../../../correcao-redacao/components/analise-feedback'
import { CompetenciasProfessorSection } from '../competencias-section'
import { RedacaoOriginalCard } from '../../../correcao-redacao/components/redacao-original-card'
import { useCorrecaoProfessorContent } from '../../hooks/useCorrecaoProfessorContent'

interface CorrecaoProfessorPageProps {
  id: string
  alunoId?: string
  initialData?: any
}

export function CorrecaoProfessorPage({
  id,
  alunoId,
  initialData,
}: CorrecaoProfessorPageProps) {
  const {
    data,
    correcao,
    loading,

    activeCompetenciaId,
    feedback,

    usePendingMock,
    setUsePendingMock,
    setActiveCompetenciaId,
  } = useCorrecaoProfessorContent({ id, alunoId, initialData })

  if (loading)
    return <div className="p-10 text-center">Carregando...</div>

  if (!data || !correcao)
    return (
      <div className="p-10 text-center">Redação não encontrada.</div>
    )

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
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
        textoRedacao={correcao.texto || ''}
        temaRedacao={data.tema || ''}
        showActions={false}
        onCorrectAgain={async () => {}}
        isCorrecting={false}
      />

      <CompetenciasProfessorSection
        correcao={correcao}
        activeCompetenciaId={activeCompetenciaId}
        onSelectCompetencia={setActiveCompetenciaId}
      />

      {feedback && correcao?.status !== 'pendente' && (
        <AnaliseFeedback
          title={`Análise do professor sobre a competência ${activeCompetenciaId.replace(
            'c',
            ''
          )}`}
          feedback={feedback}
        />
      )}
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { CorrecaoHeader } from '../correcao/CorrecaoHeader'
import { RedacaoOriginalCard } from '../correcao/RedacaoOriginalCard'
import { CompetenciasProfessorEditorSection } from './CompetenciasProfessorEditorSection'
import { mockRedacaoComCorrecaoProfessor } from './mocks'
import { CorrecaoIA } from '@/apiCalls/redacao-livre/types'
import { ArrowUp } from 'lucide-react'

export function EditorCorrecaoProfessorPage({ id }: { id: string }) {
  // Inicializamos com os dados do mock para edição
  const [correcao, setCorrecao] = useState<CorrecaoIA>(mockRedacaoComCorrecaoProfessor.correcoesIA![0])
  const [activeCompetenciaId, setActiveCompetenciaId] = useState('c1')
  const [feedbackAtual, setFeedbackAtual] = useState<string>("")

  // Atualiza o feedback exibido no textarea quando muda a competência
  useEffect(() => {
    switch (activeCompetenciaId) {
      case 'c1': setFeedbackAtual(correcao.feedbackC1 || ""); break;
      case 'c2': setFeedbackAtual(correcao.feedbackC2 || ""); break;
      case 'c3': setFeedbackAtual(correcao.feedbackC3 || ""); break;
      case 'c4': setFeedbackAtual(correcao.feedbackC4 || ""); break;
      case 'c5': setFeedbackAtual(correcao.feedbackC5 || ""); break;
    }
  }, [activeCompetenciaId, correcao]) // Depende de 'correcao' para atualizar se a nota mudar (embora feedback seja separado)

  const handleUpdateNota = (competenciaId: string, novaNota: number) => {
    setCorrecao(prev => {
        const key = `nota${competenciaId.toUpperCase()}` as keyof CorrecaoIA
        return { ...prev, [key]: novaNota }
    })
  }

  const handleUpdateFeedback = (novoFeedback: string) => {
    setFeedbackAtual(novoFeedback)
    setCorrecao(prev => {
        const key = `feedback${activeCompetenciaId.toUpperCase()}` as keyof CorrecaoIA
        return { ...prev, [key]: novoFeedback }
    })
  }

  const handleSalvar = () => {
    console.log("Salvando correção:", correcao)
    alert("Correção salva com sucesso! (Mock)")
  }

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <CorrecaoHeader />
        <button 
            onClick={handleSalvar}
            className="bg-[#075F70] hover:bg-[#064e5c] text-white px-6 py-2.5 rounded-full font-bold transition-colors shadow-sm"
        >
            Enviar correção
        </button>
      </div>

      <RedacaoOriginalCard 
        idRedacao={mockRedacaoComCorrecaoProfessor.id || ''} 
        idCorrecao={correcao.id || ''} 
        textoRedacao={correcao.texto || ""} 
        temaRedacao={mockRedacaoComCorrecaoProfessor.tema || ""} 
        showActions={false}
      />

      <CompetenciasProfessorEditorSection
        correcao={correcao}
        activeCompetenciaId={activeCompetenciaId}
        onSelectCompetencia={setActiveCompetenciaId}
        onUpdateNota={handleUpdateNota}
      />

      <div className="bg-white p-6 md:p-8 rounded-[48px] shadow-sm border border-gray-200 mt-6 relative">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          Análise do professor sobre a competência {activeCompetenciaId.replace('c', '')}
        </h2>
        
        <textarea
            value={feedbackAtual}
            onChange={(e) => handleUpdateFeedback(e.target.value)}
            placeholder={`Insira a análise sobre a competência ${activeCompetenciaId.replace('c', '')} aqui...`}
            className="w-full min-h-[150px] p-4 rounded-2xl bg-gray-50 border border-gray-200 focus:border-[#075F70] focus:ring-2 focus:ring-[#075F70]/20 outline-none resize-y text-gray-700 leading-relaxed"
        />

        <div className="absolute bottom-8 right-8">
            <button 
                onClick={handleSalvar}
                className="bg-[#075F70] text-white p-3 rounded-full hover:bg-[#064e5c] transition-colors shadow-lg"
                title="Salvar comentário"
            >
                <ArrowUp size={20} />
            </button>
        </div>
      </div>
    </div>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { CorrecaoHeader } from '../../../correcao-redacao/components/correcao-header'
import { CompetenciasProfessorEditorSection } from '../../../professor/components/editor-section'
import { mockRedacaoComCorrecaoProfessor } from '../../../constants/mockCorrecaoProfessor'
import { CorrecaoIA, RedacaoLivreDoc } from '@/lib/apiCalls/redacao-livre/types'
import { ArrowUp, Loader2 } from 'lucide-react'
import { getCorrecaoRedacao, updateFeedbackResposta } from '@/lib/apiCalls/tarefas'
import { useAuth } from '@/shared/contexts/auth-context'
import { UpdateFeedbackBody } from '@/lib/apiCalls/tarefas/types'
import { toast } from 'react-toastify'
import { RedacaoOriginalCard } from '../../../correcao-redacao/components/redacao-original-card'

interface EditorCorrecaoProfessorPageProps {
  id: string
  alunoId?: string
  initialData?: RedacaoLivreDoc
}

export function EditorCorrecaoProfessorPage({ id, alunoId, initialData }: EditorCorrecaoProfessorPageProps) {
  const { userData } = useAuth()
  const [data, setData] = useState<RedacaoLivreDoc | null>(initialData || null)
  const [correcao, setCorrecao] = useState<CorrecaoIA | null>(initialData?.correcoesIA?.[0] || null)
  const [loading, setLoading] = useState(!initialData)
  const [saving, setSaving] = useState(false)

  const [activeCompetenciaId, setActiveCompetenciaId] = useState('c1')
  const [feedbackAtual, setFeedbackAtual] = useState<string>("")

  useEffect(() => {
    if (initialData) {
        setData(initialData)
        setCorrecao(initialData.correcoesIA?.[0] || null)
        setLoading(false)
        return
    }

    if (id === 'mock-id') {
        setData(mockRedacaoComCorrecaoProfessor)
        setCorrecao(mockRedacaoComCorrecaoProfessor.correcoesIA![0])
        setLoading(false)
        return
    }

    const fetchData = async () => {
        try {
            const targetAlunoId = alunoId || userData?.id
            
            if (!targetAlunoId) {
                console.error("Aluno ID não encontrado")
                return
            }

            const response = await getCorrecaoRedacao(id, targetAlunoId)
            
            // Adapter: Converte GetCorrecaoRedacaoResponse para RedacaoLivreDoc
            const adaptedData: RedacaoLivreDoc = {
                id: response.id,
                tema: response.tema,
                texto: response.texto,
                finalizada: true,
                updatedAt: new Date(),
                correcoesIA: [{
                    id: response.id, // ID da resposta/correção
                    texto: response.texto,
                    tema: response.tema,
                    status: 'finalizada',
                    createdAt: new Date(),
                    notaC1: response.feedback?.notaC1 || 0,
                    notaC2: response.feedback?.notaC2 || 0,
                    notaC3: response.feedback?.notaC3 || 0,
                    notaC4: response.feedback?.notaC4 || 0,
                    notaC5: response.feedback?.notaC5 || 0,
                    feedbackC1: response.feedback?.feedbackC1 || "",
                    feedbackC2: response.feedback?.feedbackC2 || "",
                    feedbackC3: response.feedback?.feedbackC3 || "",
                    feedbackC4: response.feedback?.feedbackC4 || "",
                    feedbackC5: response.feedback?.feedbackC5 || ""
                }]
            }

            setData(adaptedData)
            setCorrecao(adaptedData.correcoesIA[0])
        } catch (error) {
            console.error("Erro ao buscar redação:", error)
        } finally {
            setLoading(false)
        }
    }

    fetchData()
  }, [id, initialData, userData, alunoId])

  // Atualiza o feedback exibido no textarea quando muda a competência
  useEffect(() => {
    if (!correcao) return
    switch (activeCompetenciaId) {
      case 'c1': setFeedbackAtual(correcao.feedbackC1 || ""); break;
      case 'c2': setFeedbackAtual(correcao.feedbackC2 || ""); break;
      case 'c3': setFeedbackAtual(correcao.feedbackC3 || ""); break;
      case 'c4': setFeedbackAtual(correcao.feedbackC4 || ""); break;
      case 'c5': setFeedbackAtual(correcao.feedbackC5 || ""); break;
    }
  }, [activeCompetenciaId, correcao])

  const handleUpdateNota = (competenciaId: string, novaNota: number) => {
    setCorrecao(prev => {
        if (!prev) return null
        const key = `nota${competenciaId.toUpperCase()}` as keyof CorrecaoIA
        return { ...prev, [key]: novaNota }
    })
  }

  const handleUpdateFeedback = (novoFeedback: string) => {
    setFeedbackAtual(novoFeedback)
    setCorrecao(prev => {
        if (!prev) return null
        const key = `feedback${activeCompetenciaId.toUpperCase()}` as keyof CorrecaoIA
        return { ...prev, [key]: novoFeedback }
    })
  }

  const handleSalvar = async () => {
    if (!correcao) return

    setSaving(true)
    try {
        // Prepara o payload para a API
        const payload: UpdateFeedbackBody = {
            notaC1: correcao.notaC1,
            notaC2: correcao.notaC2,
            notaC3: correcao.notaC3,
            notaC4: correcao.notaC4,
            notaC5: correcao.notaC5,
            feedbackC1: correcao.feedbackC1,
            feedbackC2: correcao.feedbackC2,
            feedbackC3: correcao.feedbackC3,
            feedbackC4: correcao.feedbackC4,
            feedbackC5: correcao.feedbackC5,
        }

        if (id === 'mock-id') {
            console.log("Salvando correção (MOCK):", payload)
            toast.success("Correção salva com sucesso! (Mock)")
        } else {
            await updateFeedbackResposta(correcao.id, payload)
            toast.success("Correção enviada com sucesso!")
        }
    } catch (error) {
        console.error("Erro ao salvar correção:", error)
        toast.error("Erro ao salvar correção. Tente novamente.")
    } finally {
        setSaving(false)
    }
  }

  if (loading) return <div className="p-10 text-center">Carregando...</div>
  if (!data || !correcao) return <div className="p-10 text-center">Redação não encontrada.</div>

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <CorrecaoHeader />
        <button 
            onClick={handleSalvar}
            disabled={saving}
            className="bg-[#075F70] hover:bg-[#064e5c] text-white px-6 py-2.5 rounded-full font-bold transition-colors shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
            {saving && <Loader2 size={16} className="animate-spin" />}
            Enviar correção
        </button>
      </div>

      <RedacaoOriginalCard 
        idRedacao={data.id || ''} 
        idCorrecao={correcao.id || ''} 
        textoRedacao={correcao.texto || ""} 
        temaRedacao={data.tema || ""} 
        showActions={false}
        onCorrectAgain={async () => {}}
        isCorrecting={false}
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
                disabled={saving}
                className="bg-[#075F70] text-white p-3 rounded-full hover:bg-[#064e5c] transition-colors shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                title="Salvar comentário"
            >
                {saving ? <Loader2 size={20} className="animate-spin" /> : <ArrowUp size={20} />}
            </button>
        </div>
      </div>
    </div>
  )
}

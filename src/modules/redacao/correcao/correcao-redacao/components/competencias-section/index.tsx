'use client'

import { Competencia } from '@/types/correcao'
import { CompetenciaCard } from '../competencia-card'
import { ChevronLeft, ChevronRight, Loader2, RotateCcw, AlertCircle } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { CorrecaoIA } from '@/lib/apiCalls/redacao-livre/types'
import { CorrectionsTimelineDropdown } from '../correcao-dropdown'
import { retryCorrecaoRedacaoLivre } from '@/lib/apiCalls/redacao-livre'

interface CompetenciasSectionProps {
  correcoes: CorrecaoIA[]
  activeCompetenciaId: string
  onSelectCompetencia: (id: string) => void
  correcaoSelecionada: CorrecaoIA | null
  onTrocarCorrecao: (correcao: CorrecaoIA) => void
  redacaoId: string
}

export function CompetenciasSection({
  correcoes,
  activeCompetenciaId,
  onSelectCompetencia,
  correcaoSelecionada,
  onTrocarCorrecao,
  redacaoId
}: CompetenciasSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [notaTotal, setNotaTotal] = useState<number>(0)
  const [competencias, setCompetencias] = useState<Competencia[]>([])
  const [isRetrying, setIsRetrying] = useState(false)

  const handleRetry = async () => {
    if (!correcaoSelecionada) return
    try {
      setIsRetrying(true)
      await retryCorrecaoRedacaoLivre(redacaoId, correcaoSelecionada.id)
      window.location.reload()
    } catch (error) {
      console.error('Erro ao tentar novamente:', error)
    } finally {
      setIsRetrying(false)
    }
  }

  const somarNotas = (c: CorrecaoIA) => (c.notaC1||0)+(c.notaC2||0)+(c.notaC3||0)+(c.notaC4||0)+(c.notaC5||0)

  useEffect(() => {
    if (!correcaoSelecionada) return
    setNotaTotal(somarNotas(correcaoSelecionada))
    setCompetencias([
      { id: 'c1', nome: 'Competência 1', descricao: 'Domínio da norma padrão da língua portuguesa', nota: correcaoSelecionada.notaC1 || 0, analiseIA: correcaoSelecionada.feedbackC1 || "" },
      { id: 'c2', nome: 'Competência 2', descricao: 'Compreensão do tema e aplicação de repertório', nota: correcaoSelecionada.notaC2 || 0, analiseIA: correcaoSelecionada.feedbackC2 || "" },
      { id: 'c3', nome: 'Competência 3', descricao: 'Seleção e organização de argumentos', nota: correcaoSelecionada.notaC3 || 0, analiseIA: correcaoSelecionada.feedbackC3 || "" },
      { id: 'c4', nome: 'Competência 4', descricao: 'Coesão e Coerência', nota: correcaoSelecionada.notaC4 || 0, analiseIA: correcaoSelecionada.feedbackC4 || "" },
      { id: 'c5', nome: 'Competência 5', descricao: 'Proposta de Intervenção', nota: correcaoSelecionada.notaC5 || 0, analiseIA: correcaoSelecionada.feedbackC5 || "" }
    ])
  }, [correcaoSelecionada])

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -272 : 272, behavior: 'smooth' })
    }
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Correção das competências</h2>
        
        <div className="flex items-center space-x-3 relative z-50">
          <div className="bg-white px-4 py-2 rounded-[32px] shadow-sm border border-gray-200 text-sm flex items-center gap-2">
            <span className="text-gray-600">Nota total </span>
            <span className="font-bold text-gray-900">{notaTotal}/1000</span>
          </div>

          <CorrectionsTimelineDropdown 
            correcoes={correcoes}
            correcaoSelecionada={correcaoSelecionada}
            onTrocarCorrecao={onTrocarCorrecao}
            redacaoId={redacaoId}
          />
        </div>
      </div>

      <div className="relative group">
          {/* Overlay for Pending or Error Status */}
          {(correcaoSelecionada?.status === 'pendente' || correcaoSelecionada?.status === 'erro') && (
            <div className="absolute inset-0 z-40 flex items-center justify-center backdrop-blur-[1px] bg-white/10 rounded-xl overflow-hidden pointer-events-auto">
               {/* Tape Design */}
               <div 
                 className={`
                   w-[120%] py-6 transform -rotate-3 shadow-2xl flex items-center justify-center gap-4
                   ${correcaoSelecionada.status === 'pendente' 
                      ? 'text-white' 
                      : 'text-white'}
                 `}
                 style={{
                    background: correcaoSelecionada.status === 'pendente'
                        ? 'repeating-linear-gradient(45deg, brand-teal-darkcc, brand-teal-darkcc 30px, #054a57cc 30px, #054a57cc 60px)'
                        : 'repeating-linear-gradient(45deg, #dc2626cc, #dc2626cc 30px, #991b1bcc 30px, #991b1bcc 60px)',
                    boxShadow: '0 4px 15px rgba(0,0,0,0.2)'
                 }}
               >
                  {correcaoSelecionada.status === 'pendente' ? (
                    <>
                      <Loader2 className="animate-spin w-8 h-8 drop-shadow-md" />
                      <span className="text-2xl font-black uppercase tracking-widest drop-shadow-md">Correção em andamento</span>
                    </>
                  ) : (
                    <div className="flex items-center gap-6">
                      <div className="flex items-center gap-3">
                        <AlertCircle className="w-8 h-8 drop-shadow-md" />
                        <span className="text-2xl font-black uppercase tracking-widest drop-shadow-md">Erro na correção</span>
                      </div>
                      <button 
                        onClick={handleRetry}
                        disabled={isRetrying}
                        className="px-4 py-2 bg-white text-red-700 rounded-xl text-sm font-bold hover:bg-red-50 transition-colors flex items-center gap-2 shadow-lg"
                      >
                        {isRetrying ? <Loader2 size={16} className="animate-spin" /> : <RotateCcw size={16} />}
                        Tentar novamente
                      </button>
                    </div>
                  )}
               </div>
            </div>
          )}

          <div className={`transition-all duration-300 ${correcaoSelecionada?.status !== 'finalizada' ? 'opacity-50 pointer-events-none grayscale' : ''}`}>
             <div className="absolute inset-y-0 left-0 w-20 from-gray-50 via-gray-50/80 to-transparent bg-gradient-to-r z-10 pointer-events-none" aria-hidden="true"/>
                <button onClick={() => scroll('left')} className="absolute left-2 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 text-gray-700 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 disabled:opacity-30 cursor-pointer">
                    <ChevronLeft size={20} />
                </button>
                <div ref={scrollRef} className="flex space-x-5 overflow-x-auto py-8 px-4 no-scrollbar scroll-smooth">
                {competencias.map((comp) => (
                    <CompetenciaCard
                    key={comp.id}
                    competencia={comp}
                    isActive={comp.id === activeCompetenciaId}
                    onClick={() => onSelectCompetencia(comp.id)}
                    />
                ))}
                </div>
                <div className="absolute inset-y-0 right-0 w-20 from-gray-50 via-gray-50/80 to-transparent bg-gradient-to-l z-10 pointer-events-none" aria-hidden="true"/>
                <button onClick={() => scroll('right')} className="absolute right-2 top-1/2 -translate-y-1/2 z-20 p-3 bg-white/90 backdrop-blur-sm rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.08)] border border-gray-100 text-gray-700 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 disabled:opacity-30 cursor-pointer">
                <ChevronRight size={20} />
                </button>
          </div>
      </div>
    </div>
  )
}
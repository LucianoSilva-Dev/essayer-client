'use client'

import { Competencia } from '@/types/correcao'
import { CompetenciaCard } from '../correcao/CompetenciaCard'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { CorrecaoIA } from '@/apiCalls/redacao-livre/types'

interface CompetenciasProfessorSectionProps {
  correcao: CorrecaoIA
  activeCompetenciaId: string
  onSelectCompetencia: (id: string) => void
}

export function CompetenciasProfessorSection({
  correcao,
  activeCompetenciaId,
  onSelectCompetencia
}: CompetenciasProfessorSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [notaTotal, setNotaTotal] = useState<number>(0)
  const [competencias, setCompetencias] = useState<Competencia[]>([])

  const somarNotas = (c: CorrecaoIA) => (c.notaC1||0)+(c.notaC2||0)+(c.notaC3||0)+(c.notaC4||0)+(c.notaC5||0)

  useEffect(() => {
    if (!correcao) return
    setNotaTotal(somarNotas(correcao))
    setCompetencias([
      { id: 'c1', nome: 'Competência 1', descricao: 'Domínio da norma padrão da língua portuguesa', nota: correcao.notaC1 || 0, analiseIA: correcao.feedbackC1 || "" },
      { id: 'c2', nome: 'Competência 2', descricao: 'Compreensão do tema e aplicação de repertório', nota: correcao.notaC2 || 0, analiseIA: correcao.feedbackC2 || "" },
      { id: 'c3', nome: 'Competência 3', descricao: 'Seleção e organização de argumentos', nota: correcao.notaC3 || 0, analiseIA: correcao.feedbackC3 || "" },
      { id: 'c4', nome: 'Competência 4', descricao: 'Coesão e Coerência', nota: correcao.notaC4 || 0, analiseIA: correcao.feedbackC4 || "" },
      { id: 'c5', nome: 'Competência 5', descricao: 'Proposta de Intervenção', nota: correcao.notaC5 || 0, analiseIA: correcao.feedbackC5 || "" }
    ])
  }, [correcao])

  const scroll = (dir: 'left' | 'right') => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: dir === 'left' ? -272 : 272, behavior: 'smooth' })
    }
  }

  return (
    <div className="mt-8">
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-900">Correção das competências</h2>
        
        <div className="flex items-center space-x-3 relative z-30">
          <div className="bg-white px-4 py-2 rounded-[32px] shadow-sm border border-gray-200 text-sm flex items-center gap-2">
            <span className="text-gray-600">Nota total </span>
            <span className="font-bold text-gray-900">{notaTotal}/1000</span>
          </div>
        </div>
      </div>

      <div className="relative group">
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
  )
}

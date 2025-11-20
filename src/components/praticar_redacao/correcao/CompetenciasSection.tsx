'use client'

import { Competencia } from '@/types/correcao' // <-- IMPORT NECESSÁRIO
import { CompetenciaCard } from './CompetenciaCard'
import { ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { CorrecaoIA } from '@/apiCalls/redacao-livre/types'

// --- DEFINIÇÃO QUE FALTAVA ---
// (Isso resolve os erros 3 e 4)
interface CompetenciasSectionProps {
  correcoes: CorrecaoIA[]
  activeCompetenciaId: string
  onSelectCompetencia: (id: string) => void
}
// --- FIM DAS DEFINIÇÕES ---

export function CompetenciasSection({
  correcoes,
  activeCompetenciaId,
  onSelectCompetencia,
}: CompetenciasSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const somarNotas = (correcao: CorrecaoIA): number => {
    return correcao.notaC1 + correcao.notaC2 + correcao.notaC3 + correcao.notaC4 + correcao.notaC5
  }

  const [correcaoAtiva, setCorrecaoAtiva] = useState<CorrecaoIA | null>(null)
  const [notaTotal, setNotaTotal] = useState<number>(0)
  const [competencias, setCompetencias] = useState<Competencia[]>([])

  useEffect(() => {
    setCorrecaoAtiva(correcoes[0])
  }, [correcoes])

  useEffect(() => {
    if (!correcaoAtiva) return

    setNotaTotal(somarNotas(correcaoAtiva))
    setCompetencias([
      {
        id: 'c1',
        nome: 'Competência 1',
        descricao: 'Domínio da norma padrão da língua portuguesa',
        nota: correcaoAtiva?.notaC1 || 0,
        analiseIA: correcaoAtiva?.feedbackC1 || ""
      },
      {
        id: 'c2',
        nome: 'Competência 2',
        descricao: 'Compreensão do tema e aplicação de repertório',
        nota: correcaoAtiva?.notaC2 || 0,
        analiseIA: correcaoAtiva?.feedbackC2 || ""
      },
      {
        id: 'c3',
        nome: 'Competência 3',
        descricao: 'Seleção e organização de argumentos',
        nota: correcaoAtiva?.notaC3 || 0,
        analiseIA: correcaoAtiva?.feedbackC3 || ""
      },
      {
        id: 'c4',
        nome: 'Competência 4',
        descricao: 'Coesão e Coerência',
        nota: correcaoAtiva?.notaC4 || 0,
        analiseIA: correcaoAtiva?.feedbackC4 || ""
      },
      {
        id: 'c5',
        nome: 'Competência 5',
        descricao: 'Proposta de Intervenção',
        nota: correcaoAtiva?.notaC5 || 0,
        analiseIA: correcaoAtiva?.feedbackC5 || ""
      }
    ])

  }, [correcaoAtiva])

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -272 : 272
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' })
    }
  }

  const gradientColorFrom = 'from-gray-50'

  return (
    <div className="mt-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 mb-4">
        <h2 className="text-xl font-semibold text-gray-900">
          Correção das competências
        </h2>
        <div className="flex items-center space-x-3">
          <div className="bg-white px-4 py-2 rounded-[32px] shadow-sm border border-gray-200 text-sm">
            <span className="text-gray-600">Nota total </span>
            <span className="font-bold text-gray-900">{notaTotal}/1000</span>
          </div>
          <button
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            className="relative bg-white px-4 py-2 rounded-[32px] shadow-sm border border-gray-200 text-sm flex items-center space-x-2"
          >
            <span className="text-gray-600">Correções </span>
            <span className="font-bold text-gray-900">{correcoes.length}</span>
            <ChevronDown
              size={16}
              className={`text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''
                }`}
            />
          </button>
        </div>
      </div>

      {/* Carrossel */}
      <div className="relative group">
        <div
          className={`absolute inset-y-0 left-0 w-16 ${gradientColorFrom} to-transparent bg-gradient-to-r z-10 pointer-events-none`}
          aria-hidden="true"
        />
        <button
          onClick={() => scroll('left')}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20
                     p-2 bg-white rounded-full shadow-lg border border-gray-200
                     opacity-0 group-hover:opacity-100 transition-opacity
                     hover:bg-gray-100 disabled:opacity-30"
          aria-label="Rolar para esquerda"
        >
          <ChevronLeft size={20} className="text-gray-700" />
        </button>

        <div
          ref={scrollRef}
          // Lembre-se de adicionar a classe 'no-scrollbar' no seu globals.css
          className="flex space-x-4 overflow-x-auto py-6 px-4 no-scrollbar"
        >
          {competencias.map((comp) => ( // <-- 'comp' agora é do tipo 'Competencia'
            <CompetenciaCard
              key={comp.id}
              competencia={comp}
              // CORREÇÃO: Havia um typo 'activeCompetiaId'
              isActive={comp.id === activeCompetenciaId}
              onClick={() => onSelectCompetencia(comp.id)}
            />
          ))}
        </div>

        <div
          className={`absolute inset-y-0 right-0 w-16 ${gradientColorFrom} to-transparent bg-gradient-to-l z-10 pointer-events-none`}
          aria-hidden="true"
        />
        <button
          onClick={() => scroll('right')}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20
                     p-2 bg-white rounded-full shadow-lg border border-gray-200
                     opacity-0 group-hover:opacity-100 transition-opacity
                     hover:bg-gray-100 disabled:opacity-30"
          aria-label="Rolar para direita"
        >
          <ChevronRight size={20} className="text-gray-700" />
        </button>
      </div>
    </div>
  )
}
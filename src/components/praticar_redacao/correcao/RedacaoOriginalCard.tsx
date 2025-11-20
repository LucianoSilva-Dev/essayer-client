'use client'

import { Correcao } from '@/types/correcao' // <-- IMPORT NECESSÁRIO
import { Trash2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// --- DEFINIÇÕES QUE FALTAVAM ---
interface RedacaoOriginalCardProps {
  textoRedacao: Correcao['textoRedacao']
  temaRedacao: string; // Você precisará passar o tema
}

type View = 'redacao' | 'tema'
// --- FIM DAS DEFINIÇÕES ---

const COLLAPSED_HEIGHT_PX = 128 // max-h-32

export function RedacaoOriginalCard({ textoRedacao, temaRedacao }: RedacaoOriginalCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [view, setView] = useState<View>('redacao')
  const [isOverflowing, setIsOverflowing] = useState(false)
  const textRef = useRef<HTMLParagraphElement>(null)

  const currentText = view === 'redacao' ? textoRedacao : temaRedacao

  useEffect(() => {
    if (textRef.current) {
      setIsOverflowing(textRef.current.scrollHeight > COLLAPSED_HEIGHT_PX)
    }
  }, [currentText, view])

  return (
    <div className="bg-white p-6 md:p-8 rounded-[40px] shadow-sm border border-gray-200">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-full">
          <button
            onClick={() => {
              setView('redacao')
              setIsExpanded(false)
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              view === 'redacao'
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Redação
          </button>
          <button
            onClick={() => {
              setView('tema')
              setIsExpanded(false)
            }}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              view === 'tema'
                ? 'bg-white shadow-sm text-gray-900'
                : 'text-gray-600 hover:text-gray-800'
            }`}
          >
            Tema
          </button>
        </div>
      </div>

      {/* Conteúdo (Redação ou Tema) */}
      <div
        className={`relative transition-all duration-300 ease-in-out overflow-hidden ${
          isExpanded ? 'max-h-[1000px]' : 'max-h-32'
        }`}
      >
        <p ref={textRef} className="text-gray-700 text-base leading-relaxed">
          {currentText}
        </p>

        {/* Gradiente */}
        <AnimatePresence>
          {!isExpanded && isOverflowing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute bottom-0 left-0 w-full h-20 
                         bg-gradient-to-t from-white from-20% to-transparent 
                         pointer-events-none"
            />
          )}
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="flex justify-between items-center mt-6 min-h-[44px]">
        {isOverflowing ? (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-sm font-medium text-[#075F70] hover:underline"
          >
            {isExpanded ? 'Ver menos' : 'Ver tudo'}
          </button>
        ) : (
          <div /> // Placeholder
        )}
        <div className="flex items-center space-x-3">
          <button className="flex items-center justify-center p-2.5 rounded-full bg-[#089993] text-white hover:opacity-90 transition-opacity">
            <Trash2 size={18} />
          </button>
          <button className="px-5 py-2.5 rounded-[40px] bg-[#075F70] text-white text-sm font-medium hover:opacity-90 transition-opacity">
            Reescrever
          </button>
          <button className="px-5 py-2.5 rounded-[40px] bg-[#075F70] text-white text-sm font-medium hover:opacity-90 transition-opacity">
            Exportar redação
          </button>
        </div>
      </div>
    </div>
  )
}
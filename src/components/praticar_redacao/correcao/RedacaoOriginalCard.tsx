'use client'

import { Correcao } from '@/types/correcao'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { deleteCorrecaoRedacaoLivre, updateRedacaoLivre } from '@/apiCalls/redacao-livre' 
import { useRouter } from 'next/navigation'
import { DeleteCorrectionModal } from './DeleteModal'
import { RedacaoActions } from './RedacaoActions'

interface RedacaoOriginalCardProps {
  idRedacao: string;
  idCorrecao: string;
  textoRedacao: Correcao['textoRedacao']
  temaRedacao: string;
  showActions?: boolean;
  // NOVAS PROPS
  onCorrectAgain: () => Promise<void>;
  isCorrecting: boolean;
}

const COLLAPSED_HEIGHT_PX = 160

export function RedacaoOriginalCard({ 
    textoRedacao, 
    temaRedacao, 
    idRedacao, 
    idCorrecao, 
    showActions = true,
    onCorrectAgain, // RECEBE O HANDLER DO PAI
    isCorrecting // RECEBE O ESTADO DO PAI
}: RedacaoOriginalCardProps) {
  const router = useRouter()
  const [isExpanded, setIsExpanded] = useState(false)
  const [isOverflowing, setIsOverflowing] = useState(false)
  const contentRef = useRef<HTMLDivElement>(null)
  const [showDeleteModal, setShowDeleteModal] = useState(false)

  const jaPossuiCorrecao = !!idCorrecao && idCorrecao.length > 0

  useEffect(() => {
    if (contentRef.current) {
      setIsOverflowing(contentRef.current.scrollHeight > COLLAPSED_HEIGHT_PX)
    }
  }, [textoRedacao, temaRedacao])

  
  // Actions Logic
  const confirmDelete = async () => {
    await deleteCorrecaoRedacaoLivre(idRedacao, idCorrecao)
    setShowDeleteModal(false)
    router.replace('/praticar_redacao')
  }

  const handleReescrever = async () => {
    await updateRedacaoLivre(idRedacao, { finalizada: false, texto: "", duracao: 30 * 60 })
    router.replace(`/praticar_redacao/${idRedacao}`)
  }

  // Chama a função injetada do pai
  const handleCorrigir = onCorrectAgain


  return (
    <>
      <div className="bg-white p-6 md:p-8 rounded-[40px] shadow-sm border border-gray-200">
        {/* Conteúdo Textual */}
        <div className={`relative transition-all duration-300 ease-in-out overflow-hidden ${isExpanded ? 'max-h-[3000px]' : 'max-h-40'}`}>
          <div ref={contentRef} className="space-y-6">
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Tema Proposto</span>
              <p className="text-gray-600 text-sm leading-relaxed font-medium">{temaRedacao}</p>
            </div>
            <div>
              <span className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Sua Redação</span>
              <p className="text-gray-800 text-lg leading-relaxed whitespace-pre-line">{textoRedacao}</p>
            </div>
          </div>
          <AnimatePresence>
            {!isExpanded && isOverflowing && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-white via-white/90 to-transparent pointer-events-none" />
            )}
          </AnimatePresence>
        </div>

        {/* Footer */}
        <div className="flex flex-col xl:flex-row justify-between items-center mt-6 gap-4 xl:gap-0">
          <div className="w-full xl:w-auto flex justify-start">
            {isOverflowing ? (
              <button onClick={() => setIsExpanded(!isExpanded)} className="text-sm font-medium text-[#075F70] hover:underline focus:outline-none cursor-pointer">
                {isExpanded ? 'Ver menos' : 'Ver tudo'}
              </button>
            ) : <div />}
          </div>

          {showActions && (
            <RedacaoActions 
              onDelete={() => setShowDeleteModal(true)}
              onRewrite={handleReescrever}
              onCorrect={handleCorrigir}
              hasCorrection={jaPossuiCorrecao}
              isCorrecting={isCorrecting} // PASSA O ESTADO DE LOADING
            />
          )}
        </div>
      </div>

      <DeleteCorrectionModal 
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        onConfirm={confirmDelete}
        temaTitle={temaRedacao}
      />
    </>
  )
}
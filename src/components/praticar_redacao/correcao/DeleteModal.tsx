'use client'

import { X, AlertTriangle } from 'lucide-react'
import { useEffect, useState } from 'react'

interface DeleteCorrectionModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  temaTitle: string
}

export function DeleteCorrectionModal({ isOpen, onClose, onConfirm, temaTitle }: DeleteCorrectionModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 font-montserrat transition-opacity duration-300 ease-in-out ${isVisible ? 'bg-[#075F70]/60 backdrop-blur-sm opacity-100' : 'bg-transparent backdrop-blur-none opacity-0'}`}
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-3xl bg-white p-10 rounded-[40px] shadow-2xl transform transition-all duration-300 ease-out ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row items-start gap-8">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center flex-shrink-0 border border-red-100 shadow-inner">
            <AlertTriangle size={36} className="text-red-600 animate-pulse" />
          </div>

          <div className="flex-1 w-full flex flex-col justify-between min-h-[5rem]">
            <div className="space-y-4 mb-8">
              <h3 className="text-2xl font-semibold text-[#3C3C3C]">Tem certeza que deseja excluir?</h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                Você está prestes a remover permanentemente a redação:<br />
                {temaTitle && (
                  <span className="font-medium text-[#3C3C3C] italic text-xl block mt-2 border-l-4 border-red-200 pl-4 py-1">"{temaTitle}"</span>
                )}
              </p>
            </div>

            <div className="flex flex-row gap-4 justify-end">
              <button onClick={onClose} className="px-8 py-3 rounded-[24px] border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                Cancelar
              </button>
              <button onClick={onConfirm} className="px-8 py-3 rounded-[24px] bg-red-600 text-white font-medium hover:bg-red-700 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer">
                Sim, excluir
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
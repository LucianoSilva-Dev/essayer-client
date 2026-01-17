'use client'

import { X, AlertTriangle } from 'lucide-react'
import { useEffect, useState } from 'react'

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  description: string
  confirmText?: string
  cancelText?: string
  variant?: 'danger' | 'primary'
}

export function ConfirmationModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  title, 
  description, 
  confirmText = "Confirmar", 
  cancelText = "Cancelar",
  variant = 'primary'
}: ConfirmationModalProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10)
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  if (!isOpen) return null

  const isDanger = variant === 'danger'
  const iconColor = isDanger ? 'text-red-600' : 'text-brand-teal-dark'
  const iconBg = isDanger ? 'bg-red-50 border-red-100' : 'bg-brand-teal-dark/10 border-brand-teal-dark/20'
  const buttonBg = isDanger ? 'bg-red-600 hover:bg-red-700' : 'bg-brand-teal-dark hover:bg-[#064e5c]'

  return (
    <div 
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 font-montserrat transition-opacity duration-300 ease-in-out ${isVisible ? 'bg-brand-teal-dark/60 backdrop-blur-sm opacity-100' : 'bg-transparent backdrop-blur-none opacity-0'}`}
      onClick={onClose}
    >
      <div 
        className={`relative w-full max-w-2xl bg-white p-8 md:p-10 rounded-[40px] shadow-2xl transform transition-all duration-300 ease-out ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <X size={24} />
        </button>

        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className={`w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0 border shadow-inner ${iconBg}`}>
            <AlertTriangle size={32} className={`${iconColor} animate-pulse`} />
          </div>

          <div className="flex-1 w-full flex flex-col justify-between">
            <div className="space-y-3 mb-8">
              <h3 className="text-2xl font-semibold text-neutral-dark">{title}</h3>
              <p className="text-gray-500 text-lg leading-relaxed">
                {description}
              </p>
            </div>

            <div className="flex flex-row gap-4 justify-end">
              <button onClick={onClose} className="px-6 py-2.5 rounded-[24px] border border-gray-200 text-gray-700 font-medium hover:bg-gray-50 transition-colors cursor-pointer">
                {cancelText}
              </button>
              <button onClick={onConfirm} className={`px-6 py-2.5 rounded-[24px] text-white font-medium shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer ${buttonBg}`}>
                {confirmText}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

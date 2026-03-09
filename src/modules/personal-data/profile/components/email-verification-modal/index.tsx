"use client"

import { useState, useEffect } from "react"
import { X, AlertTriangle, Loader2 } from "lucide-react"

interface EmailVerificationModalProps {
  isOpen: boolean
  onClose: () => void
  onVerify: (code: string) => Promise<void>
  onResend: () => Promise<void>
  email: string
  isLoading: boolean
}

export function EmailVerificationModal({
  isOpen,
  onClose,
  onVerify,
  onResend,
  email,
  isLoading
}: EmailVerificationModalProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [code, setCode] = useState("")
  const [isResending, setIsResending] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10)
      setCode("") // Reset code when opening
    } else {
      setIsVisible(false)
    }
  }, [isOpen])

  const handleCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^A-Za-z0-9+/]/g, "")
    if (value.length <= 8) {
      setCode(value)
    }
  }

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault()
    if (code.length === 8) {
      await onVerify(code)
    }
  }

  const handleResendClick = async () => {
    setIsResending(true)
    try {
      await onResend()
    } finally {
      setIsResending(false)
    }
  }

  if (!isOpen) return null

  return (
    <div
      className={`fixed inset-0 z-999 flex items-center justify-center p-4 font-montserrat transition-opacity duration-300 ease-in-out ${isVisible ? 'bg-brand-teal-dark/60 backdrop-blur-sm opacity-100' : 'bg-transparent backdrop-blur-none opacity-0'}`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-lg sm:max-w-xl bg-white p-6 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl lg:rounded-[40px] shadow-2xl transform transition-all duration-300 ease-out ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-4 sm:top-6 right-4 sm:right-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer p-1">
          <X size={20} className="sm:w-6 sm:h-6" />
        </button>

        <div className="flex flex-col items-center">
          {/* Icon */}
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border shadow-inner bg-brand-teal-dark/10 border-brand-teal-dark/20 mb-4 sm:mb-6">
             <AlertTriangle size={28} className="sm:w-8 sm:h-8 text-brand-teal-dark" />
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl lg:text-2xl font-semibold text-neutral-dark mb-2 text-center">Confirme que esse e-mail é seu</h3>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-500 text-center mb-6 sm:mb-8 leading-relaxed px-2">
            Insira o código de 8 caracteres que enviamos para <strong className="block mt-1">{email}</strong> <br />
            <span className="text-red-500 text-xs mt-1 inline-block">(Confira a caixa de SPAM)</span>
          </p>

          {/* Form */}
          <form onSubmit={handleVerify} className="w-full px-2">
            <div className="mb-4 sm:mb-6">
              <label htmlFor="code" className="block text-xs sm:text-sm font-medium text-gray-700 mb-1.5 sm:mb-2">
                Código de verificação
              </label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={handleCodeChange}
                className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border border-gray-300 rounded-lg sm:rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 text-center text-lg sm:text-base font-mono tracking-widest"
                placeholder="XXXXXXXX"
                maxLength={8}
                required
                disabled={isLoading}
              />
              <p className="text-xs text-gray-500 mt-1 text-center">{code.length}/8 caracteres</p>
            </div>

            <button
              type="submit"
              disabled={code.length !== 8 || isLoading}
              className="w-full bg-teal-800 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-2.5 sm:py-3 px-4 rounded-lg sm:rounded-md transition-colors mb-3 sm:mb-4 flex items-center justify-center gap-2 text-sm sm:text-base font-medium"
            >
              {isLoading ? <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" /> : "Verificar código"}
            </button>

            {/* Additional Options */}
            <div className="flex flex-col items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={handleResendClick}
                disabled={isResending || isLoading}
                className="text-xs sm:text-sm text-gray-500 hover:text-teal-600 disabled:opacity-50 transition-colors"
              >
                {isResending ? "Reenviando..." : "Não recebeu o código? Reenviar"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

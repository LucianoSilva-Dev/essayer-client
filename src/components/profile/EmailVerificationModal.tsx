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
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 font-montserrat transition-opacity duration-300 ease-in-out ${isVisible ? 'bg-[#075F70]/60 backdrop-blur-sm opacity-100' : 'bg-transparent backdrop-blur-none opacity-0'}`}
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-xl bg-white p-8 md:p-10 rounded-[40px] shadow-2xl transform transition-all duration-300 ease-out ${isVisible ? 'scale-100 translate-y-0 opacity-100' : 'scale-95 translate-y-8 opacity-0'}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button onClick={onClose} className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer">
          <X size={24} />
        </button>

        <div className="flex flex-col items-center">
          {/* Icon */}
          <div className="w-16 h-16 rounded-full flex items-center justify-center border shadow-inner bg-[#075F70]/10 border-[#075F70]/20 mb-6">
             <AlertTriangle size={32} className="text-[#075F70]" />
          </div>

          {/* Title */}
          <h3 className="text-2xl font-semibold text-[#3C3C3C] mb-2 text-center">Confirme que esse e-mail é seu</h3>

          {/* Description */}
          <p className="text-gray-500 text-center mb-8 leading-relaxed">
            Insira o código de 8 caracteres que enviamos para <strong>{email}</strong> <br />
            <span className="text-red-500">(Confira a caixa de SPAM)</span>
          </p>

          {/* Form */}
          <form onSubmit={handleVerify} className="w-full">
            <div className="mb-6">
              <label htmlFor="code" className="block text-sm font-medium text-gray-700 mb-1">
                Código de verificação
              </label>
              <input
                id="code"
                type="text"
                value={code}
                onChange={handleCodeChange}
                className="w-full px-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 text-center text-lg font-mono tracking-widest"
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
              className="w-full bg-teal-800 hover:bg-teal-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white py-3 px-4 rounded-md transition-colors mb-4 flex items-center justify-center gap-2"
            >
              {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Verificar código"}
            </button>

            {/* Additional Options */}
            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={handleResendClick}
                disabled={isResending || isLoading}
                className="text-sm text-gray-500 hover:text-teal-600 disabled:opacity-50"
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

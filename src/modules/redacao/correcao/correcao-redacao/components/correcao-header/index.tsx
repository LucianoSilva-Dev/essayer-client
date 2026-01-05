'use client'

import { ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function CorrecaoHeader() {
  const router = useRouter()

  return (
    <div className="flex items-center space-x-4 mb-6">
      <button
        onClick={() => router.back()}
        className="cursor-pointer text-gray-600 hover:text-gray-900"
        aria-label="Voltar"
      >
        <ArrowLeft size={24} />
      </button>
      <h1 className="text-2xl font-semibold text-gray-800">
        Correção da redação
      </h1>
    </div>
  )
}
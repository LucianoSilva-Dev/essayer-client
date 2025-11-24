'use client'

import { Trash2, RefreshCcw, Wand2 } from 'lucide-react'

interface RedacaoActionsProps {
  onDelete: () => void
  onRewrite: () => void
  onCorrect: () => void
  hasCorrection: boolean
}

export function RedacaoActions({ onDelete, onRewrite, onCorrect, hasCorrection }: RedacaoActionsProps) {
  return (
    <div className="flex flex-wrap items-center justify-end gap-3 w-full xl:w-auto">
        <button onClick={onDelete} className="group flex items-center rounded-full bg-white border border-[#075F70] text-[#075F70] hover:bg-red-50 hover:border-red-200 hover:text-red-600 transition-all duration-300 ease-in-out overflow-hidden w-[42px] hover:w-[110px] h-[42px] cursor-pointer" title="Excluir">
            <div className="min-w-[40px] h-full flex items-center justify-center"><Trash2 size={18} /></div>
            <span className="whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 font-bold text-sm pr-4">Excluir</span>
        </button>

        <button className="px-5 py-2.5 rounded-[40px] bg-[#075F70] text-white text-sm font-bold hover:opacity-90 transition-opacity cursor-pointer shadow-sm" onClick={onRewrite}>
            Reescrever
        </button>

        <button onClick={onCorrect} className="px-5 py-2.5 rounded-[40px] bg-[#075F70] text-white text-sm font-bold hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-sm">
            {hasCorrection ? <><RefreshCcw size={16} /><span>Corrigir novamente</span></> : <><Wand2 size={16} /><span>Corrigir redação</span></>}
        </button>
    </div>
  )
}
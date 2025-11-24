'use client'

import { ChevronDown, History, CheckCircle2, AlertCircle } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { CorrecaoIA } from '@/apiCalls/redacao-livre/types'

interface CorrectionsTimelineDropdownProps {
  correcoes: CorrecaoIA[]
  correcaoSelecionada: CorrecaoIA | null
  onTrocarCorrecao: (correcao: CorrecaoIA) => void
}

export function CorrectionsTimelineDropdown({ 
  correcoes, 
  correcaoSelecionada, 
  onTrocarCorrecao 
}: CorrectionsTimelineDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  // Fecha ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  // Helpers internos de visualização
  const somarNotas = (c: CorrecaoIA) => 
    (c.notaC1||0)+(c.notaC2||0)+(c.notaC3||0)+(c.notaC4||0)+(c.notaC5||0)

  const getStatusCorrecao = (c: CorrecaoIA) => somarNotas(c) === 0 ? 'error' : 'success'
  
  const getNumeroCorrecao = (id: string) => {
    const index = correcoes.findIndex(c => c.id === id)
    return index === -1 ? '?' : correcoes.length - index
  }

  const numeroVersaoAtual = correcaoSelecionada ? getNumeroCorrecao(correcaoSelecionada.id) : '-'

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`
          group relative bg-white pl-3 pr-2 py-1.5 rounded-[32px] shadow-sm border 
          flex items-center gap-3 transition-all duration-300 outline-none cursor-pointer
          ${isDropdownOpen 
              ? 'border-[#075F70] ring-2 ring-[#075F70]/10' 
              : 'border-gray-200 hover:border-[#075F70]/50 hover:shadow-md'}
        `}
      >
        <div className="flex items-center gap-2 pl-1">
          <History size={16} className="text-gray-400 group-hover:text-[#075F70] transition-colors" />
          <span className="text-sm font-medium text-gray-600 hidden sm:inline-block">Histórico</span>
        </div>

        <div className="flex items-center gap-1 bg-white border border-[#075F70]/30 text-[#075F70] px-3 py-1.5 rounded-full">
          <span className="text-xs font-bold whitespace-nowrap">Correção {numeroVersaoAtual}</span>
          <ChevronDown size={14} className={`transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
        </div>
      </button>

      {isDropdownOpen && (
        <div className="absolute right-0 top-full mt-3 w-[340px] bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden animate-in fade-in zoom-in-95 duration-200 origin-top-right z-50">
          <div className="px-6 py-4 bg-gray-50/50 border-b border-gray-100">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider">Linha do tempo das correções</h3>
          </div>
          
          <div className="max-h-[350px] overflow-y-auto p-4 scrollbar-thin scrollbar-thumb-gray-200">
            <div className="relative"> 
              {correcoes.length > 0 && (
                  <div className="absolute left-8 top-4 bottom-8 w-[2px] bg-gray-200 -translate-x-1/2" aria-hidden="true" />
              )}

              {correcoes.map((item, index) => {
                const status = getStatusCorrecao(item)
                const isActive = correcaoSelecionada?.id === item.id
                const numeroCorrecao = correcoes.length - index 
                const isLast = index === correcoes.length - 1

                return (
                  <div key={item.id} className={`relative mb-1 ${isLast ? 'mb-0' : ''}`}>
                      <button
                          onClick={() => {
                              onTrocarCorrecao(item)
                              setIsDropdownOpen(false)
                          }}
                          className={`relative z-10 w-full flex items-start gap-2 p-2 rounded-xl text-left transition-all duration-200 group/item cursor-pointer ${isActive ? 'bg-[#075F70]/5' : 'hover:bg-gray-50'}`}
                      >
                          <div className="w-12 flex justify-center pt-1.5 flex-shrink-0">
                              <div className={`relative z-20 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${isActive ? 'w-5 h-5 bg-[#075F70] border-[#075F70] shadow-[0_0_0_4px_rgba(7,95,112,0.1)]' : 'w-3.5 h-3.5 bg-white border-gray-300 group-hover/item:border-[#075F70] group-hover/item:scale-110'}`}>
                                  {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                              </div>
                          </div>
                          <div className="flex-1 min-w-0 py-0.5">
                              <div className="flex justify-between items-center mb-0.5">
                                  <span className={`text-sm font-bold ${isActive ? 'text-[#075F70]' : 'text-gray-700'}`}>Correção {numeroCorrecao}</span>
                                  {status === 'error' && <AlertCircle size={14} className="text-red-500" />}
                                  {status === 'success' && isActive && <CheckCircle2 size={14} className="text-[#075F70]" />}
                              </div>
                              <p className={`text-xs truncate ${isActive ? 'text-[#075F70]/70' : 'text-gray-400'}`}>
                                  {status === 'success' ? 'Processamento concluído' : 'Erro no processamento'}
                              </p>
                          </div>
                      </button>
                  </div>
                )
              })}
              {correcoes.length === 0 && <p className="text-center text-gray-400 text-sm py-4">Sem histórico</p>}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
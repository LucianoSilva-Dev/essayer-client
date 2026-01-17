'use client'

import { ChevronDown, History, CheckCircle2, AlertCircle, Trash, X, Loader2 } from 'lucide-react'
import { useState, useRef, useEffect } from 'react'
import { CorrecaoIA } from '@/lib/apiCalls/redacao-livre/types'
import { deleteCorrecaoRedacaoLivre } from '@/lib/apiCalls/redacao-livre'

interface CorrectionsTimelineDropdownProps {
  correcoes: CorrecaoIA[]
  correcaoSelecionada: CorrecaoIA | null
  onTrocarCorrecao: (correcao: CorrecaoIA) => void
  redacaoId: string
}

export function CorrectionsTimelineDropdown({ 
  correcoes, 
  correcaoSelecionada, 
  onTrocarCorrecao,
  redacaoId
}: CorrectionsTimelineDropdownProps) {
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [showDeleteModal, setShowDeleteModal] = useState(false)
  const [correctionToDelete, setCorrectionToDelete] = useState<string | null>(null)
  const [isDeleting, setIsDeleting] = useState(false)

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

  const getStatusCorrecao = (c: CorrecaoIA) => c.status === 'erro' ? 'error' : (c.status === 'pendente' ? 'pending' : 'success')
  
  const getNumeroCorrecao = (id: string) => {
    const index = correcoes.findIndex(c => c.id === id)
    return index === -1 ? '?' : correcoes.length - index
  }

  const numeroVersaoAtual = correcaoSelecionada ? getNumeroCorrecao(correcaoSelecionada.id) : '-'

  const handleDeleteClick = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    setCorrectionToDelete(id)
    setShowDeleteModal(true)
    setIsDropdownOpen(false)
  }

  const confirmDelete = async () => {
    if (!correctionToDelete) return

    try {
      setIsDeleting(true)
      await deleteCorrecaoRedacaoLivre(redacaoId, correctionToDelete)
      window.location.reload() // Simple reload to refresh state
    } catch (error) {
      console.error('Erro ao deletar correção:', error)
      alert('Erro ao deletar correção. Tente novamente.')
    } finally {
      setIsDeleting(false)
      setShowDeleteModal(false)
      setCorrectionToDelete(null)
    }
  }

  return (
    <div ref={dropdownRef} className="relative">
      <button
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className={`
          group relative bg-white pl-3 pr-2 py-1.5 rounded-[32px] shadow-sm border 
          flex items-center gap-3 transition-all duration-300 outline-none cursor-pointer
          ${isDropdownOpen 
              ? 'border-brand-teal-dark ring-2 ring-brand-teal-dark/10' 
              : 'border-gray-200 hover:border-brand-teal-dark/50 hover:shadow-md'}
        `}
      >
        <div className="flex items-center gap-2 pl-1">
          <History size={16} className="text-gray-400 group-hover:text-brand-teal-dark transition-colors" />
          <span className="text-sm font-medium text-gray-600 hidden sm:inline-block">Histórico</span>
        </div>

        <div className="flex items-center gap-1 bg-white border border-brand-teal-dark/30 text-brand-teal-dark px-3 py-1.5 rounded-full">
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
                      <div
                          className={`relative z-10 w-full flex items-start gap-2 p-2 rounded-xl text-left transition-all duration-200 group/item cursor-pointer ${isActive ? 'bg-brand-teal-dark/5' : 'hover:bg-gray-50'}`}
                          onClick={() => {
                              onTrocarCorrecao(item)
                              setIsDropdownOpen(false)
                          }}
                      >
                          <div className="w-12 flex justify-center pt-1.5 flex-shrink-0">
                              <div className={`relative z-20 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${isActive ? 'w-5 h-5 bg-brand-teal-dark border-brand-teal-dark shadow-[0_0_0_4px_rgba(7,95,112,0.1)]' : 'w-3.5 h-3.5 bg-white border-gray-300 group-hover/item:border-brand-teal-dark group-hover/item:scale-110'}`}>
                                  {isActive && <div className="w-1.5 h-1.5 bg-white rounded-full" />}
                              </div>
                          </div>
                          <div className="flex-1 min-w-0 py-0.5">
                              <div className="flex justify-between items-center mb-0.5">
                                  <span className={`text-sm font-bold ${isActive ? 'text-brand-teal-dark' : 'text-gray-700'}`}>Correção {numeroCorrecao}</span>
                                  <div className="flex items-center gap-2">
                                    {status === 'error' && <AlertCircle size={14} className="text-red-500" />}
                                    {status === 'pending' && <Loader2 size={14} className="text-amber-500 animate-spin" />}
                                    {status === 'success' && isActive && <CheckCircle2 size={14} className="text-brand-teal-dark" />}
                                    
                                    <button
                                      onClick={(e) => handleDeleteClick(e, item.id)}
                                      className="opacity-0 group-hover/item:opacity-100 p-1 hover:bg-red-50 rounded-full text-gray-400 hover:text-red-500 transition-all"
                                      title="Excluir correção"
                                    >
                                      <Trash size={14} />
                                    </button>
                                  </div>
                              </div>
                              <p className={`text-xs truncate ${isActive ? 'text-brand-teal-dark/70' : 'text-gray-400'}`}>
                                  {status === 'success' ? 'Processamento concluído' : (status === 'pending' ? 'Em processamento...' : 'Erro no processamento')}
                              </p>
                          </div>
                      </div>
                  </div>
                )
              })}
              {correcoes.length === 0 && <p className="text-center text-gray-400 text-sm py-4">Sem histórico</p>}
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação */}
      {showDeleteModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl p-6 w-[90%] max-w-md shadow-xl scale-100 animate-in zoom-in-95 duration-200">
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-3 text-red-600">
                <div className="p-2 bg-red-50 rounded-full">
                  <Trash size={20} />
                </div>
                <h3 className="text-lg font-bold text-gray-900">Excluir correção?</h3>
              </div>
              <button 
                onClick={() => setShowDeleteModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja excluir esta correção? Esta ação não pode ser desfeita.
            </p>

            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-xl transition-colors"
                disabled={isDeleting}
              >
                Cancelar
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2"
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader2 size={16} className="animate-spin" />
                    Excluindo...
                  </>
                ) : (
                  'Excluir'
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
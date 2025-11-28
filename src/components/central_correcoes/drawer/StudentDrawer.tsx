"use client";

import { useEffect, useState } from "react";
import { X, Search, CheckCircle2, Clock, ChevronRight } from "lucide-react"; // Removido Filter
import { getAtividadeRedacaoDetalhes } from "@/apiCalls/tarefas";
import { RespostaAtividade } from "@/apiCalls/tarefas/types";
import { respostaStatus } from "../helpers/respostaStatus";
import { notaTotal } from "../helpers/notaTotal";
import { formatDate } from "../helpers/formatDate";
import { useRouter } from "next/navigation";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  tarefaId: string | null;
}

type FilterType = 'todos' | 'pendente' | 'corrigido';

export function StudentDrawer({ isOpen, onClose, tarefaId }: Props) {
  const router = useRouter()
  const [filter, setFilter] = useState<FilterType>('todos');
  const [searchTerm, setSearchTerm] = useState("");
  const [respostas, setRespostas] = useState<RespostaAtividade[]>([])

  useEffect(() => {
    if (!tarefaId) return
    (async () => {
      const response = await getAtividadeRedacaoDetalhes(tarefaId)
      setRespostas(response.respostas)
    })()
  }, [tarefaId])

  const filteredRespostas = respostas.filter(res => {
    const matchesSearch = res.aluno.nome.toLowerCase().includes(searchTerm.toLowerCase());
    if (!matchesSearch) return false;
    if (filter === 'todos') return true;
    const status = res.feedback ? 'corrigido' : 'pendente'

    return status === filter;
  })

  const handleClose = () => {
    setFilter('todos');
    setSearchTerm("");
    onClose();
  }

  return (
    <div>
      <div
        className={`fixed inset-0 bg-[#075F70]/20 backdrop-blur-[2px] z-40 transition-opacity duration-300 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        onClick={handleClose}
      />

      <div className={`fixed inset-y-0 right-0 w-full md:w-[550px] bg-white shadow-2xl z-50 transform transition-transform duration-300 ease-out flex flex-col ${isOpen ? "translate-x-0" : "translate-x-full"
        }`}>

        {/* Header */}
        <div className="px-8 py-6 border-b border-gray-100 flex items-center justify-between bg-white shrink-0">
          <div>
            <h2 className="text-2xl font-bold text-[#075F70]">Submissões</h2>
            <p className="text-sm text-gray-500 font-medium">Gerencie as correções pendentes</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-[#075F70]"
          >
            <X size={28} />
          </button>
        </div>

        {/* Search & Filter Area */}
        <div className="p-6 bg-gray-50/50 border-b border-gray-100 shrink-0 flex flex-col gap-4">

          {/* Input de Busca */}
          <div className="relative group">
            <input
              type="text"
              placeholder="Buscar aluno por nome..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-[#075F70] focus:ring-4 focus:ring-[#075F70]/5 text-sm bg-white transition-all font-medium"
            />
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#075F70] transition-colors" size={20} />
          </div>

          {/* Filtros de Status (Label Sutil) */}
          <div className="flex items-center gap-3">
            {/* LABEL SUTIL: Sem ícone, fonte normal, cor suave */}
            <span className="text-sm font-medium text-gray-500">
              Status:
            </span>

            <div className="flex gap-2">
              {(['todos', 'pendente', 'corrigido'] as FilterType[]).map((type) => (
                <button
                  key={type}
                  onClick={() => setFilter(type)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold capitalize transition-all duration-200 border ${filter === type
                    ? 'bg-[#075F70] text-white border-[#075F70] shadow-sm'
                    : 'bg-white text-gray-500 border-gray-200 hover:border-[#075F70]/50 hover:text-[#075F70]'
                    }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Lista de Alunos */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-4 bg-[#FAFAFA]">
          {filteredRespostas.length === 0 ? (
            <div className="text-center py-10 text-gray-400">
              <p>Nenhum aluno encontrado.</p>
            </div>
          ) : (
            filteredRespostas.map((res) => (
              <div
                key={res.id}
                className="flex flex-col sm:flex-row items-center justify-between p-5 rounded-2xl bg-white border border-gray-100 shadow-sm hover:shadow-md hover:border-[#075F70]/20 transition-all group gap-4"
              >
                {/* LADO ESQUERDO: Identificação */}
                <div className="flex items-center gap-4 w-full sm:w-auto">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-sm border-2 shrink-0 overflow-hidden
                                ${respostaStatus(res) === 'corrigido'
                      ? 'bg-[#075F70]/10 text-[#075F70] border-[#075F70]/20'
                      : 'bg-gray-100 text-gray-500 border-gray-200'
                    }`}
                  >
                    {res.aluno.fotoPath ? (
                       <img 
                         src={res.aluno.fotoPath} 
                         alt={res.aluno.nome} 
                         className="w-full h-full object-cover"
                       />
                    ) : (
                      res.aluno.nome.substring(0, 2).toUpperCase()
                    )}
                  </div>

                  <div>
                    <p className="font-bold text-gray-800 text-base">{res.aluno.nome}</p>
                    <div className="flex items-center gap-2 mt-1">
                      {respostaStatus(res) === 'corrigido'
                        ? <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded flex items-center gap-1">
                          <CheckCircle2 size={12} /> Corrigido
                        </span>
                        : <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-0.5 rounded flex items-center gap-1">
                          <Clock size={12} /> Pendente
                        </span>
                      }
                    </div>
                  </div>
                </div>

                {/* LADO DIREITO: Ação ou Resultado */}
                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto mt-2 sm:mt-0 pl-16 sm:pl-0">

                  <div className="text-right hidden sm:block">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">Enviado</p>
                    <p className="text-xs font-medium text-gray-600">{formatDate(res.dataEnvio)}</p>
                  </div>

                  {respostaStatus(res) === 'pendente' ? (
                    <button 
                      className="flex items-center gap-2 px-5 py-2.5 bg-[#075F70] hover:bg-[#054a57] text-white text-sm font-bold rounded-xl shadow-lg shadow-[#075F70]/20 hover:shadow-[#075F70]/40 hover:-translate-y-0.5 transition-all w-full sm:w-auto justify-center"
                      onClick={() => router.push(`/fazer_tarefa/${tarefaId}/corrigir?alunoId=${res.aluno.id}`)}
                    >  
                      Corrigir <ChevronRight size={16} />
                    </button>
                  ) : (
                    <div className="flex flex-col items-end min-w-[100px]">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-0.5">Nota Final</span>
                      <span className="text-2xl font-bold text-[#075F70] leading-none">
                        {notaTotal(res)}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            ))
          )}

          <div className="h-12"></div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white flex justify-between items-center text-xs font-medium text-gray-500 shrink-0">
          <span>Total: {respostas.length}</span>
          <div className="flex gap-4">
            <span>Corrigidos: {respostas.filter(res => respostaStatus(res) === 'corrigido').length}</span>
            <span>Pendentes: {respostas.filter(res => respostaStatus(res) === 'pendente').length}</span>
          </div>
        </div>

      </div>
    </div>
  );
}
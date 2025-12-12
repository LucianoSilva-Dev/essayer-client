// src/components/turma-aberta-aluno/tarefas/tarefa-item.tsx
import React from "react";
import { AtividadeBasica } from "@/apiCalls/turma/types";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/auth-context";
import { 
  ArrowRight,
  Clock,
  Check,
  X,
  Lock,
  Calendar
} from "lucide-react";

interface TarefaItemProps {
    tarefa: AtividadeBasica;
    compact?: boolean; 
    isTimelineItem?: boolean;
}

export default function TarefaItem({ tarefa, compact = false, isTimelineItem = false }: TarefaItemProps) {
  const router = useRouter();
  const { userData } = useAuth();
  
  const dataLimite = tarefa.dataLimite ? new Date(tarefa.dataLimite) : null;
  const hoje = new Date();
  
  const dataFormatada = dataLimite
    ? dataLimite.toLocaleDateString("pt-BR", { day: "numeric", month: "short" })
    : "Sem data";

  const isConcluida = tarefa.status?.toLowerCase() === 'concluída';
  const isEncerradaStatus = tarefa.status?.toLowerCase() === 'encerrada';
  const isPrazoExpirado = dataLimite && dataLimite < hoje && !isConcluida;
  const isFechada = isEncerradaStatus || isPrazoExpirado;
  const isAtiva = !isFechada && !isConcluida;

  const handleNavigate = () => {
      if (isConcluida) {
          router.push(`/fazer_tarefa/${tarefa.id}/correcao?alunoId=${userData?.id}`);
      } else if (isAtiva) {
          router.push(`/fazer_tarefa/${tarefa.id}`);
      }
  };

  // --- MODO 1: Botão Compacto (Destaque) ---
  if (compact) {
      return (
        <button 
            onClick={handleNavigate}
            className="flex items-center gap-2 text-xs font-bold text-green-700 bg-white border border-green-200 hover:bg-green-50 px-5 py-2.5 rounded-xl transition-all shadow-sm"
        >
            Ver feedback
            <ArrowRight className="w-3 h-3" />
        </button>
      );
  }

  // --- MODO 2: Item de Timeline (Histórico Criativo) ---
  if (isTimelineItem) {
      let timelineIcon;
      let timelineColor;
      
      if (isConcluida) {
          timelineIcon = <Check className="w-3 h-3 text-white" />;
          timelineColor = "bg-green-400 ring-green-100";
      } else if (isFechada) {
          timelineIcon = isPrazoExpirado ? <X className="w-3 h-3 text-white" /> : <Lock className="w-3 h-3 text-white" />;
          timelineColor = isPrazoExpirado ? "bg-red-400 ring-red-100" : "bg-gray-400 ring-gray-100";
      } else {
          timelineIcon = <Clock className="w-3 h-3 text-white" />;
          timelineColor = "bg-blue-400 ring-blue-100";
      }

      return (
        <div className="relative">
             {/* O Ponto (Nó) da Timeline */}
            <div className={`absolute -left-[38px] top-1/2 -translate-y-1/2 w-8 h-8 rounded-full ${timelineColor} ring-4 flex items-center justify-center z-10 shadow-sm`}>
                {timelineIcon}
            </div>

            {/* O Card do Histórico */}
            <div 
                onClick={!isFechada || isConcluida ? handleNavigate : undefined}
                className={`bg-white p-4 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between transition-all ${(!isFechada || isConcluida) ? 'hover:shadow-md cursor-pointer hover:border-gray-200' : 'opacity-80'}`}
            >
                <div>
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider flex items-center gap-1 mb-1">
                        <Calendar className="w-3 h-3" /> {dataFormatada}
                    </span>
                    <h4 className={`text-sm font-bold font-montserrat ${isConcluida ? 'text-green-700' : 'text-gray-700'}`}>
                        {tarefa.titulo}
                    </h4>
                </div>
                
                {/* Status Badge Pequeno */}
                <div className="text-[10px] font-bold uppercase px-2 py-1 rounded-full bg-gray-50 text-gray-500">
                    {isConcluida ? "Feita" : isPrazoExpirado ? "Perdida" : "Fechada"}
                </div>
            </div>
        </div>
      );
  }

  // --- MODO 3: Card Padrão (Atividades Ativas) ---
  return (
    <div 
      onClick={!isFechada ? handleNavigate : undefined}
      className={`group relative p-6 rounded-[1.2rem] border transition-all duration-300 ease-out ${
          isAtiva 
            ? "bg-white border-white shadow-[0_2px_20px_-5px_rgba(0,0,0,0.05)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-0.5 cursor-pointer" 
            : isConcluida
            ? "bg-gray-50 border-gray-100 cursor-pointer hover:bg-white"
            : "bg-gray-50 border-transparent opacity-60 cursor-default"
      }`}
    >
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        
        <div className="flex-1 min-w-0">
           {/* Chips de Status */}
           <div className="flex items-center gap-2 mb-3">
              {isAtiva && (
                  <span className="flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-50 text-custom-blue text-[10px] font-bold uppercase tracking-wide">
                     <span className="w-1.5 h-1.5 rounded-full bg-custom-blue animate-pulse"></span>
                     Ativa
                  </span>
              )}
              {dataLimite && (
                 <span className={`text-xs flex items-center gap-1 ${isPrazoExpirado ? 'text-red-400 font-bold' : 'text-gray-400 font-medium'}`}>
                    <Clock className="w-3.5 h-3.5" />
                    {dataFormatada}
                 </span>
              )}
           </div>

           <h3 className={`text-lg font-bold font-montserrat truncate ${isFechada ? 'text-gray-400' : 'text-gray-800 group-hover:text-custom-blue transition-colors'}`}>
             {tarefa.titulo}
           </h3>
           
           {tarefa.descricao && !isFechada && (
             <p className="text-sm text-gray-500 mt-1 line-clamp-1 font-opensans leading-relaxed">
               {tarefa.descricao}
             </p>
           )}
        </div>

        {isAtiva && (
            <div className="flex-shrink-0 pt-2 sm:pt-0">
                <button className="w-full sm:w-auto flex items-center justify-center gap-2 text-xs font-bold text-white bg-custom-blue hover:bg-custom-blue/90 px-6 py-3 rounded-xl transition-all shadow-lg shadow-custom-blue/20 transform group-hover:scale-105">
                    Fazer Agora
                    <ArrowRight className="w-3 h-3" />
                </button>
            </div>
        )}
      </div>
    </div>
  );
}
"use client";

import React from "react";
import Image from "next/image";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar, Clock, Timer, FileText, CheckCircle, Quote } from "lucide-react";
import { useCreateTask } from "../../context";
import { EixoOptions } from "@/shared/constants/eixos";
import RepertorioCard from "@/modules/repertorio/repertorio-card";

export function Step5_Revisao() {
  const { taskData } = useCreateTask();

  // Encontra os dados completos do Eixo selecionado para exibir ícone/nome
  const selectedEixo = EixoOptions.find((e) => e.nome === taskData.eixoId);

  return (
    <div className="flex flex-col gap-8 max-w-6xl mx-auto pb-24 animate-in fade-in slide-in-from-right-8 duration-500">
      
      <div className="text-center space-y-2 mb-4">
        <h2 className="font-montserrat font-bold text-[30px] text-neutral-dark">
            Quase lá!
        </h2>
        <p className="text-gray-500 font-montserrat text-lg">
            Revise os detalhes da tarefa antes de publicar para a turma.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* ===== COLUNA ESQUERDA: Informações Principais ===== */}
        <div className="lg:col-span-2 space-y-6">
            
            {/* Card Título e Eixo */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 flex items-start gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#E5EFF0] rounded-bl-[100px] -z-0 opacity-50" />
                
                <div className="z-10 flex-1 space-y-4">
                    <div className="flex items-center gap-3 mb-2">
                        <span className="bg-[#E5EFF0] text-brand-teal-dark px-3 py-1 rounded-full text-xs font-bold font-montserrat uppercase tracking-wider">
                            Eixo Temático
                        </span>
                        <div className="flex items-center gap-2 text-gray-600 font-medium font-montserrat text-sm">
                            {selectedEixo && (
                                <>
                                    <Image 
                                        src={`/icons/${selectedEixo.icon}`} 
                                        alt={selectedEixo.nome} 
                                        width={16} 
                                        height={16} 
                                    />
                                    {selectedEixo.nome}
                                </>
                            )}
                        </div>
                    </div>
                    
                    <div>
                        <h3 className="text-gray-400 text-sm font-montserrat font-medium mb-1">Título da Tarefa</h3>
                        <p className="text-[24px] font-bold text-neutral-dark font-montserrat leading-tight">
                            {taskData.titulo || "Sem título definido"}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-gray-400 text-sm font-montserrat font-medium mb-1">Tema da Redação</h3>
                        <p className="text-[18px] text-neutral-dark font-montserrat italic bg-gray-50 p-4 rounded-xl border-l-4 border-brand-teal-dark">
                            "{taskData.tema || "Sem tema definido"}"
                        </p>
                    </div>
                </div>
            </div>

            {/* Card Descrição */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 space-y-4">
                <div className="flex items-center gap-2 text-brand-teal-dark mb-2">
                    <FileText size={20} />
                    <h3 className="font-bold font-montserrat text-lg">Descrição da tarefa</h3>
                </div>
                <div className="text-gray-600 font-montserrat whitespace-pre-wrap leading-relaxed">
                    {taskData.descricao || "Nenhuma instrução adicional fornecida."}
                </div>
            </div>

            {/* Lista de Repertórios */}
            <div className="space-y-4">
                <div className="flex items-center gap-2 text-brand-teal-dark px-2">
                    <Quote size={20} />
                    <h3 className="font-bold font-montserrat text-lg">
                        Textos Motivadores ({taskData.repertorios.length})
                    </h3>
                </div>
                
                {taskData.repertorios.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {taskData.repertorios.map((rep) => (
                             <div key={rep.id} className="scale-95 origin-top-left">
                                {/* Usamos o card existente, mas desabilitamos interações de clique na revisão */}
                                <div className="pointer-events-none">
                                    <RepertorioCard repertorio={rep} />
                                </div>
                             </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-gray-50 border border-dashed border-gray-300 rounded-2xl p-6 text-center text-gray-400 font-montserrat italic">
                        Nenhum repertório de apoio selecionado.
                    </div>
                )}
            </div>

        </div>

        {/* ===== COLUNA DIREITA: Logística e Resumo ===== */}
        <div className="space-y-6">
            
            {/* Card de Prazo */}
            <div className="bg-brand-teal-dark text-white p-8 rounded-[30px] shadow-lg relative overflow-hidden group">
                 <div className="absolute -right-10 -top-10 bg-white/10 w-40 h-40 rounded-full blur-2xl group-hover:bg-white/20 transition-all" />
                 
                 <h3 className="font-montserrat font-semibold text-lg opacity-80 mb-6 flex items-center gap-2">
                    <Calendar size={18} /> Prazo de Entrega
                 </h3>

                 <div className="space-y-1 relative z-10">
                    <p className="text-3xl font-bold font-montserrat">
                        {taskData.dataEntrega 
                            ? format(taskData.dataEntrega, "dd/MM") 
                            : "--/--"}
                    </p>
                    <p className="text-xl font-medium font-montserrat opacity-90">
                        {taskData.dataEntrega 
                            ? format(taskData.dataEntrega, "EEEE", { locale: ptBR }) 
                            : "Data não definida"}
                    </p>
                 </div>

                 <div className="mt-6 pt-6 border-t border-white/20 flex items-center gap-3">
                    <Clock size={20} />
                    <div>
                        <p className="text-xs opacity-70 font-montserrat uppercase">Horário Limite</p>
                        <p className="font-bold font-montserrat text-lg">{taskData.horaEntrega}h</p>
                    </div>
                 </div>
            </div>

            {/* Card de Duração */}
            <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 flex items-center gap-4">
                <div className="w-14 h-14 bg-[#E5EFF0] rounded-full flex items-center justify-center text-brand-teal-dark">
                    <Timer size={28} />
                </div>
                <div>
                    <p className="text-gray-400 text-xs font-montserrat font-bold uppercase tracking-wide">
                        Tempo de Prova
                    </p>
                    <p className="text-2xl font-bold text-neutral-dark font-montserrat">
                        {taskData.duracao} min
                    </p>
                </div>
            </div>

            {/* Feedback de Validação */}
            <div className="bg-[#F0FDF4] border border-green-200 p-6 rounded-[20px] flex gap-3 items-start">
                <CheckCircle className="text-green-600 shrink-0 mt-1" size={20} />
                <div>
                    <h4 className="text-green-800 font-bold font-montserrat text-sm">Pronto para publicar</h4>
                    <p className="text-green-700 text-xs font-montserrat mt-1">
                        Todos os campos obrigatórios foram preenchidos. Ao clicar em publicar, a tarefa ficará visível para os alunos imediatamente.
                    </p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
}

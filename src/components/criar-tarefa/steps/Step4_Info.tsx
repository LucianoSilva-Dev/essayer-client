"use client";

import React from "react";
import { useCreateTask } from "../CreateTaskContext";
import { cn } from "@/lib/utils";
import { Timer, FileText } from "lucide-react";

export function Step4_Info() {
  const { taskData, updateTaskData } = useCreateTask();

  // Opções rápidas de tempo (em minutos)
  const quickTimes = [
    { label: "1h", value: 60 },
    { label: "1h 30m", value: 90 },
    { label: "2h", value: 120 },
    { label: "3h", value: 180 },
  ];

  return (
    <div className="flex flex-col gap-10 max-w-4xl mx-auto pb-20 animate-in fade-in slide-in-from-right-8 duration-500">
      
      {/* ===== BLOCO 1: DURAÇÃO DA PROVA ===== */}
      <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 space-y-6">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 bg-[#E5EFF0] rounded-full flex items-center justify-center text-[#075F70]">
                <Timer size={24} />
            </div>
            <div>
                <h2 className="font-montserrat font-semibold text-[24px] text-[#3C3C3C]">
                    Duração da Tarefa
                </h2>
                <p className="text-gray-500 text-sm font-montserrat">
                    Quanto tempo o aluno terá para escrever após iniciar?
                </p>
            </div>
        </div>

        <div className="space-y-4">
            {/* Botões Rápidos */}
            <div className="flex flex-wrap gap-3">
                {quickTimes.map((time) => (
                    <button
                        key={time.value}
                        onClick={() => updateTaskData({ duracao: time.value })}
                        className={cn(
                            "px-6 py-2 rounded-full font-medium transition-all font-montserrat",
                            taskData.duracao === time.value
                                ? "bg-[#075F70] text-white shadow-md transform scale-105"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        )}
                    >
                        {time.label}
                    </button>
                ))}
            </div>

            {/* Input Manual */}
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl max-w-md">
                <span className="text-gray-500 font-montserrat">Personalizado (min):</span>
                <input
                    type="number"
                    min={10}
                    value={taskData.duracao}
                    onChange={(e) => updateTaskData({ duracao: Number(e.target.value) })}
                    className="bg-transparent font-bold text-[#3C3C3C] text-lg outline-none w-20 text-right border-b border-gray-300 focus:border-[#075F70]"
                />
                <span className="text-[#075F70] font-bold font-montserrat">minutos</span>
            </div>
        </div>
      </div>

      {/* ===== BLOCO 2: DESCRIÇÃO / INSTRUÇÕES ===== */}
      <div className="bg-white p-8 rounded-[30px] shadow-sm border border-gray-100 space-y-6 flex-1">
        <div className="flex items-center gap-3 border-b border-gray-100 pb-4">
            <div className="w-12 h-12 bg-[#E5EFF0] rounded-full flex items-center justify-center text-[#075F70]">
                <FileText size={24} />
            </div>
            <div>
                <h2 className="font-montserrat font-semibold text-[24px] text-[#3C3C3C]">
                    Instruções da Tarefa
                </h2>
                <p className="text-gray-500 text-sm font-montserrat">
                    Adicione detalhes, regras ou observações para os alunos.
                </p>
            </div>
        </div>

        <textarea
            value={taskData.descricao}
            onChange={(e) => updateTaskData({ descricao: e.target.value })}
            placeholder="Ex: A redação deve seguir o modelo ENEM. Prestem atenção à competência 1..."
            className="w-full min-h-[200px] p-6 text-[16px] text-[#3C3C3C] bg-gray-50 rounded-2xl border-2 border-transparent focus:border-[#075F70] focus:bg-white transition-all outline-none font-montserrat resize-y leading-relaxed"
        />
      </div>

    </div>
  );
}

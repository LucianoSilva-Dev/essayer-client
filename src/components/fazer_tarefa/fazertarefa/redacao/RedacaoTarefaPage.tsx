"use client";

import React, { useState } from "react";
import { Montserrat } from "next/font/google";
import { BookOpen } from "lucide-react"; // Ícone para textos motivacionais
import RedacaoHeader from "./RedacaoHeader";
import RedacaoEditorArea from "./RedacaoEditorArea";
import RedacaoFooter from "./RedacaoFooter";

// Configuração da fonte
const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// Mock do Tema (Futuramente virá da API via tarefaId)
const MOCK_TEMA = "Envelhecimento populacional e seus impactos econômicos e sociais";

export default function RedacaoTarefaPage({ tarefaId }: { tarefaId: string }) {
  const [texto, setTexto] = useState("");

  // Lógica simples de contagem de palavras
  const countWords = (str: string) => {
    return str.trim().split(/\s+/).filter((word) => word.length > 0).length;
  };

  const wordCount = countWords(texto);

  return (
    <main className={`w-full min-h-screen bg-[#F2F2F2] flex flex-col items-center py-8 px-4 ${montserrat.className}`}>
      
      {/* 1. Título do Tema (Fora do Card) */}
      <div className="mb-6 w-full max-w-[1000px] text-center">
        <RedacaoHeader tema={MOCK_TEMA} />
      </div>

      {/* 2. Área Cinza Principal (Container) */}
      <div className="w-full max-w-[1000px] bg-[#E5E5E5] rounded-[20px] p-4 md:p-8 shadow-sm flex flex-col gap-4 relative">
        
        {/* Botão de Textos Motivacionais (Canto Superior Direito) */}
        <div className="flex justify-end mb-2">
          <button className="flex items-center gap-2 text-gray-700 hover:text-[#0F5F68] transition-colors font-medium text-sm md:text-base">
            <BookOpen size={20} />
            <span>Textos motivacionais</span>
          </button>
        </div>

        {/* 3. Área de Edição (Papel Branco) */}
        <div className="w-full h-[60vh] bg-white rounded-[15px] shadow-sm overflow-hidden">
           <RedacaoEditorArea 
             value={texto} 
             onChange={setTexto} 
           />
        </div>

        {/* 4. Footer (Contador + Botão Finalizar) */}
        <RedacaoFooter wordCount={wordCount} maxWords={400} />

      </div>
    </main>
  );
}
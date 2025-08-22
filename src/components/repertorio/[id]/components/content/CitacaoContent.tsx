import type { Citacao } from "@/types/repertorio";
import { Quote } from "lucide-react";

interface CitacaoContentProps {
  repertorio: Citacao;
}

export function CitacaoContent({ repertorio }: CitacaoContentProps) {
  return (
    <div className="space-y-6">
      <div className="text-center border-b border-[#CA9C60] pb-6">
         <div className="flex items-center justify-center mb-4">
          <Quote size={28} className="text-[#CA9C60] mr-3" />
          <span className="text-lg font-medium text-[#CA9C60]">Citação</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{repertorio.autoria}</h1>
      </div>
      <div className="bg-gray-50 border-l-4 border-[#CA9C60] p-6 md:p-8 rounded-r-lg">
        <blockquote className="text-xl md:text-2xl text-gray-800 italic leading-relaxed">
          &quot;{repertorio.citacao}&quot;
        </blockquote>
      </div>
      {repertorio.fonte && (
        <div>
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Fonte</h2>
          <p className="text-gray-600 italic text-base md:text-lg">{repertorio.fonte}</p>
        </div>
      )}
    </div>
  );
}

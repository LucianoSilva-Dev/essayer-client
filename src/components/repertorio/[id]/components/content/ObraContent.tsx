import type { Obra } from "@/types/repertorio";
import { BookOpen } from "lucide-react";

interface ObraContentProps {
  repertorio: Obra;
}

export function ObraContent({ repertorio }: ObraContentProps) {
  return (
    <div className="space-y-6">
      <div className="text-center border-b border-[#CA9C60] pb-6">
        <div className="flex items-center justify-center mb-4">
          <BookOpen size={28} className="text-[#CA9C60] mr-3" />
          <span className="text-lg font-medium text-[#CA9C60]">Obra ({repertorio.tipoObra})</span>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">{repertorio.titulo}</h1>
        <p className="text-lg md:text-xl text-gray-600">Por {repertorio.autoria}</p>
      </div>
      <div>
        <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-4">Sinopse</h2>
        <pre className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-wrap font-sans">
          {repertorio.sinopse}
        </pre>
      </div>
    </div>
  );
}

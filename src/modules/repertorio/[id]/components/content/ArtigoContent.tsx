import type { Artigo } from "@/types/repertorio";

interface ArtigoContentProps {
  repertorio: Artigo;
}

export function ArtigoContent({ repertorio }: ArtigoContentProps) {
  return (
    <div className="space-y-8">
      <div>
        {/* Ajustado para font-medium (menos agressivo que bold) */}
        <h2 className="text-xl md:text-2xl font-medium text-gray-900 mb-4 font-montserrat">
          Síntese
        </h2>
        
        {/* Conteúdo em Open Sans */}
        <div className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-wrap font-opensans font-normal">
          {repertorio.sintese}
        </div>
      </div>

      <div>
        {/* "Por" agora com peso normal */}
        <h2 className="text-xl md:text-2xl font-normal text-gray-900 mb-2 font-montserrat">
            Por <span className="font-regular text-gray-700">{repertorio.autoria}</span>
        </h2>
      </div>

      {repertorio.fonte && (
         <p className="text-gray-600 text-sm font-montserrat font-light">
            <span className="font-medium">Fonte:</span> {repertorio.fonte}
         </p>
      )}
    </div>
  );
}
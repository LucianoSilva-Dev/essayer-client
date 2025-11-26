import type { Citacao } from "@/types/repertorio";

interface CitacaoContentProps {
  repertorio: Citacao;
}

export function CitacaoContent({ repertorio }: CitacaoContentProps) {
  return (
    <div className="space-y-8">
      <div className="bg-gray-50 border-l-4 border-[#0C8462] p-6 md:p-8 rounded-r-lg my-4">
        <blockquote className="text-xl md:text-2xl text-gray-800 italic leading-relaxed font-opensans">
          &quot;{repertorio.citacao}&quot;
        </blockquote>
      </div>
      
      <div>
         <h2 className="text-xl md:text-2xl font-light text-gray-900 mb-2 font-montserrat">
             Por <span className="font-regular">{repertorio.autoria}</span>
         </h2>
         
         {repertorio.fonte && (
            <p className="text-gray-600 text-sm font-montserrat">
               <span className="font-regular">Fonte:</span> {repertorio.fonte}
            </p>
         )}
      </div>
    </div>
  );
}
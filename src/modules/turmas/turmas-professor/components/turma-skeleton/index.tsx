export default function TurmasSkeleton() {
  return (
    <div className="grid grid-cols-3 gap-8 pt-6 w-full min-h-[calc(100vh-80px)] pb-10 pr-12 animate-pulse">
      
      {/* --- COLUNA ESQUERDA (Lista de Turmas) --- */}
      <section className="col-span-1 p-2 md:p-6 flex flex-col h-full relative z-50">
        
        {/* Cabeçalho Fake */}
        <div className="flex justify-between items-center pb-3 mb-2 border-b border-gray-100 gap-2">
          <div className="h-6 w-32 bg-gray-200 rounded-md" /> 
          <div className="flex items-center gap-2">
             <div className="h-6 w-16 bg-gray-200 rounded-full" /> 
             <div className="h-5 w-[1px] bg-gray-200 mx-1" />
             <div className="h-8 w-8 bg-gray-200 rounded-full" /> 
          </div>
        </div>

        {/* Lista Fake */}
        <div className="flex-1 w-full pt-1 space-y-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="p-3 bg-white border border-gray-100 rounded-[20px] flex items-center gap-3">
              <div className="h-14 w-14 bg-gray-200 rounded-xl shrink-0" />
              <div className="flex flex-col flex-1 gap-2">
                <div className="h-4 w-3/4 bg-gray-200 rounded" />
                <div className="h-3 w-1/2 bg-gray-200 rounded" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- COLUNA DIREITA --- */}
      <div className="col-span-2 flex flex-col gap-8">
        
        {/* Card Criar Turma (Ajustado para 260px) */}
        <div className="w-full h-[260px] bg-white border border-gray-100 rounded-[32px] mt-6 p-6 flex items-center relative overflow-hidden">
            <div className="w-3/5 space-y-4 z-10">
                {/* Título */}
                <div className="h-8 w-3/4 bg-gray-200 rounded-lg" />
                {/* Descrição */}
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-2/3 bg-gray-200 rounded" />
                {/* Botão */}
                <div className="h-12 w-48 bg-gray-200 rounded-full mt-4" />
            </div>
            {/* Espaço da Imagem */}
            <div className="absolute right-0 bottom-0 w-[40%] h-[90%] bg-gray-100 rounded-tl-[80px] opacity-50" />
        </div>
        
        {/* Grid Inferior */}
        <div className="grid grid-cols-4 gap-6 items-stretch h-full">
          
          {/* Card Central de Correções */}
          <div className="col-span-2 min-h-[300px] bg-white border border-gray-100 rounded-[32px] p-6 flex flex-col gap-4">
             <div className="flex items-center gap-3 mb-2 pb-3 border-b border-gray-50">
                <div className="w-10 h-10 bg-gray-200 rounded-xl shrink-0" />
                <div className="w-40 h-6 bg-gray-200 rounded-lg" />
             </div>
             <div className="flex-1 space-y-3">
               {[1, 2, 3].map((i) => (
                   <div key={i} className="w-full h-16 bg-gray-50 rounded-xl" />
               ))}
             </div>
             <div className="w-32 h-4 bg-gray-200 rounded mx-auto mt-2" />
          </div>
          
          {/* Card Entrar em Turma */}
          <div className="col-span-2 min-h-[300px] bg-white border border-gray-100 rounded-[32px] p-7 flex flex-col justify-between relative overflow-hidden">
             <div className="space-y-5 z-10 w-3/4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gray-200 rounded-xl shrink-0" />
                    <div className="w-32 h-6 bg-gray-200 rounded-lg" />
                </div>
                <div className="space-y-2">
                    <div className="w-full h-4 bg-gray-200 rounded" />
                    <div className="w-3/4 h-4 bg-gray-200 rounded" />
                </div>
                <div className="w-24 h-4 bg-gray-200 rounded mt-4" />
             </div>
             <div className="absolute bottom-0 right-0 w-[50%] h-[70%] bg-gray-100 rounded-tl-full opacity-60" />
          </div>
          
        </div>
      </div>
    </div>
  );
}
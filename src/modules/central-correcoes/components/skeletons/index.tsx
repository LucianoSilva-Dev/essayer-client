"use client";

export function CentralCorrecoesSkeleton() {
  return (
    <div className="w-full animate-pulse">
      
      {/* 1. HEADER (Botão Voltar + Título) */}
      <div className="mb-8">
        <div className="h-5 w-40 bg-gray-200 rounded mb-4" /> {/* Botão Voltar */}
        <div className="flex flex-col md:flex-row md:items-baseline gap-3">
            <div className="h-8 w-48 bg-gray-200 rounded-lg" /> {/* "Central de Correções" */}
            <div className="h-8 w-64 bg-gray-200 rounded-lg" /> {/* Seletor de Turma */}
        </div>
        <div className="h-4 w-96 bg-gray-100 rounded mt-3" /> {/* Descrição */}
      </div>

      {/* 2. FILTROS (Atualizado para Smart Tabs Independentes) */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-6 mb-8">
         
         {/* Botões Esquerda (Imitando os botões rounded-2xl) */}
         <div className="flex items-center gap-3 w-full md:w-auto">
            {/* Botão 1 Mock (Ativas) - Mais escuro para simular ativo */}
            <div className="w-36 h-12 bg-gray-300 rounded-2xl" /> 
            {/* Botão 2 Mock (Encerradas) - Mais claro */}
            <div className="w-40 h-12 bg-gray-100 rounded-2xl border border-gray-200" /> 
         </div>

         {/* Search Bar Mock (Direita - Imitando rounded-full) */}
         <div className="w-full md:w-96">
            <div className="h-12 bg-gray-200 rounded-full" />
         </div>
      </div>

      {/* 3. GRID DE CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 pb-20">
        {/* Gerar 8 cards de loading */}
        {Array.from({ length: 8 }).map((_, i) => (
          <div 
            key={i} 
            className="bg-gray-50 rounded-[24px] p-6 flex flex-col justify-between min-h-[280px] border border-gray-100 relative overflow-hidden"
          >
            {/* Topo do Card */}
            <div>
               <div className="flex justify-between items-start mb-2 h-10">
                 <div className="h-4 w-20 bg-gray-200 rounded mt-1" /> {/* Label Tipo */}
                 {/* O botão de seta é invisível por padrão no componente real, então não precisamos mockar ele forte aqui, ou podemos por um círculo sutil */}
                 <div className="w-10 h-10 rounded-full bg-gray-200 opacity-20" /> 
               </div>
               
               <div className="h-6 w-full bg-gray-200 rounded mb-2" /> {/* Título L1 */}
               <div className="h-6 w-3/4 bg-gray-200 rounded mb-2" /> {/* Título L2 */}
               <div className="h-6 w-1/2 bg-gray-200 rounded mb-4" /> {/* Título L3 */}
            </div>

            {/* Footer */}
            <div className="pt-4 border-t border-gray-200 flex justify-between h-20">
                {/* Esquerda: Label + Avatares */}
                <div className="flex flex-col justify-between w-1/2">
                    <div className="h-3 w-12 bg-gray-200 rounded" /> {/* Label Envios */}
                    <div className="flex -space-x-3 pb-1">
                        <div className="w-9 h-9 rounded-full bg-gray-300 ring-2 ring-white" />
                        <div className="w-9 h-9 rounded-full bg-gray-300 ring-2 ring-white" />
                        <div className="w-9 h-9 rounded-full bg-gray-300 ring-2 ring-white" />
                    </div>
                </div>

                {/* Direita: Contador + Data */}
                <div className="flex flex-col items-end justify-between w-1/2">
                    <div className="h-7 w-16 bg-gray-300 rounded" /> {/* Contador Grande */}
                    <div className="flex flex-col items-end gap-1 pb-1">
                        <div className="h-2 w-10 bg-gray-100 rounded" />
                        <div className="h-3 w-20 bg-gray-200 rounded" /> {/* Data */}
                    </div>
                </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
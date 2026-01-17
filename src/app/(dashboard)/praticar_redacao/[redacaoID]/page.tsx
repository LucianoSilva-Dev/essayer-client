
import { RedacaoPage } from '@/modules/redacao/editar/components/content';
import { RedacaoTema } from '@/modules/redacao/editar/components/tema';

export const metadata = {
  title: 'Correção',
};

export default async function PraticarRedacaoIdPage({
  params,
}: {
  // ALTERAÇÃO 1: Definir o tipo como Promise
  params: Promise<{ redacaoID: string }>;
}) {
  
  // ALTERAÇÃO 2: Aguardar a resolução dos parâmetros antes de usar
  const { redacaoID } = await params;

  return (
    <main className="flex flex-col items-center min-h-screen py-12 px-4 pb-20">
      
      {/* Título (Usa a variável 'redacaoID' já resolvida) */}
      <div className="w-full max-w-5xl mx-auto z-10 relative">
        <RedacaoTema id={redacaoID} />
      </div>

      {/* Container Principal */}
      <div className="relative w-full max-w-6xl flex justify-center">
        
        {/* Gradiente de fundo */}
        <div 
          className="absolute w-full max-w-6xl
                     top-12
                     bottom-20 
                     bg-gradient-to-b from-[#F9FAFB] via-brand-teal-dark/20 to-brand-teal-dark 
                     opacity-60 rounded-[70px] -z-0"
        />

        {/* O Card do Editor */}
        <div className="relative w-full max-w-5xl z-10 mt-6">
          <RedacaoPage id={redacaoID} />
        </div>
      </div>
    </main>
  );
}
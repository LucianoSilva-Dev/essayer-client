// RedacoesCriadasList.tsx
import { RedacaoCard, RedacaoStatus } from './RedacaoCard';
import { Search } from 'lucide-react';

// Define a interface para um item de Redacao (exportada para uso em CriarRedacaoPage)
export interface RedacaoItem {
  id: string;
  tema: string;
  status: RedacaoStatus;
  finalizada: boolean;
  duration: number; // Campo de duração adicionado
}

interface RedacoesCriadasListProps {
    redacoes: RedacaoItem[];
}

export function RedacoesCriadasList({ redacoes }: RedacoesCriadasListProps) {
  // A lista agora é recebida via props do componente pai

  return (
    <section className="space-y-8">
      {/* Cabeçalho e Pesquisa (sem alteração funcional) */}
      <div className={`flex flex-col md:flex-row justify-between items-center gap-4`}>
        <h2 className="text-[28px] font-medium text-[#3C3C3C]"> 
          Redações criadas
        </h2>

        <div 
          className="w-full md:max-w-md h-[56px] flex items-center gap-3 p-2 bg-white rounded-[40px] shadow-sm border border-gray-200"
        >
          <button 
            className="w-10 h-10 bg-[#075F70] rounded-full flex items-center justify-center flex-shrink-0"
          >
            <Search size={20} className="text-white" />
          </button>
          
          <input
            type="text"
            placeholder="Pesquise por uma redação criada"
            className="w-full bg-transparent text-[#898787] placeholder:text-[#898787] text-[24px] font-light focus:outline-none"
          />
        </div>
      </div>

      {/* Grid de Redações */}
      {redacoes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-7"> 
          {/* Adicionando transição de entrada para os cards */}
          {redacoes.map((redacao, index) => (
            // Aplica a animação com delay sequencial para fluidez
            <div 
                key={redacao.id} 
                style={{
                    animation: `fadeInUp 0.5s ease-out forwards`, 
                    animationDelay: `${index * 0.05}s`,
                    opacity: 0,
                }}
                > 
                <RedacaoCard
                  href={`/praticar-redacao/${redacao.id}`}
                  tema={redacao.tema}
                  status={redacao.status as RedacaoStatus}
                  finalizada={redacao.finalizada}
                />
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">
          Nenhuma redação criada ainda.
        </p>
      )}

      {/* Keyframe para animação de entrada dos cards (surgimento suave) */}
      <style jsx global>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
}
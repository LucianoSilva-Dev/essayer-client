import { RedacaoCard, RedacaoStatus } from './RedacaoCard';
import { Search } from 'lucide-react';

// (Mock de dados permanece o mesmo)
const mockRedacoes = [
  { id: '1', tema: 'O impacto das redes sociais na formação da identidade dos jovens', status: 'pendente', finalizada: true },
  { id: '2', tema: 'O impacto das redes sociais na formação da identidade dos jovens', status: 'completa', finalizada: true },
  { id: '3', tema: 'O impacto das redes sociais na formação da identidade dos jovens', status: 'sem_correcoes', finalizada: false },
  { id: '4', tema: 'O impacto das redes sociais na formação da identidade dos jovens', status: 'erro', finalizada: true },
];

export function RedacoesCriadasList() {
  const redacoes = mockRedacoes; 

  return (
    <section className="space-y-6">
      {/* Cabeçalho e Pesquisa */}
      <div className="flex flex-col md:flex-row justify-between items-center gap-4">
        <h2 className="text-2xl font-semibold text-gray-800">
          Redações criadas
        </h2>

        {/* Barra de pesquisa */}
        <div 
          className="w-full md:max-w-sm flex items-center gap-2
                     p-2 bg-white rounded-[40px] shadow-sm border border-gray-200"
        >
          {/* Botão redondo da lupa */}
          <button 
            className="w-9 h-9 bg-[#075F70] rounded-full flex items-center justify-center
                       flex-shrink-0"
          >
            <Search size={18} className="text-white" />
          </button>
          
          <input
            type="text"
            placeholder="Pesquise por uma redação criada"
            // ALTERAÇÃO: Adicionado 'text-right' e um padding 'pr-2'
            className="w-full bg-transparent text-gray-700 placeholder:text-gray-500 
                       text-sm focus:outline-none"
          />
        </div>
      </div>

      {/* Grid de Redações (Sem alteração) */}
      {redacoes.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {redacoes.map((redacao) => (
            <RedacaoCard
              key={redacao.id}
              href={`/praticar-redacao/${redacao.id}`}
              tema={redacao.tema}
              status={redacao.status as RedacaoStatus}
              finalizada={redacao.finalizada}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 py-10">
          Nenhuma redação criada ainda.
        </p>
      )}
    </section>
  );
}
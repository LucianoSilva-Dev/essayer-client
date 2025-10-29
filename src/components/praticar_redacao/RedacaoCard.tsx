// src/components/praticar-redacao/RedacaoCard.tsx

import Link from 'next/link';
// ALTERAÇÃO: Removemos a importação de motion, pois não será usada.
// import { motion } from 'framer-motion'; 

export type RedacaoStatus = 'pendente' | 'completa' | 'sem_correcoes' | 'erro';

interface RedacaoCardProps {
  href: string;
  tema: string;
  status: RedacaoStatus;
  finalizada: boolean;
}

const statusConfig = {
  pendente: { text: 'Correção pendente', className: 'bg-yellow-100 text-yellow-800' },
  completa: { text: 'Correção completa', className: 'bg-cyan-100 text-cyan-800' },
  sem_correcoes: { text: 'Sem correções', className: 'bg-gray-200 text-gray-800' },
  erro: { text: 'Erro de correção', className: 'bg-red-100 text-red-800' },
};

export function RedacaoCard({ href, tema, status, finalizada }: RedacaoCardProps) {
  const config = statusConfig[status];

  return (
    // ALTERAÇÃO: Voltar para <Link>.
    // ALTERAÇÃO: Adicionar classes Tailwind para transição e transformação no hover.
    <Link
      href={href}
      className="block bg-white p-6 rounded-[32px] shadow-sm border border-gray-100
                 transition-all duration-200 ease-out // Adiciona uma transição suave
                 hover:shadow-lg // Aumenta a sombra no hover para dar profundidade
                 hover:-translate-y-1 // Move o card 1 pixel para cima
                 hover:scale-[1.01] // Aumenta o card em 1% (menos que 1.02 para ser mais sutil)
                 hover:border-teal-200 
                 group cursor-pointer" 
    >
      <div className="flex flex-col justify-between h-full space-y-5">
        {/* Conteúdo Superior */}
        <div className="space-y-1.5">
          <p className="text-sm font-medium text-gray-500">
            Tema
          </p>
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-3 group-hover:text-teal-700">
            {tema}
          </h3>
        </div>

        {/* Conteúdo Inferior (Status) */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-100">
          
          {/* Tag de Status */}
          <span
            className={`px-3.5 py-1.5 text-xs font-semibold rounded-[40px] ${config.className}`}
          >
            {config.text}
          </span>

          {/* Texto de Finalização */}
          <span
            className={`text-sm font-medium ${
              finalizada ? 'text-gray-500' : 'text-yellow-600'
            }`}
          >
            {finalizada ? 'Finalizada' : 'Redação não finalizada'}
          </span>
        </div>
      </div>
    </Link>
  );
}
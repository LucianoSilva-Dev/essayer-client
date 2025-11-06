import Link from 'next/link';

export type RedacaoStatus = 'pendente' | 'completa' | 'sem_correcoes' | 'erro';

interface RedacaoCardProps {
  href: string;
  tema: string;
  status: RedacaoStatus;
  finalizada: boolean;
}

// ALTERAÇÃO: Ajuste de cores, backgrounds e tamanhos para os badges (tags de status) do Figma
const statusConfig = {
  pendente: { text: 'Correção pendente', className: 'bg-yellow-100 text-yellow-800' },
  completa: { text: 'Correção completa', className: 'bg-cyan-100 text-cyan-800' },
  sem_correcoes: { text: 'Sem correções', className: 'bg-gray-200 text-gray-800' },
  erro: { text: 'Erro de correção', className: 'bg-red-100 text-red-800' }, 
};

export function RedacaoCard({ href, tema, status, finalizada }: RedacaoCardProps) {
  const config = statusConfig[status];

  return (
    <Link
      href={href}
      // ALTERAÇÃO: Padding (24px 28px 20px) e border-radius ajustados (48px)
      className="block bg-white p-[24px] rounded-[48px] shadow-sm border border-gray-100
                 transition-all duration-200 ease-out 
                 hover:shadow-lg 
                 hover:-translate-y-1 
                 hover:scale-[1.01] 
                 hover:border-teal-200 
                 group cursor-pointer" 
    >
      <div className="flex flex-col justify-between h-full space-y-7"> {/* Aumento do espaçamento */}
        {/* Conteúdo Superior */}
        <div className="space-y-3">
          {/* ALTERAÇÃO: Fonte do tema (32px, 500), cor (898787) */}
          <p className="text-[32px] font-medium text-[#898787]"> 
            Tema
          </p>
          {/* ALTERAÇÃO: Fonte do título (28px, 500) e cor (3C3C3C) */}
          <h3 className="text-[28px] font-medium text-[#3C3C3C] line-clamp-3 group-hover:text-teal-700 leading-normal">
            {tema}
          </h3>
        </div>

        {/* Conteúdo Inferior (Status) */}
        {/* ALTERAÇÃO: Remoção da borda superior */}
        <div className="flex justify-between items-center pt-2">
          
          {/* Tag de Status */}
          {/* ALTERAÇÃO: Padding, font-size (20px) e border-radius ajustados */}
          <span
            className={`px-4 py-3 text-[20px] font-normal rounded-[40px] ${config.className}`}
          >
            {config.text}
          </span>

          {/* Texto de Finalização */}
          {/* ALTERAÇÃO: Font-size (16px), peso (500), e cor para Não Finalizada (CA9C60) */}
          <span
            className={`text-base font-medium ${
              finalizada ? 'text-[#3C3C3C]' : 'text-[#CA9C60]'
            }`}
          >
            {finalizada ? 'Finalizada' : 'Redação não finalizada'}
          </span>
        </div>
      </div>
    </Link>
  );
}
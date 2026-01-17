import Link from 'next/link';
import { Trash2 } from 'lucide-react';

export type RedacaoStatus = 'pendente' | 'completa' | 'sem_correcoes' | 'erro';

interface RedacaoCardProps {
  href: string;
  tema: string;
  status: RedacaoStatus;
  finalizada: boolean;
  isDeleteMode?: boolean; 
  onDelete?: () => void;
}

const statusConfig = {
  pendente: { text: 'Correção pendente', className: 'bg-yellow-100 text-yellow-800' },
  completa: { text: 'Correção completa', className: 'bg-cyan-100 text-cyan-800' },
  sem_correcoes: { text: 'Sem correções', className: 'bg-gray-100 text-gray-600' },
  erro: { text: 'Erro de correção', className: 'bg-red-100 text-red-800' },
};

export function RedacaoCard({ href, tema, status, finalizada, isDeleteMode = false, onDelete }: RedacaoCardProps) {
  const config = statusConfig[status];

  // Componente interno do card para evitar repetição de código
  const CardContent = () => (
    <div className="flex flex-col justify-between h-full space-y-6">
      <div className="space-y-2">
        <p className="text-sm uppercase tracking-wide font-semibold text-[#898787]">
          Tema
        </p>
        <h3 className="text-2xl font-semibold text-neutral-dark line-clamp-3 leading-snug min-h-[4.5rem] group-hover:text-brand-teal-dark">
          {tema}
        </h3>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-gray-50 mt-auto">
        <span className={`px-4 py-2 text-sm font-medium rounded-full ${config.className}`}>
          {config.text}
        </span>
        <span className={`text-sm font-semibold ${finalizada ? 'text-neutral-dark' : 'text-[#CA9C60]'}`}>
          {finalizada ? 'Finalizada' : 'Em andamento'}
        </span>
      </div>

      {/* Overlay de Exclusão */}
      {isDeleteMode && (
        <div className="absolute inset-0 bg-red-500/10 rounded-[40px] flex items-center justify-center backdrop-blur-[1px] border-2 border-red-400 transition-all">
          <div className="bg-white p-4 rounded-full shadow-lg">
            <Trash2 className="text-red-500" size={32} />
          </div>
        </div>
      )}
    </div>
  );

  // Se estiver em modo de deleção, renderiza uma div clicável ao invés de Link
  if (isDeleteMode) {
    return (
      <div
        onClick={(e) => {
          e.stopPropagation();
          onDelete && onDelete();
        }}
        className="block bg-white p-8 rounded-[40px] shadow-sm border border-red-200 relative cursor-pointer h-full animate-shake select-none transform transition-transform"
      >
        <CardContent />
        <style jsx>{`
          @keyframes shake {
            0% { transform: rotate(0deg); }
            25% { transform: rotate(1deg); }
            50% { transform: rotate(0deg); }
            75% { transform: rotate(-1deg); }
            100% { transform: rotate(0deg); }
          }
          .animate-shake {
            animation: shake 0.3s infinite ease-in-out;
          }
        `}</style>
      </div>
    );
  }

  // Comportamento normal
  return (
    <Link
      href={href}
      className="block bg-white p-8 rounded-[40px] shadow-sm border border-gray-100 relative transition-all duration-200 ease-out font-montserrat hover:shadow-md hover:-translate-y-1 hover:border-teal-200 group cursor-pointer h-full"
    >
      <CardContent />
    </Link>
  );
}
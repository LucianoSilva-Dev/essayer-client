import { Competencia } from '@/types/correcao'

interface CompetenciaCardProps {
  competencia: Competencia
  isActive: boolean
  onClick: () => void
}

export function CompetenciaCard({
  competencia,
  isActive,
  onClick,
}: CompetenciaCardProps) {
  return (
    <button
      onClick={onClick}
      className={`cursor-pointer flex-shrink-0 w-64 min-h-36 p-4 rounded-[48px] shadow-sm border transition-all duration-300
      ${
        isActive
          ? 'bg-[#075F70] text-white border-transparent'
          : 'bg-white text-gray-700 border-gray-200 hover:shadow-md'
      }`}
    >
      {/* Nota da competência */}
      <div
        className={`flex justify-between items-center mb-2 ${
          isActive ? 'text-white' : 'text-gray-500'
        }`}
      >
        <span className="text-sm font-medium">{competencia.nome}</span>
        <span className="text-sm font-medium">
          {competencia.nota}/{200}
        </span>
      </div>

      {/* Título/Descrição Centralizados */}
      <div className="text-center">
        <p
          className={`font-semibold ${
            isActive ? 'text-white' : 'text-gray-900'
          }`}
        >
          {competencia.descricao}
        </p>
      </div>
    </button>
  )
}
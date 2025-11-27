import { EixoOptions } from "@/constants/eixos";

interface EixoSelectorProps {
  selectedEixos: string[];
  onEixoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

export function EixoSelector({ selectedEixos, onEixoChange, error }: EixoSelectorProps) {
  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Eixos Temáticos <span className="text-red-500">*</span>
      </label>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
        {EixoOptions.map((eixo) => (
          <label key={eixo.nome} className="flex items-center space-x-2 p-2 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              name="eixos"
              value={eixo.nome}
              checked={selectedEixos?.includes(eixo.nome) || false}
              onChange={onEixoChange}
              className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="text-sm text-gray-700">{eixo.nome}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
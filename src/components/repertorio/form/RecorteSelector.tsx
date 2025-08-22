interface RecorteSelectorProps {
  recorteOptions: string[];
  selectedRecortes: string[];
  hasSelectedEixos: boolean;
  onRecorteChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  maxRecortes: number;
  error?: string;
}

export function RecorteSelector({
  recorteOptions,
  selectedRecortes,
  hasSelectedEixos,
  onRecorteChange,
  maxRecortes,
  error,
}: RecorteSelectorProps) {
  const isDisabled = !hasSelectedEixos;

  return (
    <div className="mb-5">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Recortes <span className="text-red-500">*</span> (mín. 1, máx. {maxRecortes})
      </label>
      <div className={`grid grid-cols-2 md:grid-cols-3 gap-2 ${isDisabled ? 'opacity-50 cursor-not-allowed' : ''}`}>
        {recorteOptions.map((recorte) => (
          <label key={recorte} className="flex items-center space-x-2 p-2 rounded-md border border-gray-200 hover:bg-gray-50 cursor-pointer">
            <input
              type="checkbox"
              name="recortes"
              value={recorte}
              checked={selectedRecortes?.includes(recorte) || false}
              onChange={onRecorteChange}
              disabled={isDisabled}
              className="h-4 w-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
            />
            <span className="text-sm text-gray-700">{recorte}</span>
          </label>
        ))}
      </div>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
}
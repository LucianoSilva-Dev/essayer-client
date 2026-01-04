
interface TabsAssuntosProps<T extends string> {
  assuntos: readonly T[];
  ativo: T;
  onSelect: (assunto: T) => void;
}

export function TabsAssuntos<T extends string>({
  assuntos,
  ativo,
  onSelect,
}: TabsAssuntosProps<T>) {
  return (
    <div className="flex flex-col gap-3">
      <h2 className="font-semibold text-gray-800 mb-4">
        Procure pelos assuntos abaixo
      </h2>
      {assuntos.map((a) => (
        <button
          key={a}
          onClick={() => onSelect(a)}
          className={`text-left text-base transition-colors duration-200 ${
            // É aqui que a mágica acontece:
            ativo === a
              ? "text-teal-700 font-semibold" // Estado ATIVO: Cor teal + Bold
              : "text-gray-600"               // Estado INATIVO: Cor cinza + Regular (padrão)
          } hover:text-teal-600`}
        >
          {a}
        </button>
      ))}
    </div>
  );
}
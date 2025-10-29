// src/components/praticar_redacao/editor/RedacaoEditorArea.tsx

interface Props {
  texto: string;
  onTextoChange: (novoTexto: string) => void;
}

export function RedacaoEditorArea({ texto, onTextoChange }: Props) {
  return (
    <div className="flex-1 p-8 md:p-12">
      <textarea
        value={texto}
        onChange={(e) => onTextoChange(e.target.value)}
        placeholder="Comece a digitar aqui..."
        className="w-full h-full min-h-[400px] text-lg text-gray-800 placeholder:text-gray-400
                   resize-none border-none focus:outline-none focus:ring-0"
      />
    </div>
  );
}
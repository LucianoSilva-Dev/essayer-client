// src/components/praticar_redacao/editor/RedacaoEditorArea.tsx

interface Props {
  texto: string;
  onTextoChange: (novoTexto: string) => void;
}

export function RedacaoEditorArea({ texto, onTextoChange }: Props) {
  return (
    // 'typeInsert' do Figma
    // ALTERAÇÃO: Aumentei de 60vh para 70vh para dar mais altura ao card
    <div className="bg-white rounded-[20px] w-full min-h-[70vh]">
      <textarea
        value={texto}
        onChange={(e) => onTextoChange(e.target.value)}
        placeholder="Comece a digitar aqui..."
        // Aumentei aqui também para o textarea preencher
        className="w-full h-full min-h-[70vh] p-6 
                   text-lg text-gray-800 
                   placeholder:text-[#BDB4B4] placeholder:font-normal placeholder:text-xl
                   resize-none border-none focus:outline-none focus:ring-0
                   bg-transparent"
      />
    </div>
  );
}
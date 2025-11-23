interface Props {
  texto: string;
  onTextoChange: (novoTexto: string) => void;
}

export function RedacaoEditorArea({ texto, onTextoChange }: Props) {
  return (
    // ALTERAÇÃO DE ALTURA AQUI:
    // Antes: min-h-[50vh] md:min-h-[60vh]
    // Agora: min-h-[60vh] md:min-h-[75vh] (Ficou bem maior)
    <div className="bg-white rounded-[20px] w-full min-h-[60vh] md:min-h-[90vh] shadow-sm">
      <textarea
        value={texto}
        onChange={(e) => onTextoChange(e.target.value)}
        placeholder="Comece a digitar aqui..."
        // APLIQUEI AS MESMAS ALTURAS NA TEXTAREA PARA ELA OCUPAR TUDO
        className="w-full h-full min-h-[60vh] md:min-h-[75vh] p-6 
                   text-lg text-gray-800 
                   placeholder:text-[#BDB4B4] placeholder:font-normal placeholder:text-xl
                   resize-none border-none focus:outline-none focus:ring-0
                   bg-transparent rounded-[20px]"
      />
    </div>
  );
}
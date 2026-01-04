
interface TituloEDescricaoProps {
  titulo?: string;
  descricao?: string;
}

export function TituloEDescricao({
  titulo = "Perguntas Frequentes",
  descricao = "Tem alguma dúvida? Reunimos aqui as perguntas mais frequentes para te ajudar a encontrar respostas rápidas e diretas.",
}: TituloEDescricaoProps) {
  return (
    <div className="text-center mb-10">
      <h1 className="text-3xl font-bold text-gray-900"> {/* 800 -> 900 (mais escuro) */}
        {titulo.split(" ")[0]}{" "}
        <span className="text-teal-700">{titulo.split(" ")[1]}</span>
      </h1>
      <p className="text-gray-600 mt-3 max-w-2xl mx-auto"> {/* 500 -> 600 (mais escuro) e mt-2 -> mt-3 */}
        {descricao}
      </p>
    </div>
  );
}
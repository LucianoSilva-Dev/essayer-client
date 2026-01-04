import { BookOpen, FileText, Quote } from "lucide-react";
import type { ModeloRepertorio } from "@/types/repertorio";

const modelos = [
  { id: "obra" as ModeloRepertorio, nome: "Obra", desc: "Livros, filmes, peças teatrais e outras obras artísticas", icone: BookOpen },
  { id: "artigo" as ModeloRepertorio, nome: "Artigo", desc: "Artigos científicos, jornalísticos e acadêmicos", icone: FileText },
  { id: "citacao" as ModeloRepertorio, nome: "Citação", desc: "Citações de autores, personalidades e pensadores", icone: Quote },
];

interface RepertorioTypeSelectorProps {
  modeloSelecionado: ModeloRepertorio;
  onModeloChange: (novoModelo: ModeloRepertorio) => void;
  isEditing: boolean;
}

export function RepertorioTypeSelector({ modeloSelecionado, onModeloChange, isEditing }: RepertorioTypeSelectorProps) {
  return (
    <div className="mb-6">
      <label className="block text-sm font-medium text-gray-700 mb-3">
        {isEditing ? "Tipo de Repertório" : "Escolha o tipo de repertório"}
      </label>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {modelos.map((modelo) => {
          const Icone = modelo.icone;
          const isSelected = modeloSelecionado === modelo.id;
          return (
            <button
              key={modelo.id}
              type="button"
              onClick={() => onModeloChange(modelo.id)}
              disabled={isEditing}
              className={`p-4 border-2 rounded-lg text-left transition-colors shadow-md ${
                isSelected ? "border-teal-600 bg-teal-50" : "border-gray-200 hover:border-gray-300"
              } disabled:opacity-70 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:hover:shadow-lg disabled:hover:border-gray-200`}
            >
              <div className="flex items-center mb-2">
                <Icone size={20} className={isSelected ? "text-teal-600" : "text-gray-400"} />
                <span className={`ml-2 font-medium ${isSelected ? "text-teal-600" : "text-gray-700"}`}>
                  {modelo.nome}
                </span>
              </div>
              <p className="text-sm text-gray-500">{modelo.desc}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
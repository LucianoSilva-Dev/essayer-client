import React from "react";
import { Plus } from "lucide-react";

const CriarTarefaButton: React.FC = () => {
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-gray-200 shadow-sm hover:bg-gray-100 transition"
    >
      <Plus size={18} className="text-teal-700" />
      <span className="text-sm font-medium text-gray-800">Criar tarefa</span>
    </button>
  );
};

export default CriarTarefaButton;

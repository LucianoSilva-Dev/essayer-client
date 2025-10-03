import React from "react";

const CriarTarefaButton: React.FC = () => {
  return (
    <button
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md hover:bg-gray-100 transition"
    >
      <span className="text-lg text-gray-800 font-semibold">+</span>
      <span className="text-sm font-medium text-gray-800">Criar tarefa</span>
    </button>
  );
};

export default CriarTarefaButton;

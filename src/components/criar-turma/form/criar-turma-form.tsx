"use client";
import { useState } from "react";
import FormActions from "./FormActions";

export default function CriarTurmaForm() {
  const [nome, setNome] = useState("");
  const [descricao, setDescricao] = useState("");

  return (
    <form className="w-full rounded-t-[50px] bg-white shadow-lg pt-10 px-8 pb-8">
      {/* Seção do nome da turma */}
      <div className="mb-8">
        <label htmlFor="nomeTurma" className="text-xl font-semibold text-[#3C3C3C] mb-3">Nome da turma</label>
        <input
          type="text"
          id="nomeTurma"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-4 border-b-2 border-[#3C3C3C] bg-transparent outline-none placeholder-gray-400 text-lg"
          placeholder="Digite o nome da turma"
        />
        <label htmlFor="nomeTurma" className="text-sm text-gray-600 mb-4">
          Escolha um nome claro e fácil de lembrar para que você e seus alunos encontrem a turma rapidamente.
        </label>
      </div>

      {/* Seção da descrição da turma */}
      <div className="mb-8">
        <label htmlFor="descricao" className="text-xl font-semibold text-[#3C3C3C] mb-3">Descrição da turma</label>
        <textarea
          value={descricao}
          id="descricao"
          onChange={(e) => setDescricao(e.target.value)}
          className="w-full p-4 border-b-2 border-[#3C3C3C] bg-transparent outline-none placeholder-gray-400 resize-none text-lg"
          placeholder="Digite a descrição da turma"
          rows={3}
        />
        <label htmlFor="descricao" className="text-sm text-gray-600 mb-4">
          Explique brevemente o objetivo ou conteúdo da turma, isso ajuda os alunos a saberem o que esperar.
        </label>
      </div>

      {/* Ações do formulário */}
      <FormActions nome={nome} descricao={descricao} />
    </form>
  );
}
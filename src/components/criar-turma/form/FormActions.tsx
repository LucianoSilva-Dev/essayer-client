// FormActions.tsx
"use client";
import CriarTurmaButton from "../components/criar-turma-button";

export default function FormActions({ nome, descricao }: { nome: string; descricao: string }) {
  const criarTurma = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("https://suaapi.com/turma/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nome, descricao }),
    });

    if (res.ok) {
      alert("Turma criada com sucesso!");
    } else {
      const erro = await res.json();
      alert("Erro: " + (erro.error || erro.errors?.join(", ")));
    }
  };

  return (
    <div className="border-t border-gray-300 pt-8">
      <div className="text-center">
        <CriarTurmaButton onClick={criarTurma} disabled={!nome.trim()} />
      </div>
    </div>
  );
}
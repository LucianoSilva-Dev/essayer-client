"use client";
import CriarTurmaButton from "../components/criar-turma-button";

export default function FormActions({ nome, escola }: { nome: string; escola: string }) {
  const criarTurma = async () => {
    const token = localStorage.getItem("token");
    const res = await fetch("https://suaapi.com/turma/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ nome, escola }),
    });

    if (res.ok) {
      alert("Turma criada com sucesso!");
    } else {
      const erro = await res.json();
      alert("Erro: " + (erro.error || erro.errors?.join(", ")));
    }
  };

  return (
    <div className="flex justify-end">
      <CriarTurmaButton onClick={criarTurma} disabled={!nome} />
    </div>
  );
}

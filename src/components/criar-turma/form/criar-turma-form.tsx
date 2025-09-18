"use client";
import { useState } from "react";
import CarrosselImagens from "../components/carrossel-imagens";
import FormActions from "./FormActions";

export default function CriarTurmaForm() {
  const [nome, setNome] = useState("");
  const [escola, setEscola] = useState("");

  return (
    <form className="space-y-6">
      <CarrosselImagens />

      <div>
        <label className="block text-sm font-medium">Nome da turma</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Digite o nome da turma"
        />
      </div>

      <div>
        <label className="block text-sm font-medium">Escola (opcional)</label>
        <input
          type="text"
          value={escola}
          onChange={(e) => setEscola(e.target.value)}
          className="w-full p-2 border rounded"
          placeholder="Digite o nome da escola"
        />
      </div>

      <FormActions nome={nome} escola={escola} />
    </form>
  );
}

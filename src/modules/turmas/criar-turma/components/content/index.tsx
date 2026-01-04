"use client";
import { useState } from "react";
import CriarTurmaForm from "../form";
import CarrosselImagens from "../carrousel";

export default function CriarTurmaPage() {
  const [nome, setNome] = useState("");
  const [escola, setEscola] = useState("");
  const [iconeId, setIconeId] = useState(1); // Inicia com o ID do primeiro ícone

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        {/* Cabeçalho com o carrossel */}
        <div className="text-center mb-8">
          <CarrosselImagens onIconSelect={setIconeId} />
        </div>

        {/* Formulário */}
        <CriarTurmaForm
          nome={nome}
          setNome={setNome}
          escola={escola}
          setEscola={setEscola}
          iconeId={iconeId}
        />
      </div>
    </div>
  );
}
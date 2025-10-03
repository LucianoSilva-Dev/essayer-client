"use client";

import { useEffect, useState } from "react";
import IntegranteItem from "./integrante-item";
import ConvidarEstudante from "./convidar-estudante";
import { getAlunosTurma, removeAluno } from "../../../apiCalls/turma-aberta-prof";
import { Aluno } from "../../../apiCalls/turma-aberta-prof/types";

interface Props {
  turmaId: string;
}

export default function IntegranteList({ turmaId }: Props) {
  const [integrantes, setIntegrantes] = useState<Aluno[]>([]);

  useEffect(() => {
    async function fetchIntegrantes() {
      try {
        const data = await getAlunosTurma(turmaId);
        setIntegrantes(data);
      } catch (error) {
        console.error("Erro ao carregar integrantes:", error);
      }
    }
    fetchIntegrantes();
  }, [turmaId]);

  const handleRemove = async (id: string) => {
    try {
      await removeAluno(turmaId, id);
      setIntegrantes((prev) => prev.filter((aluno) => aluno.id !== id));
    } catch (error) {
      console.error("Erro ao remover aluno:", error);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-800">Integrantes</h2>
      <div className="flex flex-col gap-2">
        {integrantes.map((aluno) => (
          <IntegranteItem
            key={aluno.id}
            nome={aluno.nome}
            onRemove={() => handleRemove(aluno.id)}
          />
        ))}
      </div>
      <ConvidarEstudante />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import CorrecaoItem from "./correcao-item";
import { getAtividadesTurma } from "../../../apiCalls/turma-aberta-prof";
import { Atividade } from "../../../apiCalls/turma-aberta-prof/types";

interface Props {
  turmaId: string;
}

export default function CorrecaoList({ turmaId }: Props) {
  const [correcoes, setCorrecoes] = useState<Atividade[]>([]);

  useEffect(() => {
    async function fetchCorrecoes() {
      try {
        const data = await getAtividadesTurma(turmaId);
        setCorrecoes(data);
      } catch (error) {
        console.error("Erro ao carregar correções:", error);
      }
    }
    fetchCorrecoes();
  }, [turmaId]);

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-[24px] font-medium text-[#3C3C3C]">
        Correções da tarefa
      </h2>

      {correcoes.map((c) => (
        <CorrecaoItem
          key={c.id}
          nome={"Aluno X"} // precisa integrar com envios do aluno
          tema={c.titulo}
          tempo={"--"} // virá da API
        />
      ))}
    </div>
  );
}

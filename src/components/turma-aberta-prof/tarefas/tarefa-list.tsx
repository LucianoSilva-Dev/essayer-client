"use client";

import { useEffect, useState } from "react";
import TarefaCard from "./tarefa-card";
import CriarTarefaButton from "./criar-tarefa-button";
import { getAtividadesTurma } from "../../../apiCalls/turma-aberta-prof";
import { Atividade } from "../../../apiCalls/turma-aberta-prof/types";

interface Props {
  turmaId: string;
}

export default function TarefaList({ turmaId }: Props) {
  const [tarefas, setTarefas] = useState<Atividade[]>([]);

  useEffect(() => {
    async function fetchTarefas() {
      try {
        const data = await getAtividadesTurma(turmaId);
        setTarefas(data);
      } catch (error) {
        console.error("Erro ao carregar tarefas:", error);
      }
    }
    fetchTarefas();
  }, [turmaId]);

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Tarefas ativas</h2>
        <CriarTarefaButton />
      </div>

      <div className="flex gap-4 overflow-x-auto scrollbar-hide">
        {tarefas.map((tarefa) => (
          <TarefaCard
            key={tarefa.id}
            tema={tarefa.titulo}
            envios={0} // pode vir da API depois
            total={60} // ajustar conforme docs
            alunosExtras={0}
            data={tarefa.dataLimite || "Sem prazo"}
          />
        ))}
      </div>
    </div>
  );
}

"use client";

import CorrecaoItem from "./correcao-item";
import { useTurmaData } from "@/hooks/useTurmaData";

interface Props {
  turmaId: string;
}

export default function CorrecaoList({ turmaId }: Props) {
  const { atividades, loading, error } = useTurmaData(turmaId);

  if (loading) return <p>Carregando correções...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!atividades.length) return <p>Nenhuma correção disponível.</p>;

  return (
    <div className="flex flex-col gap-4">
      

      {atividades.map((c) => (
        <CorrecaoItem
          key={c.id}
          nome={"Aluno X"}
          tema={c.titulo}
          tempo={"--"}
        />
      ))}
    </div>
  );
}

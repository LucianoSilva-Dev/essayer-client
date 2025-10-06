"use client";

import IntegranteItem from "./integrante-item";
import ConvidarEstudante from "./convidar-estudante";
import { useTurmaData } from "@/hooks/useTurmaData";
import { removeAluno } from "@/apiCalls/turma-aberta-prof/index";

interface Props {
  turmaId: string;
}

export default function IntegranteList({ turmaId }: Props) {
  const { alunos, loading, error, refetch } = useTurmaData(turmaId);

  const handleRemove = async (id: string) => {
    try {
      await removeAluno(turmaId, id);
      await refetch(); // recarrega após remover
    } catch (error) {
      console.error("Erro ao remover aluno:", error);
    }
  };

  if (loading) return <p className="text-gray-500">Carregando integrantes...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!alunos.length) return <p className="text-gray-500">Nenhum integrante.</p>;

  return (
    <div className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold text-gray-800">Integrantes</h2>
      <div className="flex flex-col gap-2">
        {alunos.map((aluno) => (
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

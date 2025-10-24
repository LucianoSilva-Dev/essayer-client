// src/components/turma-aberta-prof/integrantes/integrante-list.tsx
"use client";

import IntegranteItem from "./integrante-item";
// Importar tipos necessários (Aluno já está em turma-aberta-prof/types)
import { Aluno } from "@/apiCalls/turma-aberta-prof/types";
import { removeAluno } from "@/apiCalls/turma-aberta-prof"; // Função para remover
import { toast } from "react-toastify";
import { useState } from "react"; // Para loading de remoção

interface Props {
  turmaId: string; // Necessário para a ação de remover
  alunos: Aluno[]; // Recebe a lista de alunos
  loading: boolean; // Recebe o estado de loading da busca inicial
  // error?: string | null; // Opcional: receber erro da busca inicial
  searchTerm: string; // Recebe o termo de busca
  refetch: () => Promise<void>; // Recebe a função para recarregar após remoção
}

export default function IntegranteList({ turmaId, alunos, loading, searchTerm, refetch }: Props) {
    const [removingId, setRemovingId] = useState<string | null>(null); // Estado para indicar qual aluno está sendo removido

    // Filtrar alunos baseado no searchTerm (case-insensitive)
    const filteredAlunos = alunos.filter(aluno =>
        aluno.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleRemove = async (id: string) => {
        if (removingId) return; // Evita cliques múltiplos
        setRemovingId(id); // Indica que a remoção começou
        try {
        await removeAluno(turmaId, id);
        toast.success("Aluno removido com sucesso!");
        await refetch(); // Recarrega os dados da turma (incluindo a lista de alunos)
        } catch (error: any) {
        console.error("Erro ao remover aluno:", error);
        const msg = error?.response?.data?.error || "Erro ao remover aluno.";
        toast.error(msg);
        } finally {
        setRemovingId(null); // Termina o estado de remoção
        }
    };

    // Não usa mais loading/error internos, pois vêm das props
    if (loading) return <p className="text-gray-500 text-sm p-4 text-center">Carregando integrantes...</p>;
    // Poderia mostrar erro aqui se passado via prop
    // if (error) return <p className="text-red-600 text-sm p-4 text-center">{error}</p>;

    if (!alunos || alunos.length === 0) return <p className="text-gray-500 text-sm p-4 text-center">Nenhum integrante nesta turma.</p>;
    if (filteredAlunos.length === 0 && searchTerm) return <p className="text-gray-500 text-sm p-4 text-center">Nenhum integrante encontrado para "{searchTerm}".</p>;
    if (filteredAlunos.length === 0) return <p className="text-gray-500 text-sm p-4 text-center">Nenhum integrante nesta turma.</p>; // Caso searchTerm esteja vazio e lista original vazia

    return (
        <div className="flex flex-col gap-2"> {/* Usa gap-2 para espaçamento menor */}
        {filteredAlunos.map((aluno) => (
            <IntegranteItem
            key={aluno.id}
            nome={aluno.nome}
            // Adiciona a lógica de remoção e estado de loading visual
            onRemove={() => handleRemove(aluno.id)}
            isRemoving={removingId === aluno.id} // Passa estado de remoção para o item
            />
        ))}
        </div>
    );
}

// src/components/turma-aberta-prof/correcoes/correcao-list.tsx
"use client";

import React, { useEffect, useState } from "react";
import CorrecaoItem from "../correcao-item";
import { getRespostasRedacao } from "@/lib/apiCalls/tarefas";
// Certifique-se que RespostaAtividade está exportado em tarefas/types.ts
import { RespostaAtividade } from "@/lib/apiCalls/tarefas/types";
import { toast } from "react-toastify";
// Importações corrigidas para date-fns
import { formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface ListaEnviosProps {
  turmaId: string;
  selectedAtividadeId: string | null;
}

export default function ListaEnvios({ turmaId, selectedAtividadeId }: ListaEnviosProps) {
  const [respostas, setRespostas] = useState<RespostaAtividade[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!selectedAtividadeId) {
      setRespostas([]);
      setLoading(false);
      setError(null);
      return;
    }

    async function fetchRespostas() {
      setLoading(true);
      setError(null);
      try {
        // A função getRespostasRedacao espera uma string, selectedAtividadeId já é verificado acima
        const data = await getRespostasRedacao(selectedAtividadeId as string); // Assertion opcional, mas seguro devido ao check
        setRespostas(Array.isArray(data.documentos) ? data.documentos : []);
      } catch (err: any) {
        console.error("Erro ao buscar respostas da atividade:", err);
        const msg = err?.response?.data?.error || err.message || "Erro ao buscar envios";
        setError(msg);
        toast.error(msg);
        setRespostas([]);
      } finally {
        setLoading(false);
      }
    }

    fetchRespostas();
  }, [selectedAtividadeId]);

  if (!selectedAtividadeId) {
    return <p className="text-gray-500 text-sm p-4 text-center">Selecione uma tarefa no carrossel acima para ver os envios.</p>;
  }

  if (loading) return <p className="text-gray-500 text-sm p-4 text-center">Carregando envios...</p>;
  if (error) return <p className="text-red-600 text-sm p-4 text-center">{error}</p>;
  if (respostas.length === 0) return <p className="text-gray-500 text-sm p-4 text-center">Nenhum envio para esta tarefa ainda.</p>;

  const formatTempoEnvio = (dataEnvio: string) => {
    try {
      return formatDistanceToNow(new Date(dataEnvio), { addSuffix: true, locale: ptBR });
    } catch {
      return "Data inválida";
    }
  };

  return (
    <div className="flex flex-col gap-3">
      {respostas.map((resposta) => (
        <CorrecaoItem
          key={resposta.id}
          // Verifica se 'aluno' é objeto antes de acessar 'nome'
          nome={typeof resposta.aluno === 'object' && resposta.aluno !== null ? resposta.aluno.nome : 'Aluno desconhecido'}
          tema={`Status: ${resposta.feedback ? 'Corrigido' : 'Pendente'}`}
          tempo={`${formatTempoEnvio(resposta.dataEnvio)}`} // Removido 'Enviado' para evitar redundância com 'atrás'/'há'
          // onClick={() => console.log("Navegar para resposta:", resposta.id)} // Adicionar lógica de navegação
        />
      ))}
    </div>
  );
}

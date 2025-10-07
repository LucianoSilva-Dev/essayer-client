"use client";

import { useState, useEffect, useCallback } from "react";
import {
  getTurmaById,
  getAlunosTurma,
  getAtividadesTurma,
  getPedidosEntrada,
  getCodigoConvite,
} from "@/apiCalls/turma-aberta-prof/index";
import type {
  Turma,
  Aluno,
  Atividade,
  PedidoEntrada,
  ConviteResponse,
} from "@/apiCalls/turma-aberta-prof/types";


export function useTurmaData(turmaId?: string) {
  const [turma, setTurma] = useState<Turma| null>(null);
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [atividades, setAtividades] = useState<Atividade[]>([]);
  const [pedidos, setPedidos] = useState<PedidoEntrada[]>([]);
  const [convite, setConvite] = useState<ConviteResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTurmaData = useCallback(async () => {
    if (!turmaId) return;

    setLoading(true);
    setError(null);

    try {
      const [turmaInfo, alunosData, atividadesData, pedidosData, conviteData] =
        await Promise.all([
          getTurmaById(turmaId),
          getAlunosTurma(turmaId),
          getAtividadesTurma(turmaId),
          getPedidosEntrada(turmaId),
          getCodigoConvite(turmaId),
        ]);

      setTurma(turmaInfo);
      setAlunos(alunosData);
      setAtividades(atividadesData);
      setPedidos(pedidosData);
      setConvite(conviteData);
    } catch (err) {
      console.error("Erro ao carregar dados da turma:", err);
      setError("Não foi possível carregar os dados da turma.");
    } finally {
      setLoading(false);
    }
  }, [turmaId]);

  useEffect(() => {
    fetchTurmaData();
  }, [fetchTurmaData]);

  return {
    turma,
    alunos,
    atividades,
    pedidos,
    convite,
    loading,
    error,
    refetch: fetchTurmaData,
  };
}

// src/hooks/useTurmaData.ts
"use client";

import { useState, useEffect, useCallback } from "react";
import { toast } from "react-toastify";
import {
  getTurmaById,
  getAlunosTurma,
  getPedidosEntrada,
  getCodigoConvite,
} from "@/apiCalls/turma-aberta-prof";
import { getAtividadesCriador } from "@/apiCalls/turma"; // Fetch professor activities
import { AtividadeProfessor, Turma as TurmaProfessorView } from "@/apiCalls/turma/types"; // Import correct Turma type if needed elsewhere, maybe rename
import { Aluno, PedidoEntrada, ConviteResponse, Turma } from "@/apiCalls/turma-aberta-prof/types"; // Correct Turma type for this hook's state


export function useTurmaData(turmaId?: string) {
  const [turma, setTurma] = useState<Turma | null>(null); // Use Turma from turma-aberta-prof/types
  const [alunos, setAlunos] = useState<Aluno[]>([]);
  const [atividades, setAtividades] = useState<AtividadeProfessor[]>([]); // State for professor view activities
  const [pedidos, setPedidos] = useState<PedidoEntrada[]>([]);
  const [convite, setConvite] = useState<ConviteResponse | null>(null);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // **Ensure fetchData explicitly has a void return type for refetch**
  const fetchData = useCallback(async (): Promise<void> => {
    if (!turmaId) {
        setLoading(false);
        setError("ID da turma não fornecido.");
        setTurma(null);
        setAlunos([]);
        setAtividades([]);
        setPedidos([]);
        setConvite(null);
        return; // Explicit return
    }

    setLoading(true);
    setError(null);
    let mounted = true;

    try {
      const [turmaInfo, alunosData, atividadesData, pedidosData, conviteData] =
        await Promise.all([
          getTurmaById(turmaId),         // Fetches Turma type from turma-aberta-prof
          getAlunosTurma(turmaId),       // Fetches Aluno[]
          getAtividadesCriador(turmaId), // Fetches AtividadeProfessor[]
          getPedidosEntrada(turmaId),    // Fetches PedidoEntrada[]
          getCodigoConvite(turmaId),     // Fetches ConviteResponse
        ]);

      if (mounted) {
          setTurma(turmaInfo); // turmaInfo is of type Turma from turma-aberta-prof/types
          setAlunos(Array.isArray(alunosData) ? alunosData : []);
          setAtividades(Array.isArray(atividadesData) ? atividadesData : []); // Sets AtividadeProfessor[]
          setPedidos(Array.isArray(pedidosData) ? pedidosData : []);
          setConvite(conviteData);
      }

    } catch (err: any) {
      console.error("Erro ao carregar dados da turma:", err);
      if (mounted) {
        const errorMsg = err?.response?.data?.error || err?.message || "Não foi possível carregar os dados da turma.";
        setError(errorMsg);
        toast.error(errorMsg);
        setTurma(null);
        setAlunos([]);
        setAtividades([]);
        setPedidos([]);
        setConvite(null);
      }
    } finally {
      if (mounted) {
        setLoading(false);
      }
    }

    // **No return needed here for the cleanup function logic**
    // Cleanup is handled by useEffect's return
  }, [turmaId]);

  useEffect(() => {
    fetchData();
    // Return a cleanup function if necessary, but fetchData itself shouldn't return it
    // return () => { /* potential cleanup */ };
  }, [fetchData]);

  return {
    turma, // This is type Turma from turma-aberta-prof/types
    alunos,
    atividades, // This is type AtividadeProfessor[]
    pedidos,
    convite,
    loading,
    error,
    refetch: fetchData, // Pass the fetchData function directly
  };
}

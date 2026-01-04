"use client"

import { useEffect, useState } from "react";
import { getTurmasAluno } from "@/lib/apiCalls/turma";
import { TurmaMatriculadaAluno } from "@/lib/apiCalls/turma/types";

export function useTurmasAluno() {
  const [turmas, setTurmas] = useState<TurmaMatriculadaAluno[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await getTurmasAluno();
        if (mounted) setTurmas(data.documentos);
      } catch (err) {
        if (mounted) setError(err);
      } finally {
        if (mounted) setLoading(false);
      }
    }
    load();
    return () => {
      mounted = false;
    };
  }, []);

  return { turmas, loading, error };
}

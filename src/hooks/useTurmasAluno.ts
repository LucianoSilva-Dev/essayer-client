"use client"

import { useEffect, useState } from "react";
import { getTurmasAluno } from "@/apiCalls/turma";
import { Turma } from "@/types/turma";

export function useTurmasAluno() {
  const [turmas, setTurmas] = useState<Turma[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<any>(null);

  useEffect(() => {
    let mounted = true;
    async function load() {
      try {
        const data = await getTurmasAluno();
        if (mounted) setTurmas(data);
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

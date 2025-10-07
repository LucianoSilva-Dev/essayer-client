"use client";
import React, { useEffect, useState } from "react";
import { AlertCircle } from "lucide-react";
import api from "@/apiCalls/api-client";

interface Correcao {
  id: string;
  tema: string;
  visto: boolean;
}

export default function CorrecaoList({ turmaId }: { turmaId: string }) {
  const [correcoes, setCorrecoes] = useState<Correcao[]>([]);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchCorrecoes = async () => {
      try {
        const response = await api.get(`/turma/${turmaId}/atividades`);
        const mapped = response.data.map((a: any) => ({
          id: a.id,
          tema: a.titulo,
          visto: Math.random() > 0.5,
        }));
        setCorrecoes(mapped);
      } catch (e) {
        console.error("Erro ao carregar correções:", e);
        setError(true);
      }
    };
    fetchCorrecoes();
  }, [turmaId]);

  if (error)
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <AlertCircle className="w-4 h-4" />
        Erro ao carregar correções.
      </div>
    );

  if (!correcoes.length)
    return (
      <div className="text-sm text-gray-500 bg-gray-50 rounded-lg p-3 text-center">
        Nenhuma correção disponível.
      </div>
    );

  return (
    <div className="space-y-2">
      {correcoes.map((c) => (
        <div
          key={c.id}
          className="flex items-center justify-between p-3 border rounded-lg hover:bg-gray-50 transition"
        >
          <div>
            <div className="text-sm font-medium text-gray-800">{c.tema}</div>
            <div className="text-xs text-gray-400">
              {c.visto ? "Visto" : "Não visto"}
            </div>
          </div>
          <button className="text-sm text-teal-600 hover:underline">
            Abrir
          </button>
        </div>
      ))}
    </div>
  );
}

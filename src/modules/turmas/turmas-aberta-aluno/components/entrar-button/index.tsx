"use client";
import React, { useEffect, useState } from "react";
import api from "@/lib/http/api-client";
import { AlertCircle } from "lucide-react";

export default function EntrarTurmaCard({ turmaId }: { turmaId: string }) {
  const [codigo, setCodigo] = useState<string | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchConvite = async () => {
      try {
        const response = await api.get(`/turma/${turmaId}/convite`);
        setCodigo(response.data.codigoConvite);
      } catch (e) {
        console.error("Erro ao obter código de convite:", e);
        setError(true);
      }
    };
    fetchConvite();
  }, [turmaId]);

  if (error)
    return (
      <div className="flex flex-col items-center justify-center text-gray-600 bg-white p-8 rounded-2xl shadow">
        <AlertCircle className="w-6 h-6 mb-2 text-red-500" />
        <p>Erro ao obter o código da turma.</p>
      </div>
    );

  return (
    <div className="flex flex-col items-center justify-center bg-white p-8 rounded-2xl shadow text-center">
      <h2 className="text-xl font-semibold mb-2 text-gray-800">
        Entrar na turma
      </h2>
      {codigo ? (
        <>
          <p className="text-gray-600 mb-4">Use o código abaixo para entrar:</p>
          <div className="text-2xl font-mono bg-gray-100 px-4 py-2 rounded-lg">
            {codigo}
          </div>
        </>
      ) : (
        <p className="text-gray-500">Carregando código...</p>
      )}
    </div>
  );
}

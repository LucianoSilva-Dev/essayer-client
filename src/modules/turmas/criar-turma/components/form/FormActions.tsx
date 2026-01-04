"use client";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { createTurma } from "@/lib/apiCalls/turma";
import CriarTurmaButton from "../button";

interface FormActionsProps {
  nome: string;
  escola: string;
  iconeId: number;
}

export default function FormActions({ nome, escola, iconeId }: FormActionsProps) {
  const router = useRouter();

  const handleCriarTurma = async () => {
    try {
      await createTurma({
        nome,
        escola,
        iconeId,
      });
      toast.success("Turma criada com sucesso!");
      router.push("/turmas_professor"); // Redireciona para a página de turmas
    } catch (error) {
      // O erro já é tratado pelo interceptor do axios, mas você pode adicionar lógicas extras aqui se precisar.
      console.error("Erro ao criar turma:", error);
    }
  };

  return (
    <div className="pt-2">
      <div className="text-center">
        <CriarTurmaButton onClick={handleCriarTurma} disabled={!nome.trim()} />
      </div>
    </div>
  );
}
"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { Repertorio } from "@/types/repertorio"; 
import { createAtividadeRedacao } from "@/apiCalls/tarefas";
import { CreateRedacaoBody } from "@/apiCalls/tarefas/types";
import { toast } from "react-toastify"; // ✅ Importação corrigida

interface TaskData {
  // Passo 1
  eixoId: string;
  
  // Passo 2
  titulo: string;
  tema: string;
  repertorios: Repertorio[]; 
  
  // Passo 3
  dataEntrega: Date | undefined;
  horaEntrega: string; 
  
  // Passo 4
  duracao: number; 
  descricao: string;
}

interface CreateTaskContextType {
  currentStep: number;
  totalSteps: number;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  taskData: TaskData;
  updateTaskData: (data: Partial<TaskData>) => void;
  submitTask: () => Promise<void>;
  isSubmitting: boolean;
}

const CreateTaskContext = createContext<CreateTaskContextType | undefined>(undefined);

export function CreateTaskProvider({ 
  children, 
  turmaId 
}: { 
  children: ReactNode; 
  turmaId: string; 
}) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [taskData, setTaskData] = useState<TaskData>({
    eixoId: "",
    titulo: "",
    tema: "",
    repertorios: [],
    dataEntrega: undefined,
    horaEntrega: "23:59",
    duracao: 60,
    descricao: "",
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const setStep = (step: number) => setCurrentStep(step);

  const updateTaskData = (data: Partial<TaskData>) => {
    setTaskData((prev) => ({ ...prev, ...data }));
  };

  const submitTask = async () => {
    if (!taskData.dataEntrega) {
      toast.error("Defina uma data de entrega.");
      return;
    }
    if (!taskData.titulo || !taskData.tema) {
       toast.error("Preencha o título e o tema.");
       return;
    }

    try {
      setIsSubmitting(true);

      const dataLimite = new Date(taskData.dataEntrega);
      const [horas, minutos] = taskData.horaEntrega.split(":").map(Number);
      dataLimite.setHours(horas, minutos, 0, 0);

      const repertoriosIds = taskData.repertorios.map((r) => r.id);

      const payload: CreateRedacaoBody = {
        turma: turmaId,
        titulo: taskData.titulo,
        tema: taskData.tema,
        descricao: taskData.descricao,
        tempoLimiteEmMinutos: taskData.duracao,
        dataLimite: dataLimite.toISOString(),
        repertoriosApoio: repertoriosIds,
      };

      await createAtividadeRedacao(payload);

      toast.success("Tarefa criada com sucesso!");
      router.push(`/turma_aberta_prof/${turmaId}`);
      router.refresh();

    } catch (error) {
      console.error("Erro ao criar tarefa:", error);
      toast.error("Não foi possível criar a tarefa.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <CreateTaskContext.Provider 
      value={{ 
        currentStep, 
        totalSteps, 
        taskData, 
        nextStep, 
        prevStep, 
        setStep, 
        updateTaskData,
        submitTask,
        isSubmitting
      }}
    >
      {children}
    </CreateTaskContext.Provider>
  );
}

export const useCreateTask = () => {
  const context = useContext(CreateTaskContext);
  if (!context) throw new Error("useCreateTask deve ser usado dentro de um CreateTaskProvider");
  return context;
};

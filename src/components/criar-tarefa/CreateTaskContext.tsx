"use client";

import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Repertorio } from "@/types/repertorio"; 
import { createAtividadeRedacao } from "@/apiCalls/tarefas";
import { CreateRedacaoBody } from "@/apiCalls/tarefas/types";
import { toast } from "react-toastify";

interface TaskData {
  eixoId: string;
  titulo: string;
  tema: string;
  textoMotivacional?: string;
  repertorios: Repertorio[];
  dataEntrega: Date | undefined;
  horaEntrega: string;
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
  canNavigateToStep: (targetStep: number) => boolean; 
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
  const [isLoaded, setIsLoaded] = useState(false);

  const STORAGE_KEY = `draft_task_${turmaId}`;

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

  // --- CARREGAR DADOS ---
  useEffect(() => {
    if (typeof window === "undefined") return;

    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.taskData) {
            if (parsed.taskData.dataEntrega) {
                parsed.taskData.dataEntrega = new Date(parsed.taskData.dataEntrega);
            }
            setTaskData(parsed.taskData);
        }
        if (parsed.currentStep) {
            setCurrentStep(parsed.currentStep);
        }
      } catch (error) {
        console.error("Erro ao restaurar rascunho:", error);
      }
    }
    setIsLoaded(true);
  }, [STORAGE_KEY]);

  // --- SALVAR DADOS ---
  useEffect(() => {
    if (!isLoaded) return;

    const stateToSave = {
        taskData,
        currentStep 
    };
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
  }, [taskData, currentStep, isLoaded, STORAGE_KEY]);


  // --- VALIDAÇÃO ---
  const validateStepData = (step: number): boolean => {
    switch (step) {
      case 1: return !!taskData.eixoId;
      case 2: return !!(taskData.titulo?.trim() && taskData.tema?.trim());
      case 3: return !!(taskData.dataEntrega && taskData.horaEntrega);
      case 4: return taskData.duracao > 0;
      default: return true;
    }
  };

  const getStepError = (step: number): string => {
      switch (step) {
          case 1: return "Selecione um Eixo Temático.";
          case 2: return "Preencha o Título e o Tema.";
          case 3: return "Defina a Data e Hora de entrega.";
          case 4: return "Verifique a duração da tarefa.";
          default: return "Complete o passo anterior.";
      }
  }

  // Apenas verifica (sem toast) para uso visual
  const canNavigateToStep = (targetStep: number): boolean => {
    if (targetStep < currentStep) return true;
    for (let i = 1; i < targetStep; i++) {
        if (!validateStepData(i)) {
            return false;
        }
    }
    return true;
  };

  const nextStep = () => {
    if (validateStepData(currentStep)) {
        setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
    } else {
        // CORREÇÃO: Adicionado toastId para evitar duplicatas no botão "Próximo"
        toast.warn(getStepError(currentStep), {
            toastId: `error-step-${currentStep}`
        });
    }
  };

  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));

  const setStep = (targetStep: number) => {
      if (targetStep < currentStep) {
          setCurrentStep(targetStep);
          return;
      }
      for (let i = 1; i < targetStep; i++) {
          if (!validateStepData(i)) {
              // CORREÇÃO: Adicionado toastId para evitar duplicatas na Timeline
              toast.warn(`Complete o passo ${i} para avançar: ${getStepError(i)}`, {
                  toastId: `error-timeline-${i}`
              });
              return; 
          }
      }
      setCurrentStep(targetStep);
  };

  const updateTaskData = (data: Partial<TaskData>) => {
    setTaskData((prev) => ({ ...prev, ...data }));
  };

  const submitTask = async () => {
    if (!canNavigateToStep(totalSteps)) {
        toast.warn("Preencha todos os campos obrigatórios antes de publicar.", {
            toastId: "error-submit"
        });
        return;
    }

    try {
      setIsSubmitting(true);

      const dataLimite = new Date(taskData.dataEntrega!);
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

      localStorage.removeItem(STORAGE_KEY);

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
        isSubmitting,
        canNavigateToStep 
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
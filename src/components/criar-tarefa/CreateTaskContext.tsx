"use client";

import React, { createContext, useContext, useState, ReactNode } from "react";

interface TaskData {
  eixoId: string;
  recorte: string;
  generoId: string;
  
  // --- NOVOS CAMPOS ADICIONADOS ---
  titulo: string;
  tema: string;
  repertorioId: string | null;
  // --------------------------------
  
  descricao: string;
  dataEntrega: Date | undefined;
}

interface CreateTaskContextType {
  currentStep: number;
  totalSteps: number;
  taskData: TaskData;
  nextStep: () => void;
  prevStep: () => void;
  setStep: (step: number) => void;
  updateTaskData: (data: Partial<TaskData>) => void;
}

const CreateTaskContext = createContext<CreateTaskContextType | undefined>(undefined);

export function CreateTaskProvider({ children }: { children: ReactNode }) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const [taskData, setTaskData] = useState<TaskData>({
    eixoId: "",
    recorte: "",
    generoId: "",
    // --- INICIALIZAÇÃO ---
    titulo: "",
    tema: "",
    repertorioId: null,
    descricao: "",
    dataEntrega: undefined,
    // ---------------------
  });

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, totalSteps));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const setStep = (step: number) => setCurrentStep(step);

  const updateTaskData = (data: Partial<TaskData>) => {
    setTaskData((prev) => ({ ...prev, ...data }));
  };

  return (
    <CreateTaskContext.Provider value={{ currentStep, totalSteps, taskData, nextStep, prevStep, setStep, updateTaskData }}>
      {children}
    </CreateTaskContext.Provider>
  );
}

export const useCreateTask = () => {
  const context = useContext(CreateTaskContext);
  if (!context) throw new Error("useCreateTask deve ser usado dentro de um CreateTaskProvider");
  return context;
};

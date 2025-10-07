"use client";

import { useState, useRef, useEffect } from "react";
import TarefaCard from "./tarefa-card";
import { useTurmaData } from "@/hooks/useTurmaData";
import DateSelector from "../ui/date-selector";

interface Props {
  turmaId: string;
}

export default function TarefaList({ turmaId }: Props) {
  const { atividades, loading } = useTurmaData(turmaId);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [deliveryDate, setDeliveryDate] = useState<Date | undefined>(undefined);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (atividades[selectedIndex]?.dataLimite) {
      setDeliveryDate(new Date(atividades[selectedIndex].dataLimite));
    }
  }, [selectedIndex, atividades]);

  if (loading) return <p>Carregando tarefas...</p>;
  if (!atividades.length) return <p>Nenhuma tarefa encontrada.</p>;

  // Detecta o card central ao scroll (opcional)
  const handleScroll = () => {
    if (!scrollRef.current) return;
    const children = Array.from(scrollRef.current.children) as HTMLElement[];
    const center = scrollRef.current.scrollLeft + scrollRef.current.clientWidth / 2;
    let closestIndex = 0;
    let closestDistance = Infinity;

    children.forEach((child, index) => {
      const childCenter = child.offsetLeft + child.offsetWidth / 2;
      const distance = Math.abs(center - childCenter);
      if (distance < closestDistance) {
        closestDistance = distance;
        closestIndex = index;
      }
    });

    setSelectedIndex(closestIndex);
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Carrossel horizontal */}
      <div
        ref={scrollRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4"
      >
        {atividades.map((tarefa, index) => (
          <div
            key={tarefa.id}
            className={`snap-center min-w-[260px] transition-transform duration-300 ${
              index === selectedIndex ? "scale-105" : "scale-95 opacity-80"
            }`}
          >
            <TarefaCard
              tema={tarefa.titulo}
              data={tarefa.dataLimite || "Sem prazo"}
              envios={0}
              total={60}
              alunosExtras={0}
            />
          </div>
        ))}
      </div>

    </div>
  );
}

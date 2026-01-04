// src/components/faq/FaqList.tsx
"use client";
import { useState, useRef, useEffect } from "react";
import { FaqCard } from "../card";

// INTERFACE QUE ESTAVA FALTANDO:
interface FaqListProps {
  perguntas: readonly { pergunta: string; resposta: string }[];
}

export function FaqList({ perguntas }: FaqListProps) {
  // O estado 'openIndex' controla qual card está aberto
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Ref para detectar o clique fora
  const listRef = useRef<HTMLDivElement>(null);

  // Efeito para fechar ao clicar fora
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (listRef.current && !listRef.current.contains(event.target as Node)) {
        setOpenIndex(null); // Fecha o card aberto
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [listRef]);

  // Efeito para fechar o card quando o assunto (prop 'perguntas') mudar
  useEffect(() => {
    setOpenIndex(null);
  }, [perguntas]);

  // Função para abrir/fechar o card
  const handleToggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div
      className="flex flex-col animate-fade-in" // Classe da animação
      ref={listRef}
    >
      {/* Os erros de 'any' são corrigidos pois 'perguntas' agora está tipado */}
      {perguntas.map((item, i) => (
        <FaqCard
          key={i}
          isOpen={openIndex === i} // Passa o estado de "aberto"
          onToggle={() => handleToggle(i)} // Passa a função de controle
          pergunta={item.pergunta}
          resposta={item.resposta}
        />
      ))}
    </div>
  );
}
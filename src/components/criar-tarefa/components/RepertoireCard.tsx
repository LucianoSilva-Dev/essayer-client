// src/components/turmas-professor/criar-tarefa/components/RepertoireCard.tsx
import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface RepertoireCardProps {
  id: string;
  title: string;
  content: string;
  type: "artigo" | "obra" | "citacao"; // Tipos baseados no CSS
  isSelected: boolean;
  onSelect: () => void;
}

const TYPE_STYLES = {
  artigo: {
    color: "text-[#2258B6]/70",
    bgIcon: "bg-[#2258B6]",
    iconPath: "/coloredArtigoIcon.svg", // Ajuste conforme seus arquivos
    label: "Artigo",
  },
  obra: {
    color: "text-[#CA9C60]/70",
    bgIcon: "bg-[#CA9C60]",
    iconPath: "/coloredObraIcon.svg",
    label: "Obra",
  },
  citacao: {
    color: "text-[#0C8462]/70",
    bgIcon: "bg-[#0C8462]",
    iconPath: "/coloredCitacaoIcon.svg",
    label: "Citação",
  },
};

export function RepertoireCard({ id, title, content, type, isSelected, onSelect }: RepertoireCardProps) {
  const styles = TYPE_STYLES[type];

  return (
    <div
      onClick={onSelect}
      className={cn(
        "flex flex-col p-[25px] gap-[15px] bg-white rounded-[30px] w-[350px] h-[325px] cursor-pointer transition-all duration-300 relative shrink-0",
        // CSS Box Shadow base e estado selecionado
        isSelected
          ? "shadow-[58px_0px_20px_rgba(0,0,0,0.25)] ring-2 ring-primary border-primary" 
          : "shadow-[0px_0px_20px_rgba(0,0,0,0.25)] hover:scale-105"
      )}
    >
      {/* Badge do Tipo (Posição absoluta conforme CSS 'left: 225px; top: 20px') */}
      <div className="absolute top-[20px] right-[25px] flex items-center gap-[10px] bg-white/50 backdrop-blur-sm px-2 py-1 rounded-[10px]">
        <div className="w-[25px] h-[25px] relative">
           {/* Ícone colorido */}
           <Image src={styles.iconPath} alt={type} fill className="object-contain" />
        </div>
        <span className={cn("font-montserrat font-medium italic text-[18px]", styles.color)}>
          {styles.label}
        </span>
      </div>

      {/* Conteúdo */}
      <div className="mt-8 space-y-4">
        <h3 className="font-montserrat font-semibold text-[25px] text-[#3C3C3C] leading-[30px]">
          {title}
        </h3>
        
        <p className="font-open-sans font-normal text-[20px] text-[#3C3C3C] leading-[27px] line-clamp-6">
          {content}
        </p>
      </div>
    </div>
  );
}

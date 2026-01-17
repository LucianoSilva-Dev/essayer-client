import React from "react";
import { cn } from "@/shared/utils/cn";
import { CheckCircle2 } from "lucide-react";

interface SelectionCardProps {
  title: string;
  description?: string;
  icon?: React.ReactNode;
  isSelected: boolean;
  onClick: () => void;
  className?: string;
}

export function SelectionCard({
  title,
  description,
  icon,
  isSelected,
  onClick,
  className
}: SelectionCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative cursor-pointer transition-all duration-300 group w-full border rounded-[22px] overflow-hidden",
        isSelected 
            ? "bg-white shadow-xl border-brand-teal-dark ring-1 ring-brand-teal-dark scale-[1.02]" 
            : "bg-white/60 hover:bg-white hover:shadow-md border-transparent hover:border-gray-200",
        className
      )}
    >
      {/* Indicador de Seleção no Topo */}
      {isSelected && (
          <div className="absolute top-0 right-0 bg-brand-teal-dark text-white px-3 py-1 rounded-bl-xl text-xs font-bold font-montserrat flex items-center gap-1 z-10">
              <CheckCircle2 size={12} /> Selecionado
          </div>
      )}

      <div className="p-5 flex items-start gap-4">
        {/* Área do Ícone */}
        {icon && (
            <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center shrink-0 transition-colors",
                isSelected ? "bg-[#E5EFF0] text-brand-teal-dark" : "bg-gray-100 text-gray-400 group-hover:bg-[#E5EFF0] group-hover:text-brand-teal-dark"
            )}>
                {icon}
            </div>
        )}

        {/* Conteúdo de Texto */}
        <div className="flex flex-col gap-1">
          <span className={cn(
              "text-lg font-medium font-montserrat transition-colors",
              isSelected ? "text-brand-teal-dark" : "text-neutral-dark"
          )}>
            {title}
          </span>
          
          {description && (
            <p className="text-sm text-gray-500 font-light font-montserrat leading-snug">
              {description}
            </p>
          )}
        </div>
      </div>

      {/* Barra Inferior Decorativa */}
      <div className={cn(
          "h-1.5 w-full absolute bottom-0 left-0 transition-all duration-300",
          isSelected ? "bg-brand-teal-dark" : "bg-transparent group-hover:bg-gray-200"
      )} />
    </div>
  );
}

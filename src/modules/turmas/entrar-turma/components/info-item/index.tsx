import type { ReactNode } from "react"

interface InfoItemProps {
  icon: ReactNode
  title: string
  description: string
}

export function InfoItem({ icon, title, description }: InfoItemProps) {
  return (
    <div className="flex gap-6">
      
      {/* Container do Ícone: ajustado para mobile/desktop */}
      <div className="flex-shrink-0 w-12 h-12 lg:w-14 lg:h-14 bg-teal-50 rounded-lg flex items-center justify-center">
        {icon}
      </div>

      <div className="flex-1 space-y-1">
        
        {/* Subtítulo (Ex: "Para professores") */}
        {/* Tamanho: text-xl (mobile) | lg:text-[30px] (desktop) */}
        <h3 className="text-xl lg:text-[30px] font-medium leading-tight lg:leading-[37px] text-neutral-dark">
          {title}
        </h3>
        
        {/* Descrição */}
        {/* Tamanho: text-base (mobile) | lg:text-[25px] (desktop) */}
        <p className="text-base lg:text-[25px] font-normal leading-normal lg:leading-[30px] text-neutral-dark">
          {description}
        </p>
      </div>
    </div>
  )
}
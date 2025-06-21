import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
}

export function Card({ children }: CardProps) {
  return (
    <div //Propriedades do card de eixos temáticos
      className="max-w-md max-h-[24rem] rounded-xl bg-white p-6 transition-all duration-300 hover:scale-105"
      style={{
        boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.1), -2px 4px 6px rgba(0, 0, 0, 0.1)",
        transformOrigin: "center",
      }}
    >
      {children}
    </div>
  )
}

import type { ReactNode } from "react"

interface CardProps {
  children: ReactNode
}

export function Card({ children }: CardProps) {
  return (
    <div
      className="flex flex-col text-start items-start justify-content-between max-w-md min-h-[24rem] max-h-[24rem] rounded-xl bg-white p-6 transition-all duration-500 hover:scale-105 hover:shadow-2xl cursor-pointer group"
      style={{
        boxShadow: "2px 4px 6px rgba(0, 0, 0, 0.1), -2px 4px 6px rgba(0, 0, 0, 0.1)",
        transformOrigin: "center",
      }}
    >
      {children}
    </div>
  )
}
5
import { Settings } from "lucide-react"
import type { Turma } from "../../../types/turma"

interface TurmaInfoProps {
  turma: Turma | null
}

export function TurmaInfo({ turma }: TurmaInfoProps) {
  return (
    <div className="flex items-start gap-3">
      <button className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
        <Settings className="h-5 w-5 text-muted-foreground" />
      </button>
      <div>
        <h1 className="text-2xl font-semibold text-foreground">{turma?.nome || "Carregando..."}</h1>
        <p className="text-sm text-muted-foreground">{turma?.descricao || "Carregando descrição..."}</p>
      </div>
    </div>
  )
}

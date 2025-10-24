// src/components/turma-aberta-prof/header-Turma-prof/turma-info.tsx
import { Settings } from "lucide-react";
// **Import Turma from the correct API types file**
import type { Turma } from "../../../apiCalls/turma-aberta-prof/types";

interface TurmaInfoProps {
  turma: Turma | null; // Now expects the correct Turma type
}

export function TurmaInfo({ turma }: TurmaInfoProps) {
  // ... rest of the component ...
    if (!turma) {
        // Handle loading state, e.g., return null or a skeleton
        return <div>Loading turma info...</div>; // Or a skeleton component
    }
     // Use turma properties safely now
     return (
         <div className="flex items-start gap-3">
            <button className="mt-1 inline-flex h-10 w-10 items-center justify-center rounded-md hover:bg-accent hover:text-accent-foreground transition-colors">
                <Settings className="h-5 w-5 text-muted-foreground" />
            </button>
            <div>
                <h1 className="text-2xl font-semibold text-foreground">{turma.nome}</h1>
                {/* Use turma.escola as fallback description if turma.descricao doesn't exist */}
                <p className="text-sm text-muted-foreground">{turma.escola || "Sem descrição ou escola"}</p>
            </div>
        </div>
     )
}

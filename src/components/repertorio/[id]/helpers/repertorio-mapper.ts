// src/app/repertorio/[id]/helpers/repertorio-mapper.ts
import { EixosTematicos, EixoOptions } from "@/constants/eixos";
import type { Repertorio } from "@/types/repertorio";

// Essa é a estrutura que seu componente de Footer vai esperar
export interface EixoComRecortes {
  nome: string;
  slug?: string; // opcional, para buscar o ícone
  recortes: string[];
}

// Mapeamento centralizado dos ícones (Baseado na sua pasta public)
// Mantendo para retrocompatibilidade caso o nome venha diferente do EixoOptions
export const EIXO_ICON_MAP: Record<string, string> = {
  "Arte e cultura": "/iconArte.svg",
  "Educação": "/educacaoIcon.svg",
  "Ciência e tecnologia": "/techIcon.svg",
  "Meio ambiente": "/iconMeioAmb.svg",
  "Direito e cidadania": "/iconDireito.svg",
  "Saúde": "/saudeIcon.svg",
  "Economia": "/EconomiaIcon.svg",
  // Adicione outros conforme necessário
};

export const getIconForEixo = (nome: string) => {
  // Tenta buscar no EixoOptions (fonte da verdade)
  const option = EixoOptions.find(o => o.nome === nome);
  if (option) return `/${option.icon}`;

  // Fallback para o mapa manual
  return EIXO_ICON_MAP[nome] || "/placeholder-logo.svg";
};

/**
 * MOCK GENERATOR -> REAL DATA MAPPER
 * Essa função recebe o repertório real e mapeia os recortes para seus respectivos eixos
 * usando a definição estática em constants/eixos.ts
 */
export function getEixosComRecortes(repertorio: Repertorio | null): EixoComRecortes[] {
  if (!repertorio || !repertorio.eixos) return [];

  return repertorio.eixos.map((eixoNome) => {
    // Busca os recortes possíveis para este eixo
    const recortesPossiveis = EixosTematicos[eixoNome] || [];

    // Filtra os recortes do repertório que pertencem a este eixo
    const recortesDoEixo = (repertorio.recortes || []).filter(recorte => 
      recortesPossiveis.includes(recorte)
    );

    return {
      nome: eixoNome,
      recortes: recortesDoEixo
    };
  });
}
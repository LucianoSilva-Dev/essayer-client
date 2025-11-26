// src/app/repertorio/[id]/helpers/repertorio-mapper.ts

// Essa é a estrutura que seu componente de Footer vai esperar
export interface EixoComRecortes {
  nome: string;
  slug?: string; // opcional, para buscar o ícone
  recortes: string[];
}

// Mapeamento centralizado dos ícones (Baseado na sua pasta public)
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
  return EIXO_ICON_MAP[nome] || "/placeholder-logo.svg";
};

/**
 * MOCK GENERATOR
 * Essa função recebe o repertório real (que pode não ter os recortes ainda)
 * e devolve a estrutura populada com dados falsos para visualização.
 * * FUTURO: Você vai alterar o corpo dessa função para ler os dados reais do backend.
 */
import type { Repertorio } from "@/types/repertorio";

export function getEixosComRecortes(repertorio: Repertorio | null): EixoComRecortes[] {
  if (!repertorio || !repertorio.eixos) return [];

  // Se o backend já estivesse pronto, faríamos um map real.
  // Como é mock, vamos pegar os eixos reais do repertório e inventar recortes para eles.
  
  return repertorio.eixos.map((eixoNome) => {
    // Lógica Mock: Retorna recortes diferentes baseados no nome do eixo para parecer real
    let recortesMock: string[] = [];

    if (eixoNome === "Arte e cultura") {
      recortesMock = ["Valorização da arte", "Cultura periférica", "Liberdade artística"];
    } else if (eixoNome === "Educação") {
      recortesMock = ["Inclusão escolar", "Cotas", "Valorização do professor"];
    } else if (eixoNome === "Saúde") {
      recortesMock = ["SUS", "Saúde mental", "Pandemias"];
    } else {
      recortesMock = ["Recorte Genérico 1", "Recorte Genérico 2"];
    }

    return {
      nome: eixoNome,
      recortes: recortesMock
    };
  });
}
export enum EnumCorrecaoRedacaoStatus {
  Finalizada = 'finalizada',
  Pendente = 'pendente',
  Erro = 'erro',
}

// Zod infer output from backend
export type GetCorrecaoRedacaoResponse = {
    id: string;
    texto: string;
    notaC1: number;
    notaC2: number;
    notaC3: number;
    notaC4: number;
    notaC5: number;
    feedbackC1: string;
    feedbackC2: string;
    feedbackC3: string;
    feedbackC4: string;
    feedbackC5: string;
    status: EnumCorrecaoRedacaoStatus.Finalizada;
    createdAt: string;
} | {
    id: string;
    status: EnumCorrecaoRedacaoStatus.Pendente | EnumCorrecaoRedacaoStatus.Erro;
    createdAt: string;
}

export enum CorrecaoRedacaoEvents {
    RedacaoCorrigida = "RedacaoCorrigida",
    RedacaoDevagar = "RedacaoAtrasada",
}




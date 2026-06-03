export interface CreateRedacaoLivreBody {
  tema: string;
  duracao?: number; 
}

export interface CreateRedacaoLivreResponse {
  id: string;
}

export interface RedacaoLivreDoc {
  id: string;
  tema: string;
  texto?: string;
  duracao?: number;
  finalizada: boolean;
  dataRealizacao?: Date;
  correcoesIA: CorrecaoIA[]
  updatedAt: Date;
}

export interface CorrecaoIA {
  id: string,
  texto: string;
  tema: string;
  status: "finalizada" | "erro" | "pendente";
  createdAt: Date;

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
}

export interface UpdateRedacaoLivreBody {
  texto?: string;
  duracao?: number;
  finalizada?: boolean;
  dataRealizacao?: string;
}

export interface CorrigirRedacaoLivreBody {
  tema: string;
  textoRedacao: string;
}

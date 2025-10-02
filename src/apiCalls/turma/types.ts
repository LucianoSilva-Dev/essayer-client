import { Paginacao } from "../types";

export interface CreateTurmaBody {
  nome: string;
  escola?: string;
  iconeId: number;
}

export interface TurmaCriada {
  id: string;
  nome: string;
  escola: string | null;
  iconeId: string;
}

export interface GetTurmasCriadasResponse {
  documentos: TurmaCriada[];
  paginacao: Paginacao;
}
import { GenericSuccessResponse } from '../types';

export type UserCargo = 'admin' | 'aluno' | 'professor';

export interface Usuario {
  id: string;
  nome: string;
  cargo: UserCargo;
  email: string,
  createdAt: string,
  lattes?: string
}

export interface CreateUsuarioBody {
  nome: string;
  email: string;
  senha: string;
}

export interface UpdateUsuarioBody {
  nome?: string;
  email?: string;
}

export interface UpdateSenhaBody {
  senha: string;
}

export interface ProfessorCreateBody {
  lattes: string;
}

export interface CreateUsuarioResponse {
  id: string;
}
// src/apiCalls/turma-aberta-prof/types.ts

import { PerfilUsuario } from '../../../types/types';

/**
 * Represents a student/member within the member list or requests.
 */
export interface Aluno {
  id: string;
  nome: string;
  fotoPath: string | null;
}

/**
 * Represents the creator of the class.
 */
export interface Criador extends PerfilUsuario {}

/**
 * Represents the full details of the class obtained via GET /turma/{id}.
 * Matches the type expected by TurmaInfo.
 */
export interface Turma {
  id: string;
  nome: string;
  iconeId: string; // API returns as string
  escola: string | null;
  criador: Criador;
  membros: Aluno[];
  totalMembros: number;
  // NOTE: 'descricao' is not in the GET /turma/{id} schema provided.
  // If your API *does* return it, add: descricao?: string | null;
}

/**
 * Represents a pending entry request.
 * Structure is the same as Aluno.
 */
export interface PedidoEntrada extends Aluno {}

/**
 * Represents the response when fetching or regenerating the invite code.
 */
export interface ConviteResponse {
  codigoConvite?: string; // Used in GET /turma/{id}/convite
  codigo?: string;        // Used in POST /turma/{id}/regenerar-codigo
}

/**
 * Request body for updating a class (PUT /turma/{id}).
 */
export interface UpdateTurmaBody {
    nome?: string;
    iconeId?: string; // API expects string
    escola?: string | null;
}

// REMOVED: Incomplete 'Atividade' interface. Use types from 'src/apiCalls/turma/types.ts'.
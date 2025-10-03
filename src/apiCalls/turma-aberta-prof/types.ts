export interface Aluno {
  id: string;
  nome: string;
  fotoPath: string | null;
}

export interface Criador {
  id: string;
  nome: string;
  fotoPath: string | null;
}

export interface Turma {
  id: string;
  nome: string;
  escola: string | null;
  criador: Criador;
  membros: Aluno[];
}

export interface Atividade {
  id: string;
  tipoAtividade: "Redacao";
  titulo: string;
  descricao: string;
  dataLimite: string | null;
}

export interface PedidoEntrada {
  id: string;
  nome: string;
  fotoPath: string | null;
}

export interface ConviteResponse {
  codigoConvite?: string; // quando for GET
  codigo?: string;        // quando for regenerado
}

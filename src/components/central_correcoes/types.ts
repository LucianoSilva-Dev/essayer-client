export type StatusTarefa = 'ativa' | 'encerrada';

export interface TarefaMock {
  id: string;
  tipo: string; // Novo campo (ex: "Redação")
  titulo: string;
  entregues: number;
  total: number;
  prazo: string;
  status: StatusTarefa;
  tags: string[]; 
}

export type StatusCorrecao = 'pendente' | 'corrigido';

export interface AlunoSubmissaoMock {
  id: string;
  nome: string;
  status: StatusCorrecao;
  dataEnvio: string;
  tempoGasto: string;
}
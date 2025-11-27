// src/types/notification.ts

export enum TiposNotificacao {
  TarefaEnviada = 'TarefaEnviada',
  TarefaFechada = 'TarefaFechada',
  TarefaCorrigida = 'TarefaCorrigida',
  RequisicaoProfessorStatus = 'RequisicaoProfessorStatus',
  NovaTarefa = 'NovaTarefa', // Adicionado para suportar o aviso de nova tarefa
}

export interface BaseNotification {
  id: string;
  tipoNotificacao: TiposNotificacao;
  lido: boolean;
  data?: string | Date;
}

// Interface específica para quando o Aluno recebe uma tarefa
export interface NovaTarefaNotification extends BaseNotification {
  tipoNotificacao: TiposNotificacao.NovaTarefa;
  tarefaId: string;
  turmaNome?: string;
}
// Notificação para o Aluno: Nova tarefa disponível
export interface NovaTarefaNotification extends BaseNotification {
  tipoNotificacao: TiposNotificacao.NovaTarefa;
  tarefaId: string;
  turmaNome?: string; // Opcional: para mostrar no texto "Nova tarefa na turma X"
}

export interface TarefaEnviadaNotification extends BaseNotification {
  tipoNotificacao: TiposNotificacao.TarefaEnviada;
  tarefaId: string;
}

export interface TarefaFechadaNotification extends BaseNotification {
  tipoNotificacao: TiposNotificacao.TarefaFechada;
  tarefaId: string;
}

export interface TarefaCorrigidaNotification extends BaseNotification {
  tipoNotificacao: TiposNotificacao.TarefaCorrigida;
  tarefaId: string; // Ou redacaoId, dependendo do seu banco
}

export interface RequisicaoProfessorStatusNotification extends BaseNotification {
  tipoNotificacao: TiposNotificacao.RequisicaoProfessorStatus;
  requisicaoId: string;
  motivo?: string;
}

// ADICIONADO: Interface específica para Nova Tarefa
export interface NovaTarefaNotification extends BaseNotification {
  tipoNotificacao: TiposNotificacao.NovaTarefa;
  tarefaId: string;
  turmaNome?: string; // Opcional, ajuda na mensagem
}

export type Notification =
  | BaseNotification // Fallback genérico
  | NovaTarefaNotification
  // | TarefaEnviadaNotification ... adicione as outras aqui
  ;

export interface NotificationContextType {
  notifications: Notification[];
  markAsRead: (notificationIds: string[]) => Promise<void>;
  unreadCount: number;
}

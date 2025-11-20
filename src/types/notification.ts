export enum TiposNotificacao {
  TarefaEnviada = 'tarefa:enviada',
  TarefaFechada = 'tarefa:fechada',
  TarefaCorrigida = 'tarefa:corrigida',
  RequisicaoProfessorStatus = 'requisicao-professor:status',
}

export interface BaseNotification {
  id: string;
  tipoNotificacao: TiposNotificacao;
  lido: boolean;
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
  tarefaId: string;
}

export interface RequisicaoProfessorStatusNotification extends BaseNotification {
  tipoNotificacao: TiposNotificacao.RequisicaoProfessorStatus;
  requisicaoId: string;
  motivo?: string;
}

export type Notification =
  | TarefaEnviadaNotification
  | TarefaFechadaNotification
  | TarefaCorrigidaNotification
  | RequisicaoProfessorStatusNotification;

export interface NotificationContextType {
  notifications: Notification[];
  markAsRead: (notificationIds: string[]) => Promise<void>;
  unreadCount: number;
}

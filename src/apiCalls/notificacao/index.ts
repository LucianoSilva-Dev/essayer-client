import apiClient from '../api-client';
import type { Notification } from '@/types/notification';

export const getAllNotifications = async (): Promise<Notification[]> => {
  const { data } = await apiClient.get<Notification[]>('/notificacao');
  return data;
};

export const changeStatusNotification = async (
  notificacaoIds: string[]
): Promise<void> => {
  await apiClient.put('/notificacao', { notificacaoIds });
};

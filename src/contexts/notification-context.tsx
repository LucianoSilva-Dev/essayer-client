'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import { API_BASE_URL } from '@/app/constants';
import {
  getAllNotifications,
  changeStatusNotification,
} from '@/apiCalls/notificacao';
import {
  type Notification,
  type NotificationContextType,
  TiposNotificacao,
} from '@/types/notification';
import { useAuth } from './auth-context';

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { userData: user } = useAuth();

  const fetchNotifications = useCallback(async () => {
    try {
      const data = await getAllNotifications();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchNotifications();
    } else {
        setNotifications([]);
    }
  }, [user, fetchNotifications]);

  useEffect(() => {
    if (!user) return;

    const eventSource = new EventSource(`${API_BASE_URL}/notificacao/listen`, {
      withCredentials: true,
    });

    const handleNewNotification = (event: MessageEvent) => {
      try {
        const newNotification: Notification = JSON.parse(event.data);
        setNotifications((prev) => [newNotification, ...prev]);
      } catch (error) {
        console.error('Error parsing notification:', error);
      }
    };

    eventSource.addEventListener(
      TiposNotificacao.TarefaEnviada,
      handleNewNotification
    );
    eventSource.addEventListener(
      TiposNotificacao.TarefaFechada,
      handleNewNotification
    );
    eventSource.addEventListener(
      TiposNotificacao.TarefaCorrigida,
      handleNewNotification
    );
    eventSource.addEventListener(
      TiposNotificacao.RequisicaoProfessorStatus,
      handleNewNotification
    );

    eventSource.onerror = (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [user]);

  const markAsRead = async (notificationIds: string[]) => {
    try {
      await changeStatusNotification(notificationIds);
      setNotifications((prev) =>
        prev.map((n) =>
          notificationIds.includes(n.id) ? { ...n, lido: true } : n
        )
      );
      // Re-fetch to ensure sync or update local state if we have IDs.
      fetchNotifications();
    } catch (error) {
      console.error('Failed to mark notifications as read:', error);
    }
  };

  const unreadCount = notifications.filter((n) => !n.lido).length;

  return (
    <NotificationContext.Provider
      value={{ notifications, markAsRead, unreadCount }}
    >
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    );
  }
  return context;
};

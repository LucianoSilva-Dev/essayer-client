'use client';

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from 'react';
import {
  getAllNotifications,
  changeStatusNotification,
} from '@/lib/apiCalls/notificacao';
import {
  type Notification,
  type NotificationContextType,
  TiposNotificacao,
} from '@/types/notification';
import { useAuth } from './auth-context';
import { createResilientEventSource } from '@/lib/sse/create-resilient-evente-source';

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { userData: user, refreshToken } = useAuth();

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

    const handleNewNotification = (event: MessageEvent) => {
      try {
        const newNotification: Notification = JSON.parse(event.data);
        setNotifications((prev) => [newNotification, ...prev]);

        if (newNotification.tipoNotificacao === TiposNotificacao.RequisicaoProfessorStatus) {
          refreshToken();
        }
      } catch (error) {
        console.error('Error parsing notification:', error);
      }
    };

    const connection = createResilientEventSource('/notificacao/listen', {
      [TiposNotificacao.TarefaEnviada]: handleNewNotification,
      [TiposNotificacao.TarefaFechada]: handleNewNotification,
      [TiposNotificacao.TarefaCorrigida]: handleNewNotification,
      [TiposNotificacao.RequisicaoProfessorStatus]: handleNewNotification,
    });

    return () => {
      connection.close();
    };
  }, [user, refreshToken]);

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

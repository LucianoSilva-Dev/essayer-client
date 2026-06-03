'use client';

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from 'react';
import { Notification, NotificationContextType } from '@/types/notification';
import { getAllNotifications, changeStatusNotification } from '@/lib/apiCalls/notificacao';
import { useAuth } from './auth-context';

const NotificationContext = createContext<NotificationContextType | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const { isLoggedIn, userData } = useAuth();

  const loadNotifications = useCallback(async () => {
    if (!isLoggedIn) return;
    try {
      const data = await getAllNotifications();
      setNotifications(data as Notification[]);
    } catch (error) {
      console.error("Erro ao carregar notificações", error);
    }
  }, [isLoggedIn]);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const markAsRead = useCallback(async (notificationIds: string[]) => {
    try {
      await changeStatusNotification(notificationIds);
      setNotifications((prev) => 
        prev.map(n => notificationIds.includes(n.id) ? { ...n, lido: true } : n)
      );
    } catch (error) {
      console.error("Erro ao marcar notificações como lidas", error);
    }
  }, []);

  // Set up SSE listener for real-time notifications
  useEffect(() => {
    if (!isLoggedIn || !userData?.id) return;

    const eventSource = new EventSource('/api/notificacao/listen');

    eventSource.onmessage = (event) => {
      try {
        const newNotification = JSON.parse(event.data) as Notification;
        setNotifications((prev) => [newNotification, ...prev]);
      } catch (e) {
        console.error("Failed to parse SSE notification:", e);
      }
    };

    return () => {
      eventSource.close();
    };
  }, [isLoggedIn, userData?.id]);

  const unreadCount = notifications.filter(n => !n.lido).length;

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        markAsRead,
        unreadCount,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
}

export function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
}

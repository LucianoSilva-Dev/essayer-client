'use client'

import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useCallback,
} from 'react'

export type NotificationType = 'success' | 'error' | 'info' | 'warning'

export interface Notification {
  id: string
  type: NotificationType
  title?: string
  message: string
}

interface NotificationContextData {
  notifications: Notification[]
  notify: (data: Omit<Notification, 'id'>) => void
  removeNotification: (id: string) => void
  clearNotifications: () => void
}

const NotificationContext = createContext<NotificationContextData | null>(null)

interface NotificationProviderProps {
  children: ReactNode
}

export function NotificationProvider({
  children,
}: NotificationProviderProps) {
  const [notifications, setNotifications] = useState<Notification[]>([])

  const removeNotification = useCallback((id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id))
  }, [])

  const clearNotifications = useCallback(() => {
    setNotifications([])
  }, [])

  const notify = useCallback(
    ({ type, title, message }: Omit<Notification, 'id'>) => {
      const id = crypto.randomUUID()

      setNotifications((prev) => [
        ...prev,
        {
          id,
          type,
          title,
          message,
        },
      ])

      // auto dismiss (opcional)
      setTimeout(() => {
        removeNotification(id)
      }, 5000)
    },
    [removeNotification]
  )

  return (
    <NotificationContext.Provider
      value={{
        notifications,
        notify,
        removeNotification,
        clearNotifications,
      }}
    >
      {children}
    </NotificationContext.Provider>
  )
}

export function useNotification() {
  const context = useContext(NotificationContext)

  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    )
  }

  return context
}

// src/components/shared/NotificationBell.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "@/shared/contexts/notification-context";
import NotificationItem from "./NotificationItem"; 

// Ícone do Sino
const BellIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 2.485 2.485 0 0 0-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
  </svg>
);

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const { notifications, unreadCount, markAsRead } = useNotification();

  // Fecha ao clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMarkOneAsRead = (id: string) => {
    markAsRead([id]).catch(console.error);
  };

  const handleMarkAllAsRead = (e: React.MouseEvent) => {
    e.stopPropagation();
    const unreadIds = notifications.filter(n => !n.lido).map(n => n.id);
    if (unreadIds.length > 0) markAsRead(unreadIds);
  };

  return (
    <div className="relative" ref={containerRef}>
      {/* Botão do Sino */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-full transition-all duration-300 outline-none ${
            isOpen ? 'bg-[#E5EFF0] text-[#075F70]' : 'hover:bg-gray-100 text-gray-600 hover:text-[#075F70]'
        }`}
      >
        <BellIcon className="w-6 h-6" />
        {unreadCount > 0 && (
          <span className="absolute top-1 right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white ring-2 ring-white animate-pulse">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {/* Dropdown */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            // MUDANÇA AQUI: Alterado 'right-0' para 'left-0' e 'origin-top-right' para 'origin-top-left'
            className="absolute left-0 top-full mt-2 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-[100] overflow-hidden origin-top-left"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-50 bg-gray-50/50">
              <h3 className="font-montserrat font-bold text-[#3C3C3C] text-sm">
                Notificações {unreadCount > 0 && <span className="text-[#075F70]">({unreadCount})</span>}
              </h3>
              {unreadCount > 0 && (
                <button 
                  onClick={handleMarkAllAsRead}
                  className="text-xs text-[#075F70] font-semibold cursor-pointer hover:underline"
                >
                  Ler todas
                </button>
              )}
            </div>

            {/* Lista de Itens */}
            <div className="max-h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {notifications.length > 0 ? (
                notifications.map((notif) => (
                  <NotificationItem 
                    key={notif.id}
                    notification={notif}
                    onCloseDropdown={() => setIsOpen(false)}
                    markAsRead={handleMarkOneAsRead}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3 text-gray-300">
                        <BellIcon className="w-6 h-6" />
                    </div>
                    <p className="text-gray-400 text-sm font-montserrat">Tudo limpo por aqui!</p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
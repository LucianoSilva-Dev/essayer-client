"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useNotification } from "@/contexts/notification-context";
import { 
  TiposNotificacao, 
  type Notification, 
  type TarefaEnviadaNotification, 
  type TarefaCorrigidaNotification, 
  type TarefaFechadaNotification,
  type RequisicaoProfessorStatusNotification 
} from "@/types/notification";

// --- Ícones ---
const BellIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 2.485 2.485 0 0 0-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" />
  </svg>
);

const DoubleCheckIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
      <path fillRule="evenodd" d="M19.916 4.626a.75.75 0 0 1 .208 1.04l-9 13.5a.75.75 0 0 1-1.154.114l-6-6a.75.75 0 0 1 1.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 0 1 1.04-.208Z" clipRule="evenodd" />
    </svg>
);

const getIconForType = (type: TiposNotificacao) => {
    switch (type) {
        case TiposNotificacao.TarefaEnviada: // Icone de Envio (Aviãozinho ou Check)
            return (<div className="p-2 bg-blue-50 rounded-lg text-blue-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" /></svg></div>);
        case TiposNotificacao.TarefaCorrigida: // Icone de Documento Verificado
            return (<div className="p-2 bg-green-50 rounded-lg text-green-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" /></svg></div>);
        case TiposNotificacao.TarefaFechada: // Icone de Relógio/Prazo
            return (<div className="p-2 bg-orange-50 rounded-lg text-orange-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v6c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-3.75V6Z" clipRule="evenodd" /></svg></div>);
        default: // Genérico
            return (<div className="p-2 bg-purple-50 rounded-lg text-purple-600"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path fillRule="evenodd" d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 2.485 2.485 0 0 0-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z" clipRule="evenodd" /></svg></div>);
    }
}

export default function NotificationBell() {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { notifications, unreadCount, markAsRead } = useNotification();

  // --- Lógica de Mensagens e Links Personalizados ---
  const getNotificationConfig = (notification: Notification) => {
    switch (notification.tipoNotificacao) {
      
      case TiposNotificacao.TarefaEnviada: {
        const n = notification as TarefaEnviadaNotification;
        return { 
          title: "Redação Enviada", 
          message: "Sua redação foi enviada com sucesso! Aguarde a correção do professor.", 
          link: `/fazer_tarefa/${n.tarefaId}` 
        };
      }

      case TiposNotificacao.TarefaCorrigida: {
        const n = notification as TarefaCorrigidaNotification;
        return { 
          title: "Redação Corrigida", 
          message: "Oba! Sua redação foi corrigida. Clique aqui para ver sua nota e o feedback.", 
          link: `/praticar_redacao/${n.tarefaId}/correcao` // Rota para ver a correção
        };
      }

      case TiposNotificacao.TarefaFechada: {
        const n = notification as TarefaFechadaNotification;
        return { 
          title: "Prazo Encerrado", 
          message: "O prazo de entrega desta tarefa acabou. Verifique o status do seu envio.", 
          link: `/fazer_tarefa/${n.tarefaId}` // Rota para ver detalhes da tarefa
        };
      }

      case TiposNotificacao.RequisicaoProfessorStatus: {
        const n = notification as RequisicaoProfessorStatusNotification;
        const motivoText = n.motivo ? ` Motivo: ${n.motivo}` : '';
        return { 
          title: "Atualização de Cadastro", 
          message: `O status da sua solicitação de professor foi atualizado.${motivoText}`, 
          link: `/profile/solicitacoes` 
        };
      }

      default:
        return { 
          title: "Nova Notificação", 
          message: "Você tem uma nova atualização no sistema.", 
          link: '#' 
        };
    }
  };

  const handleMarkAllAsRead = async (e: React.MouseEvent) => {
    e.stopPropagation();
    const unreadIds = notifications.filter((n) => !n.lido).map((n) => n.id);
    if (unreadIds.length > 0) await markAsRead(unreadIds);
  };

  const handleNotificationClick = async (notification: Notification) => {
    const config = getNotificationConfig(notification);
    
    // Marca como lida
    if (!notification.lido) {
        markAsRead([notification.id]).catch(console.error);
    }
    
    setIsOpen(false);
    
    // Redireciona se houver link válido
    if (config.link && config.link !== '#') {
        router.push(config.link);
    }
  };

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

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`relative p-2 rounded-full transition-all duration-300 ${
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

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-full mt-3 w-80 sm:w-96 bg-white rounded-2xl shadow-xl border border-gray-100 z-[100] overflow-hidden origin-top-right"
          >
            <div className="flex items-center justify-between p-4 border-b border-gray-50 bg-gray-50/50">
              <h3 className="font-montserrat font-bold text-[#3C3C3C] text-sm">
                Notificações {unreadCount > 0 && `(${unreadCount})`}
              </h3>
              {unreadCount > 0 && (
                <button onClick={handleMarkAllAsRead} className="flex items-center gap-1 text-xs text-[#075F70] font-semibold cursor-pointer hover:underline transition-all">
                    <DoubleCheckIcon /> Marcar todas
                </button>
              )}
            </div>

            <div className="max-h-[350px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-200 scrollbar-track-transparent">
              {notifications.length > 0 ? (
                notifications.map((notif) => {
                  const config = getNotificationConfig(notif);
                  const NotificationIcon = getIconForType(notif.tipoNotificacao);
                  
                  return (
                    <div 
                        key={notif.id} 
                        onClick={() => handleNotificationClick(notif)} 
                        className={`p-4 border-b border-gray-50 last:border-0 hover:bg-gray-50 transition-colors cursor-pointer flex gap-4 group ${!notif.lido ? 'bg-[#F0F7F8]/40' : 'bg-white'}`}
                    >
                        <div className="shrink-0 mt-1">{NotificationIcon}</div>
                        <div className="flex flex-col gap-1 w-full">
                            <div className="flex justify-between items-start">
                                <p className={`text-sm font-montserrat ${!notif.lido ? 'font-bold text-[#3C3C3C]' : 'font-semibold text-gray-700'}`}>
                                    {config.title}
                                </p>
                                {!notif.lido && <div className="w-2 h-2 rounded-full bg-[#075F70] shrink-0 mt-1.5" />}
                            </div>
                            <p className="text-xs text-gray-500 font-montserrat leading-relaxed">
                                {config.message}
                            </p>
                        </div>
                    </div>
                  );
                })
              ) : (
                <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                    <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3 text-gray-300">
                        <BellIcon className="w-6 h-6" />
                    </div>
                    <p className="text-gray-400 text-sm font-montserrat font-medium">
                        Nenhuma notificação por enquanto.
                    </p>
                </div>
              )}
            </div>
            
            <div className="p-2 border-t border-gray-50 bg-gray-50/30 text-center">
                <span className="text-[10px] text-gray-400 font-montserrat uppercase tracking-wider">
                    Incita Educação
                </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

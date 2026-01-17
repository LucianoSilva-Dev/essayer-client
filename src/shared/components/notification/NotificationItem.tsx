// src/components/shared/NotificationItem.tsx
"use client";

import { TiposNotificacao, type Notification } from "@/types/notification";
import { useRouter } from "next/navigation";
import { formatDistanceToNow } from "date-fns";
import { ptBR } from "date-fns/locale";

// --- Ícones Personalizados para cada Contexto ---
const Icons = {
  NovaTarefa: (
    <div className="p-2 bg-blue-100 rounded-lg text-blue-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" />
      </svg>
    </div>
  ),
  Sucesso: ( // Usado para Correção
    <div className="p-2 bg-green-100 rounded-lg text-green-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </div>
  ),
  Alerta: ( // Usado para Prazos
    <div className="p-2 bg-orange-100 rounded-lg text-orange-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </div>
  ),
  Info: ( // Genérico
    <div className="p-2 bg-gray-100 rounded-lg text-gray-600">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
      </svg>
    </div>
  )
};

interface NotificationItemProps {
  notification: Notification;
  onCloseDropdown: () => void;
  markAsRead: (id: string) => void;
}

export default function NotificationItem({ notification, onCloseDropdown, markAsRead }: NotificationItemProps) {
  const router = useRouter();
  const n = notification as any; // 'any' permite acessar propriedades específicas (tarefaId, etc)

  // --- Lógica Principal de Personalização ---
  const getConfig = () => {
    switch (notification.tipoNotificacao) {
      
      // 1. Caso: Aluno recebe NOVA TAREFA
      case TiposNotificacao.NovaTarefa:
        return {
          icon: Icons.NovaTarefa,
          title: n.turmaNome ? `Nova tarefa em ${n.turmaNome}` : "Nova Atividade",
          message: "Você tem uma nova tarefa disponível. Comece já!",
          link: `/fazer-tarefa/${n.tarefaId}` // Leva direto para o editor/visualização da tarefa
        };

      // 2. Caso: Aluno recebe CORREÇÃO
      case TiposNotificacao.TarefaCorrigida:
        return {
          icon: Icons.Sucesso,
          title: "Redação Corrigida",
          message: "Seu professor finalizou a correção. Veja o feedback.",
          link: `/praticar_redacao/${n.tarefaId}/correcao` // Leva para a tela de correção
        };

      // 3. Caso: Prazo Encerrado
      case TiposNotificacao.TarefaFechada:
        return {
          icon: Icons.Alerta,
          title: "Prazo Encerrado",
          message: "O período de envio para esta tarefa foi finalizado.",
          link: n.tarefaId ? `/fazer-tarefa/${n.tarefaId}` : '#'
        };

      // 4. Caso: Professor recebe Envio (Exemplo)
      case TiposNotificacao.TarefaEnviada:
        return {
          icon: Icons.Info,
          title: "Entrega Recebida",
          message: "Um aluno enviou uma redação para correção.",
          link: `/fazer-tarefa/${n.tarefaId}/revisar`
        };

      // 5. Caso: Status de Professor
      case TiposNotificacao.RequisicaoProfessorStatus:
        return {
            icon: Icons.Info,
            title: "Solicitação Atualizada",
            message: `O status da sua solicitação foi alterado.`,
            link: "/profile/solicitacoes"
        };

      default:
        return {
          icon: Icons.Info,
          title: "Nova Notificação",
          message: "Você tem uma nova atualização no sistema.",
          link: "#"
        };
    }
  };

  const config = getConfig();

  const handleClick = () => {
    // Marca como lida se ainda não estiver
    if (!notification.lido) {
      markAsRead(notification.id);
    }
    
    // Fecha o dropdown
    onCloseDropdown();
    
    // Redireciona se houver link
    if (config.link && config.link !== '#') {
      router.push(config.link);
    }
  };

  // Formatação de data amigável (ex: "há 5 minutos")
  const timeAgo = notification.data 
    ? formatDistanceToNow(new Date(notification.data), { addSuffix: true, locale: ptBR })
    : '';

  return (
    <div 
      onClick={handleClick}
      className={`
        relative p-4 border-b border-gray-50 last:border-0 
        transition-all cursor-pointer flex gap-4 group items-start
        ${!notification.lido ? 'bg-[#F0F7F8]/60 hover:bg-[#E5EFF0]' : 'bg-white hover:bg-gray-50'}
      `}
    >
      {/* Indicador Azul para não lidos */}
      {!notification.lido && (
        <span className="absolute left-0 top-0 bottom-0 w-1 bg-brand-teal-dark rounded-l-md" />
      )}

      {/* Ícone */}
      <div className="shrink-0 mt-0.5">
        {config.icon}
      </div>

      {/* Conteúdo de Texto */}
      <div className="flex flex-col gap-1 w-full">
        <div className="flex justify-between items-start">
          <p className={`text-sm font-montserrat ${!notification.lido ? 'font-bold text-neutral-dark' : 'font-medium text-gray-700'}`}>
            {config.title}
          </p>
          {timeAgo && (
            <span className="text-[10px] text-gray-400 whitespace-nowrap ml-2 shrink-0">
              {timeAgo}
            </span>
          )}
        </div>
        <p className="text-xs text-gray-500 font-montserrat leading-relaxed line-clamp-2">
          {config.message}
        </p>
      </div>
    </div>
  );
}

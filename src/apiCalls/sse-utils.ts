import { API_BASE_URL } from "@/app/constants";
import { refreshTokenOrWait } from "./api-client";

type EventListeners = Record<string, (event: MessageEvent) => void>;

/**
 * Cria uma conexão EventSource resiliente que tenta renovar o token de autenticação
 * automaticamente em caso de erro, reutilizando a lógica de fila de requisições.
 * 
 * @param endpoint O caminho relativo ou URL completa para o endpoint SSE.
 * @param listeners Um objeto onde as chaves são os nomes dos eventos e os valores são os callbacks.
 * @param onOpen Callback opcional chamado quando a conexão é aberta.
 * @returns Um objeto com o método `close` para encerrar a conexão.
 */
export function createResilientEventSource(
  endpoint: string,
  listeners: EventListeners,
  onOpen?: () => void
) {
  let eventSource: EventSource | null = null;
  let isClosed = false;

  const connect = () => {
    if (isClosed) return;

    const url = endpoint.startsWith('http') ? endpoint : `/api${endpoint}`;
    eventSource = new EventSource(url, { withCredentials: true });

    if (onOpen) {
      eventSource.onopen = onOpen;
    }

    // Setup listeners
    Object.entries(listeners).forEach(([event, handler]) => {
      eventSource?.addEventListener(event, handler);
    });

    eventSource.onerror = async () => {
      // O EventSource nativo não fornece detalhes do erro (status code),
      // mas erros de conexão ou auth (401) disparam este evento.
      // Fechamos a conexão atual para evitar retentativas automáticas do browser sem refresh.
      eventSource?.close();

      if (isClosed) return;

      try {
        // Tenta fazer refresh do token usando a lógica centralizada
        await refreshTokenOrWait();
        
        // Se o refresh funcionar, reconectamos
        connect();
      } catch (refreshError) {
        console.error('Falha ao renovar token para SSE:', refreshError);
        // Se o refresh falhar, a aplicação deve lidar com o logout via evento auth:sessionExpired
        // Não tentamos reconectar
      }
    };
  };

  connect();

  return {
    close: () => {
      isClosed = true;
      eventSource?.close();
    }
  };
}

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
      eventSource?.close();
      if (isClosed) return;
      window.dispatchEvent(new Event('auth:sessionExpired'));
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

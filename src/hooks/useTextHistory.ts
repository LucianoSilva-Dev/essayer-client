// src/hooks/useTextHistory.ts
import { useState, useCallback } from 'react';

export function useTextHistory(initialState: string) {
  // Pilha de histórico: [passado..., presente, futuro...]
  // Mas para simplificar e gastar menos memória, usamos arrays de strings
  const [history, setHistory] = useState<string[]>([initialState]);
  const [pointer, setPointer] = useState(0);

  const textoAtual = history[pointer];

  // Adiciona novo estado (quando o usuário digita)
  const pushState = useCallback((novoTexto: string) => {
    if (novoTexto === history[pointer]) return;
    
    // Se estamos no meio do histórico e digitamos, o "futuro" deixa de existir
    const historyAteAgora = history.slice(0, pointer + 1);
    
    // Adiciona o novo texto e atualiza o ponteiro
    const novoHistory = [...historyAteAgora, novoTexto];
    
    setHistory(novoHistory);
    setPointer(novoHistory.length - 1);
  }, [history, pointer]);

  const undo = useCallback(() => {
    if (pointer > 0) {
      setPointer(p => p - 1);
    }
  }, [pointer]);

  const redo = useCallback(() => {
    if (pointer < history.length - 1) {
      setPointer(p => p + 1);
    }
  }, [pointer, history.length]);

  return {
    texto: textoAtual,
    setTexto: pushState,
    undo,
    redo,
    canUndo: pointer > 0,
    canRedo: pointer < history.length - 1
  };
}
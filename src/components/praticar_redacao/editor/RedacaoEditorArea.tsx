// src/components/praticar_redacao/editor/RedacaoEditorArea.tsx
import { useRef, ChangeEvent, KeyboardEvent, ClipboardEvent } from 'react';

interface Props {
  texto: string;
  onTextoChange: (novoTexto: string) => void;
  // Novas props opcionais (para manter compatibilidade se não passar)
  onUndo?: () => void;
  onRedo?: () => void;
  // NOVA PROP: desabilitar o editor
  disabled?: boolean;
}

export function RedacaoEditorArea({ 
  texto, 
  onTextoChange, 
  onUndo, 
  onRedo,
  disabled = false // Valor padrão false para manter compatibilidade
}: Props) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const LINE_HEIGHT = 32; 
  const TOTAL_LINES = 30; 
  const PADDING_VERTICAL = 24; 
  const TOTAL_HEIGHT = (LINE_HEIGHT * TOTAL_LINES) + (PADDING_VERTICAL * 2);

  // 1. Lógica para BLOQUEAR O COLAR (Ctrl+V)
  const handlePaste = (e: ClipboardEvent<HTMLTextAreaElement>) => {
    e.preventDefault(); // Impede a ação padrão
    // Opcional: Avisar o usuário
    // alert("A função de colar texto está desativada para esta redação.");
  };

  // 2. Lógica para Interceptar Atalhos (Ctrl+Z / Ctrl+Y)
  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Se estiver desabilitado, bloqueia todas as teclas exceto as de navegação
    if (disabled) {
      // Permite apenas teclas de navegação básicas (setas, tab, etc)
      const allowedKeys = [
        'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown',
        'Tab', 'Home', 'End', 'PageUp', 'PageDown'
      ];
      
      if (!allowedKeys.includes(e.key) && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        return;
      }
    }

    // Verifica se CTRL (ou Command no Mac) está pressionado
    if (e.ctrlKey || e.metaKey) {
      
      // Atalho: Undo (Ctrl + Z)
      if (e.key === 'z' && !e.shiftKey) {
        e.preventDefault(); // Evita o undo nativo do browser (que pode conflitar)
        onUndo?.();
        return;
      }

      // Atalho: Redo (Ctrl + Y  OU  Ctrl + Shift + Z)
      if (e.key === 'y' || (e.key === 'z' && e.shiftKey)) {
        e.preventDefault();
        onRedo?.();
        return;
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    // Se estiver desabilitado, não permite alterações
    if (disabled) {
      e.preventDefault();
      return;
    }

    const novoTexto = e.target.value;
    const elemento = e.target;

    if (novoTexto.length < texto.length) {
      onTextoChange(novoTexto);
      return;
    }

    const TOLERANCIA = 10;
    if (elemento.scrollHeight > (elemento.clientHeight + TOLERANCIA)) {
      return; 
    }
    onTextoChange(novoTexto);
  };

  return (
    <div 
      className={`bg-white rounded-[20px] w-full border border-gray-200 transition-opacity ${
        disabled ? 'opacity-60 pointer-events-none' : ''
      }`}
      style={{ height: `${TOTAL_HEIGHT}px` }} 
    >
      <textarea
        ref={textareaRef}
        value={texto}
        onChange={handleChange}
        // Adicionamos os listeners aqui:
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        // NOVA PROP: desabilita o textarea
        disabled={disabled}

        placeholder={disabled ? "Redação pausada ou em correção..." : "Comece a digitar aqui..."}
        className={`w-full h-full p-0 px-6
                   text-lg text-gray-800 
                   placeholder:text-[#BDB4B4] placeholder:font-normal placeholder:text-xl
                   resize-none border-none focus:outline-none focus:ring-0
                   bg-transparent
                   overflow-hidden
                   ${disabled ? 'cursor-not-allowed' : ''}`}
        style={{
          lineHeight: `${LINE_HEIGHT}px`,
          backgroundImage: `linear-gradient(transparent calc(${LINE_HEIGHT}px - 1px), #E5E5E5 calc(${LINE_HEIGHT}px - 1px))`,
          backgroundSize: `100% ${LINE_HEIGHT}px`,
          backgroundAttachment: 'local',
          paddingTop: `${PADDING_VERTICAL}px`,
          paddingBottom: `${PADDING_VERTICAL}px`,
          backgroundPosition: `0 ${PADDING_VERTICAL}px`
        }}
      />
    </div>
  );
}
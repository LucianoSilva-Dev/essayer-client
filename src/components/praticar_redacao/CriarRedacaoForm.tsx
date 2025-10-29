'use client';

import { useState } from 'react';
import { Timer, Rewind, FastForward } from 'lucide-react';

export function CriarRedacaoForm() {
  const [tema, setTema] = useState('');
  const isButtonDisabled = tema.trim() === '';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    alert('Função "Praticar redação" (API POST) seria chamada aqui.');
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-9 rounded-t-[60px] rounded-b-[60px] shadow-sm border border-gray-100"
    >
      <div className="space-y-6">
        
        {/* Seção do Tema (MODIFICADA) */}
        <div>
          <label htmlFor="tema" className="block text-lg font-semibold text-gray-800 mb-2">
            Tema
          </label>
          
          {/* ALTERAÇÃO: 
            - O 'div' com 'flex' foi removido.
            - Este 'div' agora é 'relative' para conter o botão.
          */}
          <div className="relative w-full">
            <input
              type="text"
              id="tema"
              value={tema}
              onChange={(e) => setTema(e.target.value)}
              placeholder="Crie o tema para a redação aqui..."
              // ALTERAÇÃO: 
              // - Adicionado 'w-full'
              // - Adicionado 'pr-40' (padding-right) para dar espaço ao botão.
              className="w-full px-4 py-3 border border-gray-300 rounded-[44px] bg-gray-100
                         text-base text-gray-700 placeholder:text-gray-500
                         focus:outline-none focus:ring-2 focus:ring-teal-500
                         pr-40" 
            />
            <button
              type="button"
              // ALTERAÇÃO: 
              // - Posicionado de forma 'absolute'
              // - 'right-2' (para dar um respiro da borda)
              // - 'top-1/2 -translate-y-1/2' (para centralizar verticalmente)
              // - Padding e fonte levemente reduzidos ('py-2', 'text-sm') para caber.
              className="absolute right-2 top-1/2 -translate-y-1/2
                         px-5 py-2 bg-[#075F70] text-white rounded-[28px] font-medium text-sm
                         hover:bg-opacity-90 transition-colors shadow-sm"
            >
              Temas pronto
            </button>
          </div>
        </div>

        {/* Seção da Duração e Botão de Praticar (Sem alteração) */}
        <div>
          <label className="block text-lg font-semibold text-gray-800 mb-2">
            Duração
          </label>
          <div className="flex flex-col md:flex-row items-center justify-between gap-3">
            
            {/* Box do Timer */}
            <div 
              className="w-full md:w-auto flex items-center justify-between gap-4 px-4 py-2 bg-gray-100 rounded-[44px]"
            >
              <div className="flex items-center gap-4">
                <Rewind size={18} className="text-gray-600 cursor-pointer" />
                <span className="text-2xl font-mono font-medium text-gray-900">
                  00
                </span>
                <FastForward size={18} className="text-gray-600 cursor-pointer" />
              </div>
              <div className="w-10 h-10 bg-[#075F70] rounded-full flex items-center justify-center">
                <Timer size={20} className="text-white" />
              </div>
            </div>

            {/* Botão Principal de Ação */}
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`w-full md:w-auto px-12 py-3 text-base font-semibold border-2 rounded-[44px]
                         transition-colors
                         ${
                           isButtonDisabled
                             ? 'border-[#898787] text-[#898787] bg-white cursor-not-allowed'
                             : 'border-teal-600 bg-teal-600 text-white hover:bg-teal-700'
                         }`}
            >
              Praticar redação
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
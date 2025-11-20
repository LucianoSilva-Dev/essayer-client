// CriarRedacaoForm.tsx
'use client';

import { useState } from 'react';
import { Timer, Play, X } from 'lucide-react';

interface CriarRedacaoFormProps {
  onRedacaoCreated: (tema: string, duration: number) => void;
  mockThemes: string[];
}

export function CriarRedacaoForm({ onRedacaoCreated, mockThemes }: CriarRedacaoFormProps) {
  const [tema, setTema] = useState('');
  const [duration, setDuration] = useState(30); // Duração inicial em minutos
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [key, setKey] = useState(0); // Para forçar animação no display da duração

  const isButtonDisabled = tema.trim() === '';

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (isButtonDisabled) return;
    // Chama a função do componente pai para adicionar a nova redação
    onRedacaoCreated(tema, duration);
    setTema(''); // Limpar o campo após a criação
    setDuration(30); // Resetar duração
  };

  const handleDurationChange = (change: 10 | -10) => {
    setDuration(prev => {
      const newDuration = prev + change;
      // Garante que a duração seja entre 10 e 180 minutos
      if (newDuration >= 10 && newDuration <= 180) {
        setKey(prevKey => prevKey + 1); // Atualiza a key para forçar a animação
        return newDuration;
      }
      return prev;
    });
  };

  const selectTheme = (selectedTema: string) => {
    setTema(selectedTema);
    setIsModalOpen(false);
  };

  const formattedDuration = String(duration).padStart(2, '0');

  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="bg-white p-9 md:p-12 lg:p-16 rounded-[60px] md:rounded-[80px] shadow-sm border border-gray-100"
      >
        <div className="space-y-8">

          {/* Seção do Tema */}
          <div>
            <label htmlFor="tema" className="block text-[28px] font-normal text-[#3C3C3C] mb-3">
              Tema
            </label>

            <div className="relative w-full">
              <input
                type="text"
                id="tema"
                value={tema}
                onChange={(e) => setTema(e.target.value)}
                placeholder="Crie o tema para a redação aqui..."
                className={`w-full h-31 px-7 py-5 border border-transparent rounded-[44px] bg-[#E5E5E5]
                         text-[24px] text-gray-700 placeholder:text-[#898787] placeholder:font-light
                         focus:outline-none focus:ring-2 focus:ring-teal-500
                         pr-[15rem]`}
              />
              {/* Botão Temas Prontos: Abre o Modal com feedback visual fluido */}
              <button
                type="button"
                onClick={() => setIsModalOpen(true)}
                className={`absolute right-4 bottom-4
                         px-8 py-[10px] bg-[#075F70] text-white rounded-[28px] font-medium text-[24px]
                         transition-all duration-300 hover:bg-opacity-90 shadow-md active:scale-[0.98]`}
              >
                Temas prontos
              </button>
            </div>
          </div>

          {/* Seção da Duração e Botão de Praticar */}
          <div>
            <label className="block text-[28px] font-normal text-[#3C3C3C] mb-3">
              Duração
            </label>

            <div className="flex flex-col md:flex-row items-center justify-between gap-3">

              {/* Box do Timer */}
              <div
                className="w-full md:w-auto flex items-center justify-between gap-8 px-4 py-3 bg-[#E5E5E5] rounded-[44px]"
              >
                <div className="flex items-center gap-6">
                  {/* Botão para Diminuir 10 min */}
                  <button
                    type="button"
                    onClick={() => handleDurationChange(-10)}
                    disabled={duration <= 30}
                    // Adicionando efeito de clique (active:scale) e transição para fluidez
                    className="text-[#434343] cursor-pointer transition-transform duration-150 active:scale-[0.85] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {/* Seta para esquerda (Play rotacionado) */}
                    <Play size={20} fill='true' className="transform rotate-180" />
                  </button>

                  {/* Display da Duração com Animação */}
                  <span
                    // A key muda a cada clique, forçando a animação
                    key={key}
                    className="text-[48px] font-medium text-[#3C3C3C] transition-all duration-300 ease-out animate-duration-change"
                    style={{
                      animation: `duration-change 0.3s ease-out forwards`
                    }}
                  >
                    {formattedDuration}
                  </span>

                  {/* Botão para Aumentar 10 min */}
                  <button
                    type="button"
                    onClick={() => handleDurationChange(10)}
                    disabled={duration >= 180}
                    className="text-[#434343] cursor-pointer transition-transform duration-150 active:scale-[0.85] disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {/* Seta para direita */}
                    <Play size={20} fill='true' />
                  </button>
                </div>

                {/* Ícone do Timer */}
                <div className="w-[52px] h-[52px] bg-[#075F70] rounded-[28px] flex items-center justify-center flex-shrink-0 shadow-md">
                  <Timer size={24} className="text-white" />
                </div>
              </div>

              {/* Botão Principal de Ação */}
              <button
                type="submit"
                disabled={isButtonDisabled}
                className={`w-full md:w-[340px] h-[84px] text-[28px] font-semibold border-2 rounded-[44px]
                         transition-all duration-300 flex items-center justify-center active:scale-[0.98]
                         ${isButtonDisabled
                    ? 'border-[#898787] text-[#898787] bg-white cursor-not-allowed'
                    : 'border-[#075F70] bg-[#075F70] text-white hover:opacity-90 shadow-lg'
                  }`}
              >
                Praticar redação
              </button>
            </div>
          </div>
        </div>
      </form>

      {/* Keyframe para animação da duração (suavidade na mudança do número) */}
      <style jsx global>{`
        @keyframes duration-change {
          0% {
            opacity: 0.5;
            transform: translateY(5px);
          }
          50% {
            opacity: 1;
            transform: translateY(-2px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
    `}</style>

      {/* Modal de Temas Prontos com Transições Suaves */}
      {isModalOpen && (
        <div
          // Overlay: fundo preto semitransparente com blur
          className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          {/* Conteúdo do Modal: aparece do centro e é escalado */}
          <div
            className={`bg-white p-8 rounded-3xl shadow-2xl w-full max-w-lg transition-transform duration-300 ease-out scale-100 opacity-100`}
            onClick={(e) => e.stopPropagation()} // Evita fechar o modal ao clicar dentro
          >
            <div className="flex justify-between items-center mb-6 border-b pb-3">
              <h2 className="text-2xl font-semibold text-[#3C3C3C]">Temas Prontos</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-[#898787] hover:text-[#3C3C3C] transition-colors p-1 rounded-full hover:bg-gray-100">
                <X size={24} />
              </button>
            </div>

            <ul className="space-y-4 max-h-80 overflow-y-auto pr-2">
              {mockThemes.map((mockTema, index) => (
                <li key={index}>
                  {/* Botão de seleção com hover suave */}
                  <button
                    type="button"
                    onClick={() => selectTheme(mockTema)}
                    className={`w-full text-left p-3 rounded-xl bg-gray-50 hover:bg-[#E5EFF0] text-[#3C3C3C] 
                                           font-medium text-lg transition-colors duration-200 border border-transparent hover:border-[#075F70] active:scale-[0.99]`}
                  >
                    {mockTema}
                  </button>
                </li>
              ))}
              {mockThemes.length === 0 && <p className="text-center text-[#898787]">Nenhum tema pronto disponível no momento.</p>}
            </ul>
          </div>
        </div>
      )}
    </>
  );
}
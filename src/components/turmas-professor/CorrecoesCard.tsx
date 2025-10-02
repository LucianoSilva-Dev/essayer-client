export default function CorrecoesCard({ className }: { className?: string }) {
  const correcoes = [
    { id: 1, tema: "Os impactos da inteligência artificial no mercado de trabalho", envios: "45 envios" },
    { id: 2, tema: "Os impactos da inteligência artificial no mercado de trabalho", envios: "45 envios" },
    { id: 3, tema: "Os impactos da inteligência artificial no mercado de trabalho", envios: "45 envios" },
    { id: 4, tema: "Os impactos da inteligência artificial no mercado de trabalho", envios: "45 envios" },
    // { id: 5, tema: "Os impactos da inteligência artificial no mercado de trabalho", envios: "45 envios" },
  ];

  return (
    <div className={`relative w-full h-full scale-90 bg-white rounded-[20px] shadow-lg p-5 z-10 ${className}`}>
      <h2 className="w-full font-montserrat font-semibold text-[22px] leading-[27px] text-[#3C3C3C] text-center mb-5">
        Central de correções
      </h2>

      <div className="relative">
        <div className="flex flex-col gap-[10px] max-h-[270px] overflow-y-auto pr-2 scrollbar-thin">
          {correcoes.map((correcao, index) => (
            <div key={correcao.id} className="relative flex flex-col gap-1 p-0 isolate">
              <div className="flex justify-between items-start">
                <span className="font-montserrat font-medium text-[18px] leading-[22px] text-[#3C3C3C]">
                  Tema
                </span>
                <span className="font-montserrat font-normal text-[14px] leading-[17px] text-[#3C3C3C]">
                  {correcao.envios}
                </span>
              </div>
              <p className="font-montserrat font-normal text-[16px] leading-[20px] text-[#3C3C3C] w-full">
                {correcao.tema}
              </p>
              {index < correcoes.length - 1 && (
                <div className="w-full h-[1px] bg-[rgba(217,217,217,0.7)] mt-2" />
              )}
            </div>
          ))}
        </div>

        <div 
          className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, transparent 0%, white 100%)',
            opacity: 0.8,
            filter: 'blur(1px)'
          }}
        />
      </div>

      <div className="absolute bottom-5 left-5 flex items-center gap-2">
        <span className="font-montserrat font-medium text-[20px] leading-[24px] text-[#3C3C3C]">
          3 novas correções
        </span>
        <div className="w-[10px] h-[10px] bg-[#075F70] rounded-full" />
      </div>
    </div>
  );
}

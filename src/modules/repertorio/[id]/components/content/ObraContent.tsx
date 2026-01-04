import type { Obra } from "@/types/repertorio";

interface ObraContentProps {
  repertorio: Obra;
}

export function ObraContent({ repertorio }: ObraContentProps) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl md:text-2xl font-regular text-gray-900 mb-4 font-montserrat">
          Sinopse
        </h2>

        <div className="text-gray-700 leading-relaxed text-base md:text-lg whitespace-pre-wrap font-opensans">
          {repertorio.sinopse}
        </div>
      </div>

      <div>
        <h2 className="text-xl md:text-2xl font-regular text-gray-900 mb-2 font-montserrat">
            Por <span className="font-normal">{repertorio.autoria}</span>
        </h2>
      </div>
    </div>
  );
}
import React from "react";
import { Users } from "lucide-react";

interface TarefaCardProps {
  tema: string;
  envios: number;
  total: number;
  alunosExtras: number;
  data: string;
}

const TarefaCard: React.FC<TarefaCardProps> = ({
  tema,
  envios,
  total,
  alunosExtras,
  data,
}) => {
  const temEnvios = envios > 0;

  return (
    <div
      className={`flex flex-col justify-between w-full sm:w-[260px] min-h-[240px] rounded-2xl p-5 shadow-md transition ${
        temEnvios ? "bg-white hover:shadow-lg" : "bg-gray-200"
      }`}
    >
      {/* Tema */}
      <div>
        <h3 className="text-sm font-semibold text-gray-800 mb-1">Tema</h3>
        <p className="text-base text-gray-700">{tema}</p>
      </div>

      <hr className="my-3 border-gray-300" />

      {/* Envios */}
      <div>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-gray-800">Envios</span>
          <span className="font-medium text-gray-800">
            {String(envios).padStart(2, "0")}/{total}
          </span>
        </div>

        {temEnvios ? (
          <div className="flex items-center gap-2 mt-2 text-gray-700">
            <Users size={20} />
            <span className="text-sm font-medium">
              +{alunosExtras} alunos
            </span>
          </div>
        ) : (
          <p className="text-sm text-gray-500 mt-2">
            Nenhum envio feito ainda
          </p>
        )}
      </div>

      {/* Data */}
      <p className="text-sm font-semibold text-gray-600 mt-3">
        Fecha em {data}
      </p>
    </div>
  );
};

export default TarefaCard;

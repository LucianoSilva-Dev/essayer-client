// src/components/turma-aberta-prof/tarefas/tarefa-card.tsx
import React from "react";
import { Users } from "lucide-react";

interface TarefaCardProps {
  tema: string;
  envios: number;
  total: number;
  alunosExtras: number;
  data: string; // Keep receiving data as string or Date object
  isSelected?: boolean; // New prop to indicate if the card is selected
}

const TarefaCard: React.FC<TarefaCardProps> = ({
  tema,
  envios,
  total,
  alunosExtras,
  data,
  isSelected = false, // Default to false if not provided
}) => {
  const temEnvios = envios > 0;

  // Format the date
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      // Ensure the date is valid before formatting
      if (isNaN(date.getTime())) {
        return dateString; // Return original string if date is invalid
      }
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
      const year = String(date.getFullYear()).slice(-2); // Get last two digits of year
      return `${day}/${month}/${year}`;
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString; // Return original string in case of error
    }
  };

  const formattedDate = formatDate(data);

  // Define base classes and conditional classes
  const baseCardClasses = "flex flex-col justify-between transition-all duration-300 isolate";
  const selectedClasses = "w-[268px] min-h-[311px] bg-white rounded-[21px] p-[21px] gap-[15.75px] shadow-lg scale-105"; // Use min-h for flexibility
  const unselectedClasses = "w-[254px] min-h-[296px] bg-[#E0E0E0] rounded-[20px] p-[20px] gap-[15px] opacity-80 scale-95"; // Use min-h

  const baseTitleClasses = "font-montserrat font-medium text-[#3C3C3C]";
  const selectedTitleClasses = "text-[18.9px] leading-[23px]";
  const unselectedTitleClasses = "text-[18px] leading-[22px]";

  const baseTemaTextClasses = "font-montserrat font-normal text-[#3C3C3C]";
  const selectedTemaTextClasses = "text-[21px] leading-[26px] h-auto"; // Use h-auto and line-clamp
  const unselectedTemaTextClasses = "text-[20px] leading-[24px] h-auto"; // Use h-auto and line-clamp

  const baseEnviosTitleClasses = "font-montserrat font-medium text-[#3C3C3C]";
  const selectedEnviosTitleClasses = "text-[18.9px] leading-[23px]";
  const unselectedEnviosTitleClasses = "text-[18px] leading-[22px]";

  const baseDateClasses = "font-montserrat text-[#3C3C3C]";
  const selectedDateClasses = "text-[14.7px] leading-[18px]";
  const unselectedDateClasses = "text-[14px] leading-[17px]";


  return (
    <div className={`${baseCardClasses} ${isSelected ? selectedClasses : unselectedClasses}`}>
      {/* Tema */}
      {/* Adjusted gap for spacing */}
      <div className={`flex flex-col items-start gap-1 self-stretch`}>
        <h3 className={`${baseTitleClasses} ${isSelected ? selectedTitleClasses : unselectedTitleClasses}`}>
            Redação {/* Assuming this is static based on CSS, adjust if needed */}
        </h3>
        <p className={`${baseTemaTextClasses} ${isSelected ? selectedTemaTextClasses : unselectedTemaTextClasses} self-stretch ${isSelected ? 'line-clamp-4' : 'line-clamp-4'}`}> {/* Apply line-clamp */}
            {tema}
        </p>
      </div>

      <hr className={`border-[#E2E2E2] ${isSelected ? 'border-[1.05px]' : 'border-[1px]'} w-full my-3`} /> {/* Added margin */}

      {/* Envios */}
       {/* Adjusted gap and items positioning */}
       <div className={`flex flex-col self-stretch ${isSelected ? 'items-start gap-[10.5px]' : 'items-center gap-[15px]'}`}>
          <div className={`flex items-center self-stretch ${isSelected ? 'justify-between' : 'justify-start'}`}>
            <span className={`${baseEnviosTitleClasses} ${isSelected ? selectedEnviosTitleClasses : unselectedEnviosTitleClasses}`}>
              Envios {String(envios).padStart(2, "0")}/{total}
            </span>
          </div>

          {temEnvios && isSelected ? (
             <div className="flex items-center gap-1"> {/* Simplified avatar section */}
                <div className="flex -space-x-2 overflow-hidden">
                    {/* Placeholder Avatars - Replace with actual images/components if needed */}
                    <div className="sm:inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-400 flex items-center justify-center text-xs text-white">A1</div>
                    <div className="sm:inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-400 flex items-center justify-center text-xs text-white">A2</div>
                    <div className="sm:inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-400 flex items-center justify-center text-xs text-white">A3</div>
                </div>
                 {alunosExtras > 0 && (
                    <div className="flex justify-center items-center h-8 px-3 bg-[#F1F1F2] rounded-full text-xs font-medium text-[#3C3C3C] ring-2 ring-white">
                        +{alunosExtras} alunos
                    </div>
                )}
            </div>
          ) : !temEnvios && !isSelected ? (
            <p className="font-montserrat font-normal text-[16px] leading-[20px] text-[#898787] w-full text-left"> {/* Aligned left */}
              Nenhum envio feito ainda
            </p>
          ) : null}
      </div>

      {/* Data - Now positioned relative to the card bottom */}
       <div className={`flex flex-row justify-center items-center gap-1 ${isSelected ? 'mt-[10px]' : 'mt-auto'}`}> {/* Adjusted spacing for selected */}
          <span className={`font-semibold ${baseDateClasses} ${isSelected ? selectedDateClasses : unselectedDateClasses}`}>
              Fecha em
          </span>
          <span className={`font-normal ${baseDateClasses} ${isSelected ? selectedDateClasses : unselectedDateClasses}`}>
              {formattedDate}
          </span>
       </div>
    </div>
  );
};

export default TarefaCard;

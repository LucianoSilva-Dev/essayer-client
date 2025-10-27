// src/components/faq/FaqCard.tsx
"use client";
// Removido 'useState'
import { ChevronDown } from "lucide-react";

interface FaqCardProps {
  pergunta: string;
  resposta: string;
  // 1. NOVAS PROPS
  isOpen: boolean;
  onToggle: () => void;
}

export function FaqCard({
  pergunta,
  resposta,
  isOpen,
  onToggle,
}: FaqCardProps) {
  // 2. REMOVIDO O 'useState'
  // const [open, setOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-5">
      <button
        // 3. 'onClick' agora chama a prop 'onToggle'
        onClick={onToggle}
        className="w-full flex items-start text-left group cursor-pointer gap-3"
      >
        <ChevronDown
          className={`w-5 h-5 text-gray-500 transition-transform duration-300 flex-shrink-0 mt-1 ${
            // 4. Lógica de classe agora usa 'isOpen'
            isOpen ? "rotate-180" : ""
          }`}
        />
        <span className="text-lg text-gray-800 font-medium group-hover:text-teal-700 transition">
          {pergunta}
        </span>
      </button>

      <div
        className={`transition-all overflow-hidden duration-300 ease-in-out ${
          // 4. Lógica de classe agora usa 'isOpen'
          isOpen
            ? "max-h-96 opacity-100 pt-3 pl-8"
            : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-gray-600 text-sm">{resposta}</p>
      </div>
    </div>
  );
}
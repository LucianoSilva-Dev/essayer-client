import Image from "next/image";
import { User, CheckCircle2 } from "lucide-react"; // Importei um icone de check para o verificado
import type { PerfilUsuario } from "@/apiCalls/types";

interface CreatorInfoProps {
  creator: PerfilUsuario;
  profilePictureUrl: string | null;
}

export function CreatorInfo({ creator, profilePictureUrl }: CreatorInfoProps) {
  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center flex-shrink-0 overflow-hidden border border-gray-100">
        {profilePictureUrl ? (
          <Image 
            src={profilePictureUrl} 
            alt={`Foto de ${creator.nome}`} 
            width={48} 
            height={48} 
            className="w-full h-full object-cover"
          />
        ) : (
          <User size={24} className="text-gray-400" />
        )}
      </div>
      <div className="flex flex-col">
        <p className="font-bold text-gray-900 text-sm md:text-base leading-tight">
          {creator.nome || 'Usuário desconhecido'}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
           {/* Aqui simulamos o verificado, pode ser condicional baseado no cargo se quiser */}
          <span className="text-xs text-gray-500 font-medium">Educador verificado</span>
        </div>
      </div>
    </div>
  );
}
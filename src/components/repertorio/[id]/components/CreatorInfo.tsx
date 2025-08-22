import Image from "next/image";
import { User } from "lucide-react";
import type { PerfilUsuario } from "@/apiCalls/types";

interface CreatorInfoProps {
  creator: PerfilUsuario;
  profilePictureUrl: string | null;
}

export function CreatorInfo({ creator, profilePictureUrl }: CreatorInfoProps) {
  return (
    <div className="bg-gray-50 px-4 sm:px-6 py-4 border-b border-gray-200">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center mr-3 flex-shrink-0 overflow-hidden">
          {profilePictureUrl ? (
            <Image 
              src={profilePictureUrl} 
              alt={`Foto de ${creator.nome}`} 
              width={40} 
              height={40} 
              className="w-full h-full object-cover"
            />
          ) : (
            <User size={20} className="text-white" />
          )}
        </div>
        <div>
          <p className="font-medium text-gray-900">{creator.nome || 'Usuário desconhecido'}</p>
        </div>
      </div>
    </div>
  );
}

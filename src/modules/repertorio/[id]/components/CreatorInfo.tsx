import Image from "next/image";
import { User, CheckCircle2 } from "lucide-react";
import type { PerfilUsuario } from "@/types/types";

interface CreatorInfoProps {
  creator?: PerfilUsuario | null;
  profilePictureUrl?: string | null;
}

export function CreatorInfo({ creator, profilePictureUrl }: CreatorInfoProps) {
  const nomeUsuario = creator?.nome || 'Usuário desconhecido';

  return (
    <div className="flex items-center gap-3">
      <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center shrink-0 overflow-hidden border border-gray-100">
        {profilePictureUrl ? (
          <Image
            src={profilePictureUrl}
            alt={`Foto de ${nomeUsuario}`}
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
          {nomeUsuario}
        </p>
        <div className="flex items-center gap-1 mt-0.5">
          {/* Adicionei o ícone de CheckCircle2 que você importou */}
          <CheckCircle2 size={14} className="text-blue-500" />
          <span className="text-xs text-gray-500 font-medium">Educador verificado</span>
        </div>
      </div>
    </div>
  );
}
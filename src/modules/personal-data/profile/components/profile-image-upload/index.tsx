"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { useAuth } from "@/shared/contexts/auth-context"; // Caminho correto
import {
  getProfilePictureLink,
  updateProfilePicture,
} from "@/lib/apiCalls/usuario"; // Caminho correto
import { toast } from "react-toastify";
import { Loader2, User } from "lucide-react";

export default function ProfileImageUpload() {
  const { userData } = useAuth(); // 1. Apenas pegamos o userData
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 2. O useEffect agora reage a mudanças no `userData` (especificamente fotoPath)
  // Se o contexto atualizar o `userData`, este useEffect será executado novamente.
  useEffect(() => {
    if (userData?.id) {
      setIsLoading(true);
      getProfilePictureLink(userData.id)
        .then(setProfilePic)
        .catch(() => setProfilePic(null)) // Deixa nulo para mostrar o ícone
        .finally(() => setIsLoading(false));
    } else {
      // Se não houver ID (ex: logout), limpa a foto e para de carregar
      setProfilePic(null);
      setIsLoading(false);
    }
  }, [userData?.id, userData?.fotoPath]); // Depende do fotoPath como você sugeriu

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userData?.id) return;

    setIsLoading(true);
    try {
      // Faz o upload da nova foto
      await updateProfilePicture(userData.id, file);

      // 3. A API foi atualizada.
      // Agora, o *contexto* precisa ser atualizado.
      // Você deve chamar AQUI a função do seu `useAuth` que re-valida o usuário.
      // Exemplo: await revalidarMinhaSessao()
      //
      // Quando essa função (que você possui) atualizar o `userData` no contexto,
      // o `useEffect` acima será disparado automaticamente e atualizará a imagem.

      toast.success("Foto de perfil atualizada!");

      // NOTA: Para uma melhoria de UI imediata (antes do contexto atualizar),
      // podemos buscar o link novo e setar o estado local.
      // O useEffect vai rodar de novo quando o contexto mudar, mas a UI já vai estar atualizada.
      const newPicLink = await getProfilePictureLink(userData.id);
      setProfilePic(newPicLink);
    } catch (error) {
      toast.error("Erro ao atualizar a foto.");
      console.error(error);
    } finally {
      setIsLoading(false); // Para de carregar em ambos os casos (sucesso ou erro)
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div className="text-center flex flex-col items-center gap-4 sm:gap-6">
      <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-[#3C3C3C] w-full text-left">
        Alterar imagem
      </h2>

      <button
        type="button"
        onClick={handleImageClick}
        className="relative w-32 h-32 sm:w-40 sm:h-40 lg:w-44 lg:h-44 rounded-full group cursor-pointer bg-gray-200 flex items-center justify-center shadow-md hover:shadow-lg transition-shadow disabled:opacity-70"
        disabled={isLoading}
      >
        {isLoading ? (
          <Loader2 className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 text-gray-500 animate-spin" />
        ) : (
          <>
            {profilePic ? (
              <Image
                src={profilePic}
                alt="Foto de perfil"
                fill
                sizes="(max-width: 640px) 128px, (max-width: 1024px) 160px, 176px"
                className="rounded-full object-cover transition-opacity group-hover:opacity-70"
                priority
              />
            ) : (
              // Ícone de placeholder como na UI
              <User className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 text-gray-500" />
            )}

            <div className="absolute inset-0 rounded-full bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <span className="text-white font-medium text-sm sm:text-base">
                Trocar
              </span>
            </div>
          </>
        )}
      </button>

      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileChange}
        accept=".jpg, .jpeg, .png, .webp"
        className="hidden"
      />
    </div>
  );
}

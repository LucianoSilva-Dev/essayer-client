"use client";

import { useAuth } from "@/shared/contexts/auth-context";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function AuthButtons() {
  const router = useRouter();
  const { isLoggedIn, userData, isLoading } = useAuth();

  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false); // 🔥 ESSENCIAL

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isLoading || !isLoggedIn || !userData?.id) {
      setProfilePic(null);
      return;
    }

    // getProfilePictureLink(userData.id).then(setProfilePic);
  }, [isLoading, isLoggedIn, userData?.id]);

  if (!mounted) {
    return (
      <div className="w-48 h-9 animate-pulse bg-white/10 rounded-md"></div>
    );
  }

  return (
    <div className="flex items-center space-x-4">
      {isLoggedIn && !isLoading ? (
        <>
          <span className="text-neutral-dark text-[20px] font-bold">
            Olá, {userData?.name ? userData.name.split(" ")[0] : "Usuário"}!
          </span>

          <button
            onClick={() => router.push("/profile")}
            className="flex items-center focus:outline-none"
            title="Ver perfil"
            type="button"
          >
            {profilePic ? (
              <span className="w-9 h-9 scale-150 cursor-pointer rounded-full overflow-hidden border hover:scale-147 border-[#CA9C60] flex items-center justify-center">
                <Image
                  src={profilePic}
                  alt="Foto de perfil"
                  width={36}
                  height={36}
                  className="object-cover w-full h-full"
                />
              </span>
            ) : (
              <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold cursor-pointer">
                {userData?.name?.[0] || ""}
              </div>
            )}
          </button>
        </>
      ) : !isLoggedIn && !isLoading ? (
        <>
          <Link
            href="/login"
            className="px-6 py-1 rounded-[40px] text-brand-teal-dark text-[20px] border-2 border-transparent hover:border-brand-teal-dark duration-300 transition-colors active:scale-95"
          >
            Entrar
          </Link>

          <Link
            href="/register"
            className="px-6 py-1 rounded-[40px] bg-transparent border-2 border-brand-teal-dark text-brand-teal-dark text-[20px] hover:bg-brand-teal-dark hover:text-white duration-300 transition-colors active:scale-95"
          >
            Cadastrar-se
          </Link>
        </>
      ) : (
        <div className="w-48 h-9 animate-pulse bg-white/10 rounded-md"></div>
      )}
    </div>
  );
}
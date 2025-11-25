import { useAuth } from '@/./contexts/auth-context'
import { useRouter } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getProfilePictureLink } from "../../apiCalls/usuario"

export function AuthButtons() {
  const router = useRouter()
  const { isLoggedIn, userData, isLoading } = useAuth() // Adicione o isLoading
  const [profilePic, setProfilePic] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfilePic = async () => {
      // Garante que só busca a foto se o usuário estiver logado e os dados carregados
      if (isLoggedIn && userData?.id) {
        const url = await getProfilePictureLink(userData.id)
        setProfilePic(url)
      } else {
        setProfilePic(null)
      }
    }
    fetchProfilePic()
  }, [isLoggedIn, userData])

  return (
    <div className="flex items-center space-x-4">
      {/* Exibe o conteúdo do usuário apenas se estiver logado E o carregamento estiver concluído */}
      {isLoggedIn && !isLoading ? (
        <>
          <span className="text-[#3c3c3c] text-[20px] font-bold">
            {/* Verificação segura para exibir o nome */}
            Olá, {userData?.nome ? userData.nome.split(" ")[0] : ""}
          </span>
          <button
            onClick={() => router.push("/profile")}
            className="flex items-center focus:outline-none"
            title="Ver perfil"
            type="button"
          >
            {profilePic ? (
              <span className="w-9 h-9 scale-150 cursor-pointer rounded-full overflow-hidden border-1 hover:scale-147 border-[#CA9C60] flex items-center justify-center">
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
                {/* Fallback seguro para a inicial do nome */}
                {userData?.nome?.[0] || ""}
              </div>
            )}
          </button>
        </>
        // Exibe os botões de login/cadastro se NÃO estiver logado E o carregamento estiver concluído
      ) : !isLoggedIn && !isLoading ? (
        <>
          <Link
            href="/login"
            className="px-6 py-1 rounded-[40px] text-[#075F70] text-[20px] border-2 border-transparent hover:border-[#075F70] duration-300 transition-colors active:scale-95"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="px-6 py-1 rounded-[40px] bg-transparent border-2 border-[#075F70] text-[#075F70] text-[20px] hover:bg-[#075F70] hover:text-white duration-300 transition-colors active:scale-95"
          >
            Cadastrar-se
          </Link>
        </>
      ) : (
        // Opcional: Renderiza um placeholder enquanto isLoading é true
        <div className="w-48 h-9 animate-pulse bg-white/10 rounded-md"></div>
      )}
    </div>
  )
}

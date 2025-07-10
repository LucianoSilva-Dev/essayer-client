import { useAuth } from '@/../contexts/auth-context'
import { useRouter } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import { getProfilePictureLink } from "../../api/usuario"


export function AuthButtons() {
  const router = useRouter()
  const { isLoggedIn, logout, userData } = useAuth()
  const [profilePic, setProfilePic] = useState<string | null>(null)

  useEffect(() => {
    const fetchProfilePic = async () => {
      if (isLoggedIn && userData?.id) {
        const url = await getProfilePictureLink(userData.id)
        setProfilePic(url)
      } else {
        setProfilePic(null)
      }
    }
    fetchProfilePic()
  }, [isLoggedIn, userData])

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  return (
    <div className="flex items-center space-x-4">
      {isLoggedIn ? (
        <>
          <button
            onClick={() => router.push("/perfil")}
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
              <div className="w-9 h-9 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 font-bold">
                {userData?.nome?.[0] || "U"}
              </div>
            )}
          </button>
          <button
            onClick={handleLogout}
            className="px-6 py-3 rounded-[20px] bg-[#CA9C60] text-white text-[20px] hover:bg-[#a68050] duration-200 cursor-pointer"
          >
            Sair
          </button>
        </>

      ) : (
        <>
          <Link
            href="/login"
            className="px-6 py-3 rounded-[10px] border-2 border-white/30 text-white text-[20px] hover:bg-[#CA9C60] hover:border-[#CA9C60] duration-300 transition-colors"
          >
            Entrar
          </Link>
          <Link
            href="/register"
            className="px-6 py-3 rounded-[10px] bg-[#CA9C60] text-white text-[20px] hover:bg-[#a68050] duration-300 transition-colors"
          >
            Cadastrar-se
          </Link>
        </>
      )}
    </div>
  )
}

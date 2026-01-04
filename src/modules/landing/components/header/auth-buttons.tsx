import { useAuth } from '@/shared/contexts/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import Image from "next/image"
import Link from "next/link"

export function AuthButtons() {
  const pathname = usePathname()
  const router = useRouter()
  const { isLoggedIn, logout } = useAuth()

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  const isActive = (path: string) => pathname === path

  return (
   <div className="flex items-center space-x-4">
          {isLoggedIn ? (
          <>
          <Link
            href="/main"
            className={`px-6 py-3 rounded-[20px] bg-[transparent] border-solid border-2 border-[#CA9C60] flex items-center ${isActive("/main") ? "text-black" : "text-[#CA9C60] text-[20px] hover:text-white hover:bg-[#CA9C60] transition-colors duration-300 cursor-pointer"}`}
          >
            Acessar
          </Link>
            <button
              onClick={handleLogout}
              className="px-6 py-3 rounded-[20px] bg-[#CA9C60] text-white text-[20px] hover:bg-[#a68050] duration-200 cursor-pointer"
            >
              <Image src={'/icons/exitIcon.svg'} alt={'Sair'} width={25} height={25} className="inline mr-2">
              </Image>
              Sair
            </button>
          </>
          ) : (
            <>
              <Link
                href="/login"
                className="px-6 py-3 rounded-[10px] bg-[transparent] border-solid border-2 border-[#CA9C60] text-[#CA9C60] text-[20px] hover:bg-[#CA9C60] hover:text-white duration-200 cursor-pointer"
              >
                Entrar
              </Link>
              <Link
                href="/register"
                className="px-6 py-3 rounded-[10px] bg-[#CA9C60] text-white text-[20px] hover:bg-[#a68050] duration-200 cursor-pointer"
              >
                Cadastrar-se
              </Link>
            </>
          )}
        </div>
  )
}

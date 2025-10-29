"use client"
import { usePathname } from 'next/navigation'

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLandingPage = pathname === "/landing"

  const addPadding = ( pathname !== "/login" && pathname !== "/register")
  
  return (
    <main className={`bg-gray-50 ${isLandingPage ? '' : 'pl-25'} ${addPadding ? 'pt-20' : ''} relative`}>
      {children}
    </main>
  )
}
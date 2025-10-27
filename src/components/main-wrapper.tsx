"use client"
import { usePathname } from 'next/navigation'

export function MainWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isLandingPage = pathname === "/landing"
  
  return (
    <main className={`bg-gray-50 ${isLandingPage ? '' : 'pl-25'} relative`}>
      {children}
    </main>
  )
}
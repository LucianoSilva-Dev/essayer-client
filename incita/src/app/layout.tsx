import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import { HeaderAzul } from "../../components/header_azul/header"
import { RepertorioProvider } from "@/../contexts/repertorio-context"
import { CitacaoProvider } from "@/../contexts/citacao-context"
import { AuthProvider } from "@/../contexts/auth-context"
import { ProfileProvider } from "@/../contexts/profile-context"
import "./globals.css"


const Font = Montserrat({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Incita - Turbine suas redações",
  description: "Plataforma para praticar e melhorar suas redações",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html className="scroll-smooth" lang="pt-BR">
      <body className={Font.className}>
        <AuthProvider>
          <ProfileProvider>
            <RepertorioProvider>
              <CitacaoProvider>
                <HeaderAzul />
                {children}
              </CitacaoProvider>
            </RepertorioProvider>
          </ProfileProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

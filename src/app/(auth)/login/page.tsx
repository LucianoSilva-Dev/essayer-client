import { Suspense } from "react"
import LoginForm from "../../../components/auth/login/login-form"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-4 bg-white">
      <Suspense fallback={
        <div className="flex items-center justify-center w-full h-full">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500"></div>
        </div>
      }>
      <LoginForm />
      </Suspense>
    </main>
  )
}

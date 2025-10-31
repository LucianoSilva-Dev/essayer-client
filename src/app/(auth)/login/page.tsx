import { Suspense } from "react"
import LoginForm from "../../../components/auth/login/login-form"

export default function LoginPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center w-full h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#075F70]"></div>
      </div>
    }>
      <LoginForm />
    </Suspense>
  )
}
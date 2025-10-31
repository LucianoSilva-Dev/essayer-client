import { Suspense } from "react"
import ForgotPasswordForm from "../../../components/auth/New_Password/forgot-password"

export default function ForgotPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center w-full h-screen bg-gray-50">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#075F70]"></div>
      </div>
    }>
      <ForgotPasswordForm />
    </Suspense>
  )
}
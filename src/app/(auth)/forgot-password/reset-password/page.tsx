import ResetPassword from "../../../../components/auth/New_Password/reset-password"
import { Suspense } from "react"
export const dynamic = 'force-dynamic';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
      <Suspense fallback={
        <div className="flex items-center justify-center w-full h-screen bg-gray-50">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#075F70]"></div>
        </div>
      }>
      <ResetPassword />
      </Suspense>
    </main>
  )
}
import { Suspense } from "react"
import CodeForm from "../../../../modules/new-password/verify-code/components/content"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50">
     <Suspense fallback={
       <div className="flex items-center justify-center w-full h-screen bg-gray-50">
         <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-brand-teal-dark"></div>
       </div>
      }>
      <CodeForm />
      </Suspense>
    </main>
  )
}
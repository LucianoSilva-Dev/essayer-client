"use client"

import { useRouter } from "next/navigation"
import RepertorioForm from "../../../components/repertorio/repertorio-form"
import { useRepertorio } from "@/../contexts/repertorio-context"

export default function AdicionarRepertorio() {
  const router = useRouter()
  const { adicionarRepertorio } = useRepertorio()

  const handleSubmit = async () => {
    router.push("/main")
  }

  const handleCancel = () => {
    router.push("/main")
  }

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <RepertorioForm onSubmit={handleSubmit} onCancel={handleCancel} />
      </div>
    </main>
  )
}

"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, X } from "lucide-react"
import { useAuth } from "@/../contexts/auth-context"
import { useProfile } from "@/../contexts/profile-context"
import type { UserProfile } from "@/../types/profile"
import { updateProfilePicture } from "../../../../api/usuario"


export default function EditarPerfilPage() {
  const router = useRouter()
  const { isLoggedIn, userData } = useAuth()
  const { profile, updateProfile, isLoading } = useProfile()
  const [formData, setFormData] = useState<Partial<UserProfile>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [foto, setFoto] = useState<File>()

  useEffect(() => {
    if (!isLoggedIn) {
      router.push("/login")
      return
    }

    if (profile) {
      setFormData(profile)
    }
  }, [isLoggedIn, profile, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    const checked = type === "checkbox" ? (e.target as HTMLInputElement).checked : undefined

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }))

    // Limpar erro quando o campo é editado
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleChangeFoto = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    
    if(files && files.length > 0){
      setFoto(files[0])
    }
  }

  const handleNestedChange = (section: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...(prev as any)[section],
        [field]: value,
      },
    }))
  }

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {}

    if (!formData.nome?.trim()) {
      newErrors.nome = "Nome é obrigatório"
    }

    // if (!formData.sobrenome?.trim()) {
    //   newErrors.sobrenome = "Sobrenome é obrigatório"
    // }

    if (!formData.email?.trim()) {
      newErrors.email = "E-mail é obrigatório"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "E-mail inválido"
    }

    if (
      profile?.tipo === "professor" &&
      "curriculoLattes" in formData &&
      !formData.curriculoLattes?.trim()
    ) {
      newErrors.curriculoLattes = "Currículo Lattes é obrigatório para professores"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      await updateProfile(formData)

      if(foto && userData){
        await updateProfilePicture(userData.id, foto)
      }

      router.push("/perfil")
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error)
      setErrors({
        form: "Ocorreu um erro ao atualizar o perfil. Tente novamente.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isLoggedIn || !profile) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-gray-600">Carregando...</div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="bg-white rounded-lg shadow-lg border-l-4 border-l-[#CA9C60] mb-6">
            <div className="p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => router.back()}
                    className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <ArrowLeft size={20} className="mr-2" />
                    Voltar
                  </button>
                  <h1 className="text-2xl font-bold text-gray-900">Editar Perfil</h1>
                </div>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <form onSubmit={handleSubmit}>
              {errors.form && (
                <div className="mb-6 p-4 bg-red-100 text-red-700 border border-red-200 rounded-md">{errors.form}</div>
              )}

              {/* Informações Básicas */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações Básicas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                      Nome <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="nome"
                      name="nome"
                      value={formData.nome || ""}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.nome ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-[#CA9C60]`}
                    />
                    {errors.nome && <p className="mt-1 text-sm text-red-500">{errors.nome}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      E-mail <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email" 
                      id="email"
                      name="email"
                      value={formData.email || ""}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.email ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-[#CA9C60]`}
                    />
                    {errors.email && <p className="mt-1 text-sm text-red-500">{errors.email}</p>}
                  </div>

                  <div className="md:col-span-2">
                    <label htmlFor="avatar" className="block text-sm font-medium text-gray-700 mb-1">
                      Avatar
                    </label>
                    <input 
                      type="file" 
                      id="avatar"
                      name="avatar"
                      onChange={handleChangeFoto}
                      accept=".jpg, .jpeg, .png, .webp"
                      className={`w-full px-3 py-2 border ${
                        errors.avatar ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-[#CA9C60] file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-[#CA9C60]/10 file:text-[#CA9C60]`}
                    />
                    {errors.avatar && <p className="mt-1 text-sm text-red-500">{errors.avatar}</p>}
                  </div>
                </div>
              </div>

              {/* Botões de Ação */}
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                >
                  <X size={18} className="mr-2" />
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  type="submit"
                  disabled={isSubmitting || isLoading}
                  className="flex items-center px-4 py-2 border border-transparent rounded-md text-white bg-[#CA9C60] hover:bg-[#B8935A] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#CA9C60] disabled:opacity-50"
                >
                  <Save size={18} className="mr-2" />
                  {isSubmitting ? "Salvando..." : "Salvar Alterações"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

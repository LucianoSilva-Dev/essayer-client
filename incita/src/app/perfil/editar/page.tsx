"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Save, X } from "lucide-react"
import { useAuth } from "@/../contexts/auth-context"
import { useProfile } from "@/../contexts/profile-context"
import type { UserProfile } from "@/../types/profile"

export default function EditarPerfilPage() {
  const router = useRouter()
  const { isLoggedIn } = useAuth()
  const { profile, updateProfile, isLoading } = useProfile()
  const [formData, setFormData] = useState<Partial<UserProfile>>({})
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

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

    if (profile?.tipo === "professor" && !formData.curriculoLattes?.trim()) {
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

                  {/* <div>
                    <label htmlFor="sobrenome" className="block text-sm font-medium text-gray-700 mb-1">
                      Sobrenome <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      id="sobrenome"
                      name="sobrenome"
                      value={formData.sobrenome || ""}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.sobrenome ? "border-red-500" : "border-gray-300"
                      } rounded-md focus:outline-none focus:ring-1 focus:ring-[#CA9C60]`}
                    />
                    {errors.sobrenome && <p className="mt-1 text-sm text-red-500">{errors.sobrenome}</p>}
                  </div> */}

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

                  {/* <div className="md:col-span-2">
                    <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-1">
                      Biografia
                    </label>
                    <textarea
                      id="bio"
                      name="bio"
                      rows={4}
                      value={formData.bio || ""}
                      onChange={handleChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#CA9C60]"
                      placeholder="Conte um pouco sobre você..."
                    />
                  </div> */}
                </div>
              </div>

              {/* Campos específicos por tipo */}
              {/* {profile.tipo === "aluno" && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações Acadêmicas</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="escola" className="block text-sm font-medium text-gray-700 mb-1">
                        Escola
                      </label>
                      <input
                        type="text"
                        id="escola"
                        name="escola"
                        value={formData.escola || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#CA9C60]"
                      />
                    </div>

                    <div>
                      <label htmlFor="serie" className="block text-sm font-medium text-gray-700 mb-1">
                        Série
                      </label>
                      <select
                        id="serie"
                        name="serie"
                        value={formData.serie || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#CA9C60] bg-white"
                      >
                        <option value="">Selecione sua série</option>
                        <option value="6ano">6º Ano</option>
                        <option value="7ano">7º Ano</option>
                        <option value="8ano">8º Ano</option>
                        <option value="9ano">9º Ano</option>
                        <option value="1medio">1º Ano - Ensino Médio</option>
                        <option value="2medio">2º Ano - Ensino Médio</option>
                        <option value="3medio">3º Ano - Ensino Médio</option>
                        <option value="superior">Ensino Superior</option>
                        <option value="pos">Pós-graduação</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="nivel" className="block text-sm font-medium text-gray-700 mb-1">
                        Nível
                      </label>
                      <select
                        id="nivel"
                        name="nivel"
                        value={formData.nivel || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#CA9C60] bg-white"
                      >
                        <option value="iniciante">Iniciante</option>
                        <option value="intermediario">Intermediário</option>
                        <option value="avancado">Avançado</option>
                      </select>
                    </div>
                  </div>
                </div>
              )} */}

              {profile.tipo === "professor" && (
                <div className="mb-8">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Informações Profissionais</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="md:col-span-2">
                      <label htmlFor="curriculoLattes" className="block text-sm font-medium text-gray-700 mb-1">
                        Currículo Lattes <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="url"
                        id="curriculoLattes"
                        name="curriculoLattes"
                        value={formData.curriculoLattes || ""}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${
                          errors.curriculoLattes ? "border-red-500" : "border-gray-300"
                        } rounded-md focus:outline-none focus:ring-1 focus:ring-[#CA9C60]`}
                      />
                      {errors.curriculoLattes && <p className="mt-1 text-sm text-red-500">{errors.curriculoLattes}</p>}
                    </div>

                    {/* <div>
                      <label htmlFor="instituicao" className="block text-sm font-medium text-gray-700 mb-1">
                        Instituição
                      </label>
                      <input
                        type="text"
                        id="instituicao"
                        name="instituicao"
                        value={formData.instituicao || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#CA9C60]"
                      />
                    </div> */}

                    {/* <div>
                      <label htmlFor="areaAtuacao" className="block text-sm font-medium text-gray-700 mb-1">
                        Área de Atuação
                      </label>
                      <select
                        id="areaAtuacao"
                        name="areaAtuacao"
                        value={formData.areaAtuacao || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#CA9C60] bg-white"
                      >
                        <option value="">Selecione sua área</option>
                        <option value="linguagens">Linguagens e suas Tecnologias</option>
                        <option value="matematica">Matemática e suas Tecnologias</option>
                        <option value="natureza">Ciências da Natureza e suas Tecnologias</option>
                        <option value="humanas">Ciências Humanas e Sociais Aplicadas</option>
                        <option value="redacao">Redação e Produção Textual</option>
                        <option value="filosofia">Filosofia</option>
                        <option value="sociologia">Sociologia</option>
                        <option value="historia">História</option>
                        <option value="geografia">Geografia</option>
                        <option value="literatura">Literatura</option>
                        <option value="outros">Outros</option>
                      </select>
                    </div> */}

                    {/* <div>
                      <label htmlFor="titulacao" className="block text-sm font-medium text-gray-700 mb-1">
                        Titulação
                      </label>
                      <select
                        id="titulacao"
                        name="titulacao"
                        value={formData.titulacao || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#CA9C60] bg-white"
                      >
                        <option value="graduacao">Graduação</option>
                        <option value="especializacao">Especialização</option>
                        <option value="mestrado">Mestrado</option>
                        <option value="doutorado">Doutorado</option>
                        <option value="pos-doutorado">Pós-Doutorado</option>
                      </select>
                    </div> */}

                    {/* <div>
                      <label htmlFor="experiencia" className="block text-sm font-medium text-gray-700 mb-1">
                        Anos de Experiência
                      </label>
                      <input
                        type="number"
                        id="experiencia"
                        name="experiencia"
                        min="0"
                        value={formData.experiencia || ""}
                        onChange={handleChange}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#CA9C60]"
                      />
                    </div> */}
                  </div>

                  {/* Disponibilidade */}
                  {/* <div className="mt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-3">Disponibilidade</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.disponibilidade?.orientacao || false}
                          onChange={(e) => handleNestedChange("disponibilidade", "orientacao", e.target.checked)}
                          className="h-4 w-4 text-[#CA9C60] focus:ring-[#CA9C60] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Orientação</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.disponibilidade?.consultoria || false}
                          onChange={(e) => handleNestedChange("disponibilidade", "consultoria", e.target.checked)}
                          className="h-4 w-4 text-[#CA9C60] focus:ring-[#CA9C60] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Consultoria</span>
                      </label>

                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          checked={formData.disponibilidade?.aulas || false}
                          onChange={(e) => handleNestedChange("disponibilidade", "aulas", e.target.checked)}
                          className="h-4 w-4 text-[#CA9C60] focus:ring-[#CA9C60] border-gray-300 rounded"
                        />
                        <span className="ml-2 text-sm text-gray-700">Aulas Particulares</span>
                      </label>
                    </div>
                  </div> */}
                </div>
              )}

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

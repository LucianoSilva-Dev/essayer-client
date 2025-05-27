"use client"

import type React from "react"
import { useState } from "react"

interface ObraFormData {
  titulo: string
  autoria: string
  sinopse: string
  fonte: string
}

interface ObraFormProps {
  initialData?: ObraFormData
  onDataChange: (data: ObraFormData) => void
  errors: Record<string, string>
}

export default function ObraForm({ initialData, onDataChange, errors }: ObraFormProps) {
  const [formData, setFormData] = useState<ObraFormData>(
    initialData || {
      titulo: "",
      autoria: "",
      sinopse: "",
      fonte: "",
    },
  )

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    const newData = { ...formData, [name]: value }
    setFormData(newData)
    onDataChange(newData)
  }

  return (
    <>
      <div className="mb-5">
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700 mb-1">
          Título <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={formData.titulo}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.titulo ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
          placeholder="Ex: 1984, O Cortiço, Cidade de Deus"
        />
        {errors.titulo && <p className="mt-1 text-sm text-red-500">{errors.titulo}</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="autoria" className="block text-sm font-medium text-gray-700 mb-1">
          Autoria <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="autoria"
          name="autoria"
          value={formData.autoria}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.autoria ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
          placeholder="Nome do autor, diretor ou criador"
        />
        {errors.autoria && <p className="mt-1 text-sm text-red-500">{errors.autoria}</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="sinopse" className="block text-sm font-medium text-gray-700 mb-1">
          Sinopse <span className="text-red-500">*</span>
        </label>
        <textarea
          id="sinopse"
          name="sinopse"
          value={formData.sinopse}
          onChange={handleChange}
          rows={6}
          className={`w-full px-3 py-2 border ${
            errors.sinopse ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
          placeholder="Descreva o enredo, tema principal e relevância da obra"
        />
        {errors.sinopse && <p className="mt-1 text-sm text-red-500">{errors.sinopse}</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="fonte" className="block text-sm font-medium text-gray-700 mb-1">
          Fonte <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fonte"
          name="fonte"
          value={formData.fonte}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.fonte ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
          placeholder="Ex: Editora Companhia das Letras, 2009"
        />
        {errors.fonte && <p className="mt-1 text-sm text-red-500">{errors.fonte}</p>}
      </div>
    </>
  )
}

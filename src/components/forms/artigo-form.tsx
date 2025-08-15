"use client"

import type React from "react"

interface ArtigoFormData {
  titulo: string
  autoria: string
  sintese: string
  fonte: string
}

interface ArtigoFormProps {
  onDataChange: (data: Partial<ArtigoFormData>) => void
  errors: Record<string, string>
  titulo: string
  autoria: string
  sintese: string
  fonte: string
}

export default function ArtigoForm({ titulo, autoria, sintese, fonte, onDataChange, errors }: ArtigoFormProps) {

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onDataChange({ [name]: value });
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
          value={titulo}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.titulo ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
          placeholder="Título completo do artigo"
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
          value={autoria}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.autoria ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
          placeholder="Nome do(s) autor(es) do artigo"
        />
        {errors.autoria && <p className="mt-1 text-sm text-red-500">{errors.autoria}</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="sintese" className="block text-sm font-medium text-gray-700 mb-1">
          Síntese <span className="text-red-500">*</span>
        </label>
        <textarea
          id="sintese"
          name="sintese"
          value={sintese}
          onChange={handleChange}
          rows={6}
          className={`w-full px-3 py-2 border ${
            errors.sintese ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
          placeholder="Resumo das principais ideias e conclusões do artigo"
        />
        {errors.sintese && <p className="mt-1 text-sm text-red-500">{errors.sintese}</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="fonte" className="block text-sm font-medium text-gray-700 mb-1">
          Fonte <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          id="fonte"
          name="fonte"
          value={fonte}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.fonte ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
          placeholder="Ex: Revista Brasileira de Sociologia, vol. 8, n. 2, 2023"
        />
        {errors.fonte && <p className="mt-1 text-sm text-red-500">{errors.fonte}</p>}
      </div>
    </>
  )
}
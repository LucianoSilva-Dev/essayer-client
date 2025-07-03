"use client"

import type React from "react"

interface CitacaoFormData {
  autoria: string
  citacao: string
  fonte: string
}

interface CitacaoFormProps {
  onDataChange: (data: Partial<CitacaoFormData>) => void
  errors: Record<string, string>
  autoria: string
  citacao: string
  fonte: string
}

export default function CitacaoForm({ autoria, citacao, fonte, onDataChange, errors }: CitacaoFormProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    onDataChange({ [name]: value });
  }

  return (
    <>
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
          placeholder="Nome do autor da citação"
        />
        {errors.autoria && <p className="mt-1 text-sm text-red-500">{errors.autoria}</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="citacao" className="block text-sm font-medium text-gray-700 mb-1">
          Citação <span className="text-red-500">*</span>
        </label>
        <textarea
          id="citacao"
          name="citacao"
          value={citacao}
          onChange={handleChange}
          rows={4}
          className={`w-full px-3 py-2 border ${
            errors.citacao ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
          placeholder="Digite a citação completa (sem aspas)"
        />
        {errors.citacao && <p className="mt-1 text-sm text-red-500">{errors.citacao}</p>}
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
          placeholder="Ex: Discurso na Universidade de Harvard, 1995"
        />
        {errors.fonte && <p className="mt-1 text-sm text-red-500">{errors.fonte}</p>}
      </div>
    </>
  )
}
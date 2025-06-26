"use client"

import type React from "react"

interface ObraFormData {
  titulo: string
  autoria: string
  sinopse: string
  fonte: string
  tipoObra: 'livro' | 'filme' | 'música' | 'teatro'
}

interface ObraFormProps {
  onDataChange: (data: Partial<ObraFormData>) => void
  errors: Record<string, string>
  titulo: string
  autoria: string
  sinopse: string
  fonte: string
  tipoObra: 'livro' | 'filme' | 'música' | 'teatro'
}

export default function ObraForm({ titulo, autoria, sinopse, fonte, tipoObra, onDataChange, errors }: ObraFormProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
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
          value={autoria}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.autoria ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600`}
          placeholder="Nome do autor, diretor ou criador"
        />
        {errors.autoria && <p className="mt-1 text-sm text-red-500">{errors.autoria}</p>}
      </div>

      <div className="mb-5">
        <label htmlFor="tipoObra" className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de Obra <span className="text-red-500">*</span>
        </label>
        <select
          id="tipoObra"
          name="tipoObra"
          value={tipoObra}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.tipoObra ? "border-red-500" : "border-gray-300"
          } rounded-md focus:outline-none focus:ring-1 focus:ring-teal-600 bg-white`}
        >
          <option value="livro">Livro</option>
          <option value="filme">Filme</option>
          <option value="música">Música</option>
          <option value="teatro">Teatro</option>
        </select>
        {errors.tipoObra && <p className="mt-1 text-sm text-red-500">{errors.tipoObra}</p>}
      </div>
      
      <div className="mb-5">
        <label htmlFor="sinopse" className="block text-sm font-medium text-gray-700 mb-1">
          Sinopse <span className="text-red-500">*</span>
        </label>
        <textarea
          id="sinopse"
          name="sinopse"
          value={sinopse}
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
          value={fonte}
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
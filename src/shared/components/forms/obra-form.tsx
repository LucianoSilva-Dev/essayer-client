"use client"

import type React from "react"
import { Book, Film, Music, Theater } from "lucide-react"

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

  // Styles
  const inputBase = "w-full rounded-xl border-2 px-4 py-2.5 text-sm font-medium transition-all placeholder:text-gray-400 focus:outline-none focus:ring-4";
  const inputNormal = "border-transparent bg-gray-50 text-gray-700 hover:bg-gray-100 focus:border-amber-400 focus:bg-white focus:ring-amber-100";
  const inputError = "border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-100";
  const getClass = (hasError: boolean) => `${inputBase} ${hasError ? inputError : inputNormal}`;
  const labelClass = "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1";

  const getTypeIcon = () => {
    switch(tipoObra) {
        case 'filme': return <Film size={16} className="text-amber-500" />;
        case 'livro': return <Book size={16} className="text-amber-500" />;
        case 'música': return <Music size={16} className="text-amber-500" />;
        case 'teatro': return <Theater size={16} className="text-amber-500" />;
        default: return <Film size={16} className="text-gray-400" />;
    }
  };

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Título */}
      <div>
        <label htmlFor="titulo" className={labelClass}>Título da Obra <span className="text-amber-500">*</span></label>
        <input
          type="text"
          id="titulo"
          name="titulo"
          value={titulo}
          onChange={handleChange}
          className={`${getClass(!!errors.titulo)} text-lg`}
          placeholder="Ex: Cidade de Deus"
        />
        {errors.titulo && <p className="mt-1 text-xs font-bold text-red-500 ml-1">{errors.titulo}</p>}
      </div>

      {/* Grid: Autoria e Tipo */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
            <label htmlFor="autoria" className={labelClass}>Autoria <span className="text-amber-500">*</span></label>
            <input
            type="text"
            id="autoria"
            name="autoria"
            value={autoria}
            onChange={handleChange}
            className={getClass(!!errors.autoria)}
            placeholder="Diretor, Autor ou Criador"
            />
            {errors.autoria && <p className="mt-1 text-xs font-bold text-red-500 ml-1">{errors.autoria}</p>}
        </div>

        <div>
            <label htmlFor="tipoObra" className={labelClass}>Tipo de Mídia</label>
            <div className="relative">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none">
                    {getTypeIcon()}
                </div>
                <select
                    id="tipoObra"
                    name="tipoObra"
                    value={tipoObra}
                    onChange={handleChange}
                    className={`${getClass(!!errors.tipoObra)} pl-11 appearance-none cursor-pointer`}
                >
                    <option value="livro">Livro</option>
                    <option value="filme">Filme</option>
                    <option value="música">Música</option>
                    <option value="teatro">Teatro</option>
                </select>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                </div>
            </div>
        </div>
      </div>
      
      {/* Sinopse */}
      <div>
        <label htmlFor="sinopse" className={labelClass}>Sinopse <span className="text-amber-500">*</span></label>
        <textarea
          id="sinopse"
          name="sinopse"
          value={sinopse}
          onChange={handleChange}
          rows={5}
          className={`${getClass(!!errors.sinopse)} resize-none leading-relaxed`}
          placeholder="Descreva o enredo e os pontos principais..."
        />
        {errors.sinopse && <p className="mt-1 text-xs font-bold text-red-500 ml-1">{errors.sinopse}</p>}
      </div>

      {/* CAMPO FONTE COMENTADO */}
      {/* <div>
        <label htmlFor="fonte" className={labelClass}>Fonte / Ano <span className="text-amber-500">*</span></label>
        <div className="relative">
            <input
                type="text"
                id="fonte"
                name="fonte"
                value={fonte}
                onChange={handleChange}
                className={getClass(!!errors.fonte)}
                placeholder="Ex: Netflix, 2002"
            />
        </div>
        {errors.fonte && <p className="mt-1 text-xs font-bold text-red-500 ml-1">{errors.fonte}</p>} 
      </div> 
      */}
    </div>
  )
}
"use client"

import type React from "react"
import { FileText, User, Newspaper } from "lucide-react"

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

  // Styles
  const inputBase = "w-full rounded-xl border-2 px-4 py-2.5 text-sm font-medium transition-all placeholder:text-gray-400 focus:outline-none focus:ring-4 pl-11";
  const inputNormal = "border-transparent bg-gray-50 text-gray-700 hover:bg-gray-100 focus:border-blue-400 focus:bg-white focus:ring-blue-100";
  const inputError = "border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-100";
  const getClass = (hasError: boolean) => `${inputBase} ${hasError ? inputError : inputNormal}`;
  const labelClass = "mb-1.5 block text-[11px] font-bold uppercase tracking-wider text-gray-500 ml-1";
  
  const IconWrapper = ({ children }: { children: React.ReactNode }) => (
    <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-400">
        {children}
    </div>
  );

  return (
    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">
      
      {/* Título */}
      <div>
        <label htmlFor="titulo" className={labelClass}>Título do Artigo <span className="text-blue-500">*</span></label>
        <div className="relative">
            <IconWrapper><Newspaper size={18} className="text-blue-500/80" /></IconWrapper>
            <input
                type="text"
                id="titulo"
                name="titulo"
                value={titulo}
                onChange={handleChange}
                className={`${getClass(!!errors.titulo)} text-lg`}
                placeholder="Manchete ou título completo"
            />
        </div>
        {errors.titulo && <p className="mt-1 text-xs font-bold text-red-500 ml-1">{errors.titulo}</p>}
      </div>

      {/* Autoria */}
      <div>
        <label htmlFor="autoria" className={labelClass}>Autor / Jornalista <span className="text-blue-500">*</span></label>
        <div className="relative">
            <IconWrapper><User size={18} /></IconWrapper>
            <input
                type="text"
                id="autoria"
                name="autoria"
                value={autoria}
                onChange={handleChange}
                className={getClass(!!errors.autoria)}
                placeholder="Quem escreveu?"
            />
        </div>
        {errors.autoria && <p className="mt-1 text-xs font-bold text-red-500 ml-1">{errors.autoria}</p>}
      </div>

      {/* Síntese */}
      <div>
        <label htmlFor="sintese" className={labelClass}>Síntese <span className="text-blue-500">*</span></label>
        <div className="relative">
            <div className="absolute left-4 top-4 pointer-events-none text-gray-400">
                <FileText size={18} />
            </div>
            <textarea
                id="sintese"
                name="sintese"
                value={sintese}
                onChange={handleChange}
                rows={5}
                className={`${getClass(!!errors.sintese)} resize-none leading-relaxed pl-11 pt-3`} // Ajuste de padding para textarea
                placeholder="Resumo das principais ideias..."
            />
        </div>
        {errors.sintese && <p className="mt-1 text-xs font-bold text-red-500 ml-1">{errors.sintese}</p>}
      </div>

      {/* CAMPO FONTE COMENTADO */}
      {/*
      <div>
          <label htmlFor="fonte" className={labelClass}>Fonte / Veículo <span className="text-blue-500">*</span></label>
          <div className="relative">
              <IconWrapper><LinkIcon size={18} /></IconWrapper>
              <input
                  type="text"
                  id="fonte"
                  name="fonte"
                  value={fonte}
                  onChange={handleChange}
                  className={getClass(!!errors.fonte)}
                  placeholder="Ex: G1, BBC, Revista Nature"
              />
          </div>
          {errors.fonte && <p className="mt-1 text-xs font-bold text-red-500 ml-1">{errors.fonte}</p>}
      </div>
      */}
    </div>
  )
}
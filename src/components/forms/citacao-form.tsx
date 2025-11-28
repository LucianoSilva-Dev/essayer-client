"use client"

import type React from "react"
import { Quote, User } from "lucide-react"

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

  // Styles
  const inputBase = "w-full rounded-xl border-2 px-4 py-2.5 text-sm font-medium transition-all placeholder:text-gray-400 focus:outline-none focus:ring-4 pl-11";
  const inputNormal = "border-transparent bg-gray-50 text-gray-700 hover:bg-gray-100 focus:border-emerald-400 focus:bg-white focus:ring-emerald-100";
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
      
      {/* Citação */}
      <div>
        <label htmlFor="citacao" className={labelClass}>Citação Direta <span className="text-emerald-500">*</span></label>
        <div className="relative">
            <div className="absolute left-4 top-4 pointer-events-none text-emerald-500/70">
                <Quote size={18} />
            </div>
            <textarea
                id="citacao"
                name="citacao"
                value={citacao}
                onChange={handleChange}
                rows={4}
                className={`${getClass(!!errors.citacao)} resize-none leading-relaxed italic text-gray-600 pl-11 pt-3`}
                placeholder="Digite a frase exatamente como foi dita..."
            />
        </div>
        {errors.citacao && <p className="mt-1 text-xs font-bold text-red-500 ml-1">{errors.citacao}</p>}
      </div>

      {/* Autoria */}
      <div>
        <label htmlFor="autoria" className={labelClass}>Autor da Frase <span className="text-emerald-500">*</span></label>
        <div className="relative">
            <IconWrapper><User size={18} /></IconWrapper>
            <input
            type="text"
            id="autoria"
            name="autoria"
            value={autoria}
            onChange={handleChange}
            className={getClass(!!errors.autoria)}
            placeholder="Filósofo, Pensador..."
            />
        </div>
        {errors.autoria && <p className="mt-1 text-xs font-bold text-red-500 ml-1">{errors.autoria}</p>}
      </div>

      {/* CAMPO FONTE COMENTADO */}
      {/*
      <div>
          <label htmlFor="fonte" className={labelClass}>Contexto / Obra <span className="text-emerald-500">*</span></label>
          <div className="relative">
              <IconWrapper><BookOpen size={18} /></IconWrapper>
              <input
              type="text"
              id="fonte"
              name="fonte"
              value={fonte}
              onChange={handleChange}
              className={getClass(!!errors.fonte)}
              placeholder="Livro, Discurso ou Local"
              />
          </div>
          {errors.fonte && <p className="mt-1 text-xs font-bold text-red-500 ml-1">{errors.fonte}</p>}
      </div>
      */}
    </div>
  )
}
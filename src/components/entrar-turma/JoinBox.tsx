"use client"

import { entrarTurma } from "@/apiCalls/turma"
import { redirect } from "next/navigation"
import type React from "react"
import { useState } from "react"
import { toast } from "react-toastify"

export default function JoinBox() {
  const [codigo, setCodigo] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!codigo) toast.error('insira um código para entrar em uma turma.');

    const response = await entrarTurma(codigo)
    toast.success('Solictação enviada.')
    redirect("/turmas_professor") // Mudar para turma do aluno quando estiver pronta
  }

  return (
    <div className="flex min-h-screen items-center justify-center lg:pr-25 ">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-start gap-6 p-10 w-full max-w-md mx-auto bg-white opacity-[98%] rounded-2xl shadow-lg lg:w-[650px] lg:max-w-none"
      >
        {/* Título */}
        <h1 className="text-[35px] font-semibold text-gray-800">
          Entre em uma turma!
        </h1>

        {/* Input */}
        <input
          placeholder="Cole o código da turma aqui"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          className="w-full h-[80px] rounded-xl border border-gray-700 text-[26px] placeholder-gray-500 px-5 lg:w-[570px]"
        />

        {/* Botão */}
        <button
          type="submit"
          className="w-full h-[80px] bg-[#075F70] hover:bg-[#064b57] text-white text-[30px] font-semibold rounded-xl flex items-center justify-center lg:w-[570px]"
        >
          Acessar Turma
          <span className="text-2xl">➜</span>
        </button>

        {/* Texto informativo */}
        <p className="text-[18px] text-gray-500 leading-[27px]">
          Este código será enviado pelo professor responsável ou pelo administrador da turma.
        </p>
      </form>
    </div>
  )
}

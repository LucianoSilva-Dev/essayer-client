"use client";
import React from 'react';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface RevisaoHeaderProps {
  titulo: string;
  tarefaId: string;
}

export default function RevisaoHeader({ titulo, tarefaId }: RevisaoHeaderProps) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center gap-4 w-full">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <Link href="/fazer_tarefa" className="text-gray-600 hover:text-gray-900 transition-colors">
            <ArrowLeft size={24} />
        </Link>
        <h1 className="text-xl md:text-2xl font-bold text-[#333]">{titulo}</h1>
      </div>

      <div className="w-full md:w-auto">
        <Link href={`/fazer_tarefa/tarefa/${tarefaId}`}>
          {/* Adicionei 'cursor-pointer' aqui */}
          <button className="cursor-pointer bg-[#0F5F68] hover:bg-[#075F70] text-white font-semibold py-2 px-6 rounded-full transition-colors shadow-sm w-full md:w-auto">
            Iniciar tarefa
          </button>
        </Link>
      </div>
    </div>
  );
}
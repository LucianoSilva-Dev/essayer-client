"use client"

import type React from "react"
import { Search, Award, PenTool } from "lucide-react"

// Tipo para os itens de funcionalidade
type FuncionalidadeItem = {
  id: number
  icone: React.ReactNode
  titulo: string
  descricao: string
  corFundo: string
}

// Card individual (sem motion)
const FuncionalidadeCard = ({
  item,
}: {
  item: FuncionalidadeItem
}) => {
  return (
    <div className="bg-white rounded-lg p-6 shadow-2xl">
      <div className={`${item.corFundo} w-20 h-16 rounded-lg flex items-center justify-center mb-4`}>
        {item.icone}
      </div>
      <h3 className="text-3xl font-bold mb-2">{item.titulo}</h3>
      <p className="text-gray-700 text-3xl">{item.descricao}</p>
    </div>
  )
}

// Componente principal
export default function ComoFunciona() {
  const funcionalidades: FuncionalidadeItem[] = [
    {
      id: 1,
      icone: <Search className="w-8 h-8 text-amber-500" />,
      titulo: "Explore por tópicos",
      descricao:
        "Navegue por nossos principais eixos temáticos e encontre subtópicos específicos relacionados às questões sociais que você está pesquisando.",
      corFundo: "bg-amber-50",
    },
    {
      id: 2,
      icone: <Award className="w-8 h-8 text-amber-500" />,
      titulo: "Professores certificados",
      descricao: "Professores capacitados e confiáveis, preparados para oferecer conteúdos de alta qualidade.",
      corFundo: "bg-amber-50",
    },
    /*{
      id: 3,
      icone: <PenTool className="w-8 h-8 text-amber-500" />,
      titulo: "Pratique redações",
      descricao:
        "Pratique suas redações online com temas aleatórios e cronômetro para treinar como se fosse a prova de verdade.",
      corFundo: "bg-amber-50",
    },
    */
  ]

  return (
    <section className="py-16 bg-[#F3F4F6] scroll-mt-24" id="como-funciona">
      <div className="container mx-auto px-[50px] flex-column justify-center">
        <h2 className="text-[40px] font-bold text-center mb-6">
          Como funciona
        </h2>
        <h1 className="text-[30px] font-light text-center mb-12 max-w-4xl mx-auto">
          Aprenda a navegar e aproveitar ao máximo nosso acervo de repertórios
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 md:gap-4 gap-6 lg:gap-32 min-h-[30rem]">
          {funcionalidades.map((item) => (
            <FuncionalidadeCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

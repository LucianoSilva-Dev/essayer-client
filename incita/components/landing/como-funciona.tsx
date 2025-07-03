"use client"

import type React from "react"
import { Search, Award, PenTool } from "lucide-react"
import { motion, useInView, useAnimation } from "framer-motion"
import { useRef, useEffect } from "react"
import { easeInOut } from "framer-motion"

// Tipo para os itens de funcionalidade
type FuncionalidadeItem = {
  id: number
  icone: React.ReactNode
  titulo: string
  descricao: string
  corFundo: string
}

// Variants para animação dos cards
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: (custom: number) => ({
    opacity: 0,
    x: custom === 0 ? 300 : custom === 2 ? -300 : 0, // esquerda, direita, centro
    scale: custom === 1 ? 0.98 : 0.9,
    zIndex: custom === 1 ? 30 : 0,
    y: custom === 1 ? -20 : 0,
  }),
  show: (custom: number) => ({
    opacity: 1,
    x: 0,
    scale: 1,
    zIndex: custom === 1 ? 10 : 0,
    y: 0,
    transition: {
      duration: custom === 1 ? 0.9 : 0.7,
      ease: easeInOut,
    },
  }),
}

// Card individual
const FuncionalidadeCard = ({
  item,
  custom,
  controls,
}: {
  item: FuncionalidadeItem
  custom: number
  controls: ReturnType<typeof useAnimation>
}) => {
  return (
    <motion.div
      className="bg-white rounded-lg p-6 shadow-2xl"
      variants={cardVariants}
      initial="hidden"
      animate={controls}
      custom={custom}
    >
      <div className={`${item.corFundo} w-20 h-16 rounded-lg flex items-center justify-center mb-4`}>
        {item.icone}
      </div>
      <h3 className="text-3xl font-bold mb-2">{item.titulo}</h3>
      <p className="text-gray-700 text-3xl">{item.descricao}</p>
    </motion.div>
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
    {
      id: 3,
      icone: <PenTool className="w-8 h-8 text-amber-500" />,
      titulo: "Pratique redações",
      descricao:
        "Pratique suas redações online com temas aleatórios e cronômetro para treinar como se fosse a prova de verdade.",
      corFundo: "bg-amber-50",
    },
  ]

  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })
  const controls = useAnimation()

  useEffect(() => {
    if (isInView) {
      controls.start("show")
    }
  }, [isInView, controls])

  return (
    <section className="py-16 bg-[#F3F4F6] scroll-mt-25" id="como-funciona" ref={ref}>
      <motion.div
        className="container mx-auto px-[50px] flex-column justify-center"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        <motion.h2 className="text-[40px] font-bold text-center mb-6" variants={cardVariants} custom={1} animate={isInView ? "show" : "hidden"}>
          Como funciona
        </motion.h2>
        <motion.h1
          className="text-[30px] font-light text-center mb-12 max-w-4xl justify-self-center"
          variants={cardVariants}
          custom={1}
          animate={isInView ? "show" : "hidden"}
          transition={{ delay: 1 }}
        >
          Aprenda a navegar e aproveitar ao máximo nosso acervo de repertórios
        </motion.h1>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 md:gap-4 gap-6 lg:gap-32 min-h-[30rem]"
          variants={containerVariants}
        >
          {funcionalidades.map((item, idx) => (
            <FuncionalidadeCard key={item.id} item={item} custom={idx} controls={controls} />
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}

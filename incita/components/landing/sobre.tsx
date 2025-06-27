"use client"

import { Target, Eye, Star } from "lucide-react"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.42, 0, 0.58, 1] } },
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.18,
      delayChildren: 0.2,
    },
  },
}

export default function AboutSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  return (
    <section className="py-16 px-4 sm:px-2 md:px-6 lg:px-6 bg-[#F3F4F6] scroll-mt-25" id="sobre" ref={ref}>
      <motion.div
        className="max-w-[70%] mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <motion.h2
          className="text-[35px] px-0 font-bold mb-6 sm:px-2"
          variants={fadeUpVariants}
        >
          Sobre o Incita
        </motion.h2>

        <motion.div className="space-y-6 px-0 mb-10 sm:px-2" variants={containerVariants}>
          <motion.p className="text-gray-700 text-[25px]" variants={fadeUpVariants}>
            O Incita nasceu da necessidade de centralizar e organizar repertórios sobre questões sociais fundamentais,
            facilitando o acesso a informações relevantes para pesquisadores, estudantes e profissionais.
          </motion.p>
          <motion.p className="text-gray-700 text-[25px]" variants={fadeUpVariants}>
            Nosso objetivo é criar uma plataforma onde conhecimento e reflexão sobre os pilares da sociedade possam ser
            facilmente acessados e compartilhados.
          </motion.p>
        </motion.div>

        <motion.div className="space-y-8 px-0 sm:px-2" variants={containerVariants}>
          <motion.div className="flex items-start gap-4" variants={fadeUpVariants}>
            <div className="mt-1 bg-amber-100 p-2 rounded-full">
              <Target className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1 text-[25px]">Missão</h3>
              <p className="text-gray-700 text-[25px]">
                Democratizar o acesso a repertórios qualificados sobre questões sociais fundamentais.
              </p>
            </div>
          </motion.div>

          <motion.div className="flex items-start gap-4 sm:px-2" variants={fadeUpVariants}>
            <div className="mt-1 bg-amber-100 p-2 rounded-full">
              <Eye className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1 text-[25px]">Visão</h3>
              <p className="text-gray-700 text-[25px]">Ser a principal referência em acervo de repertórios sociais no Brasil.</p>
            </div>
          </motion.div>

          <motion.div className="flex items-start gap-4 sm:px-2" variants={fadeUpVariants}>
            <div className="mt-1 bg-amber-100 p-2 rounded-full">
              <Star className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1 text-[25px]">Valores</h3>
              <p className="text-gray-700 text-[25px]">Transparência, diversidade, acessibilidade e compromisso com a qualidade.</p>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

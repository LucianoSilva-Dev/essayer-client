'use client'

import React, { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { RepertorioDocument } from "../../../../lib/apiCalls/repertorio/types"
import { getAllRepertorios } from "../../../../lib/apiCalls/repertorio"
import { isGetAllArtigoDoc, isGetAllCitacaoDoc, isGetAllObraDoc } from "../../../../lib/apiCalls/repertorio/helpers"
import Link from "next/link"
import type { Repertorio } from "@/types/repertorio"
import RepertorioCard from "@/modules/repertorio/repertorio-card"

const mountFrontendRepertoire = (repertorio: RepertorioDocument): Repertorio | null => {
  if (isGetAllCitacaoDoc(repertorio)) {
    return {
      id: repertorio.id,
      modelo: "citacao",
      autoria: repertorio.autor,
      citacao: repertorio.frase,
      fonte: repertorio.fonte,
      eixos: repertorio.topicos,
      recortes: repertorio.subtopicos,
      isPublico: true,
      totalLikes: repertorio.totalLikes,
      favoritadoPeloUsuario: repertorio.favoritadoPeloUsuario,
      likeDoUsuario: repertorio.likeDoUsuario,
      criador: repertorio.criador,
      totalComentarios: repertorio.totalComentarios ?? 0,
      comentarios: repertorio.comentarios ?? []
    }
  }
  if (isGetAllObraDoc(repertorio)) {
    return {
      id: repertorio.id,
      modelo: 'obra',
      titulo: repertorio.titulo,
      autoria: repertorio.autor,
      sinopse: repertorio.sinopse,
      eixos: repertorio.topicos,
      tipoObra: repertorio.tipoObra,
      recortes: repertorio.subtopicos,
      isPublico: true,
      totalLikes: repertorio.totalLikes,
      favoritadoPeloUsuario: repertorio.favoritadoPeloUsuario,
      likeDoUsuario: repertorio.likeDoUsuario,
      criador: repertorio.criador,
      totalComentarios: repertorio.totalComentarios ?? 0,
      comentarios: repertorio.comentarios ?? []
    }
  }
  if (isGetAllArtigoDoc(repertorio)) {
    return {
      id: repertorio.id,
      modelo: "artigo",
      titulo: repertorio.titulo,
      autoria: repertorio.autor,
      sintese: repertorio.resumo,
      fonte: repertorio.fonte,
      eixos: repertorio.topicos,
      recortes: repertorio.subtopicos,
      isPublico: true,
      totalLikes: repertorio.totalLikes,
      favoritadoPeloUsuario: repertorio.favoritadoPeloUsuario,
      likeDoUsuario: repertorio.likeDoUsuario,
      criador: repertorio.criador,
      totalComentarios: repertorio.totalComentarios ?? 0,
      comentarios: repertorio.comentarios ?? []
    }
  }

  return null
}

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
}

const fadeUpVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.98 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: "easeInOut" } },
}

export default function FeaturedRepertoires() {
  const [featuredRepertoires, setFeaturedRepertoires] = useState<Repertorio[]>([])
  
  useEffect(() => {
    async function fetchData() {
      const response = await getAllRepertorios('?ordenarPor=MaxLikes&limit=6')
      if (response) {
        const mapped = response.documentos
            .map(doc => mountFrontendRepertoire(doc))
            .filter((rep): rep is Repertorio => rep !== null)
        setFeaturedRepertoires(mapped)
      }
    }
    fetchData()
  }, [])

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 600);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const displayedRepertoires = isMobile
    ? featuredRepertoires.slice(0, 3)
    : featuredRepertoires;

  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  return (
    <section className="py-12 px-4 bg-[#F3F4F6] scroll-mt-25" id="repertorios" ref={ref}>  
      <motion.div
        className="max-w-6xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <motion.div
          className="text-center mb-10 flex-column justify-center"
          // @ts-expect-error: Framer Motion variants não são tipadas corretamente
          variants={fadeUpVariants}
        >
          <motion.h2
            className="text-[45px] font-bold mb-2"
            // @ts-expect-error: Framer Motion variants não são tipadas corretamente
            variants={fadeUpVariants}
          >
            Repertórios em destaque
          </motion.h2>
          <motion.p
            className="text-[30px] text-gray-600 max-w-4xl justify-self-center"
            // @ts-expect-error: Framer Motion variants não são tipadas corretamente
            variants={fadeUpVariants}
          >
            Alguns exemplos do conteúdo que você encontrará em nosso acervo
          </motion.p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
        >
          {displayedRepertoires.length > 0 ? 
            displayedRepertoires.map((repertorio, idx) => (
              <motion.div
              key={repertorio.id}
              // @ts-expect-error: Framer Motion variants não são tipadas corretamente
              variants={fadeUpVariants}
                transition={{ duration: 0.6, delay: idx * 0.15 }}
                whileHover={{ scale: 1.03, boxShadow: "0 8px 32px rgba(7,95,112,0.10)" }}
                className="h-full w-full flex"
              >
                <div className="w-full h-full flex"> 
          <RepertorioCard repertorio={repertorio} />
                </div>
              </motion.div>
            ))
          : <motion.p
              className="text-[30px] text-gray-600 justify-self-center"
              // @ts-expect-error: Framer Motion variants não são tipadas corretamente
              variants={fadeUpVariants}
            >
              Nenhum repertorio encontrado
            </motion.p>
          }
        </motion.div>

        <motion.div
          className="mt-10 text-center"
          // @ts-expect-error: Framer Motion variants não são tipadas corretamente
          variants={fadeUpVariants}
        >
          <Link
            href="/main"
            className="bg-[#075F70] hover:shadow-xl hover:bg-[#054c59] duration-300 text-white text-[24px] py-3 px-6 rounded-md transition-colors"
          >
              Ver todos os repertórios
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
'use client'

import React, { useEffect, useState, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { RepertoireDocument } from "../../../../lib/apiCalls/repertorio/types"
import { getAllRepertoires } from "../../../../lib/apiCalls/repertorio"
import { isArticleDoc, isCitationDoc, isWorkDoc } from "../../../../lib/apiCalls/repertorio/helpers"
import Link from "next/link"
import type { Repertorio } from "@/types/repertorio"
import RepertorioCard from "@/modules/repertorio/repertorio-card"

// Mapeador seguro para os tipos de obra do Prisma -> Frontend
const mapTipoObra = (workType: string): "livro" | "filme" | "música" | "teatro" => {
  const map: Record<string, "livro" | "filme" | "música" | "teatro"> = {
    'BOOK': 'livro',
    'MOVIE': 'filme',
    'MUSIC': 'música',
    'THEATER': 'teatro',
    'livro': 'livro',
    'filme': 'filme',
    'musica': 'música',
    'música': 'música',
    'teatro': 'teatro'
  };
  return map[workType] || map[workType.toUpperCase()] || 'livro';
}

const mountFrontendRepertoire = (repertoire: RepertoireDocument): Repertorio | null => {
  const criadorFormatado = {
    ...repertoire.creator,
    nome: repertoire.creator.name
  }

  if (isCitationDoc(repertoire)) {
    return {
      id: repertoire.id,
      modelo: "citacao",
      autoria: repertoire.author,
      citacao: repertoire.quote,
      fonte: repertoire.source ?? undefined,
      eixos: repertoire.topics,
      recortes: repertoire.subtopics,
      isPublico: true,
      totalLikes: repertoire.totalLikes,
      favoritadoPeloUsuario: repertoire.favourited,
      likeDoUsuario: repertoire.liked,
      criador: criadorFormatado,
      totalComentarios: repertoire.totalComments ?? 0,
      comentarios: repertoire.comments as any ?? []
    }
  }
  if (isWorkDoc(repertoire)) {
    return {
      id: repertoire.id,
      modelo: 'obra',
      titulo: repertoire.title,
      autoria: repertoire.author,
      sinopse: repertoire.synopsis,
      eixos: repertoire.topics,
      tipoObra: mapTipoObra(repertoire.workType),
      recortes: repertoire.subtopics,
      isPublico: true,
      totalLikes: repertoire.totalLikes,
      favoritadoPeloUsuario: repertoire.favourited,
      likeDoUsuario: repertoire.liked,
      criador: criadorFormatado,
      totalComentarios: repertoire.totalComments ?? 0,
      comentarios: repertoire.comments as any ?? []
    }
  }
  if (isArticleDoc(repertoire)) {
    return {
      id: repertoire.id,
      modelo: "artigo",
      titulo: repertoire.title,
      autoria: repertoire.author,
      sintese: repertoire.abstract,
      fonte: repertoire.source ?? "",
      eixos: repertoire.topics,
      recortes: repertoire.subtopics,
      isPublico: true,
      totalLikes: repertoire.totalLikes,
      favoritadoPeloUsuario: repertoire.favourited,
      likeDoUsuario: repertoire.liked,
      criador: criadorFormatado,
      totalComentarios: repertoire.totalComments ?? 0,
      comentarios: repertoire.comments as any ?? []
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
      const response = await getAllRepertoires('?orderBy=MaxLikes&limit=6')
      if (response) {
        // Ajustado para response.documents
        const mapped = response.documents
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
            href="/home"
            className="bg-brand-teal-dark hover:shadow-xl hover:bg-[#054c59] duration-300 text-white text-[24px] py-3 px-6 rounded-md transition-colors"
          >
            Ver todos os repertórios
          </Link>
        </motion.div>
      </motion.div>
    </section>
  )
}
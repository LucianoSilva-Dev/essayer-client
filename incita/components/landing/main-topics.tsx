"use client"


import { Swiper, SwiperSlide } from "swiper/react"
import { Pagination, Navigation, Autoplay } from "swiper/modules"
import { Card } from "./card/card"
import { CardIcon } from "./card/card-icon"
import { CardTitle } from "./card/card-title"
import { CardDescription } from "./card/card-description"
import { TagList } from "./card/tag-list"
import { Tag } from "./card/tag"
import { Scale, BookOpen, HeartPulse, Leaf, Brain, Palette, Cpu, BarChart3 } from "lucide-react"
import { useState, useRef, useCallback } from "react"
import type { Swiper as SwiperType } from "swiper"
import { motion, useInView } from "framer-motion"

interface Topic {
  id: string
  icon: React.ReactNode
  iconBg: string
  title: string
  description: string
  tags: string[]
}

const mainTopics: Topic[] = [
  {
    id: "ambiente1",
    title: "Meio ambiente",
    description: "Questões ambientais e seus impactos na sociedade, no planeta e nas futuras gerações.",
    icon: <Leaf className="h-6 w-6 text-[#2a9d8f]" />,
    iconBg: "bg-[#e8f1f1]",
    tags: ["Desmatamento", "Reciclagem", "Mudanças climáticas", "Consumo consciente"],
  },
  {
    id: "social1",
    title: "Questões sociais",
    description: "Desafios sociais como desigualdade, violência, inclusão e discriminação nas relações humanas.",
    icon: <Brain className="h-6 w-6 text-[#2a9d8f]" />,
    iconBg: "bg-[#e8f1f1]",
    tags: ["Desigualdade social", "Pobreza", "Violência", "Direitos humanos", "Discriminação", "Inclusão social"],
  },
  {
    id: "ciencia1",
    title: "Saúde e ciência",
    description: "Temas relacionados à saúde pública, avanços científicos e bem-estar físico e mental.",
    icon: <HeartPulse className="h-6 w-6 text-[#2a9d8f]" />,
    iconBg: "bg-[#e8f1f1]",
    tags: ["Vacinação", "Obesidade", "SUS", "Saúde mental", "Pandemia", "Ciência e sociedade"],
  },
  {
    id: "cultura1",
    title: "Arte e cultura",
    description: "Exploração da diversidade cultural, identidade, expressões artísticas e patrimônio histórico.",
    icon: <Palette className="h-6 w-6 text-[#2a9d8f]" />,
    iconBg: "bg-[#e8f1f1]",
    tags: ["Identidade cultural", "Folclore", "Cultura popular", "Diversidade étnica", "Obras de arte"],
  },
  {
    id: "cidadania1",
    title: "Direitos e cidadania",
    description: "Participação social, direitos fundamentais, democracia e políticas públicas para o bem-estar coletivo.",
    icon: <Scale className="h-6 w-6 text-[#2a9d8f]" />,
    iconBg: "bg-[#e8f1f1]",
    tags: ["Saúde pública", "Democracia", "Cultura de paz", "Direitos humanos", "Participação social", "Saneamento Básico"],
  },
  {
    id: "educacao1",
    title: "Educação",
    description: "Discussões sobre acesso à educação, qualidade do ensino, inclusão e papel da escola na sociedade.",
    icon: <BookOpen className="h-6 w-6 text-[#2a9d8f]" />,
    iconBg: "bg-[#e8f1f1]",
    tags: ["Evasão escolar", "Inclusão", "Educação digital", "Formação docente", "Educação inclusiva"],
  },
  {
    id: "tecnologia1",
    title: "Tecnologia",
    description: "Impactos da tecnologia na vida cotidiana, educação, trabalho, privacidade e relações sociais.",
    icon: <Cpu className="h-6 w-6 text-[#2a9d8f]" />,
    iconBg: "bg-[#e8f1f1]",
    tags: ["Redes sociais", "Tecnologia na educação", "Privacidade digital"],
  },
  {
    id: "economia1",
    title: "Economia",
    description: "Dinâmicas econômicas, consumo, globalização, desigualdade de renda e seus reflexos sociais.",
    icon: <BarChart3 className="h-6 w-6 text-[#2a9d8f]" />,
    iconBg: "bg-[#e8f1f1]",
    tags: ["Consumo e publicidade", "Pobreza", "Globalização", "Desigualdade de renda"],
  },
]


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
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.7, ease: [0.42, 0, 0.58, 1] } },
}

const tagVariants = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.07 },
  }),
}

const MainTopics = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null)
  const swiperRef = useRef<SwiperType | null>(null)

  const handleCardHover = useCallback((cardId: string) => {
    setHoveredCard(cardId)
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.stop()
    }
  }, [])

  const handleCardLeave = useCallback(() => {
    setHoveredCard(null)
    if (swiperRef.current && swiperRef.current.autoplay) {
      swiperRef.current.autoplay.start()
    }
  }, [])

  const ref = useRef(null)
  const isInView = useInView(ref, { once: false, margin: "-100px" })

  return (
    <section className="w-full py-16 bg-gray-100 scroll-mt-24" id="topicos" ref={ref}>
      <motion.div
        className="container mx-auto px-4 text-center"
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "show" : "hidden"}
      >
        <motion.h2
          className="text-[45px] font-bold mb-2 text-gray-800"
          variants={fadeUpVariants}
        >
          Eixos Temáticos
        </motion.h2>
        <motion.p
          className="text-[30px] text-gray-600 max-w-4xl justify-self-center"
          variants={fadeUpVariants}
        >
          Explore os repertórios organizados por eixos temáticos para facilitar sua pesquisa.
        </motion.p>
        <motion.div className="relative" variants={fadeUpVariants}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            <Swiper
              modules={[Pagination, Navigation, Autoplay]}
              speed={1000}
              spaceBetween={10}
              slidesPerView={1}
              pagination={{
                clickable: true,
                dynamicBullets: true,
              }}
              navigation={true}
              autoplay={{
                delay: 5000,
                disableOnInteraction: false,
              }}
              loop={true}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                  spaceBetween: 20,
                },
                768: {
                  slidesPerView: 2,
                  spaceBetween: 30,
                },
                1024: {
                  slidesPerView: 3,
                  spaceBetween: 40,
                },
              }}
              style={{
                minHeight: "28rem",
                paddingTop: "2rem",
                paddingBottom: "4rem",
              }}
              autoHeight={true}
              className={`mySwiper ${hoveredCard ? "hover-active" : ""}`}
              onSwiper={(swiper) => {
                swiperRef.current = swiper
              }}
            >

              {mainTopics.map((topic, idx) => (
                <SwiperSlide
                  key={topic.id}
                  className={`h-auto transition-all duration-300 ${hoveredCard && hoveredCard !== topic.id
                      ? "blur-sm opacity-70 scale-95"
                      : "blur-none opacity-100 scale-100"
                    }`}
                >
                  <motion.div
                    variants={fadeUpVariants}
                    initial="hidden"
                    animate="show"
                    exit="hidden"
                    transition={{ duration: 0.6, delay: idx * 0.15 }}
                  >
                    <div
                      onMouseEnter={() => handleCardHover(topic.id)}
                      onMouseLeave={handleCardLeave}
                      className="h-full"
                    >
                      <Card>
                        <CardIcon>
                          <motion.div
                            initial={{ scale: 0.7, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.2 + idx * 0.1 }}
                          >
                            {topic.icon}
                          </motion.div>
                        </CardIcon>
                        <CardTitle>
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                          >
                            {topic.title}
                          </motion.span>
                        </CardTitle>
                        <CardDescription>
                          <motion.span
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.35 + idx * 0.1 }}
                          >
                            {topic.description}
                          </motion.span>
                        </CardDescription>
                        <TagList>
                          {topic.tags.map((tag, tagIdx) => (
                            <motion.div
                              key={tag}
                              custom={tagIdx}
                              variants={tagVariants}
                              initial="hidden"
                              animate="show"
                            >
                              <Tag>{tag}</Tag>
                            </motion.div>
                          ))}
                        </TagList>
                      </Card>
                    </div>
                  </motion.div>
                </SwiperSlide>
              ))}

            </Swiper>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

export default MainTopics

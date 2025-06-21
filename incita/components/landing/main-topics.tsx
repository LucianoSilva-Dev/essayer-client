"use client"

import type React from "react"
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
    description: "Repertórios sobre formas de discriminação e suas consequências na sociedade.",
    icon: <Leaf className="h-6 w-6 text-[#2a9d8f]" />,
    iconBg: "bg-[#e8f1f1]",
    tags: ["Desmatamento", "Reciclagem", "Mudanças climáticas", "Consumo consciente"],
  },
  {
    id: "social1",
    title: "Questões sociais",
    description:
      "Repertórios sobre avanços tecnológicos, impactos sociais, uso da informação e dilemas éticos digitais.",
    icon: <Brain className="h-6 w-6 text-[#2a9d8f]" />,
    iconBg: "bg-[#e8f1f1]",
    tags: ["Desigualdade social", "Pobreza", "Violência", "Direitos humanos", "Discriminação", "Inclusão social"],
  },
  {
    id: "ciencia1",
    title: "Saúde e ciência",
    description:
      "Sistema de saúde, prevenção de doenças, saúde mental, impactos da ciência na sociedade e no cotidiano.",
    icon: <HeartPulse className="h-6 w-6 text-[#2a9d8f]" />,
    iconBg: "bg-[#e8f1f1]",
    tags: ["Vacinação", "Obesidade", "SUS", "Saúde mental", "Pandemia", "Ciência e sociedade"],
  },
  {
    id: "cultura1",
    title: "Arte e cultura",
    description: "Diversidade cultural, identidade, patrimônio histórico e artístico.",
    icon: <Palette className="h-6 w-6 text-[#2a9d8f]" />,
    iconBg: "bg-[#e8f1f1]",
    tags: ["Identidade cultural", "Folclore", "Cultura popular", "Diversidade étnica", "obras de arte"],
  },
  {
    id: "cidadania1",
    title: "Direitos e cidadania",
    description:
      "Repertórios sobre sistemas de saúde, acesso, bem-estar, saúde mental e políticas públicas sanitárias.",
    icon: <Scale className="h-6 w-6 text-[#2a9d8f]" />,
    iconBg: "bg-[#e8f1f1]",
    tags: [
      "Saúde pública",
      "Democracia",
      "Cultura de paz",
      "Direitos humanos",
      "Participação social",
      "Saneamento Básico",
    ],
  },
  {
    id: "educacao1",
    title: "Educação",
    description: "Acesso, qualidade do ensino, papel da escola e inclusão educacional.",
    icon: <BookOpen className="h-6 w-6 text-[#2a9d8f]" />,
    iconBg: "bg-[#e8f1f1]",
    tags: ["Evasão escolar", "Inclusão", "Educação digital", "Formação docente", "Educação inclusiva"],
  },
  {
    id: "tecnologia1",
    title: "Tecnologia",
    description: "Sistemas econômicos, desigualdade social, trabalho, consumo e distribuição de renda.",
    icon: <Cpu className="h-6 w-6 text-[#2a9d8f]" />,
    iconBg: "bg-[#e8f1f1]",
    tags: ["Redes sociais", "Tecnologia na educação", "Privacidade digital"],
  },
  {
    id: "economia1",
    title: "Economia",
    description: "Sistemas econômicos, desigualdade social, trabalho, consumo e distribuição de renda.",
    icon: <BarChart3 className="h-6 w-6 text-[#2a9d8f]" />,
    iconBg: "bg-[#e8f1f1]",
    tags: ["Consumo e publicidade", "Pobreza", "Globalização", "Desigualdade de renda"],
  },
]

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

  return (
    <section className="w-full py-16 bg-gray-100 scroll-mt-25" id="topicos">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-10 text-gray-800">Principais Eixos Temáticos</h2>

        <div className="relative">
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
            //Definir altura mínima e auto-height
            style={{
              minHeight: "28rem", // Altura mínima maior que os cards
              paddingTop: "2rem",
              paddingBottom: "4rem",
            }}
            autoHeight={true}
            className={`mySwiper ${hoveredCard ? "hover-active" : ""}`}
            onSwiper={(swiper) => {
              swiperRef.current = swiper
            }}
          >
            {mainTopics.map((topic) => (
              <SwiperSlide
                key={topic.id}
                className={`h-auto transition-all duration-300 ${
                  hoveredCard && hoveredCard !== topic.id
                    ? "blur-sm opacity-70 scale-95"
                    : "blur-none opacity-100 scale-100"
                }`}
              >
                <div onMouseEnter={() => handleCardHover(topic.id)} onMouseLeave={handleCardLeave} className="h-full">
                  <Card>
                    <CardIcon>{topic.icon}</CardIcon>
                    <CardTitle>{topic.title}</CardTitle>
                    <CardDescription>{topic.description}</CardDescription>
                    <TagList>
                      {topic.tags.map((tag) => (
                        <Tag key={tag}>{tag}</Tag>
                      ))}
                    </TagList>
                  </Card>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  )
}

export default MainTopics

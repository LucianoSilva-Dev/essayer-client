// incita/components/landing/main-topics.tsx
'use client';

import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules'; // Importe os módulos que você quer usar
import { Card }from './card/card';
import { CardIcon } from './card/card-icon';
import { CardTitle } from './card/card-title';
import { CardDescription } from './card/card-description';
import { TagList } from './card/tag-list';
import { Tag } from './card/tag';
import { Sparkles, Scale, BookOpen, HeartPulse, Laptop, Leaf, Brain, Palette, Cpu, BarChart3} from 'lucide-react'; // Ícones de exemplo, ajuste conforme necessário

interface Topic {
    id: string;
    icon: React.ReactNode;
    iconBg: string;
    title: string;
    description: string;
    tags: string[];
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
      description: "Sistema de saúde, prevenção de doenças, saúde mental, impactos da ciência na sociedade e no cotidiano.",
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
      tags: ["Saúde pública", "Democracia", "Cultura de paz", "Direitos humanos", "Participação social", "Saneamento Básico"],
    },
    {
      id: "educacao1",
      title: "Educação",
      description:
        "Acesso, qualidade do ensino, papel da escola e inclusão educacional.",
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
];

const MainTopics = () => {
    return (
        <section className="w-full py-16 bg-gray-100 scroll-mt-25" id="topicos">
            <div className="container mx-auto px-4 text-center">
                <h2 className="text-3xl font-bold mb-10 text-gray-800">Principais Eixos Temáticos</h2>

                <div className="relative"> {/* Adiciona relative para posicionar navegação e paginação */}
                    <Swiper
                        modules={[Pagination, Navigation, Autoplay]} // Habilita Paginação, Navegação e Autoplay
                        spaceBetween={10} // Espaço entre os slides
                        slidesPerView={1} // Padrão para mobile
                        pagination={{ clickable: true }} // Pontinhos de navegação clicáveis
                        navigation={true} // Setas de navegação
                        autoplay={{
                            delay: 5000, // Tempo em ms para trocar de slide
                            disableOnInteraction: false, // Não para autoplay ao interagir
                        }}
                        loop={true} // Repetir o slider
                        breakpoints={{
                            // Quando a largura da tela for >= 640px (sm)
                            640: {
                                slidesPerView: 2,
                                spaceBetween: 20,
                            },
                            // Quando a largura da tela for >= 768px (md)
                            768: {
                                slidesPerView: 2,
                                spaceBetween: 30,
                            },
                            // Quando a largura da tela for >= 1024px (lg)
                            1024: {
                                slidesPerView: 3,
                                spaceBetween: 40,
                            },
                        }}
                        className="mySwiper pt-20 pb-10" // Adiciona um padding-bottom para a paginação não sobrepor
                    >
                      <div className="pb-10 pt-10">
                        {mainTopics.map((topic) => (
                            <SwiperSlide key={topic.id}>
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
                            </SwiperSlide>
                        ))}
                        </div>
                    </Swiper>
                </div>
            </div>
        </section>
    );
};

export default MainTopics;
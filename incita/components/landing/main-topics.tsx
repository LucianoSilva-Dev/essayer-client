import { Brain, BarChart3, Heart, Scale, BookOpen, Cpu, HeartPulse, Leaf, Palette } from "lucide-react"
import { Card } from "./card/card"
import { CardIcon } from "./card/card-icon"
import { CardTitle } from "./card/card-title"
import { CardDescription } from "./card/card-description"
import { TagList } from "./card/tag-list"
import { Tag } from "./card/tag"
import { link } from "fs"

export function MainTopics() {
  const topics = [
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
  ]

  return (
    <section className="w-full py-16 bg-gray-100 scroll-mt-25" id="topicos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-[45px] font-bold mb-4">Eixos Temáticos</h1>
          <p className="text-[30px] text-gray-700 max-w-4xl mx-auto">
            Explore nossos principais eixos temáticos organizados para facilitar sua pesquisa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 place-items-center">
          {topics.map((topic) => (
            <Card key={topic.id}>
              <CardIcon backgroundColor={topic.iconBg}>{topic.icon}</CardIcon>
              <CardTitle>{topic.title}</CardTitle>
              <CardDescription>{topic.description}</CardDescription>
              <TagList>
                {topic.tags.map((tag, index) => (
                  <Tag key={`${topic.id}-tag-${index}`}>{tag}</Tag>
                ))}
              </TagList>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}

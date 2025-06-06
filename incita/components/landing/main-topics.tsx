import { Brain, BarChart3, Heart, Scale } from "lucide-react"
import { Card } from "./card/card"
import { CardIcon } from "./card/card-icon"
import { CardTitle } from "./card/card-title"
import { CardDescription } from "./card/card-description"
import { TagList } from "./card/tag-list"
import { Tag } from "./card/tag"

export function MainTopics() {
  const topics = [
    {
      id: "discrimination",
      title: "Discriminação",
      description: "Repertórios sobre formas de discriminação e suas consequências na sociedade.",
      icon: <Scale className="h-6 w-6 text-[#2a9d8f]" />,
      iconBg: "bg-[#e8f1f1]",
      tags: ["Xenofobia", "Racismo", "LGBTQIA+ fobia", "Gordofobia"],
    },
    {
      id: "technologies",
      title: "Tecnologias",
      description:
        "Repertórios sobre avanços tecnológicos, impactos sociais, uso da informação e dilemas éticos digitais.",
      icon: <Brain className="h-6 w-6 text-[#2a9d8f]" />,
      iconBg: "bg-[#e8f1f1]",
      tags: ["Inteligência artificial", "Fake News", "Privacidade e vigilância", "Inovação e sociedade"],
    },
    {
      id: "economy1",
      title: "Economia",
      description: "Sistemas econômicos, desigualdade social, trabalho, consumo e distribuição de renda.",
      icon: <BarChart3 className="h-6 w-6 text-[#2a9d8f]" />,
      iconBg: "bg-[#e8f1f1]",
      tags: ["Consumo e publicidade", "Pobreza", "Globalização", "Desigualdade de renda"],
    },
    {
      id: "economy2",
      title: "Economia",
      description: "Sistemas econômicos, desigualdade social, trabalho, consumo e distribuição de renda.",
      icon: <BarChart3 className="h-6 w-6 text-[#2a9d8f]" />,
      iconBg: "bg-[#e8f1f1]",
      tags: ["Consumo e publicidade", "Pobreza", "Globalização", "Desigualdade de renda"],
    },
    {
      id: "health1",
      title: "Saúde",
      description:
        "Repertórios sobre sistemas de saúde, acesso, bem-estar, saúde mental e políticas públicas sanitárias.",
      icon: <Heart className="h-6 w-6 text-[#2a9d8f]" />,
      iconBg: "bg-[#e8f1f1]",
      tags: ["Saúde pública", "Pandemias e crises sanitárias", "Saneamento Básico", "Saúde mental"],
    },
    {
      id: "health2",
      title: "Saúde",
      description:
        "Repertórios sobre sistemas de saúde, acesso, bem-estar, saúde mental e políticas públicas sanitárias.",
      icon: <Heart className="h-6 w-6 text-[#2a9d8f]" />,
      iconBg: "bg-[#e8f1f1]",
      tags: ["Saúde pública", "Pandemias e crises sanitárias", "Saneamento Básico", "Saúde mental"],
    },
  ]

  return (
    <section className="w-full py-16 bg-gray-100" id="topicos">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">Principais tópicos</h1>
          <p className="text-lg text-gray-700 max-w-3xl mx-auto">
            Explore nossos principais eixos temáticos organizados para facilitar sua pesquisa
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

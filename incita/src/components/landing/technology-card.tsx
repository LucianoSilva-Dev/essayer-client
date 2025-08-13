import { Brain } from "lucide-react"
import { Card } from "./card/card"
import { CardIcon } from "./card/card-icon"
import { CardTitle } from "./card/card-title"
import { CardDescription } from "./card/card-description"
import { TagList } from "./card/tag-list"
import { Tag } from "./card/tag"

export function TechnologyCard() {
  const technologyTags = ["Inteligência artificial", "Fake News", "Privacidade e vigilância", "Inovação e sociedade"]

  return (
    <Card>
      <CardIcon>
        <Brain className="h-6 w-6 text-[#2a9d8f]" />
      </CardIcon>

      <CardTitle>Tecnologias</CardTitle>
      <CardDescription>
        Repertórios sobre avanços tecnológicos, impactos sociais, uso da informação e dilemas éticos digitais.
      </CardDescription>

      <TagList>
        {technologyTags.map((tag, index) => (
          <Tag key={`${tag}-${index}`}>{tag}</Tag>
        ))}
      </TagList>
    </Card>
  )
}

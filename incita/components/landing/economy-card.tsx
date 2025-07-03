import { BarChart3 } from "lucide-react"
import { Card } from "./card/card"
import { CardIcon } from "./card/card-icon"
import { CardTitle } from "./card/card-title"
import { CardDescription } from "./card/card-description"
import { TagList } from "./card/tag-list"
import { Tag } from "./card/tag"

export function EconomyCard() {
  const economyTags = ["Consumo e publicidade", "Pobreza", "Globalização", "Desigualdade de renda"]

  return (
    <Card>
      <CardIcon>
        <BarChart3 className="h-6 w-6 text-[#2a9d8f]" />
      </CardIcon>

      <CardTitle>Economia</CardTitle>
      <CardDescription>
        Sistemas econômicos, desigualdade social, trabalho, consumo e distribuição de renda.
      </CardDescription>

      <TagList>
        {economyTags.map((tag, index) => (
          <Tag key={`${tag}-${index}`}>{tag}</Tag>
        ))}
      </TagList>
    </Card>
  )
}

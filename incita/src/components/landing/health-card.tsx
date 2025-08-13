import { Heart } from "lucide-react"
import { Card } from "./card/card"
import { CardIcon } from "./card/card-icon"
import { CardTitle } from "./card/card-title"
import { CardDescription } from "./card/card-description"
import { TagList } from "./card/tag-list"
import { Tag } from "./card/tag"

export function HealthCard() {
  const healthTags = ["Saúde pública", "Pandemias e crises sanitárias", "Saneamento Básico", "Saúde mental"]

  return (
    <Card>
      <CardIcon>
        <Heart className="h-6 w-6 text-[#2a9d8f]" />
      </CardIcon>

      <CardTitle>Saúde</CardTitle>
      <CardDescription>
        Repertórios sobre sistemas de saúde, acesso, bem-estar, saúde mental e políticas públicas sanitárias.
      </CardDescription>

      <TagList>
        {healthTags.map((tag, index) => (
          <Tag key={`${tag}-${index}`}>{tag}</Tag>
        ))}
      </TagList>
    </Card>
  )
}

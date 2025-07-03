import { Scale } from "lucide-react"
import { Card } from "./card/card"
import { CardIcon } from "./card/card-icon"
import { CardTitle } from "./card/card-title"
import { CardDescription } from "./card/card-description"
import { TagList } from "./card/tag-list"
import { Tag } from "./card/tag"

export function DiscriminationCard() {
  const discriminationTags = ["Xenofobia", "Racismo", "LGBTQIA+ fobia", "Racismo", "Gordofobia"]

  return (
    <Card>
      <CardIcon>
        <Scale className="h-6 w-6 text-[#2a9d8f]" />
      </CardIcon>

      <CardTitle>Discriminação</CardTitle>
      <CardDescription>Repertórios sobre formas de discriminação e suas consequências na sociedade.</CardDescription>

      <TagList>
        {discriminationTags.map((tag, index) => (
          <Tag key={`${tag}-${index}`}>{tag}</Tag>
        ))}
      </TagList>
    </Card>
  )
}

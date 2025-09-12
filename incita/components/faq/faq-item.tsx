"use client"

import { AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion"

interface FAQItemProps {
  question: string
  answer: string
  value: string
}

export function FAQItem({ question, answer, value }: FAQItemProps) {
  return (
    <AccordionItem value={value} className="border-b border-border/50">
      <AccordionTrigger className="text-left hover:no-underline py-4 px-2 hover:bg-muted/50 rounded-md transition-colors">
        <span className="font-medium text-sm">{question}</span>
      </AccordionTrigger>
      <AccordionContent className="text-muted-foreground leading-relaxed px-2 pb-4">
        <div className="text-sm">{answer}</div>
      </AccordionContent>
    </AccordionItem>
  )
}

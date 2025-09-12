"use client"

import { Accordion } from "../ui/accordion"
import { FAQItem } from "./faq-item"

interface FAQData {
  question: string
  answer: string
}

interface FAQListProps {
  faqs: FAQData[]
}

export function FAQList({ faqs }: FAQListProps) {
  return (
    <div className="max-h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted scrollbar-track-transparent">
      <Accordion type="single" collapsible className="w-full space-y-2">
        {faqs.map((faq, index) => (
          <FAQItem key={index} question={faq.question} answer={faq.answer} value={`item-${index}`} />
        ))}
      </Accordion>
    </div>
  )
}

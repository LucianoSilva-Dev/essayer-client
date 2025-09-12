"use client"

import { Button } from '../ui/button'
import { HelpCircle } from "lucide-react"

interface FAQButtonProps {
  onClick: () => void
  text: string
}

export function FAQButton({ onClick, text }: FAQButtonProps) {
  return (
    <Button
      onClick={onClick}
      size="lg"
      className="rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-gray-50 hover:bg-gray-60 text-primary-foreground group"
    >
      <HelpCircle className="w-5 h-5 mr-2 group-hover:rotate-12 transition-transform duration-300" />
      {text}
    </Button>
  )
}

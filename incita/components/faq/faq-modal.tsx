"use client"


import { FAQList } from "./faq-list"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog"

interface FAQData {
  question: string
  answer: string
}

interface FAQModalProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  faqs: FAQData[]
}

export function FAQModal({ isOpen, onOpenChange, title, description, faqs }: FAQModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[85vh] flex flex-col bg-gray-50">
        <DialogHeader className="flex-shrink-0">
          <DialogTitle className="text-xl font-semibold text-balance">{title}</DialogTitle>
          <DialogDescription className="text-muted-foreground text-pretty">{description}</DialogDescription>
        </DialogHeader>
        <div className="flex-1 mt-4 min-h-0">
          <FAQList faqs={faqs} />
        </div>
      </DialogContent>
    </Dialog>
  )
}

"use client"

import { useState } from 'react'
import { FAQButton } from "../faq/faq-button"
import { FAQModal } from "../faq/faq-modal"

interface FAQItem {
  question: string
  answer: string
}

interface FloatingFAQButtonProps {
  faqs?: FAQItem[]
  buttonText?: string
  title?: string
  description?: string
}

const defaultFAQs: FAQItem[] = [
  {
    question: "Como posso entrar em contato?",
    answer:
      "Você pode entrar em contato conosco através do email contato@exemplo.com ou pelo telefone (11) 99999-9999.",
  },
  {
    question: "Qual é o horário de funcionamento?",
    answer: "Nosso horário de funcionamento é de segunda a sexta-feira, das 9h às 18h.",
  },
  {
    question: "Como faço para criar uma conta?",
    answer:
      "Para criar uma conta, clique no botão 'Cadastrar' no topo da página e preencha as informações solicitadas.",
  },
  {
    question: "Posso cancelar meu pedido?",
    answer:
      "Sim, você pode cancelar seu pedido até 24 horas após a confirmação. Entre em contato conosco para mais detalhes.",
  },
  {
    question: "Quais são as formas de pagamento aceitas?",
    answer: "Aceitamos cartões de crédito, débito, PIX, boleto bancário e transferência bancária.",
  },
  {
    question: "Como acompanho meu pedido?",
    answer:
      "Após a confirmação do pedido, você receberá um código de rastreamento por email para acompanhar o status da entrega.",
  },
  {
    question: "Vocês fazem entrega em todo o Brasil?",
    answer: "Sim, realizamos entregas em todo o território nacional. Os prazos variam conforme a região de destino.",
  },
  {
    question: "Posso trocar ou devolver um produto?",
    answer:
      "Sim, você tem até 30 dias para solicitar troca ou devolução, desde que o produto esteja em perfeitas condições.",
  },
  {
    question: "Como funciona a garantia dos produtos?",
    answer:
      "Todos os produtos possuem garantia do fabricante. O prazo varia conforme o tipo de produto e está especificado na descrição.",
  },
  {
    question: "Vocês oferecem suporte técnico?",
    answer:
      "Sim, oferecemos suporte técnico especializado através do nosso chat online ou telefone durante o horário comercial.",
  },
]

export function FloatingFAQButton({
  faqs = defaultFAQs,
  buttonText = "FAQ",
  title = "Perguntas Frequentes",
  description = "Encontre respostas para as dúvidas mais comuns",
}: FloatingFAQButtonProps) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <FAQButton onClick={() => setIsOpen(true)} text={buttonText} />
      </div>

      <FAQModal isOpen={isOpen} onOpenChange={setIsOpen} title={title} description={description} faqs={faqs} />
    </>
  )
}

// Salve como: src/components/UserTypeCard.tsx

"use client" // Necessário por usar hooks (useState) e framer-motion

import React, { useState } from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'

// Dados para cada tipo de usuário
const cardData = {
  student: {
    title: 'Estudante',
    description:
      'Ideal para alunos que vão acessar conteúdos, realizar atividades, acompanhar seu progresso e interagir com educadores.',
  },
  teacher: {
    title: 'Educador',
    // Criei esta descrição como exemplo
    description:
      'Ideal para educadores que vão criar conteúdos, gerenciar turmas, avaliar atividades e interagir com alunos.',
  },
}

type CardType = 'student' | 'teacher'

export default function UserTypeCard() {
  const [selectedType, setSelectedType] = useState<CardType>('student')
  const data = cardData[selectedType]

  // Lógica para o "swipe"
  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const swipeThreshold = 50 // Distância mínima para considerar um swipe
    if (info.offset.x < -swipeThreshold) {
      // Swipe para a esquerda
      setSelectedType('teacher')
    } else if (info.offset.x > swipeThreshold) {
      // Swipe para a direita
      setSelectedType('student')
    }
  }

  // Variantes para a animação do texto
  const textVariants = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 50 : -50, // Entra da direita, sai para a esquerda (ou vice-versa)
    }) as const,
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.3, ease: 'easeInOut' },
    } as const,
    exit: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? -50 : 50,
      transition: { duration: 0.3, ease: 'easeInOut' },
    }) as const,
  }

  return (
    // Card Principal
    // Usei `max-w-[672px]` e `w-full` para responsividade
    // A `min-h-[292px]` ajuda a manter o layout estável durante a troca de texto
    <motion.div
      className="relative flex flex-col justify-center items-start p-8 gap-4 bg-white shadow-[0px_0px_15.7px_-7px_#3C3C3C] rounded-[30px] isolate w-full max-w-[672px] min-h-[292px] overflow-hidden cursor-grab active:cursor-grabbing"
      // Propriedades do Framer Motion para o "drag"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }} // Não permite arrastar para fora
      dragElastic={0.1} // Uma leve "elasticidade"
      onDragEnd={onDragEnd}
    >
      {/* Botões de seleção (pontos) */}
      <div className="absolute top-6 right-8 flex flex-row items-center gap-3 z-10">
        <button
          onClick={() => setSelectedType('student')}
          className={`
            ${selectedType === 'student' ? 'w-[52px] bg-[#075F70]' : 'w-5 bg-[#D9D9D9]'}
            h-5 rounded-full transition-all duration-300 ease-out cursor-pointer
          `}
          aria-label="Selecionar Estudante"
        />
        <button
          onClick={() => setSelectedType('teacher')}
          className={`
            ${selectedType === 'teacher' ? 'w-[52px] bg-[#075F70]' : 'w-5 bg-[#D9D9D9]'}
            h-5 rounded-full transition-all duration-300 ease-out cursor-pointer
          `}
          aria-label="Selecionar Educador"
        />
      </div>

      {/* Conteúdo (Título e Descrição) */}
      {/* AnimatePresence garante a animação de saída do elemento antigo */}
      <AnimatePresence 
        mode="wait" 
        custom={selectedType === 'student' ? 1 : -1}
      >
        <motion.div
          key={selectedType} // Essencial para o AnimatePresence saber que o componente mudou
          className="flex flex-col gap-4 self-stretch"
          // Animações de entrada e saída
          custom={selectedType === 'student' ? 1 : -1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Título */}
          <h2 className="font-montserrat font-medium text-[44px] leading-[54px] text-[#3C3C3C] z-0">
            {data.title}
          </h2>

          {/* Descrição */}
          <p className="font-montserrat font-normal text-[32px] leading-[39px] text-[#898787] z-20 self-stretch">
            {data.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
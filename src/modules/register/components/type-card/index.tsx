// Modifique: src/components/auth/register/steps/UserTypeCard.tsx

"use client"
import React from 'react'
import { motion, AnimatePresence, PanInfo } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { CardType } from '../../types/register-form-types'

const cardData = {
  student: {
    title: 'Estudante',
    description:
      'Ideal para alunos que vão acessar conteúdos, realizar atividades, acompanhar seu progresso e interagir com educadores.',
  },
  teacher: {
    title: 'Educador',
    description:
      'Ideal para educadores que vão criar conteúdos, gerenciar turmas, avaliar atividades e interagir com alunos.',
  },
}

// --- Props Atualizadas ---
interface UserTypeCardProps {
  selectedType: CardType
  onTypeChange: (type: CardType) => void
}

export default function UserTypeCard({
  selectedType,
  onTypeChange,
}: UserTypeCardProps) {
  const data = cardData[selectedType]

  const onDragEnd = (
    event: MouseEvent | TouchEvent | PointerEvent,
    info: PanInfo
  ) => {
    const swipeThreshold = 50
    if (info.offset.x < -swipeThreshold) {
      onTypeChange('teacher')
    } else if (info.offset.x > swipeThreshold) {
      onTypeChange('student')
    }
  }

   const textVariants = {
    hidden: (direction: number) => ({
      opacity: 0,
      x: direction > 0 ? 50 : -50,
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
    <motion.div
      className="relative flex flex-col justify-center items-start p-8 gap-4 bg-white shadow-[0px_0px_15.7px_-7px_#3C3C3C] rounded-[30px] isolate w-full max-w-2xl min-h-73 overflow-hidden cursor-grab active:cursor-grabbing z-3"
      drag="x"
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.1}
      onDragEnd={onDragEnd}
    >
      {/* Botões de seleção (pontos) */}
      <div className="absolute top-6 right-8 flex flex-row items-center gap-3 z-10">
        <button
          onClick={(e) => {
            e.stopPropagation() // <-- 2. ADICIONADO: Impede que o 'onTap' do card seja disparado
            onTypeChange('student')
          }}
          className={` flex items-center justify-center
            ${selectedType === 'student' ? 'w-15.75 bg-brand-teal-dark' : 'w-6 bg-[#D9D9D9]'}
            h-6 rounded-full transition-all duration-300 ease-out cursor-pointer
          `}
          aria-label="Selecionar Estudante"
        >
          {selectedType === 'student' && (
            <ChevronLeft className="w-5 h-5 text-white" strokeWidth={3} />
          )}
        </button>
        <button
          onClick={(e) => {
            e.stopPropagation() // <-- 2. ADICIONADO: Impede que o 'onTap' do card seja disparado
            onTypeChange('teacher')
          }}
          className={` flex items-center justify-center
            ${selectedType === 'teacher' ? 'w-15.75 bg-brand-teal-dark' : 'w-6 bg-[#D9D9D9]'}
            h-6 rounded-full transition-all duration-300 ease-out cursor-pointer
          `}
          aria-label="Selecionar Educador"
        >
          {selectedType === 'teacher' && (
            <ChevronRight className="w-5 h-5 text-white" strokeWidth={3} />
          )}
        </button>
      </div>

      {/* Conteúdo (Título e Descrição) */}
      <AnimatePresence
        mode="wait"
        custom={selectedType === 'student' ? 1 : -1}
      >
        <motion.div
          key={selectedType}
          className="flex flex-col gap-4 self-stretch"
          custom={selectedType === 'student' ? 1 : -1}
          variants={textVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          {/* Título */}
          <h2 className="font-montserrat font-medium text-[32px] md:text-[44px] leading-13.5 text-neutral-dark z-0">
            {data.title}
          </h2>

          {/* Descrição */}
          <p className="font-montserrat font-normal text-[18px] md:text-[32px] leading-9.75 text-[#898787] z-20 self-stretch">
            {data.description}
          </p>
        </motion.div>
      </AnimatePresence>
    </motion.div>
  )
}
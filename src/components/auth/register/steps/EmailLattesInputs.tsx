"use client"
import React from "react"
import { motion, Variants, AnimatePresence } from "framer-motion"

// Definimos as props que este componente de etapa receberá
interface EmailLattesInputsProps {
  email: string
  lattes: string
  userType: "student" | "teacher" // Necessário para a lógica condicional
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  itemVariants: Variants // Para animar os campos
}

export const EmailLattesInputs: React.FC<EmailLattesInputsProps> = ({
  email,
  lattes,
  userType,
  onFormChange,
  itemVariants,
}) => {
  return (
    // Container do formulário com animação 'stagger' (escalonada)
    <motion.div
      className="flex flex-col gap-8"
      initial="hidden"
      animate="visible"
      variants={{
        visible: {
          transition: {
            staggerChildren: 0.1,
          },
        },
      }}
    >
      {/* Campo Email (sempre visível) */}
      <motion.div variants={itemVariants}>
        <label
          htmlFor="email"
          // Estilo de label consistente com NameInputs
          className="block text-2xl md:text-[35px] font-medium text-[#3C3C3C] pl-3 mb-2"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email" // Importante para o onFormChange
          value={email}
          onChange={onFormChange}
          // Estilo de input consistente com NameInputs
          className="w-full max-w-[640px] px-6 py-4 bg-white rounded-[32px] 
            text-lg md:text-xl
            shadow-[0px_0px_15px_-6px_rgba(0,0,0,0.25)]
            focus:outline-none focus:ring-2 focus:ring-[#075F70] 
            focus:shadow-lg focus:-translate-y-[0.5em]
            transition-all duration-300"
          required
        />
      </motion.div>

      {/* Campo Lattes (Condicional) */}
      {/* Usamos AnimatePresence para o Lattes entrar/sair suavemente
          se o usuário voltar e trocar o tipo de usuário */}
      <AnimatePresence>
        {userType === 'teacher' && (
          <motion.div
            // Usamos itemVariants para a animação de entrada
            // e definimos 'exit' para a animação de saída
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            exit={{
              opacity: 0,
              y: -18,
              transition: { duration: 0.3, ease: 'easeIn' },
            }}
          >
            <label
              htmlFor="lattes"
              className="block text-2xl md:text-[35px] font-medium text-[#3C3C3C] pl-3 mb-2"
            >
              Lattes
            </label>
            <input
              type="text" // ou "url"
              id="lattes"
              name="lattes" // Importante para o onFormChange
              value={lattes}
              onChange={onFormChange}
              placeholder="http://lattes.cnpq.br/..."
              // Estilo de input consistente
              className="w-full max-w-[640px] px-6 py-4 bg-white rounded-[32px] 
                text-lg md:text-xl
                shadow-[0px_0px_15px_-6px_rgba(0,0,0,0.25)]
                focus:outline-none focus:ring-2 focus:ring-[#075F70] 
                focus:shadow-lg focus:-translate-y-[0.5em]
                transition-all duration-300"
                required
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
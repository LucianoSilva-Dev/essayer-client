"use client"
import React from "react"
import { motion, Variants } from "framer-motion"

interface NameInputsProps {
  firstName: string
  lastName: string
  onFormChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  itemVariants: Variants
}

export const NameInputs: React.FC<NameInputsProps> = ({
  firstName,
  lastName,
  onFormChange,
  itemVariants,
}) => {
  return (
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
      <motion.div variants={itemVariants}>
        <label
          htmlFor="firstName"
          className="block text-2xl md:text-[35px] font-medium text-neutral-dark pl-3 mb-2"
        >
          Nome
        </label>
        <input
          type="text"
          id="firstName"
          name="firstName" 
          value={firstName}
          onChange={onFormChange}
          className="w-full max-w-160 px-6 py-4 bg-white rounded-4xl 
            text-lg md:text-xl
            shadow-[0px_0px_15px_-6px_rgba(0,0,0,0.25)]
            focus:outline-none focus:ring-2 focus:ring-brand-teal-dark 
            focus:shadow-lg focus:-translate-y-[0.5em]
            transition-all duration-300"
          required
        />
      </motion.div>

      {/* Campo Sobrenome */}
      <motion.div variants={itemVariants}>
        <label
          htmlFor="lastName"
          // Estilos do Figma: font-size: 35px, font-weight: 500, color: #3C3C3C
          className="block text-2xl md:text-[35px] font-medium text-neutral-dark pl-3 mb-2"
        >
          Sobrenome
        </label>
        <input
          type="text"
          id="lastName"
          name="lastName" // Essencial para o onFormChange
          value={lastName}
          onChange={onFormChange}
          // Estilos do Figma: height: 60px, shadow, border-radius: 32px
          // + Estilos de interação do login-form.tsx
          className="w-full max-w-160 px-6 py-4 bg-white rounded-4xl 
            text-lg md:text-xl
            shadow-[0px_0px_15px_-6px_rgba(0,0,0,0.25)]
            focus:outline-none focus:ring-2 focus:ring-brand-teal-dark 
            focus:shadow-lg focus:-translate-y-[0.5em]
            transition-all duration-300"
          required
        />
      </motion.div>
    </motion.div>
  )
}
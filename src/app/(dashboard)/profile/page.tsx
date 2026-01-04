"use client"

import PersonalDataForm from "@/modules/personal-data/profile/components/content"
import { motion } from "framer-motion"

// Configurações de animação do Framer Motion
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
}

const pageTransition = {
  type: "tween" as const,
  ease: "anticipate" as const,
  duration: 0.5 as const,
}

export default function PersonalDataPage() {
  return (
    <motion.div
      key="personal-data" // Chave única para AnimatePresence
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="bg-transparent" //rounded-2xl shadow-sm p-10 
    >
      <PersonalDataForm />
    </motion.div>
  )
}
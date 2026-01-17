"use client"

import { motion } from "framer-motion"

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

export default function SocialPage() {
  return (
    <motion.div
      key="social"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="bg-white rounded-2xl shadow-sm p-10"
    >
      <h1 className="text-4xl font-medium text-neutral-dark">Perfil Social</h1>
      <p className="mt-4 text-gray-600">
        Esta seção está em construção.
      </p>
    </motion.div>
  )
}
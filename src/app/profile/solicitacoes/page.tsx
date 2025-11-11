"use client"

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

export default function SolicitacoesPage() {
    return (
        <div>
            <motion.div
            >

            </motion.div>

            <motion.div
                key="desativar"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}
                className="bg-white rounded-2xl shadow-sm p-10"
            >
                <h1 className="text-4xl font-medium text-[#3C3C3C]">Solicitar desativação da conta</h1>
                <p className="mt-4 text-gray-600">
                    Esta seção está em construção.
                </p>
            </motion.div>
        </div>
    )
}
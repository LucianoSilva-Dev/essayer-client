"use client"

import { motion } from "framer-motion"
import Link from "next/link"

const Inicio = () => {
  return (
    <section className="w-full bg-[#0A4958] py-16 relative -top-25 md:py-20" id="inicio">
      <div className="container mx-auto px-4 pt-20 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Explore repertórios e aperfeiçoe o poder da argumentação
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/90 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Um acervo organizado por tópicos e subtópicos para facilitar sua pesquisa e reflexão sobre questões
              sociais fundamentais.
            </motion.p>
            <motion.div
              className="flex flex-col items-center md:items-start sm:flex-row gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link
                href="#topicos"
                className="inline-flex min-h-20 max-w-45 leading-[35px] items-center justify-center rounded-md bg-[#CA9C60] px-30 text-center text-[27px] font-medium text-white hover:bg-[#a68050] duration-300 transition-colors"
              >
                Eixos Temáticos
              </Link>
              <Link
                href="#como-funciona"
                className="inline-flex  min-h-20 max-w-45 leading-[35px] items-center justify-center rounded-md bg-[#CA9C60] px-30 text-center text-[27px] font-medium text-white hover:bg-[#a68050] duration-300 transition-colors"
              >
                Como funciona
              </Link>
            </motion.div>
          </motion.div>

          {/* Cards em camadas */}
          <motion.div
            className="relative flex justify-center items-center min-h-[500px]"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            {/* Card de fundo esquerdo */}
            <motion.div
              className="absolute top-0 left-0 transform scale-75 blur-sm opacity-60 z-10"
              initial={{ opacity: 0, scale: 0.5, rotate: -10, y: 100, x: 100 }}
              animate={{ opacity: 0.6, scale: 0.75, rotate: 0, y: 0, x: 0 }}
              transition={{ duration: 1, delay: 0.8 }}
            >
              <div className="bg-white rounded-2xl p-6 w-80 shadow-lg border-l-4 border-orange-400">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">Contrato Social - Jean Rousseau</h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      Para Jean-Jacques Rousseau, o contrato social é um pacto entre indivíduos que estabelece uma
                      sociedade e um Estado...
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">Referência: &quot;Lorem ipsum dolor&quot;</div>
                  <div className="flex gap-2 mt-4">
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                      <span className="text-gray-500">Tópicos</span>
                      <br />
                      <span>Política</span>
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                      <span className="text-gray-500">Subtópico</span>
                      <br />
                      <span>Formação do Estado</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Card principal (centro)*/}
            <motion.div
              className="relative z-30"
              initial={{ opacity: 0, y: 50, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <motion.div
                className="bg-white rounded-2xl p-6 w-96 shadow-2xl border-l-4 border-[#CA9C60]"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              >
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-800">Contrato Social - Jean Rousseau</h3>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>
                      Para Jean-Jacques Rousseau, o contrato social é um pacto entre indivíduos que estabelece uma
                      sociedade e um Estado. É um acordo normatizado pelas leis, que visa garantir a harmonia social.
                      Rousseau considerava que o homem nasce livre...
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">Referência: &quot;Do Contrato Social&quot;</div>
                  <div className="flex gap-2 mt-4">
                    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                      <div className="text-gray-500 text-xs">Eixo</div>
                      <div className="font-medium">Política</div>
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                      <div className="text-gray-500 text-xs">Subtópico</div>
                      <div className="font-medium">Formação do Estado</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>

            {/* Card de fundo direito */}
            <motion.div
              className="absolute bottom-0 right-0 transform scale-75 blur-sm opacity-60 z-20"
              initial={{ opacity: 0, scale: 0.5, rotate: 10, y: -100, x: -100 }}
              animate={{ opacity: 0.6, scale: 0.75, rotate: 0, y: 0, x: 0}}
              transition={{ duration: 1, delay: 1 }}
            >
              <div className="bg-white rounded-2xl p-6 w-80 shadow-lg border-l-4 border-orange-400">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">Contrato Social - Jean Rousseau</h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      Para Jean-Jacques Rousseau, o contrato social é um pacto entre indivíduos que estabelece uma
                      sociedade e um Estado...
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">Referência: &quot;Lorem ipsum dolor&quot;</div>
                  <div className="flex gap-2 mt-4">
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                      <span className="text-gray-500">Tópicos</span>
                      <br />
                      <span>Política</span>
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs">
                      <span className="text-gray-500">Subtópico</span>
                      <br />
                      <span>Formação do Estado</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default Inicio

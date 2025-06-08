import Link from "next/link"

export default function HeroSection() {
  return (
    <section className="w-full bg-[#0A4958] py-16 md:py-20" id="inicio">
      <div className="container mx-auto px-4 pt-20 md:px-6">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              Explore repertórios e aperfeiçoe o poder da argumentação
            </h1>
            <p className="text-lg md:text-xl text-white/90 max-w-md">
              Um acervo organizado por tópicos e subtópicos para facilitar sua pesquisa e reflexão sobre questões
              sociais fundamentais.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Link
                href="#topicos"
                className="inline-flex h-12 items-center justify-center rounded-md bg-[#E29D4F] px-8 text-base font-medium text-black hover:bg-[#d08c3e] transition-colors"
              >
                Explorar tópicos
              </Link>
              <Link
                href="#como-funciona"
                className="inline-flex h-12 items-center justify-center rounded-md bg-[#E29D4F] px-8 text-base font-medium text-black hover:bg-[#d08c3e] transition-colors"
              >
                Como funciona
              </Link>
            </div>
          </div>

          {/* Cards em camadas */}
          <div className="relative flex justify-center items-center min-h-[500px]">
            {/* Card de fundo esquerdo */}
            <div className="absolute top-0 left-0 transform scale-75 blur-sm opacity-60 z-10">
              <div className="bg-white rounded-2xl p-6 w-80 shadow-lg border-l-4 border-orange-400">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">Contrato Social - Jean Rousseau</h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      Para Jean-Jacques Rousseau, o contrato social é um pacto entre indivíduos que estabelece uma
                      sociedade e um Estado...
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">Referência: "Lorem ipsum dolor"</div>
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
            </div>

            {/* Card principal (centro)*/}
            <div className="relative z-30 animate-[upDown_3s_ease-in-out_infinite]"> {/*Aqui deve ficar a animação "animate-upDown"*/}
              <div className="bg-white rounded-2xl p-6 w-96 shadow-2xl border-l-4 border-orange-400">
                <div className="space-y-4">
                  <h3 className="text-xl font-bold text-gray-800">Contrato Social - Jean Rousseau</h3>
                  <div className="text-sm text-gray-700 space-y-2">
                    <p>
                      Para Jean-Jacques Rousseau, o contrato social é um pacto entre indivíduos que estabelece uma
                      sociedade e um Estado. É um acordo normatizado pelas leis, que visa garantir a harmonia social.
                      Rousseau considerava que o homem nasce livre...
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">Referência: "Lorem ipsum dolor"</div>
                  <div className="flex gap-2 mt-4">
                    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                      <div className="text-gray-500 text-xs">Tópicos</div>
                      <div className="font-medium">Política</div>
                    </div>
                    <div className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm">
                      <div className="text-gray-500 text-xs">Subtópico</div>
                      <div className="font-medium">Formação do Estado</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card de fundo direito */}
            <div className="absolute bottom-0 right-0 transform scale-75 blur-sm opacity-60 z-20">
              <div className="bg-white rounded-2xl p-6 w-80 shadow-lg border-l-4 border-orange-400">
                <div className="space-y-4">
                  <h3 className="text-lg font-bold text-gray-800">Contrato Social - Jean Rousseau</h3>
                  <div className="text-sm text-gray-600 space-y-2">
                    <p>
                      Para Jean-Jacques Rousseau, o contrato social é um pacto entre indivíduos que estabelece uma
                      sociedade e um Estado...
                    </p>
                  </div>
                  <div className="text-xs text-gray-500">Referência: "Lorem ipsum dolor"</div>
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
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

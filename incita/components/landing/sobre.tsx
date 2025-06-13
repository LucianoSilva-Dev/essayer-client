import { Target, Eye, Star } from "lucide-react"

export default function AboutSection() {
  return (
    <section className="py-16 px-4 md:px-6 lg:px-6 bg-[#F3F4F6]" id="sobre">
      <div className="max-w-[70%] mx-auto">
        <h2 className="text-[35px] px-10 font-bold mb-6">Sobre o Incita</h2>

        <div className="space-y-6 px-10 mb-10">
          <p className="text-gray-700 text-[25px]">
            O Incita nasceu da necessidade de centralizar e organizar repertórios sobre questões sociais fundamentais,
            facilitando o acesso a informações relevantes para pesquisadores, estudantes e profissionais.
          </p>

          <p className="text-gray-700 text-[25px]">
            Nosso objetivo é criar uma plataforma onde conhecimento e reflexão sobre os pilares da sociedade possam ser
            facilmente acessados e compartilhados.
          </p>
        </div>

        <div className="space-y-8 px-20">
          <div className="flex items-start gap-4">
            <div className="mt-1 bg-amber-100 p-2 rounded-full">
              <Target className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1 text-[25px]">Missão</h3>
              <p className="text-gray-700 text-[25px]">
                Democratizar o acesso a repertórios qualificados sobre questões sociais fundamentais.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 bg-amber-100 p-2 rounded-full">
              <Eye className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1 text-[25px]">Visão</h3>
              <p className="text-gray-700 text-[25px]">Ser a principal referência em acervo de repertórios sociais no Brasil.</p>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="mt-1 bg-amber-100 p-2 rounded-full">
              <Star className="h-8 w-8 text-amber-600" />
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-1 text-[25px]">Valores</h3>
              <p className="text-gray-700 text-[25px]">Transparência, diversidade, acessibilidade e compromisso com a qualidade.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-[#173843] py-10 px-4 text-center">
      <div className="container mx-auto max-w-4xl">
        <h2 className="text-white font-medium font-semibold mb-2 text-[35px]">Comece a explorar nossa plataforma hoje mesmo</h2>
        <p className="text-white mb-6 px-8 text-[25px]">
          Junte-se a comunidade de pesquisadores, estudantes e profissionais que já utilizam nosso acervo.
        </p>
        <Link
          href="/register"
          className="inline-block bg-[#CA9C60] text-[30px] hover:bg-[#c89038] text-[#0d3b49] font-medium py-3 px-6 rounded-xl transition-colors duration-300"
        >
          Criar conta gratuitamente
        </Link>
      </div>
    </footer>
  )
}

import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-[#0d3b49] py-12 px-4 text-center">
      <div className="container mx-auto max-w-3xl">
        <h2 className="text-white text-2xl font-medium mb-2">Comece a explorar nossa plataforma hoje mesmo</h2>
        <p className="text-white text-sm mb-6">
          Junte-se a milhares de pesquisadores, estudantes e profissionais que já utilizam nosso acervo.
        </p>
        <Link
          href="/cadastro"
          className="inline-block bg-[#d9a045] hover:bg-[#c89038] text-[#0d3b49] font-medium py-3 px-6 rounded-xl transition-colors"
        >
          Criar conta gratuitamente
        </Link>
      </div>
    </footer>
  )
}

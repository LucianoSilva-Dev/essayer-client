import QuoteCard from "./quote-card"

const repertoireData = [
  {
    type: "citação",
    title: "Jean Jacques Rousseau",
    content:
      "Lorem ipsum dolor sit amet. Qui iure iusto et dignissimos fugiat in vel sit qui reprehenderit omnis sed Aut in qui fugiat in vel dignissimos iusto consequatur expedita vel sit amet.",
    source: "Lorem ipsum omnis",
  },
  {
    type: "Artigo",
    title: "O Oriente contra Ocidente",
    content:
      "Lorem ipsum dolor sit amet. Qui iure iusto et dignissimos fugiat in vel sit qui reprehenderit omnis sed Aut in qui fugiat in vel dignissimos...",
    author: "Olavo de Carvalho",
    reference: "Lorem Ipsum",
    date: "01/03/2021",
  },
  {
    type: "Obra musical",
    title: "Perfeição",
    content:
      "Lorem ipsum dolor sit amet. Qui iure iusto et dignissimos fugiat in vel sit qui reprehenderit omnis sed Aut in qui fugiat in vel dignissimos iusto consequatur expedita vel sit amet...",
    author: "Legião urbana",
  },
  {
    type: "citação",
    title: "Jean Jacques Rousseau",
    content:
      "Lorem ipsum dolor sit amet. Qui iure iusto et dignissimos fugiat in vel sit qui reprehenderit omnis sed Aut in qui fugiat in vel dignissimos iusto consequatur expedita vel sit amet.",
    source: "Lorem ipsum omnis",
  },
]

export default function FeaturedRepertoires() {
  return (
    <section className="py-12 px-4 bg-[#F3F4F6]" id="repertorios">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-10 flex-column justify-center">
          <h2 className="text-[45px] font-bold mb-2">Repertórios em destaque</h2>
          <p className="text-[30px] text-gray-600 max-w-4xl justify-self-center">Alguns exemplos do conteúdo que você encontrará em nosso acervo</p>
        </div>

        <div className="grid grid-cols-1 gap-y-8 gap-x-16 md:grid-cols-2 max-w-3xl mx-auto">
          {repertoireData.map((item, index) => (
            <QuoteCard
              key={index}
              type={item.type}
              title={item.title}
              content={item.content}
              source={item.source}
              author={item.author}
              reference={item.reference}
              date={item.date}
            />
          ))}
        </div>

        <div className="mt-10 text-center">
          <button className="bg-[#075F70] hover:shadow-xl hover:bg-[#054c59] duration-200 text-white text-[24px] py-3 px-6 rounded-md transition-colors">
            Ver todos os repertórios
          </button>
        </div>
      </div>
    </section>
  )
}

import Hero from "../landing/inicio"
import { MainTopics } from "../landing/main-topics"
import Repertories from "../landing/featured-repertories"
import FAQ from "../landing/como-funciona"
import CTA from "../landing/sobre"
import Footer from "../landing/footer"
import { Header } from "../landing/header/header"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-white scroll-smooth">
      <Header />
      <main>
        <Hero />
        <MainTopics />
        <Repertories />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}

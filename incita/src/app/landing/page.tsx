import Hero from "../../../components/landing/inicio"
import { MainTopics } from "../../../components/landing/main-topics"
import Repertories from "../../../components/landing/featured-repertories"
import FAQ from "../../../components/landing/como-funciona"
import CTA from "../../../components/landing/sobre"
import Footer from "../../../components/landing/footer"
import { Header } from "../../../components/landing/header/header"

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

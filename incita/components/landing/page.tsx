import Hero from "../landing/inicio"
import MainTopics from "../landing/main-topics"
import Repertories from "./featured-repertories/featured-repertories"
import FAQ from "../landing/como-funciona"
import CTA from "../landing/sobre"
import Footer from "../landing/footer"
import { HeaderLanding } from "../landing/header/header"

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#F3F4F6] scroll-smooth">
      <HeaderLanding />
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

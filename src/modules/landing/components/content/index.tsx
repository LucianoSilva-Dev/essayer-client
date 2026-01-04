import Hero from "../starting"
import MainTopics from "../topics"
import Repertories from "../featured-repertories"
import FAQ from "../funcionamento"
import CTA from "../about"
import Footer from "../footer"
import { HeaderLanding } from "../header/header"

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

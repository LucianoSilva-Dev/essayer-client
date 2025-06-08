import LandingPage from "../../../components/landing/page"

export default function Landing() {
  return (
    //Esse "relative -top-[80px]" puxa a div pra cima, cobrindo o fundo do header, mas deixando um buraco no footer
    <div className="min-h-screen bg-white landing-page relative -top-[80px]">
     <LandingPage/>
    </div>
  )
}

import LandingPage from "../../modules/landing/components/content"

export const metadata = {
  title: 'Bem-vindos',
};

export default async function Landing() {
  // await new Promise(resolve => setTimeout(resolve, 1000)); //Simula um delay de 1 segundo
  return (
    //Esse "relative -top-[80px]" puxa a div pra cima, cobrindo o fundo do header, mas deixando um buraco no footer
    <div className="min-h-screen bg-white landing-page">
     <LandingPage/>
    </div>
  )
}

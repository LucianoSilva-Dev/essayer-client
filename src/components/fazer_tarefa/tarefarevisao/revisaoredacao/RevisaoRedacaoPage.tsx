"use client";

import React from "react";
import { Montserrat } from "next/font/google";
import RevisaoHeader from "./RevisaoHeader";
import TemaCard from "./TemaCard";
import TextoList from "./TextoList";
import Descricao from "./Descricao";
import DuracaoCard from "./DuracaoCard";
import PrazoCard from "./PrazoCard";

const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

// MOCKS ATUALIZADOS COM TEXTOS MAIORES
const MOCK_TAREFA = {
  titulo: "Título da tarefa aqui",
  usuario: { nome: "Nome" },
  tema: "Economia verde e responsabilidade ambiental do Estado",
  descricao: "Aqui será adicionado uma breve descrição feita pelo professor sobre a tarefa, explicando os objetivos principais e os pontos de atenção para o desenvolvimento do texto.",
  duracaoMinutos: 0, 
  prazo: {
    dataCompleta: "13 de Novembro às 14h00",
    semanaMock: [
      { dia: 12, semana: "Dom", ativo: false },
      { dia: 13, semana: "Seg", ativo: true },
      { dia: 14, semana: "Ter", ativo: false },
      { dia: 15, semana: "Qua", ativo: false },
      { dia: 16, semana: "Qui", ativo: false },
      { dia: 17, semana: "Sex", ativo: false },
      { dia: 18, semana: "Sáb", ativo: false },
    ]
  },
  textosMotivadores: [
    {
      id: 1,
      titulo: "Vidas Secas - Graciliano Ramos",
      tipo: "Obra",
      conteudo: "O romance Vidas Secas, publicado em 1938, retrata a vida de uma família de retirantes sertanejos obrigada a se deslocar de tempos em tempos para áreas menos castigadas pela seca. A obra expõe a miséria humana e social diante da hostilidade do meio, mostrando como a escassez molda a psicologia das personagens, reduzindo-as quase à condição animal na luta pela sobrevivência."
    },
    {
      id: 2,
      titulo: "Constituição Federal de 1988",
      tipo: "Artigo",
      conteudo: "Art. 225. Todos têm direito ao meio ambiente ecologicamente equilibrado, bem de uso comum do povo e essencial à sadia qualidade de vida, impondo-se ao Poder Público e à coletividade o dever de defendê-lo e preservá-lo para as presentes e futuras gerações. A responsabilidade ambiental não é apenas do Estado, mas de toda a sociedade."
    },
    {
      id: 3,
      titulo: "O Contrato Social - Rousseau",
      tipo: "Citação",
      conteudo: "O homem nasce livre, e por toda a parte encontra-se a ferros. Nesta obra fundamental, Jean-Jacques Rousseau discute a origem da desigualdade entre os homens e propõe o contrato social como uma forma de legitimar a liberdade civil, onde cada indivíduo abre mão de sua liberdade natural em favor da vontade geral para viver em sociedade."
    },
    {
      id: 4,
      titulo: "Modernidade Líquida",
      tipo: "Obra",
      conteudo: "Zygmunt Bauman explora a fragilidade dos laços humanos e a volatilidade das instituições no mundo contemporâneo. Na modernidade líquida, nada é feito para durar, as relações escorrem por entre os dedos e a insegurança torna-se a única constante, afetando diretamente como lidamos com responsabilidades coletivas e ambientais."
    },
    {
      id: 5,
      titulo: "Declaração Universal dos Direitos Humanos",
      tipo: "Artigo",
      conteudo: "Todos os seres humanos nascem livres e iguais em dignidade e direitos. São dotados de razão e consciência e devem agir em relação uns aos outros com espírito de fraternidade. Ninguém será submetido à tortura, nem a tratamento ou castigo cruel, desumano ou degradante, garantindo-se a proteção universal da pessoa humana."
    }
  ]
};

export default function RevisaoRedacaoPage({ tarefaId }: { tarefaId: string }) {
  return (
    <main className={`w-full min-h-screen pb-10 ${montserrat.className}`}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-6">
        
        <div className="mb-8">
          <RevisaoHeader 
            titulo={MOCK_TAREFA.titulo} 
            tarefaId={tarefaId} 
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          <div className="lg:col-span-7 flex flex-col gap-6">
            <TemaCard tema={MOCK_TAREFA.tema} />
            <TextoList textos={MOCK_TAREFA.textosMotivadores} />
          </div>

          <div className="lg:col-span-5 flex flex-col gap-6">
            <Descricao texto={MOCK_TAREFA.descricao} />
            <DuracaoCard minutos={MOCK_TAREFA.duracaoMinutos} />
            <PrazoCard 
              prazoTexto={MOCK_TAREFA.prazo.dataCompleta} 
              diasSemana={MOCK_TAREFA.prazo.semanaMock}
            />
          </div>

        </div>
      </div>
    </main>
  );
}
// src/components/fazer_tarefa/tarefarevisao/revisaoredacao/RevisaoRedacaoPage.tsx

import React from "react";
// 1. Importando a fonte
import { Montserrat } from "next/font/google";

import RevisaoHeader from "./RevisaoHeader";
import TemaCard from "./TemaCard";
import TextoList from "./TextoList";
import Descricao from "./Descricao";
import DuracaoCard from "./DuracaoCard";
import PrazoCard from "./PrazoCard";

// 2. Configurando a fonte
const montserrat = Montserrat({ 
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"], // Importando pesos variados
});

const MOCK_TAREFA = {
  // ... seus dados mockados (mantidos iguais)
  titulo: "Título da tarefa aqui",
  usuario: { nome: "Nome" },
  tema: "Economia verde e responsabilidade ambiental do Estado",
  descricao: "Aqui será adicionado uma breve descrição feita pelo professor sobre a tarefa.",
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
      conteudo: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam."
    },
    {
      id: 2,
      titulo: "Constituição Federal de 1988",
      tipo: "Artigo",
      conteudo: "Art. 225. Todos têm direito ao meio ambiente ecologicamente equilibrado, bem de uso comum do povo e essencial à sadia qualidade de vida."
    },
    {
      id: 3,
      titulo: "O Contrato Social",
      tipo: "Citação",
      conteudo: "O homem nasce livre, e por toda a parte encontra-se a ferros. Jean-Jacques Rousseau discute a liberdade e a responsabilidade do Estado."
    },
    {
      id: 4,
      titulo: "Modernidade Líquida",
      tipo: "Obra",
      conteudo: "Zygmunt Bauman explora a fragilidade dos laços humanos e a volatilidade das instituições no mundo contemporâneo."
    },
    {
      id: 5,
      titulo: "Declaração Universal dos Direitos Humanos",
      tipo: "Artigo",
      conteudo: "Todos os seres humanos nascem livres e iguais em dignidade e direitos. São dotados de razão e consciência."
    }
  ]
};

export default function RevisaoRedacaoPage({ tarefaId }: { tarefaId: string }) {
  return (
    // 3. Aplicando a classe da fonte na tag main
    <main className={`w-full min-h-screen bg-[#F2F2F2] pb-10 ${montserrat.className}`}>
      <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-6">
        
            <div className="mb-8">
            {/* PASSE A PROP AQUI */}
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
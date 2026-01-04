// src/components/faq/FaqPageContent.tsx
"use client";
import { useState } from "react";
import { TabsAssuntos } from "../tab-assuntos";
import { TituloEDescricao } from "../tittle";
import { FaqList } from "../list";

// Dados do FAQ (4 por assunto)
const dadosFaq = {
  "Sobre a plataforma": [
    {
      pergunta: "O que é a plataforma Incita?",
      resposta:
        "A Incita é uma plataforma digital focada em repertórios para redação. Nosso objetivo é democratizar o acesso a conteúdos de qualidade, como citações e dados, para auxiliar estudantes, especialmente os de periferia, na preparação para o vestibular.",
    },
    {
      pergunta: "Qual o significado do nome e da logo 'Incita'?",
      resposta:
        "O nome 'Incita' é inspirado no verbo 'incitar', que significa estimular e motivar. A logo, uma caneta em chamas, representa o poder da escrita (a caneta) e a energia e paixão do conhecimento (as chamas).",
    },
    {
      pergunta: "A quem se destina a plataforma?",
      resposta:
        "A plataforma é direcionada principalmente a vestibulandos de baixa renda e estudantes de periferia que enfrentam desafios no acesso a materiais de estudo de qualidade para redação.",
    },
    {
      pergunta: "Qual é a missão da Incita?",
      resposta:
        "Nossa missão é democratizar o acesso a repertórios qualificados sobre questões sociais fundamentais.",
    },
  ],
  Repertórios: [
    {
      pergunta: "Que tipos de repertório posso encontrar?",
      resposta:
        "A plataforma organiza os repertórios em três tipos principais: 'Citação' (frases de autores), 'Artigo' (textos mais extensos com resumos) e 'Obra' (referências culturais como livros, filmes e músicas).",
    },
    {
      pergunta: "Como posso pesquisar por repertórios?",
      resposta:
        "Você pode explorar os 'Eixos Temáticos' (como Saúde e Ciência ou Questões Sociais), ver os 'Repertórios em destaque', ou usar a página de 'Filtros de pesquisa' para refinar sua busca por tipo, tags ou categorias.",
    },
    {
      pergunta: "Posso salvar os repertórios que mais gostei?",
      resposta:
        "Sim! Usuários logados podem favoritar citações. Há uma tela específica, 'Suas Citações Favoritas', onde você pode visualizar e pesquisar apenas os conteúdos que marcou.",
    },
    {
      pergunta: "É possível adicionar novos repertórios na plataforma?",
      resposta:
        "Sim, a plataforma é colaborativa. Professores podem usar a tela 'Adicionar Repertório' (ou 'Adicionar Nova Citação') para enviar conteúdos, preenchendo campos como autor, conteúdo e fonte, que serão revisados.",
    },
  ],
  Turmas: [
    {
      pergunta: "O que é a funcionalidade 'Turmas'?",
      resposta:
        "\"Turmas\" é um ambiente interativo onde professores podem criar tarefas, propor temas de redação com prazos definidos e acompanhar o progresso dos alunos.",
    },
    {
      pergunta: "Como faço para entrar em uma turma?",
      resposta:
        "Para entrar, você precisa do 'código de convite' da turma. Este código é fornecido pelo professor responsável. Com ele, basta ir à tela 'Entre em uma turma!' e solicitar sua entrada.",
    },
    {
      pergunta: "Sou aluno. Onde vejo as tarefas da minha turma?",
      resposta:
        "Após entrar em uma turma, você terá acesso às tarefas criadas pelo professor. O painel de aluno mostra 'Tarefas ativas' e um 'Histórico de tarefas'.",
    },
    {
      pergunta: "Minha solicitação para entrar na turma é aprovada na hora?",
      resposta:
        "Não, quando você solicita a entrada, seu pedido fica pendente. O professor criador da turma precisa revisar e aprovar manualmente sua solicitação.",
    },
  ],
  Educadores: [
    {
      pergunta: "Sou professor. Como posso usar a plataforma?",
      resposta:
        "Educadores (professores) podem criar 'Turmas' para gerenciar seus alunos, criar tarefas de redação e acompanhar o progresso deles. Além disso, podem contribuir com o acervo da plataforma adicionando novos repertórios.",
    },
    {
      pergunta: "Como um usuário se torna um 'Educador'?",
      resposta:
        "Um usuário pode solicitar para se tornar um colaborador (professor) enviando uma requisição. Essa solicitação é revisada por um administrador, que pode aprovar ou recusar o pedido.",
    },
    {
      pergunta: "Como eu crio uma turma?",
      resposta:
        "Na área de turmas, professores têm a opção de 'Criar Turma'. Você precisará definir um nome e, opcionalmente, uma descrição ou escola.",
    },
    {
      pergunta: "Onde eu gerencio os alunos que pediram para entrar na minha turma?",
      resposta:
        "O painel do professor possui abas para gerenciar 'Requisições pendentes', 'Autorizados' e 'Recusados'. Lá, o professor pode aprovar ou recusar os pedidos de entrada.",
    },
  ],
  "Praticar Redação": [
    {
      pergunta: "O que é a funcionalidade 'Praticar Redação'?",
      resposta:
        "É uma ferramenta de estudo autodidata disponível para todos os usuários. Ela permite que você pratique sua escrita com temas (inclusive aleatórios) e use um cronômetro para simular o tempo de prova.",
    },
    {
      pergunta: "Quem corrige minha redação nessa modalidade?",
      resposta:
        "Ao finalizar a redação, ela é enviada para correção automática da nossa Inteligência Artificial, que fornece um feedback para você aprimorar suas habilidades.",
    },
    {
      pergunta: "Preciso ser aluno de alguma turma para praticar?",
      resposta:
        "Não. A funcionalidade é autodidata e independente. Qualquer usuário cadastrado, seja estudante ou educador, pode utilizá-la a qualquer momento para treinar.",
    },
    {
      pergunta: "'Praticar Redação' é o mesmo que as 'Tarefas' das turmas?",
      resposta:
        "Não. As 'Tarefas' são criadas por professores para alunos específicos de uma turma, com prazos definidos. O 'Praticar Redação' é um treino livre, autodidata, que usa temas aleatórios e correção por IA, disponível para qualquer usuário.",
    },
  ],
} as const; // O 'as const' ajuda o TypeScript a entender as chaves

type Assunto = keyof typeof dadosFaq;

export function FaqPageContent() {
  const [ativo, setAtivo] = useState<Assunto>("Sobre a plataforma");

  return (
    <div className="p-10 bg-gray-50 rounded-2xl w-full">
      {/* 1. Título */}
      <TituloEDescricao />

      {/* 2. Container */}
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 mt-12">
        {/* Coluna da Esquerda (Tabs) */}
        <div className="w-full md:w-1/4">
          <TabsAssuntos
            assuntos={Object.keys(dadosFaq) as Assunto[]}
            ativo={ativo}
            onSelect={setAtivo}
          />
        </div>

        {/* Coluna da Direita (Perguntas) */}
        <div className="w-full md:w-3/4">
          <FaqList
            key={ativo} /* <-- ADICIONE ESTA LINHA */
            perguntas={dadosFaq[ativo]}
          />
        </div>
      </div>
    </div>
  );
}
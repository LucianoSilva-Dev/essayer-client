export const EixoOptions = [
  {
    nome: "Meio Ambiente",
    icon: 'iconMeioAmb.svg',
    recortes: [
      "Desmatamento",
      "Queimadas",
      "Crise hídrica",
      "Poluição marinha",
      "Preservação ambiental",
      "Agricultura sustentável",
      "Urbanização",
      "Ecoturismo",
    ],
  },
  {
    nome: "Questões Sociais",
    icon: 'sociais.svg',
    recortes: [
      "Racismo",
      "Violência",
      "População de rua",
      "Trabalho infantil",
      "Abandono",
      "Moradia periférica",
      "Acesso à cultura",
    ],
  },
  {
    nome: "Saúde e Ciência",
    icon: 'saudeIcon.svg',
    recortes: [
      "Saúde mental",
      "Negacionismo",
      "SUS",
      "Gravidez na adolescência",
      "Pandemias",
      "Drogas",
      "Ética científica",
    ],
  },
  {
    nome: "Direitos e Cidadania",
    icon: 'iconDireito.svg',
    recortes: [
      "Direito ao voto",
      "Criminalização da pobreza",
      "Minorias",
      "Intolerância religiosa",
      "Discurso de ódio",
      "PCD",
      "Igualdade de gênero",
    ],
  },
  {
    nome: "Educação",
    icon: 'educacaoIcon.svg',
    recortes: [
      "Inclusão escolar",
      "Desigualdade na educação",
      "Alfabetização infantil",
      "Cotas",
      "Valorização do professor",
      "Ensino técnico",
    ],
  },
  {
    nome: "Tecnologia",
    icon: 'techIcon.svg',
    recortes: [
      "Cibersegurança",
      "IA",
      "Privacidade na internet",
      "Dependência tecnológica",
      "Inclusão digital",
      "Streaming",
      "Fake news",
      "Deep Fake",
    ],
  },
  {
    nome: "Economia",
    icon: 'EconomiaIcon.svg',
    recortes: [
      "Empreendedorismo",
      "Desemprego",
      "Economia criativa",
      "Desigualdade econômica",
      "Distribuição de renda",
      "Trabalho informal",
      "Inflação",
      "Justiça fiscal",
      "investimentos",
    ],
  },
  {
    nome: "Arte e Cultura",
    icon: 'iconArte.svg',
    recortes: [
      "Cultura periférica",
      "Valorização da arte",
      "Línguas indígenas",
      "Liberdade artística",
      "Arte na educação",
      "Festivais culturais",
      "Arte nas redes",
    ],
  },
] as const;

export const EixosTematicos = EixoOptions.reduce((acc, curr) => {
  acc[curr.nome] = curr.recortes;
  return acc;
}, {} as Record<string, readonly string[]>);
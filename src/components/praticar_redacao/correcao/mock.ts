import { Correcao } from '@/types/correcao'

export const mockCorrecao: Correcao = {
  id: 'redacao-123',
  textoRedacao:
    'Na contemporaneidade, as redes sociais tornaram-se parte essencial da vida cotidiana, especialmente entre os jovens. Essa onipresença digital levanta questões cruciais sobre seu impacto na formação da identidade e nas interações sociais. Se por um lado a conectividade global é facilitada, por outro, a exposição constante a padrões irreais e a cultura do cancelamento geram ansiedade e superficialidade nas relações. É imperativo, portanto, debater como podemos usufruir dos benefícios tecnológicos sem negligenciar o desenvolvimento de habilidades socioemocionais robustas e um senso crítico apurado.',
  notaTotal: 1000,
  totalCorrecoes: 3,
  competencias: [
    {
      id: 'c1',
      nome: 'Competência 1',
      descricao: 'Domínio da norma padrão da língua portuguesa',
      nota: 200,
      notaMaxima: 200,
      analiseIA:
        'O texto mantém o registro formal e demonstra domínio sólido da norma padrão. A pontuação, ortografia e concordância estão corretas. O vocabulário é adequado ao contexto dissertativo e apresenta variedade lexical ("autopercepção", "uniformizar identidades", "autenticidade"). \n\npoderia haver uma construção mais simples em um ou dois trechos para garantir ainda mais fluidez ao leitor médio do ENEM.',
    },
    {
      id: 'c2',
      nome: 'Competência 2',
      descricao: 'Compreensão do tema e aplicação de repertório',
      nota: 200,
      notaMaxima: 200,
      analiseIA:
        'A análise da Competência 2 mostra que o tema foi perfeitamente compreendido. O uso de repertório sociocultural é pertinente e bem articulado com a tese, demonstrando leitura crítica e capacidade de relacionar conceitos de forma produtiva.',
    },
    {
      id: 'c3',
      nome: 'Competência 3',
      descricao: 'Seleção e organização de argumentos',
      nota: 200,
      notaMaxima: 200,
      analiseIA:
        'Os argumentos estão bem selecionados e organizados de forma lógica. A progressão textual é clara e coesa, defendendo o ponto de vista com eficácia. Não há falhas na argumentação ou contradições internas.',
    },
    {
      id: 'c4',
      nome: 'Competência 4',
      descricao: 'Coesão e Coerência',
      nota: 200,
      notaMaxima: 200,
      analiseIA:
        'A coesão textual é excelente, com uso variado de conectivos e operadores argumentativos. A coerência é mantida ao longo de todo o texto, garantindo uma leitura fluida e sem ambiguidades.',
    },
    {
      id: 'c5',
      nome: 'Competência 5',
      descricao: 'Proposta de Intervenção',
      nota: 200,
      notaMaxima: 200,
      analiseIA:
        'A proposta de intervenção é completa, apresentando agente, ação, modo/meio, efeito e detalhamento. As soluções são viáveis e respeitam os direitos humanos, fechando o texto de forma coesa com a argumentação desenvolvida.',
    },
  ],
}
import { CorrecaoIA, RedacaoLivreDoc } from '@/lib/apiCalls/redacao-livre/types'

export const mockCorrecaoProfessor: CorrecaoIA = {
    id: 'prof-correcao-1',
    tema: 'O impacto das redes sociais na juventude brasileira',
    status: 'finalizada',
    createdAt: new Date(),
    texto: 'Na contemporaneidade, as redes sociais tornaram-se parte essencial da vida cotidiana, especialmente entre os jovens. No entanto, o uso excessivo dessas plataformas tem gerado debates sobre seus impactos na saúde mental e na formação da identidade.\n\nEm primeiro lugar, é notável como a busca por validação online afeta a autoestima. Likes e comentários tornaram-se moedas de troca social, criando uma dependência emocional que pode levar à ansiedade e depressão quando as expectativas não são atendidas.\n\nAlém disso, a disseminação de informações falsas e o cyberbullying são problemas graves que necessitam de atenção. A facilidade de anonimato na rede encoraja comportamentos agressivos que, muitas vezes, não ocorreriam no mundo físico.\n\nPortanto, é fundamental que escolas e famílias atuem em conjunto para promover o uso consciente das redes sociais. A educação digital deve ser inserida no currículo escolar, orientando os jovens sobre os riscos e a importância de manter um equilíbrio saudável entre a vida online e offline.',
    notaC1: 160,
    notaC2: 180,
    notaC3: 160,
    notaC4: 180,
    notaC5: 160,
    feedbackC1: "O texto apresenta bom domínio da norma padrão, com poucos desvios. Atenção à crase e concordância em alguns trechos específicos.",
    feedbackC2: "Boa compreensão do tema. O repertório sociocultural poderia ser mais diversificado, citando autores ou dados estatísticos para fortalecer a argumentação.",
    feedbackC3: "Argumentos bem selecionados, mas a organização poderia ser melhorada para garantir uma progressão mais fluida das ideias.",
    feedbackC4: "Bom uso de conectivos, garantindo a coesão do texto. Alguns parágrafos poderiam ser melhor articulados entre si.",
    feedbackC5: "Proposta de intervenção completa, com agente, ação, meio/modo e finalidade bem definidos. Detalhar um pouco mais o meio de execução."
}

export const mockRedacaoComCorrecaoProfessor: RedacaoLivreDoc = {
    id: 'redacao-123',
    tema: 'O impacto das redes sociais na juventude brasileira',
    texto: mockCorrecaoProfessor.texto || "",
    correcoesIA: [mockCorrecaoProfessor],
    finalizada: true,
    updatedAt: new Date()
}

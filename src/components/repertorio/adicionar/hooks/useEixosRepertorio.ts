"use client";

import { useState, useEffect } from 'react';
import { Eixo } from './useAdicionarRepertorio';

interface UseEixosRepertorioProps {
  dadosIniciais: {
    eixosSelecionados: Eixo[];
    recortesSelecionados: string[];
  };
  onAvancar: (dados: { eixosSelecionados: Eixo[]; recortesSelecionados: string[] }) => void;
  onVoltar: () => void;
}

export interface UseEixosRepertorioReturn {
  eixos: Eixo[];
  eixoExpandido: Eixo | null;
  eixosSelecionados: string[];
  recortesSelecionados: string[];
  expandirEixo: (eixo: Eixo) => void;
  recolherEixo: () => void;
  toggleRecorte: (recorte: string, eixoId: string) => void;
  desselecionarEixo: (eixoId: string) => void;
  avancarParaDetalhes: () => void;
  voltarParaTipos: () => void;
}

// Dados mockados
const eixosMock: Eixo[] = [
  {
    id: 'ambiente1',
    nome: 'Meio ambiente',
    descricao: 'Questões ambientais e seus impactos na sociedade, no planeta e nas futuras gerações.',
    icone: '<Leaf className="h-6 w-6 text-[#2a9d8f]" />',
    recortes: ['Desmatamento', 'Queimadas', 'Crise Hídrica', 'Poluição Marinha', 'Preservação ambiental', 'Arquitetura Sustentável',  'Urbanização', 'Ecoturismo'],
  },
  {
    id: 'social1',
    nome: 'Questões sociais',
    descricao: 'Desafios sociais como desigualdade, violência, inclusão e discriminação nas relações humanas.',
    icone: '<Brain className="h-6 w-6 text-[#2a9d8f]" />',
    recortes: ['Racismo', 'Abandono', 'Violência', 'Trabalho infantil', 'População de rua', 'Acesso à Cultura',  'Moradia Periférica'],
  },
  {
    id: 'ciencia1',
    nome: 'Saúde e ciência',
    descricao: 'Temas relacionados à saúde pública, avanços científicos e bem-estar físico e mental.',
    icone: '<HeartPulse className="h-6 w-6 text-[#2a9d8f]" />',
    recortes: ['Negacionismo', 'SUS', 'Saúde mental', 'Pandemias', 'Drogas', 'Gravidez na adolescência', 'Ética Científica'],
  },
  {
    id: 'cultura1',
    nome: 'Arte e cultura',
    descricao: 'Exploração da diversidade cultural, identidade, expressões artísticas e patrimônio histórico.',
    icone: '<Palette className="h-6 w-6 text-[#2a9d8f]" />',
    recortes: ['Cultura periférica', 'Liberdade artística', 'Festivais Culturais', 'Linguas Indigenas', 'Arte na Educação', 'Arte nas redes'],
  },
  {
    id: 'cidadania1',
    nome: 'Direitos e cidadania',
    descricao: 'Participação social, direitos fundamentais, democracia e políticas públicas para o bem-estar coletivo.',
    icone: '<Scale className="h-6 w-6 text-[#2a9d8f]" />',
    recortes: ['Discurso de Ódio', 'Intolerância Religiosa', 'Igualdade de gênero', 'Criminalização da pobreza', 'Minorias', 'Direito ao voto', 'PCD', 'Igualdade de Gênero'],
  },
  {
    id: 'educacao1',
    nome: 'Educação',
    descricao: 'Discussões sobre acesso à educação, qualidade do ensino, inclusão e papel da escola na sociedade.',
    icone: '<BookOpen className="h-6 w-6 text-[#2a9d8f]" />',
    recortes: ['Cotas', 'Inclusão Escolar', 'Alfabetização Infantil', 'Valorização do Professor', 'Ensino Técnico', 'Desigualdade na Educação'],
  },
  {
    id: 'tecnologia1',
    nome: 'Tecnologia',
    descricao: 'Impactos da tecnologia na vida cotidiana, educação, trabalho, privacidade e relações sociais.',
    icone: '<Cpu className="h-6 w-6 text-[#2a9d8f]" />',
    recortes: ['Privacidade na internet', 'Dependência Tecnológica', 'Fake News', 'Deep Fake', 'Cibersegurança', 'I.A.', 'Inclusão Digital', 'Streaming'],
  },
  {
    id: 'economia1',
    nome: 'Economia',
    descricao: 'Dinâmicas econômicas, consumo, globalização, desigualdade de renda e seus reflexos sociais.',
    icone: '<BarChart3 className="h-6 w-6 text-[#2a9d8f]" />',
    recortes: ['Empreendedorismo', 'Desemprego', 'Inflação', 'Desigualdade de renda', 'Justiça Fiscal', 'Investimentos', 'Economia Criativa', 'Distribuição de Renda'],
  },
];

export const useEixosRepertorio = ({ 
  dadosIniciais, 
  onAvancar, 
  onVoltar 
}: UseEixosRepertorioProps): UseEixosRepertorioReturn => {
  const [eixoExpandido, setEixoExpandido] = useState<Eixo | null>(null);
  const [eixosSelecionados, setEixosSelecionados] = useState<string[]>(
    dadosIniciais.eixosSelecionados.map(e => e.id)
  );
  const [recortesSelecionados, setRecortesSelecionados] = useState<string[]>(
    dadosIniciais.recortesSelecionados
  );
  const [animacaoEntrada, setAnimacaoEntrada] = useState(false);

  // Animação de entrada
  useEffect(() => {
    setAnimacaoEntrada(true);
  }, []);

  const expandirEixo = (eixo: Eixo) => {
    setEixoExpandido(eixo);
  };

  const recolherEixo = () => {
    setEixoExpandido(null);
  };

  const toggleRecorte = (recorte: string, eixoId: string) => {
    setRecortesSelecionados(prev => {
      const novosRecortes = prev.includes(recorte) 
        ? prev.filter(r => r !== recorte)
        : [...prev, recorte];
      
      // Atualizar eixos selecionados baseado nos recortes
      const eixosComRecortes = eixosMock.filter(eixo =>
        eixo.recortes.some(r => novosRecortes.includes(r))
      ).map(e => e.id);
      
      setEixosSelecionados(eixosComRecortes);
      
      return novosRecortes;
    });
  };

  const desselecionarEixo = (eixoId: string) => {
    const eixo = eixosMock.find(e => e.id === eixoId);
    if (eixo) {
      // Remove todos os recortes deste eixo
      setRecortesSelecionados(prev => 
        prev.filter(recorte => !eixo.recortes.includes(recorte))
      );
      // Remove o eixo da lista de selecionados
      setEixosSelecionados(prev => prev.filter(id => id !== eixoId));
    }
  };

  const avancarParaDetalhes = () => {
  if (eixosSelecionados.length === 0 || recortesSelecionados.length === 0) {
    alert('Selecione pelo menos um eixo e um recorte');
    return;
  }

  const eixosCompletos = eixosMock.filter(eixo => eixosSelecionados.includes(eixo.id));
  
  // Chamar o callback para avançar
  onAvancar({
    eixosSelecionados: eixosCompletos,
    recortesSelecionados
  });
};

  const voltarParaTipos = () => {
    onVoltar();
  };

  return {
    eixos: eixosMock,
    eixoExpandido,
    eixosSelecionados,
    recortesSelecionados,
    expandirEixo,
    recolherEixo,
    toggleRecorte,
    desselecionarEixo,
    avancarParaDetalhes,
    voltarParaTipos
  };
};


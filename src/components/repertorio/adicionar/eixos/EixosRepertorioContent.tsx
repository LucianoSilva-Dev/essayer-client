// EixosRepertorioContent.tsx
"use client";

import React, { useEffect, useState } from 'react';
import { EixoCard } from './EixoCard';
import { Eixo, useAddRepertorio } from '@/contexts/add-repertorio-context';
import { useRouter } from 'next/navigation';

const eixos: Eixo[] = [
  {
    id: 'ambiente1',
    nome: 'Meio ambiente',
    descricao: 'Questões ambientais e seus impactos na sociedade, no planeta e nas futuras gerações.',
    icone: '<Leaf className="h-6 w-6 text-[#2a9d8f]" />',
    recortes: ['Desmatamento', 'Queimadas', 'Crise Hídrica', 'Poluição Marinha', 'Preservação ambiental', 'Arquitetura Sustentável', 'Urbanização', 'Ecoturismo'],
  },
  {
    id: 'social1',
    nome: 'Questões sociais',
    descricao: 'Desafios sociais como desigualdade, violência, inclusão e discriminação nas relações humanas.',
    icone: '<Brain className="h-6 w-6 text-[#2a9d8f]" />',
    recortes: ['Racismo', 'Abandono', 'Violência', 'Trabalho infantil', 'População de rua', 'Acesso à Cultura', 'Moradia Periférica'],
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

export default function EixosRepertorioContent() {
  const { tipoRepertorio, tipoObra } = useAddRepertorio()
  const [eixoExpandido, setEixoExpandido] = useState<Eixo | null>(null);
  const { eixosSalvos, recortes, setEixos } = useAddRepertorio();
  const router = useRouter()

  const [eixosSelecionados, setEixosSelecionados] = useState<string[]>(
    eixosSalvos.map(e => e.id)
  );
  const [recortesSelecionados, setRecortesSelecionados] = useState<string[]>(recortes);

  const toggleRecorte = (recorte: string) => {
    setRecortesSelecionados(prev => {
      const novosRecortes = prev.includes(recorte)
        ? prev.filter(r => r !== recorte)
        : [...prev, recorte];

      // Atualizar eixos selecionados baseado nos recortes
      const eixosComRecortes = eixos.filter(eixo =>
        eixo.recortes.some(r => novosRecortes.includes(r))
      ).map(e => e.id);

      setEixosSelecionados(eixosComRecortes);

      return novosRecortes;
    });
  };

  const desselecionarEixo = (eixoId: string) => {
    const eixo = eixos.find(e => e.id === eixoId);
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

    const eixosCompletos = eixos.filter(eixo => eixosSelecionados.includes(eixo.id));

    setEixos(eixosCompletos, recortesSelecionados);
    router.push(`/adicionar/detalhes`);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        eixoExpandido &&
        !(event.target as Element).closest('.eixo-card-expandido')
      ) {
        setEixoExpandido(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [eixoExpandido]);

  return (
    <main className="min-h-[calc(100vh-64px)] bg-gray-50 py-8">
      <div className="container mx-auto px-4">

        {/* Header com animação de entrada */}
        <div className="mb-8 animate-in slide-in-from-top duration-500">
          <h1 className="text-2xl font-medium text-gray-800 mb-2">
            Selecione um eixo temático para ver os recortes relacionados
          </h1>
          <div className="text-gray-600">
            Criando {tipoRepertorio} {tipoObra && `- ${tipoObra}`}
          </div>
        </div>

        {/* Container dos cartões de eixos */}
        <div
          className="relative max-w-[1168px] mx-auto"
          style={{
            height: 'calc(4 * 260px)'
          }}
        >
          {eixos.map((eixo, index) => (
            <EixoCard
              key={eixo.id}
              eixo={eixo}
              expandido={eixoExpandido?.id === eixo.id}
              selecionado={eixosSelecionados.includes(eixo.id)}
              recortesSelecionados={recortesSelecionados}
              onExpandir={() => setEixoExpandido(eixo)}
              onRecolher={() => setEixoExpandido(null)}
              onToggleRecorte={(recorte) => toggleRecorte(recorte)}
              onDesselecionar={() => desselecionarEixo(eixo.id)}
              index={index}
            />
          ))}
        </div>

        {/* Botão Avançar */}
        <div className="fixed bottom-8 right-8 animate-in fade-in duration-500 delay-1000 z-20">
          <button
            onClick={avancarParaDetalhes}
            disabled={eixosSelecionados.length === 0 || recortesSelecionados.length === 0}
            className={`
              px-8 py-4 rounded-2xl font-medium text-lg transition-all duration-300
              ${eixosSelecionados.length > 0 && recortesSelecionados.length > 0
                ? 'bg-[#075F70] text-white hover:bg-[#064c58] shadow-lg hover:shadow-xl'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }
            `}
            style={{
              fontFamily: 'Montserrat'
            }}
          >
            Avançar
          </button>
        </div>

        {/* Debug */}
        {/* <div className="fixed bottom-4 left-4 bg-black text-white p-2 rounded text-sm">
          <div>Eixos: {eixosSelecionados.length}</div>
          <div>Recortes: {recortesSelecionados.length}</div>
        </div> */}
      </div>
    </main>
  );
}
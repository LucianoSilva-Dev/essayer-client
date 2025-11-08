"use client";

import React from 'react';
import { useAdicionarRepertorio } from '../hooks/useAdicionarRepertorio';
import { useDetalhesRepertorio } from '../hooks/useDetalhesRepertorio';
import { HeaderDetalhes } from './components/HeaderDetalhes';
import { SinteseSection } from './components/SinteseSection';
import { EixosSelecionados } from './components/EixosSelecionados';
import { ComentarioEducador } from './components/ComentarioEducador';

export default function DetalhesRepertorioContent() {
  const { dados: dadosCompletos, voltarEtapa } = useAdicionarRepertorio();

  const {
    dados,
    atualizarDados,
    publicarRepertorio,
    voltarParaEixos
  } = useDetalhesRepertorio({
    dadosIniciais: {
      tipoRepertorio: dadosCompletos.tipoRepertorio || 'artigo',
      tipoObra: dadosCompletos.tipoObra || undefined,
      eixosSelecionados: dadosCompletos.eixosSelecionados,
      recortesSelecionados: dadosCompletos.recortesSelecionados,
      titulo: dadosCompletos.titulo,
      autoria: dadosCompletos.autoria,
      sintese: dadosCompletos.sintese,
      comentarioEducador: dadosCompletos.comentarioEducador,
      fixarComentario: dadosCompletos.fixarComentario
    },
    onPublicar: async (dadosDetalhes) => {
      // Aqui você implementaria a lógica de publicação
      console.log('Publicando repertório:', dadosDetalhes);
      // Exemplo: await api.publicarRepertorio({ ...dadosCompletos, ...dadosDetalhes });
    },
    onVoltar: voltarEtapa
  });

  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Container principal */}
        <div className="max-w-[1208px] mx-auto space-y-8 animate-in fade-in duration-500">
          <div className='bg-[#E8E8E8] rounded-[88px] p-12'>
            {/* Header do repertório */}
            <HeaderDetalhes
              tipoRepertorio={dadosCompletos.tipoRepertorio || 'artigo'}
              tipoObra={dadosCompletos.tipoObra || undefined}
              titulo={dados.titulo}
              autoria={dados.autoria}
              onTituloChange={(titulo) => atualizarDados({ titulo })}
              onAutoriaChange={(autoria) => atualizarDados({ autoria })}
            />

            {/* Seção de síntese */}
            <SinteseSection
              sintese={dados.sintese}
              onSinteseChange={(sintese) => atualizarDados({ sintese })}
              tipoRepertorio={dadosCompletos.tipoRepertorio || 'artigo'}
            />

            {/* Eixos selecionados */}
            <EixosSelecionados
              eixosSelecionados={dadosCompletos.eixosSelecionados}
              recortesSelecionados={dadosCompletos.recortesSelecionados}
            />
          </div>
          {/* Comentário do educador */}
          <ComentarioEducador
            comentario={dados.comentarioEducador}
            fixarComentario={dados.fixarComentario}
            onComentarioChange={(comentarioEducador) => atualizarDados({ comentarioEducador })}
            onFixarChange={(fixarComentario) => atualizarDados({ fixarComentario })}
          />

          {/* Botão publicar */}
          <div className="flex justify-center">
            <button
              onClick={publicarRepertorio}
              className="px-12 py-4 bg-[#898787] bg-opacity-80 rounded-[34px] hover:bg-opacity-100 transition-all duration-300 hover:scale-105"
            >
              <span
                className="text-[#3C3C3C] font-semibold text-2xl"
                style={{ fontFamily: 'Montserrat' }}
              >
                Publicar repertório
              </span>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
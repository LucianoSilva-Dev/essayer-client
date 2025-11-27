"use client";

import React, { useState } from 'react';
import { HeaderDetalhes } from './components/HeaderDetalhes';
import { SinteseSection } from './components/SinteseSection';
import { EixosSelecionados } from './components/EixosSelecionados';
import { ComentarioEducador } from './components/ComentarioEducador';
import { DetalhesRepertorioData, useAddRepertorio } from '@/contexts/add-repertorio-context';
import { addComentario, createArtigo, createCitacao, createObra } from '@/apiCalls/repertorio';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';

export default function DetalhesRepertorioContent() {
  const {
    tipoRepertorio,
    tipoObra,
    eixosSalvos,
    recortes,
    titulo,
    autoria,
    sintese,
    comentarioEducador,
    fixarComentario
  } = useAddRepertorio();

  const router = useRouter();

  const [dados, setDados] = useState<DetalhesRepertorioData>({
    tipoRepertorio: tipoRepertorio || undefined,
    tipoObra: tipoObra || undefined,
    eixosSelecionados: eixosSalvos,
    recortesSelecionados: recortes,
    titulo,
    autoria,
    sintese,
    comentarioEducador,
    fixarComentario
  });

  const atualizarDados = (novosDados: Partial<DetalhesRepertorioData>) => {
    setDados(prev => ({ ...prev, ...novosDados }));
  };

  const validarDados = () => {
    switch (dados.tipoRepertorio) {
      case 'artigo':
        if (!dados.titulo.trim()) return { valido: false, mensagem: 'Título é obrigatório para artigos' };
        if (!dados.autoria.trim()) return { valido: false, mensagem: 'Autoria é obrigatória para artigos' };
        if (!dados.sintese.trim()) return { valido: false, mensagem: 'Síntese é obrigatória para artigos' };
        break;
      case 'obra':
        if (!dados.titulo.trim()) return { valido: false, mensagem: 'Título é obrigatório para obras' };
        if (!dados.autoria.trim()) return { valido: false, mensagem: 'Autoria é obrigatória para obras' };
        if (!dados.sintese.trim()) return { valido: false, mensagem: 'Sinopse é obrigatória para obras' };
        break;
      case 'citacao':
        if (!dados.autoria.trim()) return { valido: false, mensagem: 'Autoria é obrigatória para citações' };
        if (!dados.sintese.trim()) return { valido: false, mensagem: 'Citação é obrigatória' };
        break;
    }
    return { valido: true, mensagem: '' };
  };

  const publicarRepertorio = async () => {
    try {
      const validacao = validarDados();
      if (!validacao.valido) {
        toast.error(validacao.mensagem);
        return;
      }

      let idRepertorio = '';

      switch (dados.tipoRepertorio) {
        case 'artigo':
          const repArtigo = await createArtigo({
            titulo: dados.titulo,
            resumo: dados.sintese,
            autor: dados.autoria,
            topicos: (dados.eixosSelecionados || []).map(eixo => eixo.nome),
            subtopicos: dados.recortesSelecionados || []
          });
          idRepertorio = repArtigo.id;
          break;
        
        case 'obra':
          const repObra = await createObra({
            titulo: dados.titulo,
            sinopse: dados.sintese,
            autor: dados.autoria,
            tipoObra: dados.tipoObra || 'livro',
            topicos: (dados.eixosSelecionados || []).map(eixo => eixo.nome),
            subtopicos: dados.recortesSelecionados || []
          });
          idRepertorio = repObra.id;
          break;
        
        case 'citacao':
          const repCitacao = await createCitacao({
            frase: dados.sintese,
            autor: dados.autoria,
            fonte: dados.titulo,
            topicos: (dados.eixosSelecionados || []).map(eixo => eixo.nome),
            subtopicos: dados.recortesSelecionados || []
          });
          idRepertorio = repCitacao.id;
          break;
      }

      console.log(dados);

      if (idRepertorio && dados.comentarioEducador.trim()) {
        await addComentario(idRepertorio, { texto: dados.comentarioEducador, fixar: dados.fixarComentario });
      }

      toast.success('Repertório publicado com sucesso!');
      router.push(`/repertorio/${idRepertorio}?type=${dados.tipoRepertorio}`); 
      
    } catch (error) {
      console.error('Erro ao publicar repertório:', error);
      toast.error('Erro ao publicar repertório. Tente novamente.');
    }
  };


  return (
    <main className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Container principal */}
        <div className="max-w-[1208px] mx-auto space-y-8 animate-in fade-in duration-500">
          <div className='bg-[#E8E8E8] rounded-[88px] p-12'>
            {/* Header do repertório */}
            <HeaderDetalhes
              tipoRepertorio={dados.tipoRepertorio || 'artigo'}
              tipoObra={dados.tipoObra || undefined}
              titulo={dados.titulo}
              autoria={dados.autoria}
              onTituloChange={(titulo) => atualizarDados({ titulo })}
              onAutoriaChange={(autoria) => atualizarDados({ autoria })}
            />

            {/* Seção de síntese */}
            <SinteseSection
              sintese={dados.sintese}
              onSinteseChange={(sintese) => atualizarDados({ sintese })}
              tipoRepertorio={dados.tipoRepertorio || 'artigo'}
            />

            {/* Eixos selecionados */}
            <EixosSelecionados
              eixosSelecionados={dados.eixosSelecionados || []}
              recortesSelecionados={dados.recortesSelecionados || []}
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
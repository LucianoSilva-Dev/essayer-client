"use client";

import React, { useState } from 'react';
import { HeaderDetalhes } from '../header-detalhes';
import { SinteseSection } from '../sintese-section';
import { EixosSelecionados } from '../eixos-selecionados';
import { ComentarioEducador } from '../comentario-educador';
import { DetalhesRepertorioData, useAddRepertorio } from '@/shared/contexts/add-repertorio-context';
import { addComentario, createArtigo, createCitacao, createObra } from '@/lib/apiCalls/repertorio';
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
    titulo: titulo || '',
    autoria: autoria || '',
    sintese: sintese || '',
    comentarioEducador: comentarioEducador || '',
    fixarComentario: fixarComentario || false
  });

  const atualizarDados = (novosDados: Partial<DetalhesRepertorioData>) => {
    setDados(prev => ({ ...prev, ...novosDados }));
  };

  const validarDados = () => {
    // Adicionado fallback de segurança caso tipoRepertorio seja perdido
    if (!dados.tipoRepertorio) return { valido: false, mensagem: 'Tipo de repertório inválido' };

    switch (dados.tipoRepertorio) {
      case 'artigo':
        if (!dados.titulo?.trim()) return { valido: false, mensagem: 'Título é obrigatório para artigos' };
        if (!dados.autoria?.trim()) return { valido: false, mensagem: 'Autoria é obrigatória para artigos' };
        if (!dados.sintese?.trim()) return { valido: false, mensagem: 'Síntese é obrigatória para artigos' };
        break;
      case 'obra':
        if (!dados.titulo?.trim()) return { valido: false, mensagem: 'Título é obrigatório para obras' };
        if (!dados.autoria?.trim()) return { valido: false, mensagem: 'Autoria é obrigatória para obras' };
        if (!dados.sintese?.trim()) return { valido: false, mensagem: 'Sinopse é obrigatória para obras' };
        break;
      case 'citacao':
        if (!dados.autoria?.trim()) return { valido: false, mensagem: 'Autoria é obrigatória para citações' };
        if (!dados.sintese?.trim()) return { valido: false, mensagem: 'Citação é obrigatória' };
        // Nota: A fonte (que usa dados.titulo) não é obrigatória no Backend, então não validamos aqui. Correto!
        break;
    }
    return { valido: true, mensagem: '' };
  };

  const isDisabled = !validarDados().valido;

  const publicarRepertorio = async () => {
    console.log('Publicando repertório com os seguintes dados:', dados);
    try {
      const validacao = validarDados();
      if (!validacao.valido) {
        toast.error(validacao.mensagem);
        return;
      }

      let idRepertorio = '';

      const topicosFormatados = (dados.eixosSelecionados || []).map(eixo => eixo.nome);
      const subtopicosFormatados = dados.recortesSelecionados || [];

      switch (dados.tipoRepertorio) {
        case 'artigo':
          const repArtigo = await createArtigo({
            titulo: dados.titulo,
            resumo: dados.sintese,
            autor: dados.autoria,
            topicos: topicosFormatados,
            subtopicos: subtopicosFormatados
          });
          idRepertorio = repArtigo.id;
          break;

        case 'obra':
          const repObra = await createObra({
            titulo: dados.titulo,
            sinopse: dados.sintese,
            autor: dados.autoria,
            tipoObra: dados.tipoObra || 'livro',
            topicos: topicosFormatados,
            subtopicos: subtopicosFormatados
          });
          idRepertorio = repObra.id;
          break;

        case 'citacao':
          const repCitacao = await createCitacao({
            frase: dados.sintese,
            autor: dados.autoria,
            fonte: dados.titulo,
            topicos: topicosFormatados,
            subtopicos: subtopicosFormatados
          });
          idRepertorio = repCitacao.id;
          break;
      }

      if (idRepertorio && dados.comentarioEducador?.trim()) {
        await addComentario(idRepertorio, {
          texto: dados.comentarioEducador,
          fixar: dados.fixarComentario
        });
      }
      toast.success('Repertório publicado com sucesso!');
      router.push(`/repertorio/${idRepertorio}?type=${dados.tipoRepertorio}`);

    } catch (error) {
      // console.error('Erro Zod:', (error as any).response?.data);
      console.error('Erro ao publicar repertório:', error);
      toast.error('Erro ao publicar repertório. Verifique os dados e tente novamente.');
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 py-6 md:py-8">
      <div className="container mx-auto px-4">
        {/* Container principal */}
        <div className="max-w-300 mx-auto space-y-6 md:space-y-8 animate-in fade-in duration-500">
          <div className='bg-surface-light rounded-[48px] md:rounded-[88px] p-6 md:p-12 space-y-6 md:space-y-8'>
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
            fixarComentario={dados.fixarComentario || false}
            onComentarioChange={(comentarioEducador) => atualizarDados({ comentarioEducador })}
            onFixarChange={(fixarComentario) => atualizarDados({ fixarComentario })}
          />

          {/* Botão publicar */}
          <div className="flex justify-center">
            <button
              type="button"
              onClick={publicarRepertorio}
              disabled={isDisabled}
              className={`px-6 md:px-12 py-3 md:py-4 w-full md:max-w-100 rounded-2xl md:rounded-[34px] font-semibold text-lg md:text-2xl transition-colors duration-300 ${isDisabled
                ? "bg-[#898787] cursor-not-allowed text-[#434343]"
                : "bg-brand-teal-dark text-[#E5EFF0] hover:bg-[#019DA3] cursor-pointer delay-200"
                }`}
              style={{ fontFamily: 'Montserrat' }}
            >
              Publicar repertório
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
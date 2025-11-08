"use client";

import { useState } from 'react';
import { Eixo, TipoRepertorio, TipoObra } from './useAdicionarRepertorio';

export interface DetalhesRepertorioData {
  titulo: string;
  autoria: string;
  sintese: string;
  comentarioEducador: string;
  fixarComentario: boolean;
}

export interface UseDetalhesRepertorioProps {
  dadosIniciais: {
    tipoRepertorio: TipoRepertorio;
    tipoObra?: TipoObra;
    eixosSelecionados: Eixo[];
    recortesSelecionados: string[];
    titulo: string;
    autoria: string;
    sintese: string;
    comentarioEducador: string;
    fixarComentario: boolean;
  };
  onPublicar: (dados: DetalhesRepertorioData) => Promise<void>;
  onVoltar: () => void;
}

export interface UseDetalhesRepertorioReturn {
  dados: DetalhesRepertorioData;
  atualizarDados: (dados: Partial<DetalhesRepertorioData>) => void;
  publicarRepertorio: () => Promise<void>;
  voltarParaEixos: () => void;
  tipoRepertorio: TipoRepertorio;
  tipoObra?: TipoObra;
  eixosSelecionados: Eixo[];
  recortesSelecionados: string[];
}

export const useDetalhesRepertorio = ({
  dadosIniciais,
  onPublicar,
  onVoltar
}: UseDetalhesRepertorioProps): UseDetalhesRepertorioReturn => {
  const [dados, setDados] = useState<DetalhesRepertorioData>({
    titulo: dadosIniciais.titulo,
    autoria: dadosIniciais.autoria,
    sintese: dadosIniciais.sintese,
    comentarioEducador: dadosIniciais.comentarioEducador,
    fixarComentario: dadosIniciais.fixarComentario
  });

  const atualizarDados = (novosDados: Partial<DetalhesRepertorioData>) => {
    setDados(prev => ({ ...prev, ...novosDados }));
  };

  const publicarRepertorio = async () => {
    try {
      const validacao = validarDados();
      if (!validacao.valido) {
        alert(validacao.mensagem);
        return;
      }

      await onPublicar(dados);
      
    } catch (error) {
      console.error('Erro ao publicar repertório:', error);
      alert('Erro ao publicar repertório. Tente novamente.');
    }
  };

  const voltarParaEixos = () => {
    onVoltar();
  };

  const validarDados = () => {
    switch (dadosIniciais.tipoRepertorio) {
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

  return {
    dados,
    atualizarDados,
    publicarRepertorio,
    voltarParaEixos,
    tipoRepertorio: dadosIniciais.tipoRepertorio,
    tipoObra: dadosIniciais.tipoObra,
    eixosSelecionados: dadosIniciais.eixosSelecionados,
    recortesSelecionados: dadosIniciais.recortesSelecionados
  };
};
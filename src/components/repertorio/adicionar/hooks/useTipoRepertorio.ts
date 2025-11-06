"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export type TipoRepertorio = 'obra' | 'artigo' | 'citacao';
export type TipoObra = 'filme' | 'teatro' | 'livro' | 'musica';

interface UseTipoRepertorioReturn {
  tipoSelecionado: TipoRepertorio | null;
  tipoObraSelecionado: TipoObra | null;
  bandejaAberta: boolean;
  selecionarTipo: (tipo: TipoRepertorio) => void;
  selecionarTipoObra: (tipo: TipoObra) => void;
  fecharBandeja: () => void;
  avancarParaProximaEtapa: () => void;
}

export const useTipoRepertorio = (): UseTipoRepertorioReturn => {
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoRepertorio | null>(null);
  const [tipoObraSelecionado, setTipoObraSelecionado] = useState<TipoObra | null>(null);
  const [bandejaAberta, setBandejaAberta] = useState(false);
  const router = useRouter();

  const selecionarTipo = (tipo: TipoRepertorio) => {
    if (tipoSelecionado === tipo) {
      // Segundo clique - confirmar seleção
      if (tipo === 'obra') {
        setBandejaAberta(true);
      } else {
        // Artigo ou citação - avançar diretamente
        avancarParaProximaEtapa(tipo);
      }
    } else {
      // Primeiro clique - destacar
      setTipoSelecionado(tipo);
      setTipoObraSelecionado(null);
      setBandejaAberta(false);
    }
  };

  const selecionarTipoObra = (tipo: TipoObra) => {
    setTipoObraSelecionado(tipo);
    setBandejaAberta(false);
    // Avançar para próxima etapa após selecionar tipo de obra
    setTimeout(() => avancarParaProximaEtapa('obra'), 300);
  };

  const fecharBandeja = () => {
    setBandejaAberta(false);
    setTipoSelecionado(null);
  };

  const avancarParaProximaEtapa = (tipo: TipoRepertorio) => {
    // Aqui vamos navegar para a próxima etapa
    console.log('Avançando para próxima etapa:', { 
      tipoRepertorio: tipo, 
      tipoObra: tipoObraSelecionado 
    });
    
    // TODO: Implementar navegação para próxima etapa
    // Vamos passar os dados selecionados via query params ou estado
    // router.push('/adicionar/eixos');
  };

  return {
    tipoSelecionado,
    tipoObraSelecionado,
    bandejaAberta,
    selecionarTipo,
    selecionarTipoObra,
    fecharBandeja,
    avancarParaProximaEtapa: () => tipoSelecionado && avancarParaProximaEtapa(tipoSelecionado),
  };
};
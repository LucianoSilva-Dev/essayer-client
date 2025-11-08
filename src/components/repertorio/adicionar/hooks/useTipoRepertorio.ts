"use client";

import { useState } from 'react';
import { TipoRepertorio, TipoObra } from './useAdicionarRepertorio';

interface UseTipoRepertorioProps {
  dadosIniciais: {
    tipoRepertorio: TipoRepertorio | null;
    tipoObra: TipoObra | null;
  };
  onAvancar: (dados: { tipoRepertorio: TipoRepertorio; tipoObra?: TipoObra }) => void;
}

interface UseTipoRepertorioReturn {
  tipoSelecionado: TipoRepertorio | null;
  tipoObraSelecionado: TipoObra | null;
  bandejaAberta: boolean;
  selecionarTipo: (tipo: TipoRepertorio) => void;
  selecionarTipoObra: (tipo: TipoObra) => void;
  fecharBandeja: () => void;
}

export const useTipoRepertorio = ({ 
  dadosIniciais, 
  onAvancar 
}: UseTipoRepertorioProps): UseTipoRepertorioReturn => {
  const [tipoSelecionado, setTipoSelecionado] = useState<TipoRepertorio | null>(dadosIniciais.tipoRepertorio);
  const [tipoObraSelecionado, setTipoObraSelecionado] = useState<TipoObra | null>(dadosIniciais.tipoObra);
  const [bandejaAberta, setBandejaAberta] = useState(false);

  const selecionarTipo = (tipo: TipoRepertorio) => {
    if (tipoSelecionado === tipo) {
      // Segundo clique - confirmar seleção
      if (tipo === 'obra') {
        setBandejaAberta(true);
      } else {
        // Artigo ou citação - avançar diretamente
        onAvancar({ tipoRepertorio: tipo });
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
    setTimeout(() => onAvancar({ tipoRepertorio: 'obra', tipoObra: tipo }), 300);
  };

  const fecharBandeja = () => {
    setBandejaAberta(false);
    setTipoSelecionado(null);
  };

  return {
    tipoSelecionado,
    tipoObraSelecionado,
    bandejaAberta,
    selecionarTipo,
    selecionarTipoObra,
    fecharBandeja
  };
};

// Re-exportar tipos para compatibilidade
export type { TipoRepertorio, TipoObra };
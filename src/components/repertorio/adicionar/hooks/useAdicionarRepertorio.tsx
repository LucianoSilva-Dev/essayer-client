"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Exportar tipos primeiro para evitar dependência circular
export type TipoRepertorio = 'artigo' | 'obra' | 'citacao';
export type TipoObra = 'filme' | 'serie' | 'livro' | 'musica' | 'documentario' | 'peça' | 'outro';

export interface Eixo {
    id: string;
    nome: string;
    descricao: string;
    icone: string;
    recortes: string[];
}

export interface DadosRepertorioCompleto {
    // Etapa 1 - Tipo
    tipoRepertorio: TipoRepertorio | null;
    tipoObra: TipoObra | null;

    // Etapa 2 - Eixos
    eixosSelecionados: Eixo[];
    recortesSelecionados: string[];

    // Etapa 3 - Detalhes
    titulo: string;
    autoria: string;
    sintese: string;
    comentarioEducador: string;
    fixarComentario: boolean;
}

export interface UseAdicionarRepertorioReturn {
    dados: DadosRepertorioCompleto;
    etapaAtual: number;
    avancarEtapa: (dados: Partial<DadosRepertorioCompleto>) => void;
    voltarEtapa: () => void;
    reiniciarProcesso: () => void;
}

export const useAdicionarRepertorio = (): UseAdicionarRepertorioReturn => {
    const [dados, setDados] = useState<DadosRepertorioCompleto>({
        tipoRepertorio: null,
        tipoObra: null,
        eixosSelecionados: [],
        recortesSelecionados: [],
        titulo: '',
        autoria: '',
        sintese: '',
        comentarioEducador: '',
        fixarComentario: false
    });

    const [etapaAtual, setEtapaAtual] = useState<number>(1);
    const router = useRouter();

    const avancarEtapa = (novosDados: Partial<DadosRepertorioCompleto>) => {
        const dadosAtualizados = { ...dados, ...novosDados };
        setDados(dadosAtualizados);

        if (etapaAtual < 3) {
            const proximaEtapa = etapaAtual + 1;
            setEtapaAtual(proximaEtapa);

            // Navegar para a próxima rota com os dados necessários
            switch (proximaEtapa) {
                case 2:
                    // Para a etapa de eixos, passar o tipo selecionado
                    const params = new URLSearchParams();
                    if (dadosAtualizados.tipoRepertorio) {
                        params.set('tipo', dadosAtualizados.tipoRepertorio);
                    }
                    if (dadosAtualizados.tipoObra) {
                        params.set('tipoObra', dadosAtualizados.tipoObra);
                    }
                    router.push(`/adicionar/eixos?${params.toString()}`);
                    break;
                case 3:
                    router.push('/adicionar/detalhes');
                    break;
            }
        }
    };

    const voltarEtapa = () => {
        if (etapaAtual > 1) {
            const etapaAnterior = etapaAtual - 1;
            setEtapaAtual(etapaAnterior);

            // Navegar para a rota anterior
            switch (etapaAnterior) {
                case 1:
                    router.push('/adicionar');
                    break;
                case 2:
                    router.push('/adicionar/eixos');
                    break;
            }
        }
    };

    const reiniciarProcesso = () => {
        setDados({
            tipoRepertorio: null,
            tipoObra: null,
            eixosSelecionados: [],
            recortesSelecionados: [],
            titulo: '',
            autoria: '',
            sintese: '',
            comentarioEducador: '',
            fixarComentario: false
        });
        setEtapaAtual(1);
        router.push('/adicionar');
    };

    return {
        dados,
        etapaAtual,
        avancarEtapa,
        voltarEtapa,
        reiniciarProcesso
    };
};


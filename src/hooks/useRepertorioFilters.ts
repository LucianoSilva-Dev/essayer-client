import { useState, useMemo, useCallback } from 'react';
import { EixoOptions } from '@/constants/eixos'; 

export const useRepertorioFilters = () => {
    const [termoBusca, setTermoBusca] = useState("");
    const [eixosAtivos, setEixosAtivos] = useState<string[]>([]);
    const [recorteAtivo, setRecorteAtivo] = useState<string | null>(null);
    const [modeloAtivo, setModeloAtivo] = useState<string | null>(null);
    const [ordenarPor, setOrdenarPor] = useState<'MaxLikes' | 'MinLikes' | 'Newest' | 'Oldest'>('Newest');

    const handleSetEixosAtivos = useCallback((value: string[]) => {
        setEixosAtivos(value);
        setRecorteAtivo(null);
    }, []);

    const recorteOptions = useMemo(() => {
        if (eixosAtivos.length > 0) {
            const allRecortes = eixosAtivos.flatMap(nomeDoEixo => {
                const eixoEncontrado = EixoOptions.find(option => option.nome === nomeDoEixo);
                return eixoEncontrado ? eixoEncontrado.recortes : [];
            });
            return [...new Set(allRecortes)];
        }

        const todosOsRecortesPossiveis = EixoOptions.flatMap(option => option.recortes);
        return [...new Set(todosOsRecortesPossiveis)];
    }, [eixosAtivos]);

    const activeFilterCount = [
        termoBusca,
        eixosAtivos.length > 0,
        recorteAtivo,
        modeloAtivo,
    ].filter(Boolean).length;

    return {
        termoBusca,
        setTermoBusca,
        eixosAtivos,
        setEixosAtivos: handleSetEixosAtivos,
        recorteAtivo,
        setRecorteAtivo,
        modeloAtivo,
        setModeloAtivo,
        ordenarPor,
        setOrdenarPor,
        recorteOptions,
        activeFilterCount,
    };
};
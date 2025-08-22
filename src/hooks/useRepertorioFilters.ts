// src/hooks/useRepertorioFilters.ts
import { useState, useMemo, useCallback } from 'react';
import { EixosTematicos } from '@/constants/eixos';

export const useRepertorioFilters = () => {
    const [termoBusca, setTermoBusca] = useState("");
    const [eixosAtivos, setEixosAtivos] = useState<string[]>([]);
    const [recorteAtivo, setRecorteAtivo] = useState<string | null>(null);
    const [modeloAtivo, setModeloAtivo] = useState<string | null>(null);
    const [ordenarPor, setOrdenarPor] = useState<'MaxLikes' | 'MinLikes' | 'Newest' | 'Oldest'>('Newest');

    // Sempre que os eixos ativos mudarem, reseta o recorte.
    const handleSetEixosAtivos = useCallback((value: string[]) => {
        setEixosAtivos(value);
        setRecorteAtivo(null);
    }, []);

    const recorteOptions = useMemo(() => {
        if (eixosAtivos.length > 0) {
            const allRecortes = eixosAtivos.flatMap(eixo => EixosTematicos[eixo as keyof typeof EixosTematicos] || []);
            return [...new Set(allRecortes)];
        }
        return Object.values(EixosTematicos).flat();
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
// src/hooks/useRepertorioFilters.ts
import { useState, useCallback } from 'react';

export const useRepertorioFilters = () => {
    const [termoBusca, setTermoBusca] = useState("");
    const [eixosAtivos, setEixosAtivos] = useState<string[]>([]);
    const [recorteAtivo, setRecorteAtivo] = useState<string | null>(null);
    const [modeloAtivo, setModeloAtivo] = useState<string | null>(null);
    const [ordenarPor, setOrdenarPor] = useState<'MaxLikes' | 'MinLikes' | 'Newest' | 'Oldest'>('Newest');

    const onFilterChange = useCallback((filter: string, value: string | string[]) => {
        switch (filter) {
            case 'modelo':
                setModeloAtivo(value as string);
                break;
            case 'eixos':
                setEixosAtivos(value as string[]);
                setRecorteAtivo(null); // Reseta o recorte ao mudar o eixo
                break;
            case 'recorte':
                setRecorteAtivo(value as string);
                break;
            case 'ordenarPor':
                setOrdenarPor(value as 'MaxLikes' | 'MinLikes' | 'Newest' | 'Oldest');
                break;
        }
    }, []);

    const onClearFilters = useCallback(() => {
        setTermoBusca('');
        setEixosAtivos([]);
        setRecorteAtivo(null);
        setModeloAtivo(null);
        setOrdenarPor('Newest');
    }, []);

    const activeFilterCount = [
        termoBusca,
        modeloAtivo,
        recorteAtivo,
        ...eixosAtivos
    ].filter(Boolean).length;

    return {
        termoBusca,
        setTermoBusca,
        activeFilters: {
            modelo: modeloAtivo,
            eixos: eixosAtivos,
            recorte: recorteAtivo,
            ordenarPor,
        },
        onFilterChange,
        onClearFilters,
        activeFilterCount
    };
};
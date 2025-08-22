// src/hooks/useRepertorioFilters.ts
import { useState, useMemo } from 'react';
import { EixosTematicos } from '@/constants/eixos';

export const useRepertorioFilters = () => {
    const [filters, setFilters] = useState({
        termoBusca: "",
        eixosAtivos: [] as string[],
        recorteAtivo: null as string | null,
        modeloAtivo: null as string | null,
        ordenarPor: 'Newest' as 'MaxLikes' | 'MinLikes' | 'Newest' | 'Oldest',
    });

    const handleFilterChange = (filterName: string, value: any) => {
        setFilters(prevFilters => {
            const newFilters = { ...prevFilters, [filterName]: value };
            if (filterName === "eixosAtivos") {
                newFilters.recorteAtivo = null; // Reseta o recorte ao mudar o eixo
            }
            return newFilters;
        });
    };

    const recorteOptions = useMemo(() => {
        if (filters.eixosAtivos.length > 0) {
            const allRecortes = filters.eixosAtivos.flatMap(eixo => EixosTematicos[eixo as keyof typeof EixosTematicos] || []);
            return [...new Set(allRecortes)];
        }
        return Object.values(EixosTematicos).flat();
    }, [filters.eixosAtivos]);

    const activeFilterCount = [
        filters.termoBusca,
        filters.eixosAtivos.length > 0,
        filters.recorteAtivo,
        filters.modeloAtivo,
    ].filter(Boolean).length;

    return {
        filters,
        handleFilterChange,
        recorteOptions,
        activeFilterCount,
    };
};
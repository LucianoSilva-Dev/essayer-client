"use client"

import type React from "react"
import { createContext, useContext, useState } from "react";

export type TipoRepertorio = 'artigo' | 'obra' | 'citacao';
export type TipoObra = 'filme' | 'teatro' | 'livro' | 'musica';

export interface Eixo {
  id: string;
  nome: string;
  descricao: string;
  icone: string;
  recortes: string[];
}

export interface DetalhesRepertorioData {
  titulo: string;
  autoria: string;
  sintese: string;
  comentarioEducador: string;
  fixarComentario: boolean;
  tipoRepertorio?: TipoRepertorio;
  tipoObra?: TipoObra;
  eixosSelecionados?: Eixo[];
  recortesSelecionados?: string[];
}

interface AddRepertorioContextType {
  // Etapa 1 - Tipo
  tipoRepertorio: TipoRepertorio | null;
  tipoObra: TipoObra | null;

  // Etapa 2 - Eixos
  eixosSalvos: Eixo[];
  recortes: string[];

  // Etapa 3 - Detalhes
  titulo: string;
  autoria: string;
  sintese: string;
  comentarioEducador: string;
  fixarComentario: boolean;

  setTipos: (tipo: TipoRepertorio, tipoO: TipoObra | undefined) => void;
  setEixos: (eixos: Eixo[], recortes: string[]) => void;
}

const AddRepertorioContext = createContext<AddRepertorioContextType | undefined>(undefined);

export function AddRepertorioProvider({ children }: { children: React.ReactNode }) {
  const [tipoRepertorio, setTipoRepertorio] = useState<TipoRepertorio | null>(null);
  const [tipoObra, setTipoObra] = useState<TipoObra | null>(null);
  const [eixosSalvos, setEixosSelecionados] = useState<Eixo[]>([]);
  const [recortes, setRecortes] = useState<string[]>([]);

  const setTipos = (tipo: TipoRepertorio, tipoO: TipoObra | undefined) => {
    setTipoRepertorio(tipo);
    setTipoObra(tipoO? tipoO : null);
  }

  const setEixos = (eixos: Eixo[], recortes: string[]) => {
    setEixosSelecionados(eixos);
    setRecortes(recortes);
  }

  return (
    <AddRepertorioContext.Provider
      value={{
        tipoRepertorio,
        tipoObra,
        eixosSalvos,
        recortes,
        titulo: "",
        autoria: "",
        sintese: "",
        comentarioEducador: "",
        fixarComentario: false,

        setTipos,
        setEixos
      }}
    >
      {children}
    </AddRepertorioContext.Provider>
  )



}

export function useAddRepertorio() {
  const context = useContext(AddRepertorioContext);
  if (context === undefined) {
    throw new Error("useAddRepertorio deve ser usado dentro de um AddRepertorioProvider");
  }
  return context
}
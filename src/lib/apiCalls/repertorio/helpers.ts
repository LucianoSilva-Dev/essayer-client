import { ArtigoDocument, CitacaoDocument, ObraDocument, RepertorioDocument } from "./types";

export function isGetAllObraDoc(repertorio: RepertorioDocument): repertorio is ObraDocument {
    return repertorio.tipoRepertorio === "Obra";
}

export function isGetAllArtigoDoc(repertorio: RepertorioDocument): repertorio is ArtigoDocument {
    return repertorio.tipoRepertorio === "Artigo";
}

export function isGetAllCitacaoDoc(repertorio: RepertorioDocument): repertorio is CitacaoDocument {
    return repertorio.tipoRepertorio === "Citacao";
}

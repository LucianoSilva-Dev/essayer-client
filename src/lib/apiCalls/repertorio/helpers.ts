import { ArticleDocument, CitationDocument, RepertoireDocument, WorkDocument } from "./types";

export function isWorkDoc(repertoire: RepertoireDocument): repertoire is WorkDocument {
    return repertoire.repertoireType === "WORK";
}

export function isArticleDoc(repertoire: RepertoireDocument): repertoire is ArticleDocument {
    return repertoire.repertoireType === "ARTICLE";
}

export function isCitationDoc(repertoire: RepertoireDocument): repertoire is CitationDocument {
    return repertoire.repertoireType === "CITATION";
}
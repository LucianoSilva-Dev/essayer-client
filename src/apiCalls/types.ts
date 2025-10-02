export interface GenericError {
    error: string;
}

export interface SchemaValidationError {
    errors: string[];
}

export interface GenericSuccessResponse {
    message: string;
}

export interface Paginacao {
    offset: number;
    limit: number;
    nextPageUrl: string | null;
    previousPageUrl: string | null;
    totalDocuments: number;
    pagesUrl: string[];
}

export interface PerfilUsuario {
    id: string;
    nome: string;
}

export interface Comentario {
    id: string;
    usuario: PerfilUsuario;
    texto: string;
}
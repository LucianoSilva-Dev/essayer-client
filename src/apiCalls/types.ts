import { CorrecaoRedacaoEvents, GetCorrecaoRedacaoResponse } from "./redacao/types";

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
  fotoPath?: string;
}

export interface Comentario {
  id: string;
  usuario: PerfilUsuario;
  texto: string;
  fixado?: boolean;
}

export type CustomEventSourceMap = {
  appError: {
    data: {
      statusCode: number,
      message: string
    };
  };
  [CorrecaoRedacaoEvents.RedacaoCorrigida]: { data: GetCorrecaoRedacaoResponse }
  [CorrecaoRedacaoEvents.RedacaoDevagar]: { data: null }
}
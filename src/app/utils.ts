import { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";
import { RepertorioDocument, ObraDocument, ArtigoDocument, CitacaoDocument } from "@/apiCalls/repertorio/types";
import { Repertorio } from "../types/repertorio";

/**
 * Lida com erros de chamadas do Axios, exibindo notificações ao usuário
 * e rejeitando a promise com o erro original para tratamento adicional.
 * @param error O erro capturado pelo interceptor do Axios.
 * @returns Uma Promise rejeitada com o erro.
 */
export const handleAxiosError = (error: unknown) => {
	if (isAxiosError(error)) {
		const axiosError = error as AxiosError<{ error?: string, errors?: string[] }>;
		const { response, config } = axiosError;

		if (response?.status === 404 && config?.url?.includes('/usuario/foto/')) {
			return Promise.reject(error); // Reject without showing a toast
		}

		if (!response) {
			toast.error('Erro de conexão. Verifique sua internet e tente novamente.');
		} else {
			const apiErrorMessage = response.data?.error || (response.data?.errors && response.data.errors.join(', '));

			// Trata os códigos de erro mais comuns
			switch (response.status) {
				case 400: // Bad Request
					toast.error(apiErrorMessage || 'Dados inválidos. Verifique as informações enviadas.');
					break;
				case 401: // Unauthorized
					toast.error(apiErrorMessage || 'Sessão expirada. Faça login novamente.');
					break;
				case 403: // Forbidden
					toast.error(apiErrorMessage || 'Acesso negado. Você não tem permissão.');
					break;
				case 404: // Not Found
					toast.error(apiErrorMessage || 'O recurso solicitado não foi encontrado.');
					break;
				case 500: // Internal Server Error
					toast.error(apiErrorMessage || 'Ocorreu um erro no servidor. Tente novamente mais tarde.');
					break;
				default:
					toast.error(apiErrorMessage || `Ocorreu um erro inesperado.`);
					break;
			}
		}
	} else {
		console.error('Ocorreu um erro inesperado:', error);
		toast.error('Ocorreu um erro inesperado.');
	}
	return Promise.reject(error);
};

function isObraDocument(repertorio: RepertorioDocument): repertorio is ObraDocument {
	return repertorio.tipoRepertorio === "Obra";
}

function isArtigoDocument(repertorio: RepertorioDocument): repertorio is ArtigoDocument {
	return repertorio.tipoRepertorio === "Artigo";
}

function isCitacaoDocument(repertorio: RepertorioDocument): repertorio is CitacaoDocument {
	return repertorio.tipoRepertorio === "Citacao";
}

export const mountRepertoire = (repertorio: RepertorioDocument): Repertorio | null => {
	if (isCitacaoDocument(repertorio)) {
		return {
			id: repertorio.id,
			modelo: "citacao",
			autoria: repertorio.autor,
			citacao: repertorio.frase,
			fonte: repertorio.fonte,
			eixos: repertorio.topicos,
			recortes: repertorio.subtopicos,
			isPublico: true,
			totalLikes: repertorio.totalLikes,
			favoritadoPeloUsuario: repertorio.favoritadoPeloUsuario,
			likeDoUsuario: repertorio.likeDoUsuario,
			criador: repertorio.criador,
			totalComentarios: repertorio.totalComentarios,
			comentarios: repertorio.comentarios,
		}
	}
	if (isObraDocument(repertorio)) {
		return {
			id: repertorio.id,
			modelo: 'obra',
			titulo: repertorio.titulo,
			autoria: repertorio.autor,
			sinopse: repertorio.sinopse,
			eixos: repertorio.topicos,
			tipoObra: repertorio.tipoObra,
			recortes: repertorio.subtopicos,
			isPublico: true,
			totalLikes: repertorio.totalLikes,
			favoritadoPeloUsuario: repertorio.favoritadoPeloUsuario,
			likeDoUsuario: repertorio.likeDoUsuario,
			criador: repertorio.criador,
			totalComentarios: repertorio.totalComentarios,
			comentarios: repertorio.comentarios,
		}
	}
	if (isArtigoDocument(repertorio)) {
		return {
			id: repertorio.id,
			modelo: "artigo",
			titulo: repertorio.titulo,
			autoria: repertorio.autor,
			sintese: repertorio.resumo,
			fonte: repertorio.fonte,
			eixos: repertorio.topicos,
			recortes: repertorio.subtopicos,
			isPublico: true,
			totalLikes: repertorio.totalLikes,
			favoritadoPeloUsuario: repertorio.favoritadoPeloUsuario,
			likeDoUsuario: repertorio.likeDoUsuario,
			criador: repertorio.criador,
			totalComentarios: repertorio.totalComentarios,
			comentarios: repertorio.comentarios,
		}
	}

	return null
}
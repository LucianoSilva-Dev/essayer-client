import { AxiosError, isAxiosError } from "axios";
import { toast } from "react-toastify";

/**
 * Lida com erros de chamadas do Axios, exibindo notificações ao usuário
 * e rejeitando a promise com o erro original para tratamento adicional.
 * @param error O erro capturado pelo interceptor do Axios.
 * @returns Uma Promise rejeitada com o erro.
 */
export const handleAxiosError = (error: unknown) => {
	if (isAxiosError(error)) {
	  const axiosError = error as AxiosError<{ error?: string, errors?: string[] }>;
	  const { response } = axiosError;
  
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

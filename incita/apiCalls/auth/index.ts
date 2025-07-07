import apiClient from '../api-client';
import type {
  UserLoginBody,
  UserLoginResponse,
  UserRegisterBody,
  UserRegisterResponse,
} from './types';

/**
 * Realiza o login do usuário.
 * @param data - Credenciais do usuário (email e senha).
 * @returns O token de autenticação.
 */
export const login = async (data: UserLoginBody): Promise<UserLoginResponse> => {
  const response = await apiClient.post<UserLoginResponse>('/auth/login', data);
  return response.data;
};

/**
 * Registra um novo usuário.
 * @param data - Dados de registro do usuário.
 * @returns Mensagem de sucesso.
 */
export const register = async (data: UserRegisterBody): Promise<UserRegisterResponse> => {
  const response = await apiClient.post<UserRegisterResponse>('/auth/register', data);
  return response.data;
};
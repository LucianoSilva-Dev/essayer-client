import apiClient from '../../http/api-client';
import type {
  UserLoginBody,
  UserLoginResponse,
  UserRegisterBody,
  UserRegisterResponse,
} from './types';

/**
 * Realiza o login do usuário.
 * O backend irá setar os cookies HttpOnly (accessToken e refreshToken).
 * @param data - Credenciais do usuário (email e senha).
 * @returns Os dados do usuário logado.
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

/**
 * Realiza o logout do usuário.
 * Chama o backend para invalidar os cookies de autenticação.
 */
export const logout = async (): Promise<void> => {
  await apiClient.post('/auth/logout');
};

/**
 * Busca os dados do usuário logado (verifica a sessão).
 * Usa os cookies de autenticação enviados automaticamente.
 * @returns Os dados do usuário.
 */
export const getMe = async (): Promise<UserLoginResponse> => {
  const response = await apiClient.get<UserLoginResponse>('/auth/me'); 
  return response.data;
};
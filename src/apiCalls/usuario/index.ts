import apiClient from '../api-client';
import { GenericSuccessResponse } from '../types';
import type {
  Usuario,
  UpdateUsuarioBody,
  UpdateSenhaBody,
  ProfessorCreateBody,
  CreateUsuarioBody,
  CreateUsuarioResponse
} from './types';

export const getUserById = async (id: string): Promise<Usuario> => {
  const response = await apiClient.get<Usuario>(`/usuario/${id}`);
  return response.data;
};


export const createUser = async (data: CreateUsuarioBody): Promise<CreateUsuarioResponse> => {
  const response = await apiClient.post<CreateUsuarioResponse>('/usuario', data);
  return response.data;
};


export const createProfessorRequest = async (id: string, data: ProfessorCreateBody): Promise<GenericSuccessResponse> => {
  const response = await apiClient.post<GenericSuccessResponse>(`/usuario/${id}/professor`, data);
  return response.data;
};


export const updateUser = async (id: string, data: UpdateUsuarioBody): Promise<GenericSuccessResponse> => {
  const response = await apiClient.put<GenericSuccessResponse>(`/usuario/${id}`, data);
  return response.data;
};


export const updatePassword = async (id: string, data: UpdateSenhaBody): Promise<GenericSuccessResponse> => {
  const response = await apiClient.put<GenericSuccessResponse>(`/usuario/${id}/senha`, data);
  return response.data;
};


export const deleteUser = async (id: string): Promise<GenericSuccessResponse> => {
  const response = await apiClient.delete<GenericSuccessResponse>(`/usuario/${id}`);
  return response.data;
};

// --- Serviços de Foto de Perfil ---

export const getProfilePictureLink = async (id: string | null | undefined): Promise<string | null> => {
  if (!id) return null
  const foto = await apiClient.get(`/usuario/foto/${id}`, {
    cache: { ttl: 900_000 }, // 15 minutes
    validateStatus: (status) => (status >= 200 && status < 300) || status === 404
  })
  if (foto.status === 404 || !foto.data) return null
  return foto.data.fotoUrl
}

export const uploadProfilePicture = async (id: string, file: File): Promise<GenericSuccessResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.post<GenericSuccessResponse>(`/usuario/foto/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


export const updateProfilePicture = async (id: string, file: File): Promise<GenericSuccessResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  const response = await apiClient.put<GenericSuccessResponse>(`/usuario/foto/${id}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};


export const deleteProfilePicture = async (id: string): Promise<GenericSuccessResponse> => {
  const response = await apiClient.delete<GenericSuccessResponse>(`/usuario/foto/${id}`);
  return response.data;
};
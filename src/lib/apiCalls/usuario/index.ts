'use client';

import apiClient from '../../http/api-client'; 
import { GenericSuccessResponse } from '../../../types/types';
import { UpdateUsuarioBody } from './types';
import { authClient } from '@/lib/betterAuth/auth-client';

// --- LEITURA ---
// O useSession do contexto já fará isso.

// --- ESCRITA ---

export const updateUser = async (id: string, data: UpdateUsuarioBody): Promise<GenericSuccessResponse> => {
  // CORREÇÃO 1: O método é direto na raiz 'authClient.updateUser'
  // CORREÇÃO 2: Arrumamos a desestruturação (data e error separados)
  const { data: updatedData, error } = await authClient.updateUser({
    name: data.nome,
    // Se você configurou 'image' no schema padrão, pode passar aqui também se vier no body
    // image: data.fotoUrl 
  });

  if (error) {
    throw new Error(error.message || "Erro ao atualizar perfil");
  }

  // Se precisar atualizar campos extras (Lattes) que não estão no schema do Better Auth:
  // (Mantendo sua lógica de fallback para o backend antigo se necessário)

  return { message: "Perfil atualizado" };
};


export const createProfessorRequest = async (id: string, data: { lattes: string }): Promise<GenericSuccessResponse> => {
  const response = await apiClient.post<GenericSuccessResponse>(`/user/${id}/teacher`, data);
  return response.data;
};

// --- FOTO ---
export const uploadProfilePicture = async (id: string, file: File): Promise<GenericSuccessResponse> => {
  const formData = new FormData();
  formData.append('picture', file); // Backend espera 'picture', não 'file'

  const response = await apiClient.post<GenericSuccessResponse>(`/user/picture/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
  
  // Atualiza a URL no Better Auth se precisar, mas getProfilePictureLink buscará do DB
  return response.data;
};

export const getProfilePictureLink = async (id: string): Promise<string | null> => {
  const response = await apiClient.get<{ image: string | null }>(`/user/picture/${id}`);
  return response.data.image;
};

export const deleteProfilePicture = async (id: string): Promise<GenericSuccessResponse> => {
  const response = await apiClient.delete<GenericSuccessResponse>(`/user/picture/${id}`);
  return response.data;
};
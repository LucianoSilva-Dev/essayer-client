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

// --- FOTO ---
export const uploadProfilePicture = async (id: string, file: File): Promise<GenericSuccessResponse> => {
  const formData = new FormData();
  formData.append('file', file);

  // 1. Upload físico do arquivo (mantido no seu backend/bucket)
  const response = await apiClient.post<{ fotoUrl: string }>(`/usuario/foto/${id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });

  // 2. Atualiza a URL no Better Auth
  // CORREÇÃO: authClient.updateUser direto na raiz
  const { error } = await authClient.updateUser({
    image: response.data.fotoUrl
  });

  if (error) {
      console.error("Erro ao sincronizar imagem com Auth:", error);
      // Opcional: throw new Error...
  }

  return { message: "Foto atualizada" };
};
import apiClient from "../../http/api-client";
import { GenericSuccessResponse } from "../../../types/types";
import { CreateRequisicaoEmailResponse } from "./types";

export const createRequisicaoEmail = async (email: string): Promise<CreateRequisicaoEmailResponse> => {
  const response = await apiClient.post<CreateRequisicaoEmailResponse>('/requisicao-email', { email })
  return response.data
}

export const validateRequisicaoEmail = async (id: string, codigo: string): Promise<GenericSuccessResponse> => {
  const response = await apiClient.put(`/requisicao-email/${id}`, { codigo })
  return response.data
}
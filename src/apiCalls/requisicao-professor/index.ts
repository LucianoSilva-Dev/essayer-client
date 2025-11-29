import apiClient from "../api-client"
import { GenericSuccessResponse } from "../types"
import { GetRequisicaoProfessorResponse, UpdateStatusBody } from "./types"

export const getAllRequisicaoProfessor = async (): Promise<GetRequisicaoProfessorResponse[]> => {
  const response = await apiClient.get('/requisicao-professor')
  return response.data
}

export const updateStatus = async (id: string, data: UpdateStatusBody): Promise<GenericSuccessResponse> => {
  const response = await apiClient.put(`/requisicao-professor/${id}/status`, data)
  return response.data
}
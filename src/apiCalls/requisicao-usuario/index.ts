import apiClient from "../api-client"
import { ValidateUserBody, ValidateUserResponse } from "./types"

export const validateUser = async (id: string, data: ValidateUserBody): Promise<ValidateUserResponse> => {
  const response = await apiClient.put<ValidateUserResponse>(`/requisicao-usuario/${id}`, data)
  return response.data
}

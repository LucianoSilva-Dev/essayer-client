import apiClient from "../api-client"
import { GenericSuccessResponse } from "../types"
import { ValidateUserBody } from "./types"

export const validateUser = async (id: string, data: ValidateUserBody): Promise<GenericSuccessResponse> => {
    const response = await apiClient.put(`/requisicao-usuario/${id}`, data)
    return response.data
}

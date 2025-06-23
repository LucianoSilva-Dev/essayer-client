import apiClient from "../api-client"
import { GenericSuccessResponse } from "../types"
import { CreateRequisicaoMudancaSenhaBody, CreateRequisicaoMudancaSenhaResponse, ValidateRequisicaoMudancaSenhaBody } from "./types"

export const createRequisicaoSenha = async (data: CreateRequisicaoMudancaSenhaBody): Promise<CreateRequisicaoMudancaSenhaResponse> => {
    const response = await apiClient.post('/requisicao-senha', data)
    return response.data
}

export const validateRequisicaoSenha = async (id: string, data: ValidateRequisicaoMudancaSenhaBody): Promise<GenericSuccessResponse> => {
    const response = await apiClient.put(`/requisicao-senha/${id}`, data)
    return response.data
}
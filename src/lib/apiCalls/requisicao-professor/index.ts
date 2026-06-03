import apiClient from "../../http/api-client"
import { GenericSuccessResponse } from "../../../types/types"
import { GetRequisicaoProfessorResponse, UpdateStatusBody } from "./types"

export const getAllRequisicaoProfessor = async (): Promise<GetRequisicaoProfessorResponse[]> => {
  const response = await apiClient.get<any[]>('/teacher-request')
  return (response.data ?? []).map((req: any) => ({
    id: req.id,
    lattes: req.lattes ?? '',
    requisitante: req.requester ? {
      id: req.requester.id,
      nome: req.requester.name,
      email: req.requester.email,
    } : null,
    revisor: req.reviewer ? {
      nome: req.reviewer.name,
    } : null,
    status: mapStatus(req.status),
    createdAt: req.createdAt,
  }))
}

function mapStatus(status: string): "aprovado" | "recusado" | undefined {
  switch (status) {
    case 'APPROVED': return 'aprovado';
    case 'REFUSED': return 'recusado';
    default: return undefined;
  }
}

export const updateStatus = async (id: string, data: UpdateStatusBody): Promise<GenericSuccessResponse> => {
  const serverStatus = data.status === 'aprovado' ? 'APPROVED' : 'REFUSED';
  const response = await apiClient.put(`/teacher-request/${id}/status`, {
    status: serverStatus,
    reason: data.motivo,
  })
  return response.data
}
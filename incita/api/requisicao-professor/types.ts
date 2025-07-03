export interface getRequisicaoProfessorResponse {
    id: string
    lattes: string
    requisitante: {
        id: string,
        nome: string,
        email: string
    } | null
    revisor: {
        nome: string
    } | null
    status: "aprovado" | "recusado" | undefined,
    createdAt: string
}

export interface updateStatusBody {
    status: "aprovado" | "recusado",
    motivo?: string
}
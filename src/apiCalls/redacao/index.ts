import { API_BASE_URL } from "@/app/constants";
import apiClient from "../api-client";
import { CustomEventSourceMap, GenericSuccessResponse } from "../types";
import { CorrecaoRedacaoEvents, GetCorrecaoRedacaoResponse } from "./types";

type OnSuccessCallback = (data: GetCorrecaoRedacaoResponse) => any
type OnDelayCallback = (data: null) => any
type OnErrorCallback = (data: CustomEventSourceMap['appError']) => any

export async function encaminharCorrecaoRedacao(id: string, texto: string, tema: string) {
  const response = await apiClient.post<GenericSuccessResponse>(`/usuario/redacao/${id}/corrigir`, {
    texto,
    tema
  })
  return response.data
}

export async function listenCorrecaoRedacao(
  redacaoId: string,
  onError: OnErrorCallback,
  onDelay: OnDelayCallback,
  onCorrecao: OnSuccessCallback) {
  const eventSource =
    new EventSource(
      API_BASE_URL + `/usuario/redacao/${redacaoId}/correcao/listen`,
      { withCredentials: true }
    )


  eventSource.addEventListener('appError', (event) => {
    const data = JSON.parse(event.data) as CustomEventSourceMap['appError']
    onError(data)
  })
  eventSource.addEventListener(CorrecaoRedacaoEvents.RedacaoDevagar, () => {
    onDelay(null)
  })
  eventSource.addEventListener(CorrecaoRedacaoEvents.RedacaoCorrigida, (event) => {
    const data = JSON.parse(event.data) as GetCorrecaoRedacaoResponse
    onCorrecao(data)
  })
}
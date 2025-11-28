import { API_BASE_URL } from "@/app/constants";
import apiClient from "../api-client";
import { CustomEventSourceMap, GenericSuccessResponse } from "../types";
import { CorrecaoRedacaoEvents, GetCorrecaoRedacaoResponse } from "./types";
import { createResilientEventSource } from "../sse-utils";

type OnSuccessCallback = (data: GetCorrecaoRedacaoResponse) => any
type OnDelayCallback = (data: null) => any
type OnErrorCallback = (data: CustomEventSourceMap['appError']) => any

export async function encaminharCorrecaoRedacao(id: string, texto: string, tema: string) {
  const response = await apiClient.post<GenericSuccessResponse>(`/usuario/redacao/${id}/corrigir`, {
    textoRedacao: texto,
    tema
  })
  return response.data
}

export function listenCorrecaoRedacao(
    redacaoId: string, 
    onError: OnErrorCallback, 
    onDelay: OnDelayCallback, 
    onCorrecao: OnSuccessCallback) {
    
    return createResilientEventSource(`/usuario/redacao/${redacaoId}/correcao/listen`, {
        'appError': (event) => {
            const data = JSON.parse(event.data) as CustomEventSourceMap['appError']
            onError(data)
        },
        [CorrecaoRedacaoEvents.RedacaoDevagar]: () => {
            onDelay(null)
        },
        [CorrecaoRedacaoEvents.RedacaoCorrigida]: (event) => {
            const data = JSON.parse(event.data) as GetCorrecaoRedacaoResponse
            onCorrecao(data)
        }
    });
}
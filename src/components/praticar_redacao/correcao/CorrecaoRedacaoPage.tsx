'use client'

import { useEffect, useState, useCallback } from 'react'
import { CorrecaoHeader } from './CorrecaoHeader'
import { RedacaoOriginalCard } from './RedacaoOriginalCard'
import { CompetenciasSection } from './CompetenciasSection'
import { AnaliseFeedback } from './AnaliseFeedback'

// Imports da API e Tipos (Assumidos)
// **ATENÇÃO**: Verifique se você tem esses imports configurados corretamente.
import { CorrecaoIA, RedacaoLivreDoc } from '@/apiCalls/redacao-livre/types'
import { getRedacaoLivre, corrigirRedacaoLivre } from '@/apiCalls/redacao-livre' 
import { toast } from 'react-toastify'; 
import { listenCorrecaoRedacao } from '@/apiCalls/redacao'; 
import { CustomEventSourceMap } from '@/apiCalls/types'; 
import { GetCorrecaoRedacaoResponse } from '@/apiCalls/redacao/types'; 
import { CorrigirRedacaoLivreBody } from '@/apiCalls/redacao-livre/types';

export function CorrecaoRedacaoPage({ id }: { id: string }) {
  const competencias = ['c1', 'c2', 'c3', 'c4', 'c5']

  const [data, setData] = useState<RedacaoLivreDoc | null>(null)
  const [activeCompetenciaId, setActiveCompetenciaId] = useState(competencias[0])
  const [correcaoAtual, setCorrecaoAtual] = useState<CorrecaoIA | null>(null)
  const [feedback, setFeedback] = useState<string>("")
  
  // NOVOS ESTADOS PARA O FLUXO DE CORREÇÃO
  const [isCorrecting, setIsCorrecting] = useState(false) // Loading do botão
  const [isListening, setIsListening] = useState(false) // Controla se o SSE está ativo

  // Função para buscar e setar os dados (extraída do useEffect para ser reusada)
  const fetchData = useCallback(async () => {
    try {
        const response = await getRedacaoLivre(id)
        setData(response)
        
        // Configura a última correção como a ativa ao carregar/atualizar os dados
        const ultimaCorrecao = response.correcoesIA[0] 
        if (ultimaCorrecao) {
            setCorrecaoAtual(ultimaCorrecao)
            setActiveCompetenciaId(competencias[0]) 
        } else {
            setCorrecaoAtual(null);
        }
    } catch (error) {
        console.error("Erro ao buscar dados da redação:", error);
        toast.error("Não foi possível carregar os dados da redação.");
    }
  }, [id])

  // --- LÓGICA DE CALLBACKS DO SSE ---
  const onError = useCallback((data: CustomEventSourceMap['appError']) => {
    toast.error(`Erro na correção: ${data.data.statusCode}: ${data.data.message}`)
    setIsCorrecting(false);
    setIsListening(false);
    fetchData(); 
  }, [fetchData]);

  const onDelay = useCallback((_: null) => {
    toast.info('Correção em andamento, por favor aguarde! Você pode fechar esta aba.')
  }, []);

  const onSuccess = useCallback(async (response: GetCorrecaoRedacaoResponse) => {
    setIsCorrecting(false);
    setIsListening(false);
    toast.success('Correção finalizada com sucesso! Atualizando dados...')

    // Ação principal: Re-fetch dos dados para atualizar a lista de correções e a tela
    await fetchData(); 

  }, [fetchData]);
  // ---------------------------------

  // 1. Busca os dados iniciais na API
  useEffect(() => {
    fetchData()
  }, [fetchData]) 

  // 2. Atualiza o feedback quando a competência ou a correção atual muda
  useEffect(() => {
    if (!correcaoAtual) {
      setFeedback("")
      return
    }

    switch (activeCompetenciaId) {
      case 'c1':
        setFeedback(correcaoAtual.feedbackC1 || "")
        break
      case 'c2':
        setFeedback(correcaoAtual.feedbackC2 || "")
        break
      case 'c3':
        setFeedback(correcaoAtual.feedbackC3 || "")
        break
      case 'c4':
        setFeedback(correcaoAtual.feedbackC4 || "")
        break
      case 'c5':
        setFeedback(correcaoAtual.feedbackC5 || "")
        break
      default:
        setFeedback("")
    }
  }, [activeCompetenciaId, correcaoAtual])
  
  // NOVO: Função para solicitar nova correção e escutar o evento
  const handleCorrigirNovamente = async () => {
    const redacaoId = data?.id;
    const tema = data?.tema; // Novo: Captura o tema
    const textoAtual = data?.texto || ""; // Novo: Captura o texto original finalizado

    // Verifica se os dados necessários existem
    if (isCorrecting || !redacaoId || !tema) {
        if (!isCorrecting) {
            toast.error("Dados da redação incompletos para correção.");
        }
        return; 
    }

    try {
        setIsCorrecting(true)
        setIsListening(true)
        toast.info("Solicitando nova correção...")

        // 1. Chama a API para iniciar o processamento (reenviar a redação)
        // CORRIGIDO: Passando o objeto de corpo esperado pela API
        const body: CorrigirRedacaoLivreBody = {
            tema: tema,
            textoRedacao: textoAtual,
        };
        
        await corrigirRedacaoLivre(redacaoId, body) 
        
        // 2. Aguarda a correção ser concluída via SSE/polling
        listenCorrecaoRedacao(redacaoId, onError, onDelay, onSuccess);

    } catch (error) {
        console.error("Erro ao solicitar nova correção:", error)
        toast.error('Erro ao iniciar a correção. Tente novamente.')
        setIsCorrecting(false)
        setIsListening(false)
    }
}

  return (
    <div className="p-6 md:p-10 max-w-7xl mx-auto">
      <CorrecaoHeader />

      <RedacaoOriginalCard 
        idRedacao={data?.id || ''} 
        idCorrecao={correcaoAtual?.id || ''} 
        textoRedacao={correcaoAtual?.texto || "" || data?.texto || ""} 
        temaRedacao={data?.tema || ""} 
        
        // PROPS INJETADAS
        onCorrectAgain={handleCorrigirNovamente} 
        isCorrecting={isCorrecting} 
      />

      <CompetenciasSection
        correcoes={data?.correcoesIA || []}
        activeCompetenciaId={activeCompetenciaId}
        onSelectCompetencia={setActiveCompetenciaId}
        correcaoSelecionada={correcaoAtual}
        onTrocarCorrecao={setCorrecaoAtual}
        redacaoId={data?.id || ''}
      />

      {feedback && (
          <AnaliseFeedback feedback={feedback} />
      )}
    </div>
  )
}
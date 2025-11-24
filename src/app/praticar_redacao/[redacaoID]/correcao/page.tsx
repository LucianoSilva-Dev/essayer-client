import { CorrecaoRedacaoPage } from '@/components/praticar_redacao/correcao/CorrecaoRedacaoPage'

// 1. Adicionamos 'async' na função do componente
export default async function Page({
  params,
}: {
  // 2. Definimos o tipo como uma Promise
  params: Promise<{ redacaoID: string }>;
}) {
  
  // 3. Aguardamos a resolução dos parâmetros antes de ler o ID
  const { redacaoID } = await params;

  return (
    <CorrecaoRedacaoPage id={redacaoID}/>
  )
}
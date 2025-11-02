import { CorrecaoRedacaoPage } from '@/components/praticar_redacao/correcao/CorrecaoRedacaoPage'

// Esta página será renderizada no contexto do layout principal,
// que já inclui o Sidebar e o Header global ("Olá, Nome").
export default function Page() {
  return (
    // O layout principal do app (src/app/layout.tsx) provavelmente 
    // já define o fundo (ex: bg-gray-50), então só precisamos 
    // renderizar o conteúdo da página.
    <CorrecaoRedacaoPage />
  )
}
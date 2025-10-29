// src/app/praticar_redacao/[redacaoId]/page.tsx

import { RedacaoPage } from '@/components/praticar_redacao/editor/RedacaoPage';

// ----- PONTO DE INTEGRAÇÃO (GET) -----
// No futuro, você vai buscar os dados da API aqui
async function getRedacaoData(id: string) {
  // Lógica de API (ex: await apiClient.get(`/redacoes/${id}`))
  
  // Por enquanto, usamos nosso MOCK:
  return {
    id: id,
    tema: 'O impacto das redes sociais na formação da identidade dos jovens',
    duracaoConfigurada: 3600, // (Ex: 1 hora em segundos)
    conteudoSalvo: '', // (O texto que o usuário já salvou)
  };
}
// ----------------------------------------

// Esta é a página que será renderizada
export default async function PraticarRedacaoIdPage({
  params,
}: {
  params: { redacaoId: string };
}) {
  // Buscamos os dados (mocados por enquanto)
  const redacaoData = await getRedacaoData(params.redacaoId);

  return (
    // A página do servidor (aqui) passa os dados para
    // o componente cliente (RedacaoPage), que cuidará de toda a interatividade.
    <div className="w-full min-h-screen bg-[#F1F1F2] p-4 md:p-8">
      <RedacaoPage data={redacaoData} />
    </div>
  );
}
import  { RedacaoPage }  from '@/modules/fazer-tarefa/editar/components/content';

export const metadata = {
  title: 'Editar Redação',
};

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditorTestePage({params}: PageProps) {

  // Passamos um ID qualquer apenas para o componente não quebrar
  const { id } = await params;

  return <RedacaoPage id={id} />;

}
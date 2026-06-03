import { EditorCorrecaoProfessorPage } from '@/modules/redacao/correcao/editar-correcao-professor/components/content'

export const metadata = {
  title: 'Corrigir Redação',
};

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  const { id } = await params;
  const { alunoId } = await searchParams;
  const alunoIdStr = typeof alunoId === 'string' ? alunoId : undefined;

  return <EditorCorrecaoProfessorPage id={id} alunoId={alunoIdStr} />
}

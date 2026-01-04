import { CorrecaoProfessorPage } from '@/modules/redacao/correcao/professor/components/content'

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

  return <CorrecaoProfessorPage id={id} alunoId={alunoIdStr} />
}

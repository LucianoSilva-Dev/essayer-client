import { CorrecaoProfessorPage } from '@/components/praticar_redacao/correcao_professor/CorrecaoProfessorPage'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <CorrecaoProfessorPage id={id} />
}

import { EditorCorrecaoProfessorPage } from '@/components/praticar_redacao/correcao_professor/EditorCorrecaoProfessorPage'

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return <EditorCorrecaoProfessorPage id={id} />
}

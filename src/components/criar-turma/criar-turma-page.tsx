import CriarTurmaForm from "./form/criar-turma-form";

export default function CriarTurmaPage() {
  return (
    <div className="p-6 max-w-3xl mx-auto bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Criar turma</h1>
      <CriarTurmaForm />
    </div>
  );
}

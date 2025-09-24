import CriarTurmaForm from "./form/criar-turma-form";
import CarrosselImagens from "./components/carrossel-imagens";

export default function CriarTurmaPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-3xl mx-auto pt-8">
        {/* Cabeçalho com o carrossel */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-[#3C3C3C] mb-6">Foto da turma</h1>
          <CarrosselImagens />
        </div>
        
        {/* Formulário */}
        <CriarTurmaForm />
      </div>
    </div>
  );
}
import CriarTurmaForm from "./form/criar-turma-form";
import CarrosselImagens from "./components/carrossel-imagens";

export default function CriarTurmaPage() {
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 pt-8">
        {/* Cabeçalho com o carrossel */}
        <div className="text-center mb-8">
          <CarrosselImagens />
        </div>
        
        {/* Formulário */}
        <CriarTurmaForm />
      </div>
    </div>
  );
}
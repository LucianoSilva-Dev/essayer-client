"use client";
import FormActions from "./FormActions";

interface CriarTurmaFormProps {
  nome: string;
  setNome: (nome: string) => void;
  escola: string;
  setEscola: (escola: string) => void;
  iconeId: number;
}

export default function CriarTurmaForm({
  nome,
  setNome,
  escola,
  setEscola,
  iconeId,
}: CriarTurmaFormProps) {
  return (
    <form className="w-full rounded-t-[50px] mr-0 bg-[#E2E2E2] shadow-lg pt-10 px-8 pb-8">
      {/* Seção do nome da turma */}
      <div className="mb-8">
        <label htmlFor="nomeTurma" className="text-[25px] font-semibold text-neutral-dark mb-3">
          Nome da turma<span className="text-red-600">*</span>
        </label>
        <input
          type="text"
          id="nomeTurma"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="w-full p-4 border-b-2 border-neutral-dark rounded-[10px] h-20 bg-transparent outline-none placeholder-gray-400 text-lg focus:border-1 focus:border-b-4 transition-all duration-100"
          placeholder="Digite o nome da turma"
        />
        <label htmlFor="nomeTurma" className="text-sm text-gray-600 mb-4">
          Escolha um nome claro e fácil de lembrar para que você e seus alunos encontrem a turma rapidamente.
        </label>
      </div>

      {/* Seção da escola da turma */}
      <div className="mb-8">
        <label htmlFor="escola" className="text-[25px] font-semibold text-neutral-dark mb-3">
          Escola (Opcional)
        </label>
        <textarea
          value={escola}
          id="escola"
          onChange={(e) => setEscola(e.target.value)}
          className="w-full p-4 border-b-2 border-neutral-dark rounded-[10px] h-25 bg-transparent outline-none placeholder-gray-400 resize-none text-lg focus:border-1 focus:border-b-4 transition-all duration-100"
          placeholder="Digite o nome da escola ou instituição"
          rows={3}
        />
        <label htmlFor="escola" className="text-sm text-gray-600 mb-4">
          O nome da escola ajuda a identificar a turma, especialmente se você leciona em mais de uma.
        </label>
      </div>

      {/* Ações do formulário */}
      <FormActions nome={nome} escola={escola} iconeId={iconeId} />
    </form>
  );
}
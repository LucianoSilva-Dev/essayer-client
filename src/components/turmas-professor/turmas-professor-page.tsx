import ListaTurmas from "./ListaTurmas";
import NovoCriarTurmaCard from "./NovoCriarTurmaCard";
import ModernCorrecoesCard from "./ModernCorrecoesCard";
import NovoEntrarTurmaCard from "./NovoEntrarTurma";

export default function TurmasProfessorPage() {
  return (
    // Mantive o min-h na página principal para o footer não subir,
    // mas os elementos internos não vão mais ser forçados a esticar.
    <main className="grid grid-cols-3 gap-8 pt-6 w-full min-h-[calc(100vh-80px)] pb-10 pr-12">
      {/* Coluna esquerda */}
      <ListaTurmas />

      {/* Coluna direita */}
      <div className="col-span-2 flex flex-col gap-8">
        {/* Card Criar Turma */}
        <NovoCriarTurmaCard />
        
        {/* Grid Inferior: Correções e Entrar em Turma */}
        {/* ALTERAÇÃO AQUI: Removido 'h-full'. Mantido 'items-stretch'. */}
        <div className="grid grid-cols-4 gap-6 items-stretch">
          
          <ModernCorrecoesCard className="col-span-2" />
          
          <NovoEntrarTurmaCard className="col-span-2" />
          
        </div>
      </div>
    </main>
  );
}
import ListaTurmas from "./ListaTurmas";
import NovoCriarTurmaCard from "./NovoCriarTurmaCard";
import ModernCorrecoesCard from "./ModernCorrecoesCard";
import NovoEntrarTurmaCard from "./NovoEntrarTurma";

export default function TurmasProfessorPage() {
  return (
    // Grid responsivo: 1 coluna no mobile, 3 colunas no desktop (lg)
    // min-h-[calc(100vh-5rem)] substitui o valor fixo de 80px por 5rem
    <main className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8 pt-6 w-full min-h-[calc(100vh-5rem)] pb-10 px-4 md:pr-12 md:pl-0">
      {/* Coluna esquerda (Lista ocupa 100% no mobile e 1/3 no desktop) */}
      <ListaTurmas />

      {/* Coluna direita (Ocupa 100% no mobile e 2/3 no desktop) */}
      <div className="col-span-1 lg:col-span-2 flex flex-col gap-6 md:gap-8">
        {/* Card Criar Turma */}
        <NovoCriarTurmaCard />
        
        {/* Grid Inferior: Transforma em 1 coluna no mobile e 2 no tablet/desktop */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          <ModernCorrecoesCard className="w-full" />
          <NovoEntrarTurmaCard className="w-full" />
        </div>
      </div>
    </main>
  );
}

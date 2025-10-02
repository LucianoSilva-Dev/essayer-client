import ListaTurmas from "./ListaTurmas";
import CriarTurmaCard from "./CriarTurmaCard";
import CorrecoesCard from "./CorrecoesCard";
import EntrarTurmaCard from "./EntrarTurmaCard";

export default function TurmasProfessorPage() {
  return (
    <main className="grid grid-cols-3 gap-6 p-6 w-full h-[100vh] overflow-x-hidden">
      {/* Coluna esquerda */}
      <ListaTurmas />

      {/* Coluna direita */}
      <div className="col-span-2 grid grid-rows-2 gap-6">
        <CriarTurmaCard />
        <div className="grid grid-cols-4 gap-6">
          <CorrecoesCard className="col-span-2" />
          <EntrarTurmaCard className="col-span-2" />
        </div>
      </div>
    </main>
  );
}


import { CriarRedacaoForm } from './CriarRedacaoForm';
import { RedacoesCriadasList } from './RedacoesCriadasList';

export default function PraticarRedacaoPage() {
  return (
    // ALTERAÇÃO: Padding padrão e responsivo
    <div className="flex-1 p-6 md:p-8 bg-gray-50">
      {/* ALTERAÇÃO: Título reduzido de text-[28px] para text-2xl (muito mais padrão) */}
      <h1 className="mb-6 text-2xl font-semibold text-gray-800">
        Crie sua redação e começe a praticar
      </h1>

      <main className="space-y-8">
        <CriarRedacaoForm />
        <RedacoesCriadasList />
      </main>
    </div>
  );
}
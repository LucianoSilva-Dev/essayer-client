import Link from "next/link";

export function NotFoundData() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl md:text-5xl">
        404: Página não encontrada
      </h1>

      <p className="mt-3 max-w-md text-base text-gray-600 sm:text-lg">
        Esta página não existe ou foi movida.
      </p>

      <Link
        href="/home"
        className="
          mt-6
          rounded-lg
          bg-brand-teal-dark
          px-6
          py-3
          text-sm
          font-medium
          text-white
          transition-colors
          hover:bg-[#043641]
          sm:text-base
        "
      >
        Voltar para a home
      </Link>
    </main>
  );
}

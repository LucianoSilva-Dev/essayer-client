'use client'

import Link from "next/link";
import Skeleton from "react-loading-skeleton";
import { Plus } from "lucide-react";
import { useAuth } from "@/shared/contexts/auth-context";
import type { Repertorio } from "@/types/repertorio";
import RepertorioCard from "@/modules/repertorio/repertorio-card";

interface RepertorioGridProps {
  isLoading: boolean;
  repertorios: Repertorio[];
  tipoVisualizacao: "todos" | "salvos";
  activeFilterCount: number;
}

export default function RepertorioGrid({ isLoading, repertorios, tipoVisualizacao, activeFilterCount }: RepertorioGridProps) {
  const { userData } = useAuth();

  if (isLoading) {
    return (
      <div className="text-center py-12">
        <Skeleton count={7} height={25} width={'90%'} />
      </div>
    );
  }

  if (repertorios.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <p className="text-gray-500 mb-4">
            {activeFilterCount > 0
              ? "Nenhum repertório encontrado com os filtros aplicados."
              : tipoVisualizacao === "salvos"
                ? "Você ainda não tem repertórios salvos."
                : "Nenhum repertório disponível."}
          </p>
          
          {(userData?.cargo === 'professor' || userData?.cargo === 'admin') && (
            <Link
              href="/adicionar"
              className="inline-flex items-center px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors"
            >
              <Plus size={18} className="mr-2" />
              Adicionar novo repertório
            </Link>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {repertorios.map((repertorio) => (
        <RepertorioCard key={repertorio.id} repertorio={repertorio} />
      ))}
    </div>
  );
}
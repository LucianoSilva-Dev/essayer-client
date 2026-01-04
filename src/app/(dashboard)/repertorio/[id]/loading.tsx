import React from "react";

export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-50 pb-12">
      <div className="container mx-auto px-4 pt-6 md:pt-8">
        <div className="max-w-4xl mx-auto">

          {/* Header Superior: Ações Externas Skeleton */}
          <div className="flex justify-end items-center mb-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
              <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
            </div>
          </div>

          {/* Card Principal Skeleton */}
          <div className="bg-[#EAEAEA] rounded-[2rem] p-6 md:p-10 shadow-sm">

            {/* Header Interno Skeleton */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Creator Info Skeleton */}
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse"></div>
                <div className="space-y-2">
                  <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-24 h-3 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Pill e Ações Rápidas Skeleton */}
              <div className="flex items-center self-start md:self-center gap-3">
                {/* Pill Principal Skeleton */}
                <div className="bg-white rounded-full px-5 py-2 flex items-center shadow-sm">
                  <div className="w-16 h-4 bg-gray-300 rounded animate-pulse"></div>
                  <span className="mx-2 text-gray-300">|</span>
                  <div className="w-32 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>

                {/* Ações Rápidas Skeleton */}
                <div className="flex items-center gap-1">
                  <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
                  <div className="w-6 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>
                <div className="w-10 h-10 bg-gray-300 rounded-full animate-pulse"></div>
              </div>
            </div>

            {/* Conteúdo Principal Skeleton */}
            <div className="mt-12 space-y-8">
              {/* Título Skeleton */}
              <div className="text-center">
                <div className="w-3/4 h-8 bg-gray-300 rounded animate-pulse mx-auto mb-4"></div>
                <div className="w-1/2 h-6 bg-gray-300 rounded animate-pulse mx-auto"></div>
              </div>

              {/* Conteúdo Específico Skeleton */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <div className="w-48 h-5 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-3/4 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>

                <div className="space-y-3">
                  <div className="w-32 h-5 bg-gray-300 rounded animate-pulse"></div>
                  <div className="w-2/3 h-4 bg-gray-300 rounded animate-pulse"></div>
                </div>

                {/* Informações Adicionais Skeleton */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
                  <div className="space-y-3">
                    <div className="w-40 h-5 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-5/6 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-36 h-5 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-full h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer do Card Skeleton */}
            <div className="mt-8 pt-6 border-t border-gray-300">
              <div className="flex flex-wrap gap-4">
                {[...Array(4)].map((_, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 rounded animate-pulse"></div>
                    <div className="w-20 h-4 bg-gray-300 rounded animate-pulse"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Seção de Comentários Skeleton */}
          <div className="mt-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              {/* Header Comentários Skeleton */}
              <div className="flex items-center justify-between mb-6">
                <div className="w-32 h-6 bg-gray-300 rounded animate-pulse"></div>
                <div className="w-24 h-4 bg-gray-300 rounded animate-pulse"></div>
              </div>

              {/* Formulário de Comentário Skeleton */}
              <div className="mb-6 p-4 border border-gray-200 rounded-xl">
                <div className="w-full h-20 bg-gray-100 rounded animate-pulse mb-3"></div>
                <div className="flex justify-end">
                  <div className="w-24 h-8 bg-gray-300 rounded animate-pulse"></div>
                </div>
              </div>

              {/* Lista de Comentários Skeleton */}
              <div className="space-y-4">
                {[...Array(3)].map((_, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-xl">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
                      <div className="space-y-1">
                        <div className="w-24 h-3 bg-gray-300 rounded animate-pulse"></div>
                        <div className="w-16 h-2 bg-gray-300 rounded animate-pulse"></div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="w-full h-3 bg-gray-200 rounded animate-pulse"></div>
                      <div className="w-3/4 h-3 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}
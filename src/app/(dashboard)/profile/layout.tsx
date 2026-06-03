"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/shared/contexts/auth-context";
import { AnimatePresence } from "framer-motion";
import SettingsSidebar from "@/modules/personal-data/profile/components/settings-side-bar";
import Loading from "./loading";
import { ChevronRight, X } from "lucide-react";

export default function ProfileSettingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { userData, isLoading: isAuthLoading } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isAuthLoading && !userData) {
      router.push("/login");
    }
  }, [isAuthLoading, userData, router]);

  if (isAuthLoading) {
    return <Loading />;
  }

  if (!userData) {
    return null;
  }

  return (
    <main className="min-h-[calc(100vh-80px)] bg-gray-50">
      <div className="flex flex-col lg:flex-row gap-0 lg:gap-8 h-full">
        {/* Botão sutil para abrir sidebar de configurações no mobile (não parece um header) */}
        <div className="lg:hidden px-4 pt-3 pb-1">
          <button
            onClick={() => setIsSidebarOpen(true)}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors"
            aria-label="Abrir menu de configurações"
          >
            <span>Menu</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Overlay Mobile */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 bg-black/50 lg:hidden z-40"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed lg:static inset-y-0 left-0 top-0 w-full sm:w-80 lg:w-116
            bg-white z-50 transform transition-transform duration-300 lg:transform-none
            lg:top-0 overflow-y-auto shrink-0
            ${
              isSidebarOpen
                ? "translate-x-0"
                : "-translate-x-full lg:translate-x-0"
            }
          `}
        >
          {/* Botão fechar no mobile dentro da sidebar */}
          <div className="lg:hidden flex items-center justify-between px-4 pt-4 pb-2 border-b border-gray-100">
            <span className="text-lg font-semibold text-neutral-dark">Configurações</span>
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              aria-label="Fechar menu de configurações"
            >
              <X className="w-5 h-5 text-neutral-dark" />
            </button>
          </div>
          <div className="p-4 sm:p-6 lg:p-10">
            <SettingsSidebar
              cargo={userData.role}
              onItemClick={() => setIsSidebarOpen(false)}
            />
          </div>
        </aside>

        {/* Conteúdo */}
        <section className="flex-1 w-full overflow-y-auto">
          <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
            <AnimatePresence mode="wait">{children}</AnimatePresence>
          </div>
        </section>
      </div>
    </main>
  );
}

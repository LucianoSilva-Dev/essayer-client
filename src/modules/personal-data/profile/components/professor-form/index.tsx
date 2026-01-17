"use client";

import { useState } from "react";
import { useProfile } from "@/shared/contexts/profile-context";
import { createProfessorRequest } from "@/lib/apiCalls/usuario";
import { toast } from "react-toastify";
import {
  Loader2,
  GraduationCap,
  BookOpen,
  Users,
  FileText,
} from "lucide-react";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween" as const,
  ease: "anticipate" as const,
  duration: 0.5 as const,
};

export default function BecomeProfessorForm() {
  const { profile } = useProfile();
  const [lattes, setLattes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile) return;

    if (!lattes.trim()) {
      toast.error("Por favor, insira o link do seu currículo Lattes.");
      return;
    }

    if (!isValidUrl(lattes)) {
      toast.error(
        "Por favor, insira um link válido (ex: https://lattes.cnpq.br/...)."
      );
      return;
    }

    setIsSubmitting(true);

    try {
      await createProfessorRequest(profile.id, { lattes });
      toast.success(
        "Solicitação enviada com sucesso! Aguarde a análise dos administradores."
      );
      setLattes("");
    } catch (error) {
      console.error("Erro ao enviar solicitação:", error);
      toast.error("Erro ao enviar solicitação. Tente novamente mais tarde.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputBaseStyle =
    "w-full px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg lg:text-2xl text-neutral-dark rounded-lg sm:rounded-2xl transition-colors bg-white border border-gray-300 focus:outline-none focus:ring-2 focus:ring-brand-teal-dark h-12 sm:h-16";

  return (
    <motion.div
      key="become-professor" // Chave única para AnimatePresence
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      className="bg-transparent"
    >
      <div className="w-full">
        <div className="mb-6 sm:mb-8 lg:mb-10">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-neutral-dark mb-2 sm:mb-3 lg:mb-4">
            Tornar-se Professor
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-[#898787]">
            Torne-se um professor no Incita e tenha acesso a ferramentas
            exclusivas para gerenciar suas turmas e alunos.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-10 lg:mb-12">
          <div className="bg-gray-50 p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-2xl border border-gray-100 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="p-2 bg-brand-teal-dark/10 rounded-lg">
                <BookOpen className="w-5 h-5 sm:w-6 sm:h-6 text-brand-teal-dark" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-neutral-dark">
                Criar Repertórios
              </h3>
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-[#898787]">
              Compartilhe seu conhecimento criando repertórios socioculturais
              para seus alunos.
            </p>
          </div>

          <div className="bg-gray-50 p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-2xl border border-gray-100 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="p-2 bg-brand-teal-dark/10 rounded-lg">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-brand-teal-dark" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-neutral-dark">
                Gerenciar Turmas
              </h3>
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-[#898787]">
              Crie turmas, convide alunos e acompanhe o desempenho de cada um.
            </p>
          </div>

          <div className="bg-gray-50 p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-2xl border border-gray-100 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="p-2 bg-brand-teal-dark/10 rounded-lg">
                <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-brand-teal-dark" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-neutral-dark">
                Atividades de Redação
              </h3>
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-[#898787]">
              Passe atividades de redação e corrija os textos dos seus alunos
              com facilidade.
            </p>
          </div>

          <div className="bg-gray-50 p-4 sm:p-5 lg:p-6 rounded-lg sm:rounded-2xl border border-gray-100 hover:shadow-sm transition-shadow">
            <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
              <div className="p-2 bg-brand-teal-dark/10 rounded-lg">
                <GraduationCap className="w-5 h-5 sm:w-6 sm:h-6 text-brand-teal-dark" />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-semibold text-neutral-dark">
                Evolução Acadêmica
              </h3>
            </div>
            <p className="text-xs sm:text-sm lg:text-base text-[#898787]">
              Acompanhe a evolução das notas e competências dos seus alunos ao
              longo do tempo.
            </p>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-4 sm:space-y-6 lg:space-y-8"
        >
          <div className="space-y-1.5 sm:space-y-2">
            <label
              htmlFor="lattes"
              className="text-base sm:text-lg lg:text-2xl font-medium text-neutral-dark px-2 block"
            >
              Currículo Lattes
            </label>
            <input
              type="url"
              id="lattes"
              value={lattes}
              onChange={(e) => setLattes(e.target.value)}
              placeholder="https://lattes.cnpq.br/..."
              required
              className={inputBaseStyle}
            />
            <p className="text-xs sm:text-sm text-[#898787] px-2">
              Insira o link para o seu currículo Lattes para que possamos
              analisar sua solicitação.
            </p>
          </div>

          <div className="flex justify-start sm:justify-end pt-2 sm:pt-4 lg:pt-6">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto px-6 sm:px-9 py-2.5 sm:py-3 text-sm sm:text-base lg:text-lg font-medium text-white bg-brand-teal-dark rounded-full hover:bg-[#064e5a] flex items-center justify-center gap-2 min-w-[150px] sm:min-w-[200px] disabled:opacity-70 disabled:cursor-not-allowed transition-colors"
            >
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
              ) : (
                "Enviar Solicitação"
              )}
            </button>
          </div>
        </form>
      </div>
    </motion.div>
  );
}

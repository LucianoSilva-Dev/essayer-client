"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { EmailVerificationModal } from "../email-verification-modal";
import { usePersonalDataForm } from "../../hooks/UseProfileFormContent";

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

export default function PersonalDataForm() {
  const {
    profile,
    isProfileLoading,

    nome,
    sobrenome,
    email,
    errors,

    isEditing,
    isSubmitting,
    isVerifying,

    isVerificationModalOpen,
    pendingEmail,

    setNome,
    setSobrenome,
    setEmail,
    setIsEditing,
    setIsVerificationModalOpen,

    handleSubmit,
    handleCancel,
    handleVerifyCode,
    handleResendCode,
  } = usePersonalDataForm();

  if (isProfileLoading || !profile) {
    return (
      <div className="flex justify-center items-center min-h-75">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // estilos (inalterados)
  const inputBaseStyle =
    "w-full px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg lg:text-2xl text-[#898787] rounded-lg sm:rounded-2xl transition-colors h-12 sm:h-16";
  const readOnlyStyle = "bg-white border border-transparent cursor-not-allowed";
  const editStyle =
    "bg-white border border-gray-300 text-neutral-dark focus:outline-none focus:ring-2 focus:ring-brand-teal-dark";
  const errorStyle = "border-red-500 focus:ring-red-500";

  return (
    <>
      <motion.div
        key="personal-data"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="bg-transparent"
      >
        <form onSubmit={handleSubmit} className="w-full">
          {/* Cabeçalho da Aba */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-10 gap-4 sm:gap-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-neutral-dark">
              Dados pessoais
            </h1>

            <div className="flex gap-2 sm:gap-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none px-6 sm:px-9 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-medium text-brand-teal-dark bg-white border border-brand-teal-dark rounded-full hover:bg-gray-50 transition-colors disabled:opacity-70"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none px-6 sm:px-9 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-medium text-white bg-brand-teal-dark rounded-full hover:bg-[#064e5a] flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed min-w-25 sm:min-w-35"
                  >
                    {isSubmitting ? (
                      <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                    ) : (
                      "Salvar"
                    )}
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsEditing(true)}
                  className="cursor-pointer flex-1 sm:flex-none px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-medium text-brand-teal-dark bg-white border border-brand-teal-dark rounded-full hover:bg-gray-50 transition-colors"
                >
                  Alterar dados
                </button>
              )}
            </div>
          </div>

          {/* Campos do Formulário */}
          <div className="space-y-4 sm:space-y-6 lg:space-y-8">
            {/* Linha Nome e Sobrenome */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 lg:gap-6">
              <div className="space-y-1.5 sm:space-y-2">
                <label
                  htmlFor="nome"
                  className="text-base sm:text-lg lg:text-2xl font-medium text-neutral-dark px-2 block"
                >
                  Nome
                </label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  readOnly={!isEditing}
                  className={`${inputBaseStyle} ${
                    isEditing ? editStyle : readOnlyStyle
                  } ${errors.nome ? errorStyle : ""}`}
                />
                {errors.nome && (
                  <p className="mt-1 text-xs sm:text-sm text-red-500 px-2">
                    {errors.nome}
                  </p>
                )}
              </div>
              <div className="space-y-1.5 sm:space-y-2">
                <label
                  htmlFor="sobrenome"
                  className="text-base sm:text-lg lg:text-2xl font-medium text-neutral-dark px-2 block"
                >
                  Sobrenome
                </label>
                <input
                  type="text"
                  id="sobrenome"
                  value={sobrenome}
                  onChange={(e) => setSobrenome(e.target.value)}
                  readOnly={!isEditing}
                  className={`${inputBaseStyle} ${
                    isEditing ? editStyle : readOnlyStyle
                  }`}
                />
              </div>
            </div>

            {/* Linha Email */}
            <div className="space-y-1.5 sm:space-y-2">
              <label
                htmlFor="email"
                className="text-base sm:text-lg lg:text-2xl font-medium text-neutral-dark px-2 block"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                readOnly={!isEditing} // O email não deve ser editável, mas a UI sugere que sim
                className={`${inputBaseStyle} ${
                  isEditing ? editStyle : readOnlyStyle
                } ${errors.email ? errorStyle : ""}`}
              />
              {errors.email && (
                <p className="mt-1 text-xs sm:text-sm text-red-500 px-2">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Linha Senha */}
            <div className="space-y-1.5 sm:space-y-2 flex flex-col justify-center">
              <label className="text-base sm:text-lg lg:text-2xl font-medium text-neutral-dark px-2 block mb-1 sm:mb-2">
                Senha
              </label>
              <Link
                href="/forgot-password"
                className="text-base sm:text-lg lg:text-xl text-brand-teal-dark hover:text-[#064e5a] hover:underline px-2 transition-colors"
              >
                Esqueci minha senha
              </Link>
            </div>
          </div>
        </form>

        <EmailVerificationModal
          isOpen={isVerificationModalOpen}
          onClose={() => setIsVerificationModalOpen(false)}
          onVerify={handleVerifyCode}
          onResend={handleResendCode}
          email={pendingEmail || ""}
          isLoading={isVerifying}
        />
      </motion.div>
    </>
  );
}

"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/shared/contexts/auth-context";
import { useProfile } from "@/shared/contexts/profile-context"; // Caminho correto
import { toast } from "react-toastify";
import { Save, Loader2, EyeOff } from "lucide-react";
import { EmailVerificationModal } from "../email-verification-modal";
import {
  createRequisicaoEmail,
  validateRequisicaoEmail,
} from "@/lib/apiCalls/requisicao-email";

// Configurações de animação do Framer Motion
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
  const { profile, updateProfile, isLoading: isProfileLoading } = useProfile();

  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [nome, setNome] = useState("");
  const [sobrenome, setSobrenome] = useState("");
  const [email, setEmail] = useState("");
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [verificationId, setVerificationId] = useState<string | null>(null);
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Popula o formulário quando o perfil é carregado
  useEffect(() => {
    if (profile) {
      // Divide o nome vindo da API em nome e sobrenome
      const [firstName, ...lastName] = profile.nome.split(" ");
      setNome(firstName || "");
      setSobrenome(lastName.join(" ") || "");
      setEmail(profile.email || "");
    }
  }, [profile]);

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    if (!nome.trim()) newErrors.nome = "Nome é obrigatório";
    if (!email.trim()) {
      newErrors.email = "E-mail é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "E-mail inválido";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCancel = () => {
    setIsEditing(false);
    setErrors({});
    // Reseta para os valores originais do perfil
    if (profile) {
      const [firstName, ...lastName] = profile.nome.split(" ");
      setNome(firstName || "");
      setSobrenome(lastName.join(" ") || "");
      setEmail(profile.email || "");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm() || !profile) return;

    setIsSubmitting(true);

    // Junta nome e sobrenome para enviar à API (PUT /usuario/{id})
    const fullName = `${nome.trim()} ${sobrenome.trim()}`.trim();

    try {
      // Verifica se o email mudou
      if (email !== profile.email) {
        // Inicia o fluxo de verificação
        const response = await createRequisicaoEmail(email);
        setVerificationId(response.id);
        setPendingEmail(email);
        setIsVerificationModalOpen(true);
        setIsSubmitting(false); // Para o loading do botão salvar
        return; // Interrompe o fluxo normal
      }

      // Se o email não mudou, segue o fluxo normal
      await updateProfile({
        nome: fullName,
        email: email,
        // Mantém o lattes se for professor, pois o updateProfile espera um Partial<UserProfile>
        ...(profile.tipo === "professor" &&
          "curriculoLattes" in profile && { lattes: profile.curriculoLattes }),
      });

      toast.success("Perfil atualizado com sucesso!");
      setIsEditing(false);
    } catch (error) {
      console.error("Erro ao atualizar perfil:", error);
      toast.error("Ocorreu um erro ao atualizar o perfil.");
      setIsSubmitting(false);
      handleCancel();
    } finally {
      // Só desativa o loading se não abriu o modal (se abriu, já desativou antes)
      if (email === profile.email) {
        setIsSubmitting(false);
      }
    }
  };

  const handleVerifyCode = async (code: string) => {
    if (!verificationId || !pendingEmail || !profile) return;

    setIsVerifying(true);
    try {
      await validateRequisicaoEmail(verificationId, code);

      // Se validou com sucesso, atualiza o perfil com o novo email
      const fullName = `${nome.trim()} ${sobrenome.trim()}`.trim();

      await updateProfile({
        nome: fullName,
        email: pendingEmail,
        ...(profile.tipo === "professor" &&
          "curriculoLattes" in profile && { lattes: profile.curriculoLattes }),
      });

      toast.success("Email verificado e perfil atualizado com sucesso!");
      setIsVerificationModalOpen(false);
      setIsEditing(false);
      setVerificationId(null);
      setPendingEmail(null);
    } catch (error) {
      console.error("Erro ao verificar código:", error);
      toast.error("Código inválido ou expirado.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResendCode = async () => {
    if (!pendingEmail) return;
    try {
      const response = await createRequisicaoEmail(pendingEmail);
      setVerificationId(response.id);
      toast.success("Novo código enviado!");
    } catch (error) {
      console.error("Erro ao reenviar código:", error);
      toast.error("Erro ao reenviar código.");
      setIsEditing(false);
    }
  };

  if (isProfileLoading || !profile) {
    return (
      <div className="flex justify-center items-center min-h-[300px]">
        <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
      </div>
    );
  }

  // Estilos dos Inputs
  const inputBaseStyle =
    "w-full px-4 sm:px-6 py-2 sm:py-3 text-base sm:text-lg lg:text-2xl text-[#898787] rounded-lg sm:rounded-2xl transition-colors h-12 sm:h-16";
  const readOnlyStyle = "bg-white border border-transparent cursor-not-allowed";
  const editStyle =
    "bg-white border border-gray-300 text-[#3C3C3C] focus:outline-none focus:ring-2 focus:ring-[#075F70]";
  const errorStyle = "border-red-500 focus:ring-red-500";

  return (
    <>
      <motion.div
        key="personal-data" // Chave única para AnimatePresence
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
        className="bg-transparent" //rounded-2xl shadow-sm p-10
      >
        <form onSubmit={handleSubmit} className="w-full">
          {/* Cabeçalho da Aba */}
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 sm:mb-10 gap-4 sm:gap-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-medium text-[#3C3C3C]">
              Dados pessoais
            </h1>

            <div className="flex gap-2 sm:gap-4">
              {isEditing ? (
                <>
                  <button
                    type="button"
                    onClick={handleCancel}
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none px-6 sm:px-9 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-medium text-[#075F70] bg-white border border-[#075F70] rounded-full hover:bg-gray-50 transition-colors disabled:opacity-70"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="flex-1 sm:flex-none px-6 sm:px-9 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-medium text-white bg-[#075F70] rounded-full hover:bg-[#064e5a] flex items-center justify-center gap-2 transition-colors disabled:opacity-70 disabled:cursor-not-allowed min-w-[100px] sm:min-w-[140px]"
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
                  className="cursor-pointer flex-1 sm:flex-none px-6 sm:px-8 py-2 sm:py-3 text-sm sm:text-base lg:text-lg font-medium text-[#075F70] bg-white border border-[#075F70] rounded-full hover:bg-gray-50 transition-colors"
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
                  className="text-base sm:text-lg lg:text-2xl font-medium text-[#3C3C3C] px-2 block"
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
                  className="text-base sm:text-lg lg:text-2xl font-medium text-[#3C3C3C] px-2 block"
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
                className="text-base sm:text-lg lg:text-2xl font-medium text-[#3C3C3C] px-2 block"
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
              <label className="text-base sm:text-lg lg:text-2xl font-medium text-[#3C3C3C] px-2 block mb-1 sm:mb-2">
                Senha
              </label>
              <Link
                href="/forgot-password"
                className="text-base sm:text-lg lg:text-xl text-[#075F70] hover:text-[#064e5a] hover:underline px-2 transition-colors"
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

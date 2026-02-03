

"use client";

import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useProfile } from "@/shared/contexts/profile-context";
import {
  createRequisicaoEmail,
  validateRequisicaoEmail,
} from "@/lib/apiCalls/requisicao-email";

export function usePersonalDataForm() {
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

  useEffect(() => {
    if (!profile) return;

    const [firstName, ...lastName] = profile.nome.split(" ");
    setNome(firstName || "");
    setSobrenome(lastName.join(" ") || "");
    setEmail(profile.email || "");
  }, [profile]);

  const validateForm = () => {
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

  const resetToProfile = () => {
    if (!profile) return;

    const [firstName, ...lastName] = profile.nome.split(" ");
    setNome(firstName || "");
    setSobrenome(lastName.join(" ") || "");
    setEmail(profile.email || "");
    setErrors({});
    setIsEditing(false);
  };

  const handleCancel = () => {
    resetToProfile();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile || !validateForm()) return;

    setIsSubmitting(true);

    const fullName = `${nome.trim()} ${sobrenome.trim()}`.trim();

    try {
      if (email !== profile.email) {
        const response = await createRequisicaoEmail(email);
        setVerificationId(response.id);
        setPendingEmail(email);
        setIsVerificationModalOpen(true);
        setIsSubmitting(false);
        return;
      }

      await updateProfile({
        nome: fullName,
        email,
        ...(profile.tipo === "professor" &&
          "curriculoLattes" in profile && {
            lattes: profile.curriculoLattes,
          }),
      });

      toast.success("Perfil atualizado com sucesso!");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      toast.error("Ocorreu um erro ao atualizar o perfil.");
      resetToProfile();
    } finally {
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

      const fullName = `${nome.trim()} ${sobrenome.trim()}`.trim();

      await updateProfile({
        nome: fullName,
        email: pendingEmail,
        ...(profile.tipo === "professor" &&
          "curriculoLattes" in profile && {
            lattes: profile.curriculoLattes,
          }),
      });

      toast.success("Email verificado e perfil atualizado com sucesso!");
      setIsVerificationModalOpen(false);
      setIsEditing(false);
      setVerificationId(null);
      setPendingEmail(null);
    } catch (error) {
      console.error(error);
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
      console.error(error);
      toast.error("Erro ao reenviar código.");
      setIsEditing(false);
    }
  };

  return {
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
  };
}

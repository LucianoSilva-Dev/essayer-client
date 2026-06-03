"use client";

import { useState, useMemo } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { authClient } from "@/lib/betterAuth/auth-client";
import { useAuth } from "@/shared/contexts/auth-context";

export function useContentResetPassword() {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();
  const { isLoggedIn } = useAuth();

  const token = searchParams.get("token") || searchParams.get("id");
  const passwordRegex = /^(?=.*[a-z])(?=.*\d).{8,24}$/;

  const passwordsMatch = useMemo(
    () => newPassword === confirmPassword && newPassword.length > 0,
    [newPassword, confirmPassword]
  );

  const isFormValid = useMemo(
    () => passwordRegex.test(newPassword) && passwordsMatch,
    [newPassword, passwordsMatch]
  );

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!isFormValid || !token) return;

    setIsSubmitting(true);
    try {
      const { error } = await authClient.resetPassword({ newPassword, token });
      if (error) {
        throw new Error(error.message || "Erro ao redefinir a senha.");
      }

      router.push(
        isLoggedIn
          ? "/profile?message=password-reset-success"
          : "/login?message=password-reset-success"
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return {
    state: {
      newPassword,
      confirmPassword,
      showNewPassword,
      showConfirmPassword,
      isSubmitting,
      passwordsMatch,
      isFormValid,
      passwordRegex,
    },
    actions: {
      setNewPassword,
      setConfirmPassword,
      setShowNewPassword,
      setShowConfirmPassword,
      handleSubmit,
    },
  };
}

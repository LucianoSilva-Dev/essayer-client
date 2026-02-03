"use client";

import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";
import { useContentResetPassword } from "../../hooks/useContentResetPassword";

export default function ResetPasswordContent() {
  const {
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
  } = useContentResetPassword();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row px-4 py-6 w-full overflow-x-hidden">
      <div className="flex-1 flex flex-col justify-center px-6 md:px-20">
        <h1 className="text-4xl font-semibold text-[#282133]">
          Redefinição de senha
        </h1>

        <div className="w-full h-0.5 bg-[#D3D3D3] my-4" />

        <p className="text-xl text-neutral-dark mb-8 max-w-2xl">
          Insira e confirme a nova senha da sua conta.
        </p>

        <form onSubmit={handleSubmit} className="max-w-2xl">
          {/* Nova senha */}
          <label className="block text-xl mb-2">Nova senha</label>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="input"
              placeholder="Digite sua nova senha"
              required
            />
            <button
              type="button"
              onClick={() => setShowNewPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showNewPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          <p
            className={`text-xs mt-1 ${
              newPassword.length === 0
                ? "text-zinc-600"
                : passwordRegex.test(newPassword)
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            A senha precisa ter de 8 a 24 caracteres, ao menos uma letra minúscula
            e um número.
          </p>

          {/* Confirmar senha */}
          <label className="block text-xl mt-8 mb-2">
            Confirme a senha
          </label>
          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input"
              placeholder="Confirme sua nova senha"
              required
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2"
            >
              {showConfirmPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>

          {confirmPassword.length > 0 && (
            <p
              className={`text-xs mt-1 ${
                passwordsMatch ? "text-green-600" : "text-red-500"
              }`}
            >
              {passwordsMatch
                ? "As senhas coincidem"
                : "As senhas não coincidem"}
            </p>
          )}

          <button
            type="submit"
            disabled={!isFormValid || isSubmitting}
            className="btn-primary w-full mt-10 disabled:bg-gray-400"
          >
            {isSubmitting ? "Redefinindo..." : "Redefinir senha"}
          </button>

          <div className="mt-6 text-center">
            <Link href="/forgot-password/verify-code" className="link">
              Voltar
            </Link>
          </div>
        </form>
      </div>

      <div className="hidden md:flex flex-1 relative rounded-3xl overflow-hidden">
        <Image
          src="/images/login.jpg"
          alt="Redefinir senha"
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}

"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import { useAuth } from "@/shared/contexts/auth-context";
import { login as apiLogin, getMe } from "@/lib/apiCalls/auth";

export function useContentLogin() {
  const { login, isLoggedIn } = useAuth();
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alreadyLogged, setAlreadyLogged] = useState(true);

  // Redireciona se já estiver logado
  useEffect(() => {
    if (isLoggedIn && alreadyLogged) {
      toast.info("Você já está logado.");
      router.replace("/profile");
    }
  }, [isLoggedIn, alreadyLogged, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    console.log("Submitting login with", { email, password });
    try {
      setAlreadyLogged(false);
      await apiLogin({ email, senha: password });
      const me = await getMe();
      login(me);
      router.push("/home");
    } catch {
      // erro já tratado globalmente
    }
  }

  return {
    state: {
      showPassword,
      email,
      password,
    },
    actions: {
      setShowPassword,
      setEmail,
      setPassword,
      handleSubmit,
    },
  };
}

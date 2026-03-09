"use client";

import React, { createContext, useContext, useMemo } from "react";
import { UserLoginResponse } from "@/lib/apiCalls/auth/types";
import { authClient } from "@/lib/betterAuth/auth-client";
import apiClient from "@/lib/http/api-client";

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  userData: UserLoginResponse | null;
  login: (user?: UserLoginResponse) => void;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  userData: null,
  login: () => {},
  logout: async () => {},
});

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session, isPending, error } = authClient.useSession();

  const userData = useMemo<UserLoginResponse | null>(() => {
    if (!session?.user) return null;

    return {
      id: session.user.id,
      name: session.user.name,
      email: session.user.email,
      image: session.user.image,
      emailVerified: session.user.emailVerified,
      // Casting temporário até aplicarmos a dica de tipagem (veja abaixo)
      role: (session.user as any).role ?? "user",
      banned: (session.user as any).banned ?? false,
    };
  }, [session]);

  // 3. Estados derivados
  const isLoggedIn = !!session?.user;
  // O isLoading inicial deve considerar o isPending do BetterAuth
  const isLoading = isPending;

  // 4. Função Login (Mantida para compatibilidade)
  // Com BetterAuth, o estado atualiza sozinho após o signIn,
  // mas mantemos a função caso você queira forçar algo no futuro.
  const login = (user?: UserLoginResponse) => {
    // Não precisamos fazer "setUserData" manual, pois o hook useSession
    // vai detectar a mudança do cookie e atualizar o userData via useMemo.
    // Opcional: Se quiser garantir atualização imediata, pode chamar session.refetch() se exposto,
    // mas geralmente o redirecionamento na tela de login já basta.
  };

  // 5. Função Logout
  const logout = async () => {
    try {
      await authClient.signOut();
    } catch (error) {
      console.error("Erro ao fazer logout na API:", error);
    } finally {
      localStorage.removeItem("repertorios");
      if (apiClient.storage?.clear) await apiClient.storage.clear();
    }
  };

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, userData, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

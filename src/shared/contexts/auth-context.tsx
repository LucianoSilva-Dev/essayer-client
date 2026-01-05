"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { getMe, logout as apiLogout } from "@/lib/apiCalls/auth";
import apiClient from "@/lib/http/api-client";
import { UserLoginResponse } from "@/lib/apiCalls/auth/types";

interface AuthContextType {
  isLoggedIn: boolean;
  isLoading: boolean;
  userData: UserLoginResponse | null;
  role: string | null;
  login: (user: UserLoginResponse, token?: string) => void;
  logout: () => void;
  refreshToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  isLoggedIn: false,
  isLoading: true,
  userData: null,
  role: null,
  login: () => {},
  logout: () => {},
  refreshToken: async () => {},
});

/** Função para decodificar JWT (somente leitura, não valida assinatura) */
function parseJwt(token: string) {
  try {
    const base64Payload = token.split(".")[1];
    const payload = atob(base64Payload);
    return JSON.parse(payload);
  } catch {
    return null;
  }
}

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState<UserLoginResponse | null>(null);
  const [role, setRole] = useState<string | null>(null);

  /** Checa sessão no backend e token JWT */
  const checkUserSession = async () => {
    try {
      // Pega token do cookie
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("accessToken="))
        ?.split("=")[1];

      // Decodifica JWT para pegar role
      const payload = token ? parseJwt(token) : null;
      const userRole = payload?.role ?? null;
      setRole(userRole);

      // Pega dados do usuário no backend
      const data = await getMe();
      if (data) {
        setUserData(data);
        setIsLoggedIn(true);
      } else {
        setUserData(null);
        setIsLoggedIn(false);
      }
    } catch {
      setUserData(null);
      setIsLoggedIn(false);
      setRole(null);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkUserSession();

    // Listener para sessão expirada
    const handleSessionExpired = () => {
      toast.error("Sua sessão expirou. Faça login novamente.");
      logout();
    };

    window.addEventListener("auth:sessionExpired", handleSessionExpired);
    return () => {
      window.removeEventListener("auth:sessionExpired", handleSessionExpired);
    };
  }, []);

  const login = (user: UserLoginResponse, token?: string) => {
    setUserData(user);
    setIsLoggedIn(true);
    if (token) {
      const payload = parseJwt(token);
      setRole(payload?.role ?? null);
    }
  };

  const logout = async () => {
    try {
      await apiLogout();
    } catch (err) {
      console.error("Erro no logout:", err);
    } finally {
      setUserData(null);
      setIsLoggedIn(false);
      setRole(null);
      localStorage.clear();
      if (apiClient.storage.clear) await apiClient.storage.clear();
    }
  };

  const refreshToken = async () => {
    try {
      await apiClient.post("/auth/refresh");
      await checkUserSession();
    } catch (err) {
      console.error("Erro ao atualizar token:", err);
      logout();
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        userData,
        role,
        login,
        logout,
        refreshToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

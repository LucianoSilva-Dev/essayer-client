import { authClient } from "@/lib/betterAuth/auth-client";
import { UserLoginBody, UserRegisterBody, UserLoginResponse } from "./types";
import { User } from "better-auth";
import { toast } from "react-toastify";

interface CustomSessionUser extends User {
  role?: string;
  banned?: boolean;
  lattes?: string;
}

export const login = async (data: UserLoginBody): Promise<UserLoginResponse> => {
  const { data: session, error } = await authClient.signIn.email({
    email: data.email,
    password: data.password,
  });

  if (error) {
    toast.error(error.message || 'Erro ao fazer login');
    throw new Error(error.message || 'Erro ao fazer login');
  }

  if (!session?.user) {
    toast.error("Erro inesperado: Usuário não retornado.");
    throw new Error("Erro inesperado: Usuário não retornado.");
  }

  const user = session.user as unknown as CustomSessionUser;

  const userAdapted: UserLoginResponse = {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    emailVerified: user.emailVerified,
    role: user.role ?? 'user',
    banned: user.banned ?? false,
  };

  return userAdapted;
};

export const register = async (data: UserRegisterBody) => {
  const { data: session, error } = await authClient.signUp.email({
    email: data.email,
    password: data.password,
    name: data.name,
    callbackURL: `  /login`,  // ou /login em produção
  });

  if (error) {
    throw new Error(error.message || 'Erro ao registrar');
  }

  return { message: 'Cadastrado com sucesso!' };
};


export const getMe = async () => {
  const { data: session } = await authClient.getSession();

  if (!session) return null;

  const user = session.user as unknown as CustomSessionUser;

  const userAdapted: UserLoginResponse = {
    id: user.id,
    name: user.name,
    email: user.email,
    image: user.image,
    emailVerified: user.emailVerified,
    role: user.role ?? 'user',
    banned: user.banned ?? false,
  };

  return {
    user: userAdapted,
    token: '',
    redirect: true
  };
};

export const handleResendEmail = async (email: string) => {
  const { data, error } = await authClient.sendVerificationEmail({
    email: email,
  });
  if (error) {
    toast.error("Erro ao reenviar email.");
  } else {
    toast.success("Email reenviado com sucesso!");
  }
};
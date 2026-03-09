export interface UserLoginBody {
  email: string;
  password: string;
}

export interface LoginApiResponse {
  user: UserLoginResponse
  token: string;
  redirect: boolean;
}

export interface UserRegisterBody {
  name: string;
  email: string;
  password: string;
}

export interface UserRegisterResponse {
  message: string;
}

export interface UserLoginResponse {
  id: string;
  name: string;
  email: string;
  role: string;
  image?: string | null;
  emailVerified: boolean;
  banned: boolean;
}
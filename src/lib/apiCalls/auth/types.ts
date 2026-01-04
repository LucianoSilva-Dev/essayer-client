export interface UserLoginBody {
    email: string;
    senha: string;
  }
  
  export interface UserLoginResponse {
    id: string
    nome: string
    email: string
    fotoPath: string
    cargo: string
  }
  
  export interface UserRegisterBody {
    name: string;
    email: string;
    password: string;
  }
  
  export interface UserRegisterResponse {
    message: string;
  }
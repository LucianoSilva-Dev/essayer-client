export interface UserLoginBody {
    email: string;
    senha: string;
  }
  
  export interface UserLoginResponse {
    token: string;
  }
  
  export interface UserRegisterBody {
    name: string;
    email: string;
    password: string;
  }
  
  export interface UserRegisterResponse {
    message: string;
  }
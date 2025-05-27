import { AuthButton } from "./auth-button"

export function AuthButtons() {
  return (
    <div className="flex items-center space-x-4">
      <AuthButton href="/login" label="Entrar" variant="outline" />
      <AuthButton href="/register" label="Cadastrar-se" variant="solid" />
    </div>
  )
}

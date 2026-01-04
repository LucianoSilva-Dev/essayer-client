"use client"
import React, { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { toast } from "react-toastify"
import { useRouter } from "next/navigation"
import { useAuth } from "@/shared/contexts/auth-context"
import { motion, AnimatePresence } from "framer-motion"

// 1. Importar os componentes das etapas
import UserTypeCard from "../type-card"
import { NameInputs } from "../inputs/name"
import { EmailLattesInputs } from "../inputs/email-lattes"
import { PasswordInputs } from "../inputs/password"
// 2. Importar o novo componente da Etapa 5
import { VerifyCodeInputs } from "../verifyCode"
import { RegisterFormData } from "../../types/register-form-types"
import { CreateUsuarioBody } from "@/lib/apiCalls/usuario/types"
import { createProfessorRequest, createUser } from "@/lib/apiCalls/usuario"

type CardType = "student" | "teacher"

// Função simples de validação de email
const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
};

// Regex de senha (do reset-password.tsx)
const passwordRegex = /^(?=.*[a-z])(?=.*\d).{8,24}$/

export default function RegisterForm() {
  const { isLoggedIn } = useAuth()
  const router = useRouter()

  // --- Estado da Etapa e do Formulário ---
  const [step, setStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false) // Para o envio final
  const [formData, setFormData] = useState<RegisterFormData>({
    userType: "student",
    firstName: "",
    lastName: "",
    email: "",
    lattes: "",
    password: "",
    confirmPassword: "",
    registerRequestId: "",
  })
  // Cálculo de validação
  const passwordsMatch =
    formData.password === formData.confirmPassword && formData.password.length > 0
  const isPasswordValid = passwordRegex.test(formData.password)

  // Redireciona se já estiver logado
  React.useEffect(() => {
    if (isLoggedIn) {
      toast.info("Você já está logado.")
      router.replace("/profile")
    }
  }, [isLoggedIn, router])

  // --- Funções de Callback para os componentes filhos ---
  const handleUserTypeChange = (type: CardType) => {
    setFormData((prev) => ({ ...prev, userType: type }))
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  // --- Lógica de navegação das etapas ---
  const handleNextStep = async (e: React.MouseEvent) => {
    e.preventDefault()

    // Etapa 1 -> 2
    if (step === 1) {
      setStep(2)
      return
    }

    // Etapa 2 -> 3
    if (step === 2) {
      if (!formData.firstName || !formData.lastName) {
        toast.warn("Por favor, preencha seu nome e sobrenome.")
        return
      }
      setStep(3)
      return
    }

    // Etapa 3 -> 4
    if (step === 3) {
      if (!formData.email || !validateEmail(formData.email)) {
        toast.warn("Por favor, insira um email válido.")
        return
      }
      if (formData.userType === 'teacher' && !formData.lattes) {
        toast.warn("Por favor, insira seu Lattes.")
        return
      }
      setStep(4)
      return
    }

    // Etapa 4 -> Envio da API e -> Etapa 5
    if (step === 4) {
      if (!isPasswordValid) {
        toast.warn("Por favor, insira uma senha que siga as regras.")
        return
      }
      if (!passwordsMatch) {
        toast.warn("As senhas não coincidem.")
        return
      }

      setIsSubmitting(true)
      console.log("ENVIANDO FORMULÁRIO:", formData)

      const formDataToUserCreateUsuarioBody: CreateUsuarioBody = {
        email: formData.email,
        nome: `${formData.firstName} ${formData.lastName}`,
        senha: formData.password,
      }
      try {
        const response = await createUser(formDataToUserCreateUsuarioBody)
        formData.registerRequestId = response.id
        toast.info("Enviamos um código de verificação para o seu email.")
        setStep(5) // Avança para a etapa de verificação
      } catch (e) {
        console.error("Erro no registro:", e)
      } finally {
        setIsSubmitting(false)
      }

    }

    // A etapa 5 tem sua própria lógica de submissão
    // dentro do VerifyCodeInputs, então este
    // handleNextStep não fará nada na etapa 5.
  }

  // Função para o botão "Voltar"
  const handlePrevStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()
    if (step > 1) {
      setStep((prev) => prev - 1)
    }
  }

  // --- 3. Funções para a Etapa 5 ---

  // Chamado quando a verificação do código é bem-sucedida
  const handleVerifySuccess = async (id: string) => {
    if (formData.userType === 'teacher') await createProfessorRequest(id, {lattes: formData.lattes})
    router.push("/login?message=register-success")
  }

  // Chamado quando o usuário pede um novo código
  const handleResendCode = async (email: string, nome: string, senha: string) => {
    const createUsuarioBody: CreateUsuarioBody = { email, nome, senha }
    console.log('userData para reenvio de código: ', createUsuarioBody)
    // re-envia o codigo criando o usuario novamente (não duplicará o email)
    await createUser(createUsuarioBody)
    console.log("API de reenvio de código chamada para:", formData.email)
    // A toast de sucesso é mostrada dentro do VerifyCodeInputs
  }


  // (Variantes permanecem as mesmas)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.06,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -18 } as const,
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.42,
        ease: "easeOut",
      } as const,
    },
  }

  const stepVariants = {
    hidden: { opacity: 0, x: 100, transition: { duration: 0.4, ease: "easeIn" } } as const,
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: "easeOut" } } as const,
    exit: { opacity: 0, x: -100, transition: { duration: 0.4, ease: "easeIn" } } as const,
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row px-4 md:px-10 py-6 w-full overflow-x-hidden">
      {/* Lado Esquerdo - Conteúdo */}
      <motion.div
        className="flex-1 flex flex-col justify-center pl-6 pr-6 md:pl-20 md:pr-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Cabeçalho */}
        <motion.div variants={itemVariants} className="mt-4 md:mt-5">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#282133]">
            Bem-vindo ao Incita
          </h1>
          <p className="text-lg md:text-2xl text-[#075F70] font-medium mt-2 mb-4">
            Sua plataforma de repertórios
          </p>
          <div className="w-full h-0.5 bg-[#D3D3D3] mb-4"></div>
        </motion.div>

        {/* --- Container das Etapas com Animação --- */}
        {/* A altura mínima ajuda a evitar "saltos" de layout */}
        <div className={`${step === 5 ? "" : "mb-6"} min-h-[350px] transition-all duration-300`} >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Descrição da etapa 1 */}
                <motion.p
                  variants={itemVariants}
                  className="text-base md:text-[25px] text-[#3C3C3C] mb-6 md:mb-8 max-w-full md:max-w-2xl leading-relaxed"
                >
                  Selecione o valor que se encaixa com você
                </motion.p>
                <UserTypeCard
                  selectedType={formData.userType}
                  onTypeChange={handleUserTypeChange}
                />
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Descrição da etapa 2 */}
                <motion.p
                  variants={itemVariants}
                  className="text-base md:text-[25px] text-[#3C3C3C] mb-6 md:mb-8 max-w-full md:max-w-2xl leading-relaxed"
                >
                  Cadastro para {formData.userType === "student" ? "Estudante" : "Educador"}
                </motion.p>
                <NameInputs
                  firstName={formData.firstName}
                  lastName={formData.lastName}
                  onFormChange={handleInputChange}
                  itemVariants={itemVariants}
                />
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Descrição da etapa 3 */}
                <motion.p
                  variants={itemVariants}
                  className="text-base md:text-[25px] text-[#3C3C3C] mb-6 md:mb-8 max-w-full md:max-w-2xl leading-relaxed"
                >
                  Cadastro para {formData.userType === "student" ? "Estudante" : "Educador"}
                </motion.p>
                <EmailLattesInputs
                  email={formData.email}
                  lattes={formData.lattes}
                  userType={formData.userType}
                  onFormChange={handleInputChange}
                  itemVariants={itemVariants}
                />
              </motion.div>
            )}

            {step === 4 && (
              <motion.div
                key="step4"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                {/* Descrição da etapa 4 */}
                <motion.p
                  variants={itemVariants}
                  className="text-base md:text-[25px] text-[#3C3C3C] mb-6 md:mb-8 max-w-full md:max-w-2xl leading-relaxed"
                >
                  Cadastro para {formData.userType === "student" ? "Estudante" : "Educador"}
                </motion.p>
                <PasswordInputs
                  password={formData.password}
                  confirmPassword={formData.confirmPassword}
                  onFormChange={handleInputChange}
                  itemVariants={itemVariants}
                  passwordsMatch={passwordsMatch}
                  passwordRegex={passwordRegex}
                />
              </motion.div>
            )}

            {/* --- 4. ADICIONADO: Bloco da Etapa 5 --- */}
            {step === 5 && (
              <motion.div
                key="step5"
                variants={stepVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <VerifyCodeInputs
                  email={formData.email}
                  firstName={formData.firstName}
                  lastName={formData.lastName}
                  password={formData.password}
                  requestId={formData.registerRequestId}
                  itemVariants={itemVariants}
                  onVerifySuccess={handleVerifySuccess}
                  onResendCode={() => handleResendCode(
                    formData.email, `${formData.firstName} ${formData.lastName}`, formData.password
                  )}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* --- 5. Botões de Navegação (AGORA SÃO CONDICIONAIS) --- */}
        {step < 5 && (
          <motion.div
            variants={itemVariants}
            className={`flex flex-col-reverse items-center gap-6 md:flex-row ${step === 1 ? "md:justify-end" : "md:justify-between"} `}
            // Animação para os botões desaparecerem
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {/* Botão "Voltar" (Estilo Secundário) */}
            <AnimatePresence>
              {step > 1 && (
                <motion.button
                  onClick={handlePrevStep}
                  disabled={isSubmitting} // Desabilita durante o envio
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20, position: "absolute" }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                  className="cursor-pointer w-full md:w-auto md:max-w-[280px] h-[60px] bg-white 
             shadow-[0px_0px_15px_-6px_rgba(0,0,0,0.25)] rounded-[32px]
             flex justify-center items-center
             font-montserrat font-medium text-xl md:text-[28px] text-[#075F70]
             hover:shadow-lg hover:-translate-y-1 transition-all duration-300
             focus:outline-none focus:ring-2 focus:ring-[#075F70] px-6
             disabled:opacity-50 disabled:hover:-translate-y-0"
                >
                  Voltar
                </motion.button>
              )}
            </AnimatePresence>

            {/* Botão "Avançar" / "Cadastrar-se" (Estilo Primário) */}
            <button
              onClick={handleNextStep}
              disabled={isSubmitting} // Desabilita durante o envio
              className="cursor-pointer w-full md:w-auto md:max-w-[280px] h-[60px] bg-white 
             shadow-[0px_0px_15px_-6px_rgba(0,0,0,0.25)] rounded-[32px]
             flex justify-center items-center
             font-montserrat font-medium text-xl md:text-[28px] text-[#075F70]
             hover:shadow-lg hover:-translate-y-1 transition-all duration-300
             focus:outline-none focus:ring-2 focus:ring-[#075F70] px-6
             disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting
                ? "Cadastrando..."
                : step === 4
                  ? "Cadastrar-se"
                  : "Avançar"}
            </button>
          </motion.div>
        )}

        {/* Links Adicionais */}
        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center space-y-3 md:space-y-4 mt-8"
        >
          <div className="flex items-center space-x-2 text-md md:text-lg group">
            <span className="text-gray-600">Já tem uma conta?</span>
            <Link
              href="/login"
              className="text-[#075F70] hover:text-[#064c5a] font-medium transition-colors group-hover:underline"
            >
              Entrar
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* Lado Direito - Imagem/Visual */}
      <motion.div
        initial={{ opacity: 0, x: 70 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="hidden md:flex flex-1 relative bg-[#E0E0E0] rounded-[25px] h-[92vh] w-[60vw] overflow-hidden mt-1"
      >
        <Image
          src="/login.jpg"
          alt="Login background"
          fill
          style={{ objectFit: 'cover' }}
          priority
        />
      </motion.div>
    </div>
  )
}
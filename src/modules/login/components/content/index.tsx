"use client";
import Image from "next/image";
import Link from "next/link";
import { EyeOff, Eye } from "lucide-react";
import { motion } from "framer-motion";
import { useContentLogin } from "../../hooks/useContentLogin";

export default function LoginForm() {
  const {
    state: { showPassword, email, password },
    actions: {
      setShowPassword,
      setEmail,
      setPassword,
      handleSubmit,
    },
  } = useContentLogin();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row px-4 md:px-10 py-6 w-full overflow-x-hidden">
      {/* Lado Esquerdo - Conteúdo */}
      <motion.div
        className="flex-1 flex flex-col justify-center pl-6 pr-6 md:pl-20 md:pr-20"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.12,
              delayChildren: 0.06,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        {/* Cabeçalho */}
        <motion.div
          variants={{
            hidden: { opacity: 0, y: -18 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.42, ease: "easeOut" },
            },
          }}
          className="mt-4 md:mt-5"
        >
          <h1 className="text-3xl md:text-4xl font-semibold text-[#282133]">
            Bem-vindo ao Incita
          </h1>
          <p className="text-lg md:text-2xl text-brand-teal-dark font-medium mt-2 mb-4">
            Sua plataforma de repertórios
          </p>
          <div className="w-full h-0.5 bg-[#D3D3D3] mb-4"></div>
        </motion.div>

        <motion.p
          variants={{
            hidden: { opacity: 0, y: -18 },
            visible: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.42, ease: "easeOut" },
            },
          }}
          className="text-base md:text-[25px] text-neutral-dark mb-6 md:mb-8 max-w-full md:max-w-2xl leading-relaxed"
        >
          Preencha os campos para entrar na plataforma.
        </motion.p>

        {/* Formulário */}
        <motion.form
          onSubmit={handleSubmit}
          className="w-full max-w-full md:max-w-2xl"
        >
          {/* Campo Email */}
          <div className="mb-8 md:mb-12">
            <label className="block text-xl md:text-2xl font-medium text-neutral-dark pl-1 md:pl-3 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 md:px-6 md:py-4 bg-white rounded-2xl md:rounded-3xl 
              focus:outline-none focus:ring-2 focus:ring-brand-teal-dark 
              focus:shadow-lg focus:-translate-y-[0.5em]
              transition-all duration-300 text-base md:text-lg shadow-md"
              required
            />
          </div>

          {/* Campo Senha */}
          <div className="mb-10 md:mb-16">
            <label className="block text-xl md:text-2xl font-medium text-neutral-dark pl-1 md:pl-3 mb-2">
              Insira uma senha
            </label>
            <div className="relative group">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 md:px-6 md:py-4 bg-white rounded-2xl md:rounded-3xl 
                focus:outline-none focus:ring-2 focus:ring-brand-teal-dark 
                focus:shadow-lg group-focus-within:-translate-y-[0.5em]
                transition-all duration-300 text-base md:text-lg shadow-md"
              />
              <button
                type="button"
                className="cursor-pointer absolute right-4 md:right-6 top-1/2 transform -translate-y-1/2 
                text-gray-500 hover:text-gray-700
                group-focus-within:-translate-y-[calc(50%+0.5em)] group-focus-within:text-brand-teal-dark
                transition-all duration-300"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={22} /> : <Eye size={22} />}
              </button>
            </div>
          </div>

          {/* Botão */}
          <motion.button
            type="submit"
            className="cursor-pointer w-full bg-brand-teal-dark hover:bg-[#064c5a] hover:shadow-xl hover:translate-y-[-0.2em] active:translate-y-0 text-white py-3.5 md:py-5 px-6 rounded-2xl md:rounded-3xl text-lg md:text-xl font-medium shadow-lg transition-all duration-300 mb-6 md:mb-8"
          >
            Entrar
          </motion.button>

          {/* Links */}
          <div className="flex flex-col items-center space-y-3 md:space-y-4">
            <Link href="/forgot-password" className="text-brand-teal-dark hover:underline">
              Esqueceu a senha?
            </Link>
            <Link href="/register" className="text-brand-teal-dark hover:underline">
              Cadastre-se
            </Link>
          </div>
        </motion.form>
      </motion.div>

      {/* Imagem */}
      <motion.div
        className="hidden md:flex flex-1 relative bg-[#E0E0E0] rounded-[25px] h-[92vh] w-[60vw] overflow-hidden mt-1"
      >
        <Image src="/images/login.jpg" alt="Login background" fill priority />
      </motion.div>
    </div>
  );
}

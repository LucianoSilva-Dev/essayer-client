"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "react-toastify";
import { motion, AnimatePresence } from "framer-motion";
import { RegisterFormData } from "../../types/register-form-types";
import { authClient } from "@/lib/betterAuth/auth-client";
import { StepOne } from "../steps/stepOne";
import { StepTwo } from "../steps/stepTwo";
import { StepThree } from "../steps/stepThree";
import { StepFive } from "../steps/stepFive";
import { StepFour } from "../steps/stepFour";
import { AboveStepFive } from "../steps/aboveStepFive";
import {
  containerVariants,
  itemVariants,
} from "../../animations/stepAnimations";
import { validateEmail } from "@/shared/utils/validateEmail";

const passwordRegex = /^(?=.*[a-z])(?=.*\d).{8,24}$/;

export default function RegisterForm() {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState<RegisterFormData>({
    userType: "student",
    firstName: "",
    lastName: "",
    email: "",
    lattes: "",
    password: "",
    confirmPassword: "",
    registerRequestId: "",
  });

  const passwordsMatch =
    formData.password === formData.confirmPassword &&
    formData.password.length > 0;

  const isPasswordValid = passwordRegex.test(formData.password);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (step === 1) {
      setStep(2);
      return;
    }

    if (step === 2) {
      if (!formData.firstName || !formData.lastName) {
        toast.warn("Por favor, preencha seu nome e sobrenome.");
        return;
      }
      setStep(3);
      return;
    }

    if (step === 3) {
      if (!formData.email || !validateEmail(formData.email)) {
        toast.warn("Por favor, insira um email válido.");
        return;
      }
      if (formData.userType === "teacher" && !formData.lattes) {
        toast.warn("Por favor, insira seu Lattes.");
        return;
      }
      setStep(4);
      return;
    }

    if (step === 4) {
      if (!isPasswordValid) {
        toast.warn("Por favor, insira uma senha que siga as regras.");
        return;
      }
      if (!passwordsMatch) {
        toast.warn("As senhas não coincidem.");
        return;
      }

      setIsSubmitting(true);

      try {
        const { data, error } = await authClient.signUp.email({
          email: formData.email,
          password: formData.password,
          name: `${formData.firstName} ${formData.lastName}`,
        });

        if (error) {
          toast.error(error.message || "Erro ao criar conta.");
          setIsSubmitting(false);
          return;
        }
        toast.info("Cadastro realizado! Verifique seu email.");
        if (data?.user?.id) {
          setFormData((prev) => ({ ...prev, registerRequestId: data.user.id }));
        }

        setStep(5);
      } catch (e) {
        console.error("Erro no registro:", e);
        toast.error("Ocorreu um erro inesperado.");
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handlePrevStep = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (step > 1) {
      setStep((prev) => prev - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row px-4 md:px-10 py-6 w-full overflow-x-hidden">
      <motion.div
        className="flex-1 flex flex-col justify-center pl-6 pr-6 md:pl-20 md:pr-20"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div variants={itemVariants} className="mt-4 md:mt-5">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#282133]">
            Bem-vindo ao Incita
          </h1>
          <p className="text-lg md:text-2xl text-brand-teal-dark font-medium mt-2 mb-4">
            Sua plataforma de repertórios
          </p>
          <div className="w-full h-0.5 bg-[#D3D3D3] mb-4"></div>
        </motion.div>

        <div
          className={`${step === 5 ? "" : "mb-6"} min-h-87.5 transition-all duration-300`}
        >
          <AnimatePresence mode="wait">
            {step === 1 && (
              <StepOne setFormData={setFormData} formData={formData} />
            )}

            {step === 2 && (
              <StepTwo
                handleInputChange={handleInputChange}
                formData={formData}
              />
            )}

            {step === 3 && (
              <StepThree
                handleInputChange={handleInputChange}
                formData={formData}
              />
            )}

            {step === 4 && (
              <StepFour
                formData={formData}
                handleInputChange={handleInputChange}
                passwordsMatch={passwordsMatch}
                passwordRegex={passwordRegex}
              />
            )}

            {step === 5 && <StepFive formData={formData} />}
          </AnimatePresence>
        </div>

        {step < 5 && (
          <>
            <AboveStepFive
              step={step}
              handlePrevStep={handlePrevStep}
              handleNextStep={handleNextStep}
              isSubmitting={isSubmitting}
            />
          </>
        )}

        <motion.div
          variants={itemVariants}
          className="flex flex-col items-center space-y-3 md:space-y-4 mt-8"
        >
          <div className="flex items-center space-x-2 text-md md:text-lg group">
            <span className="text-gray-600">Já tem uma conta?</span>
            <Link
              href="/login"
              className="text-brand-teal-dark hover:text-[#064c5a] font-medium transition-colors group-hover:underline"
            >
              Entrar
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 70 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.7, delay: 0.5 }}
        className="hidden md:flex flex-1 relative bg-[#E0E0E0] rounded-[25px] h-[92vh] w-[60vw] overflow-hidden mt-1"
      >
        <Image
          src="/images/login.jpg"
          alt="Login background"
          fill
          sizes="(max-width: 768px) 0px, 60vw"
          style={{ objectFit: "cover" }}
          priority
        />
      </motion.div>
    </div>
  );
}

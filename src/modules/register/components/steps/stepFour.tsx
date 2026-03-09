import { motion } from "framer-motion";
import { itemVariants, stepVariants } from "../../animations/stepAnimations";
import { PasswordInputs } from "../inputs/password";

interface StepFourProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: any;
  passwordsMatch: boolean;
  passwordRegex: RegExp;
}

export function StepFour({ handleInputChange, formData, passwordsMatch, passwordRegex }: StepFourProps) {
  return (
    <motion.div
      key="step4"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.p
        variants={itemVariants}
        className="text-base md:text-[25px] text-neutral-dark mb-6 md:mb-8 max-w-full md:max-w-2xl leading-relaxed"
      >
        Cadastro para{" "}
        {formData.userType === "student" ? "Estudante" : "Educador"}
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
  );
}

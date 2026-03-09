import { motion } from "framer-motion";
import { itemVariants, stepVariants } from "../../animations/stepAnimations";
import { EmailLattesInputs } from "../inputs/email-lattes";

interface StepThreeProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: any;
}

export function StepThree({ handleInputChange, formData }: StepThreeProps) {
  return (
    <motion.div
      key="step3"
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
      <EmailLattesInputs
        email={formData.email}
        lattes={formData.lattes}
        userType={formData.userType}
        onFormChange={handleInputChange}
        itemVariants={itemVariants}
      />
    </motion.div>
  );
}

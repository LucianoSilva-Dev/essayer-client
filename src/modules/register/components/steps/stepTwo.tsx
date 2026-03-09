import { motion } from "framer-motion";
import { itemVariants, stepVariants } from "../../animations/stepAnimations";
import { NameInputs } from "../inputs/name";

interface StepTwoProps {
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  formData: any;
}

export function StepTwo({ handleInputChange, formData }: StepTwoProps) {
  return (
    <motion.div
      key="step2"
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
      <NameInputs
        firstName={formData.firstName}
        lastName={formData.lastName}
        onFormChange={handleInputChange}
        itemVariants={itemVariants}
      />
    </motion.div>
  );
}

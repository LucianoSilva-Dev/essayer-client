import { motion } from "framer-motion";
import UserTypeCard from "../type-card";
import { itemVariants, stepVariants } from "../../animations/stepAnimations";
import { CardType } from "../../types/register-form-types";

interface StepOneProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  formData: any;
}

export function StepOne({ setFormData, formData }: StepOneProps) {

  const handleUserTypeChange = (type: CardType) => {
    setFormData((prev: any) => ({ ...prev, userType: type }));
  };

  return (
    <motion.div
      key="step1"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <motion.p
        variants={itemVariants}
        className="text-base md:text-[25px] text-neutral-dark mb-6 md:mb-8 max-w-full md:max-w-2xl leading-relaxed"
      >
        Selecione o valor que se encaixa com você
      </motion.p>
      <UserTypeCard
        selectedType={formData.userType}
        onTypeChange={handleUserTypeChange}
      />
    </motion.div>
  );
}

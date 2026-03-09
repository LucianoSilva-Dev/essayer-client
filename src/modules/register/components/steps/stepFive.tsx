import { motion } from "framer-motion";
import { itemVariants, stepVariants } from "../../animations/stepAnimations";
import { VerifyEmailInputs } from "../verifyEmail";
import { handleResendEmail } from "@/lib/apiCalls/auth";

interface StepFiveProps {
  formData: any;
}

export function StepFive({ formData }: StepFiveProps) {

  return (
    <motion.div
      key="step5"
      variants={stepVariants}
      initial="hidden"
      animate="visible"
      exit="exit"
    >
      <VerifyEmailInputs
        email={formData.email}
        firstName={formData.firstName}
        lastName={formData.lastName}
        password={formData.password}
        itemVariants={itemVariants}
        onResendEmail={() => handleResendEmail(formData.email)}
      />
    </motion.div>
  );
}

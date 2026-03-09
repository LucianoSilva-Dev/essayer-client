import { motion, AnimatePresence } from "framer-motion";
import { itemVariants } from "../../animations/stepAnimations";

interface aboveStepFiveProps {
  step: number;
  handlePrevStep: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleNextStep: (e: React.MouseEvent<HTMLButtonElement>) => void;
  isSubmitting: boolean;
}

export function AboveStepFive({ step, handlePrevStep, handleNextStep, isSubmitting }: aboveStepFiveProps) {
  return (
    <motion.div
      variants={itemVariants}
      className={`flex flex-col-reverse items-center gap-6 md:flex-row ${step === 1 ? "md:justify-end" : "md:justify-between"} `}
      initial={{ opacity: 1, y: 0 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
    >
      <AnimatePresence>
        {step > 1 && (
          <motion.button
            onClick={handlePrevStep}
            disabled={isSubmitting}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20, position: "absolute" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="cursor-pointer w-full md:w-auto md:max-w-70 h-15 bg-white shadow-[0px_0px_15px_-6px_rgba(0,0,0,0.25)] rounded-4xl flex justify-center items-center font-montserrat font-medium text-xl md:text-[28px] text-brand-teal-dark hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-teal-dark px-6 disabled:opacity-50 disabled:hover:translate-y-0"
          >
            Voltar
          </motion.button>
        )}
      </AnimatePresence>

      <button
        onClick={handleNextStep}
        disabled={isSubmitting}
        className="cursor-pointer w-full md:w-auto md:max-w-70 h-15 bg-white shadow-[0px_0px_15px_-6px_rgba(0,0,0,0.25)] rounded-4xl flex justify-center items-center font-montserrat font-medium text-xl md:text-[28px] text-brand-teal-dark hover:shadow-lg hover:-translate-y-1 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand-teal-dark px-6 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting
          ? "Cadastrando..."
          : step === 4
            ? "Cadastrar-se"
            : "Avançar"}
      </button>
    </motion.div>
  );
}

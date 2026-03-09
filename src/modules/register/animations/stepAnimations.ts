export const stepVariants = {
  hidden: {
    opacity: 0,
    x: 100,
    transition: { duration: 0.4, ease: "easeIn" } as const,
  },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4, ease: "easeOut" } as const,
  },
  exit: {
    opacity: 0,
    x: -100,
    transition: { duration: 0.4, ease: "easeIn" } as const,
  },
};

export const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.06 },
  },
};

export const itemVariants = {
  hidden: { opacity: 0, y: -18 } as const,
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: "easeOut" } as const,
  },
};
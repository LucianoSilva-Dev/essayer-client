// src/components/PageTransition.tsx
'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export const PageTransition = ({ children }: PageTransitionProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{
          duration: 0.3,
          ease: 'easeInOut'
        }}
        style={{ position: 'absolute', width: '100%'}}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};
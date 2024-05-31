"use client";
import { motion } from "framer-motion";

interface AnimateMoveLeftToRightProps {
  children: any;
}

const AnimateTitleLeftToRight = ({ children }: AnimateMoveLeftToRightProps) => {
  return (
    <motion.h1
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 100 }}
      transition={{ duration: 0.25 }}
      className="font-bold text-3xl"
    >
      {children}
    </motion.h1>
  );
};

export default AnimateTitleLeftToRight;

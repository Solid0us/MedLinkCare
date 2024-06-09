"use client";
import { motion } from "framer-motion";

interface AnimateCardScaleUpProps {
  children: any;
}

const AnimateCardScaleUp = ({ children }: AnimateCardScaleUpProps) => {
  return (
    <motion.div
      className="w-fit"
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.25 }}
      whileHover={{ scale: 1.05 }}
    >
      {children}
    </motion.div>
  );
};

export default AnimateCardScaleUp;

"use client";
import { motion } from "framer-motion";
interface ContentLoadingSpinnerProps {
  text: string;
}
const ContentLoadingSpinner = ({ text }: ContentLoadingSpinnerProps) => {
  return (
    <motion.div
      className="rounded-full w-36 h-36 border-2 border-l-violet-300 flex justify-center items-center mr-auto ml-auto"
      initial={{ rotate: 0 }}
      animate={{ rotate: 360 }}
      transition={{ duration: 1, repeat: Infinity }}
    >
      <motion.p
        className="text-center"
        initial={{ rotate: 360 }}
        animate={{ rotate: 0 }}
        transition={{ duration: 1, repeat: Infinity }}
      >
        {text}
      </motion.p>
    </motion.div>
  );
};

export default ContentLoadingSpinner;

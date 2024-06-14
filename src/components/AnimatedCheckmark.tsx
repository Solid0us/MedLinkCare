"use client";
import { duration } from "@mui/material";
import { Variants, motion } from "framer-motion";
import CheckIcon from "@mui/icons-material/Check";

const containerVariants: Variants = {
  hidden: { scale: 0, borderLeftColor: "green" },
  show: {
    rotate: 360,
    scale: 1.0,
    borderColor: "green",
    transition: {
      duration: 0.25,
      type: "spring",
      when: "beforeChildren",
    },
  },
};

const checkmarkVariants: Variants = {
  show: {
    scale: 1,
    transition: {
      duration: 0.25,
    },
  },
};

const checkmarkConcealerVariant: Variants = {
  hidden: { x: 0 },
  show: {
    x: "100vw",
    transition: {
      duration: 6,
    },
    transitionEnd: { display: "none" },
  },
};
const AnimatedCheckmark = () => {
  return (
    <motion.div
      className="w-10 h-10 rounded-full border border-l-2 flex flex-col items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div
        variants={checkmarkVariants}
        className="flex flex-row justify-center"
      >
        <CheckIcon className="text-green-500 text-4xl" />
      </motion.div>
      <motion.div
        variants={checkmarkConcealerVariant}
        className="w-full absolute bg-white p-10 rounded-full"
      ></motion.div>
    </motion.div>
  );
};

export default AnimatedCheckmark;

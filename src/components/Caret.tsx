import { motion } from "framer-motion";

const Caret = () => {
  return (
    <motion.div
      aria-hidden={true}
      className="inline-block bg-yellow-500 w-0.5 h-7"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      transition={{ repeat: Infinity, duration: 0.8, ease: "easeInOut" }}
    />
  );
};

export default Caret;

import clsx from "clsx";
import { motion } from "framer-motion";
import { formatPercentage } from "../utils/helper";

const Result = ({
  errors,
  accuractPercentage,
  total,
  className,
  state,
}: {
  errors: number;
  accuractPercentage: number;
  total: number;
  className?: string;
  state: "START" | "RUN" | "FINISH";
}) => {
  const inital = { opacity: 0 };
  const animate = { opacity: 1 };
  const duration = { duration: 0.3 };

  if (state !== "FINISH") return null;

  return (
    <motion.ul
      className={clsx(
        "flex flex-col items-center text-yellow-500 space-y-3",
        className
      )}
    >
      <motion.li
        className="text-xl font-semibold"
        initial={inital}
        animate={animate}
        transition={{ ...duration, delay: 0 }}
      >
        Results
      </motion.li>
      <motion.li
        initial={inital}
        animate={animate}
        transition={{ ...duration, delay: 0.5 }}
      >
        Accuracy: {formatPercentage(accuractPercentage)}
      </motion.li>
      <motion.li
        className="text-red-500"
        initial={inital}
        animate={animate}
        transition={{ ...duration, delay: 1 }}
      >
        Errors: {errors}
      </motion.li>
      <motion.li
        initial={inital}
        animate={animate}
        transition={{ ...duration, delay: 1.5 }}
      >
        Typed: {total}
      </motion.li>
    </motion.ul>
  );
};

export default Result;

import { motion } from "framer-motion";
import { FiCalendar } from "react-icons/fi";
import { formatDate } from "../utils/dateHelpers";

export default function DateCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-strong flex items-center gap-4 rounded-2xl px-5 py-3"
    >
      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 text-blue-400 ring-1 ring-white/10">
        <FiCalendar size={22} />
      </div>
      <div>
        <p className="text-xs font-medium uppercase tracking-wider text-white/50">
          Today
        </p>
        <p className="text-lg font-semibold text-white md:text-xl">
          {formatDate()}
        </p>
      </div>
    </motion.div>
  );
}

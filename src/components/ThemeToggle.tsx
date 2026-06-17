import { motion } from "framer-motion";
import { FiSun, FiMoon } from "react-icons/fi";

interface ThemeToggleProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export default function ThemeToggle({ theme, toggleTheme }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={toggleTheme}
      className="relative flex h-10 w-20 items-center rounded-full bg-white/5 p-1 shadow-inner ring-1 ring-white/10 transition-colors"
      aria-label="Toggle theme"
    >
      <motion.div
        className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-indigo-500 text-white shadow-lg"
        animate={{ x: isDark ? 0 : 40 }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        {isDark ? <FiMoon size={16} /> : <FiSun size={16} />}
      </motion.div>
      <span className="absolute left-2.5 text-[10px] font-medium text-white/50">
        D
      </span>
      <span className="absolute right-2.5 text-[10px] font-medium text-white/50">
        L
      </span>
    </motion.button>
  );
}

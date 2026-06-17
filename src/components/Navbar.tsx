import { motion } from "framer-motion";
import { FiMenu, FiBookOpen } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";
import Clock from "./Clock";

interface NavbarProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
  onMenuClick: () => void;
}

export default function Navbar({
  theme,
  toggleTheme,
  onMenuClick,
}: NavbarProps) {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="fixed left-0 right-0 top-0 z-40 border-b border-white/5 bg-slate-900/80 backdrop-blur-xl"
    >
      <div className="flex h-16 items-center justify-between px-4 md:px-6">
        <div className="flex items-center gap-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onMenuClick}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white lg:hidden"
          >
            <FiMenu size={20} />
          </motion.button>
          <div className="flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 text-white">
              <FiBookOpen size={18} />
            </div>
            <span className="hidden text-lg font-bold text-white sm:inline">
              Study<span className="text-blue-400">Flow</span>
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 md:gap-4">
          <Clock />
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>
      </div>
    </motion.header>
  );
}

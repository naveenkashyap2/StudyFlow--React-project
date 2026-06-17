import { motion } from "framer-motion";
import {
  FiHome,
  FiBarChart2,
  FiCalendar,
  FiAward,
  FiSettings,
  FiX,
} from "react-icons/fi";
import { cn } from "../utils/cn";

type Page = "home" | "analytics" | "calendar" | "achievements" | "settings";

interface SidebarProps {
  activePage: Page;
  onPageChange: (page: Page) => void;
  isOpen: boolean;
  onClose: () => void;
}

const items: { id: Page; label: string; icon: React.ReactNode }[] = [
  { id: "home", label: "Dashboard", icon: <FiHome size={18} /> },
  { id: "analytics", label: "Analytics", icon: <FiBarChart2 size={18} /> },
  { id: "calendar", label: "Calendar", icon: <FiCalendar size={18} /> },
  { id: "achievements", label: "Achievements", icon: <FiAward size={18} /> },
  { id: "settings", label: "Settings", icon: <FiSettings size={18} /> },
];

export default function Sidebar({
  activePage,
  onPageChange,
  isOpen,
  onClose,
}: SidebarProps) {
  return (
    <>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}
      <motion.aside
        initial={{ x: -280 }}
        animate={{ x: isOpen ? 0 : -280 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={cn(
          "fixed left-0 top-16 z-50 h-[calc(100vh-4rem)] w-64 border-r border-white/5 bg-slate-900/90 p-4 backdrop-blur-xl lg:translate-x-0 lg:transition-none",
        )}
      >
        <div className="mb-6 flex items-center justify-between lg:hidden">
          <span className="text-lg font-bold text-white">Menu</span>
          <button
            onClick={onClose}
            className="rounded-lg p-2 text-white/60 hover:bg-white/10"
          >
            <FiX size={20} />
          </button>
        </div>

        <nav className="space-y-1">
          {items.map((item) => {
            const isActive = activePage === item.id;
            return (
              <motion.button
                key={item.id}
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => {
                  onPageChange(item.id);
                  onClose();
                }}
                className={cn(
                  "flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-white ring-1 ring-white/10"
                    : "text-white/60 hover:bg-white/5 hover:text-white",
                )}
              >
                <span className={isActive ? "text-blue-400" : ""}>
                  {item.icon}
                </span>
                {item.label}
                {isActive && (
                  <motion.div
                    layoutId="active-pill"
                    className="ml-auto h-2 w-2 rounded-full bg-blue-400"
                  />
                )}
              </motion.button>
            );
          })}
        </nav>

        <div className="absolute bottom-6 left-4 right-4 rounded-2xl bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-4 ring-1 ring-white/10">
          <p className="mb-1 text-sm font-semibold text-white">Keep it up!</p>
          <p className="text-xs text-white/50">
            Consistency is the key to mastery.
          </p>
        </div>
      </motion.aside>
    </>
  );
}

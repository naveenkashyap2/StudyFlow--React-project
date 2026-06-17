import { motion } from "framer-motion";
import { FiTrash2, FiRefreshCw } from "react-icons/fi";
import { useStudy } from "../context/StudyContext";

interface SettingsProps {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export default function Settings({ theme, toggleTheme }: SettingsProps) {
  const { dispatch } = useStudy();

  const resetProgress = () => {
    if (
      confirm(
        "Are you sure you want to reset all progress? This cannot be undone.",
      )
    ) {
      localStorage.removeItem("study-tracker-state");
      window.location.reload();
    }
  };

  const refreshStreak = () => {
    dispatch({ type: "UPDATE_STREAK" });
  };

  return (
    <div className="max-w-2xl space-y-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="mb-2 text-2xl font-bold text-white">Settings</h2>
        <p className="text-white/50">
          Customize your study tracker preferences.
        </p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="mb-4 text-lg font-semibold text-white">Appearance</h3>
        <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
          <div>
            <p className="font-medium text-white">Theme</p>
            <p className="text-sm text-white/50">
              Switch between dark and light mode
            </p>
          </div>
          <button
            onClick={toggleTheme}
            className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-4 py-2 text-sm font-semibold text-white"
          >
            {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
          </button>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="mb-4 text-lg font-semibold text-white">
          Data Management
        </h3>
        <div className="space-y-3">
          <button
            onClick={refreshStreak}
            className="flex w-full items-center justify-between rounded-xl bg-white/5 p-4 text-left transition-colors hover:bg-white/10"
          >
            <div>
              <p className="font-medium text-white">Recalculate Streak</p>
              <p className="text-sm text-white/50">
                Refresh your current streak calculation
              </p>
            </div>
            <FiRefreshCw className="text-white/50" />
          </button>
          <button
            onClick={resetProgress}
            className="flex w-full items-center justify-between rounded-xl bg-red-500/10 p-4 text-left transition-colors hover:bg-red-500/20"
          >
            <div>
              <p className="font-medium text-red-400">Reset All Progress</p>
              <p className="text-sm text-white/50">
                Clear all tasks, notes, and streak data
              </p>
            </div>
            <FiTrash2 className="text-red-400" />
          </button>
        </div>
      </motion.div>
    </div>
  );
}

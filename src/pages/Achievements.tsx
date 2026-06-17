import { motion } from "framer-motion";
import AchievementCard from "../components/AchievementCard";
import StreakCard from "../components/StreakCard";

export default function AchievementsPage() {
  return (
    <div className="space-y-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h2 className="mb-2 text-2xl font-bold text-white">Achievements</h2>
        <p className="text-white/50">
          Unlock badges by maintaining your daily study streak.
        </p>
      </motion.div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <StreakCard />
        </div>
      </div>

      <AchievementCard />
    </div>
  );
}

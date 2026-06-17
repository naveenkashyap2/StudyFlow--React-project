import { motion } from "framer-motion";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

interface ProgressCardProps {
  topic: string;
  percentage: number;
  hours: number;
  icon: string;
  color: string;
  index: number;
}

export default function ProgressCard({
  topic,
  percentage,
  hours,
  icon,
  color,
  index,
}: ProgressCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.4 }}
      whileHover={{ scale: 1.03, y: -4 }}
      className="glass group relative overflow-hidden rounded-2xl p-4 transition-shadow hover:shadow-xl hover:shadow-blue-500/10"
    >
      <div
        className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-20 blur-2xl transition-opacity group-hover:opacity-40"
        style={{ backgroundColor: color }}
      />
      <div className="flex flex-col items-center gap-3">
        <div className="text-2xl">{icon}</div>
        <div className="h-20 w-20">
          <CircularProgressbar
            value={percentage}
            text={`${percentage}%`}
            styles={buildStyles({
              pathColor: color,
              trailColor: "rgba(255,255,255,0.08)",
              textSize: "1.25rem",
              textColor: "#ffffff",
            })}
          />
        </div>
        <div className="text-center">
          <p className="text-sm font-semibold text-white">{topic}</p>
          <p className="text-xs text-white/50">{hours.toFixed(1)} hrs</p>
        </div>
      </div>
    </motion.div>
  );
}

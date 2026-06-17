import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FiPlay, FiPause, FiRotateCcw } from "react-icons/fi";
import { useTimer } from "../hooks/useTimer";
import { playTimerCompleteSound } from "../utils/soundEffects";

interface StudyTimerProps {
  title: string;
  minutes: number;
  color: string;
  icon: React.ReactNode;
  onComplete?: () => void;
}

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
}

export default function StudyTimer({
  title,
  minutes,
  color,
  icon,
  onComplete,
}: StudyTimerProps) {
  const { timeLeft, isRunning, start, pause, reset, progress } =
    useTimer(minutes);
  const [celebrated, setCelebrated] = useState(false);

  useEffect(() => {
    if (timeLeft === 0 && !celebrated) {
      setCelebrated(true);
      playTimerCompleteSound();
      onComplete?.();
    }
  }, [timeLeft, celebrated, onComplete]);

  const handleReset = () => {
    setCelebrated(false);
    reset();
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      className="glass relative overflow-hidden rounded-2xl p-5"
    >
      <div
        className="absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-15 blur-2xl"
        style={{ backgroundColor: color }}
      />
      <div className="relative z-10 flex flex-col items-center gap-4">
        <div className="flex items-center gap-2 text-white/80">
          <span style={{ color }}>{icon}</span>
          <span className="font-semibold">{title}</span>
        </div>

        <div className="relative flex h-28 w-28 items-center justify-center">
          <svg
            className="absolute inset-0 h-full w-full -rotate-90"
            viewBox="0 0 100 100"
          >
            <circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke="rgba(255,255,255,0.08)"
              strokeWidth="8"
            />
            <motion.circle
              cx="50"
              cy="50"
              r="42"
              fill="none"
              stroke={color}
              strokeWidth="8"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: progress / 100 }}
              transition={{ duration: 0.5 }}
            />
          </svg>
          <span className="text-2xl font-bold text-white">
            {formatTime(timeLeft)}
          </span>
        </div>

        <div className="flex gap-2">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={isRunning ? pause : start}
            className="flex h-9 w-9 items-center justify-center rounded-full text-white transition-colors"
            style={{ backgroundColor: color }}
          >
            {isRunning ? (
              <FiPause size={16} />
            ) : (
              <FiPlay size={16} className="ml-0.5" />
            )}
          </motion.button>
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={handleReset}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
          >
            <FiRotateCcw size={16} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}

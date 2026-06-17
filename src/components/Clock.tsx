import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { formatTime } from "../utils/dateHelpers";

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="glass-strong flex items-center gap-3 rounded-2xl px-5 py-3"
    >
      <div className="relative flex h-3 w-3">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex h-3 w-3 rounded-full bg-emerald-500"></span>
      </div>
      <span className="bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-2xl font-bold tracking-wider text-transparent md:text-3xl">
        {formatTime(time)}
      </span>
    </motion.div>
  );
}

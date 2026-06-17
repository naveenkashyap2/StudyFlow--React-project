import { useState } from "react";
import { motion } from "framer-motion";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useStudy } from "../context/StudyContext";
import { formatLocalDateKey } from "../utils/dateHelpers";

export default function CalendarSection() {
  const { completedDates } = useStudy();
  const [date, setDate] = useState<Date>(new Date());

  const isCompleted = (d: Date): boolean => {
    const key = formatLocalDateKey(d);
    return completedDates.includes(key);
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass rounded-2xl p-6"
    >
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-xl font-semibold text-white">Monthly Calendar</h3>
          <p className="text-sm text-white/50">Track your daily consistency</p>
        </div>
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-emerald-500" />
            <span className="text-white/60">Completed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-red-500" />
            <span className="text-white/60">Missed</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.8)]" />
            <span className="text-white/60">Today</span>
          </div>
        </div>
      </div>

      <Calendar
        onChange={(value) => value instanceof Date && setDate(value)}
        value={date}
        tileClassName={({ date: d }) => {
          const todayKey = formatLocalDateKey(new Date());
          const key = formatLocalDateKey(d);
          if (key === todayKey) return "today-glow";
          if (isCompleted(d)) return "completed-day";
          if (key < todayKey && !isCompleted(d)) return "missed-day";
          return "";
        }}
      />

      <style>{`
        .completed-day {
          background: rgba(16, 185, 129, 0.3) !important;
          color: white !important;
          border-radius: 0.5rem;
        }
        .missed-day {
          background: rgba(239, 68, 68, 0.2) !important;
          color: rgba(255,255,255,0.5) !important;
          border-radius: 0.5rem;
        }
        .today-glow {
          background: rgba(59, 130, 246, 0.4) !important;
          box-shadow: 0 0 15px rgba(59, 130, 246, 0.6);
          color: white !important;
          border-radius: 0.5rem;
          font-weight: 700;
        }
      `}</style>
    </motion.section>
  );
}

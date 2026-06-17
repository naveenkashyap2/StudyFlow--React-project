import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { weeklyData } from "../data/weeklyData";
import { longTermProgress } from "../data/weeklyData";
import StreakCard from "./StreakCard";

export default function Analytics() {
  return (
    <section className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="mb-4 text-xl font-semibold text-white">
              7-Day Analytics
            </h3>
            <div className="h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={weeklyData} barGap={8}>
                  <CartesianGrid
                    strokeDasharray="3 3"
                    stroke="rgba(255,255,255,0.05)"
                  />
                  <XAxis
                    dataKey="day"
                    stroke="rgba(255,255,255,0.3)"
                    fontSize={12}
                  />
                  <YAxis stroke="rgba(255,255,255,0.3)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      background: "rgba(15,23,42,0.95)",
                      border: "1px solid rgba(255,255,255,0.1)",
                      borderRadius: "0.75rem",
                      color: "white",
                    }}
                  />
                  <Bar
                    dataKey="hours"
                    name="Study Hours"
                    fill="#3b82f6"
                    radius={[6, 6, 0, 0]}
                  />
                  <Bar
                    dataKey="completed"
                    name="Tasks Done"
                    fill="#10b981"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </motion.div>
        </div>

        <div>
          <StreakCard />
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
        {weeklyData.map((day, index) => (
          <motion.div
            key={day.day}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.03 }}
            className="glass rounded-2xl p-5"
          >
            <p className="mb-3 text-sm font-semibold text-white/70">
              {day.day}
            </p>
            <div className="mb-2 flex items-end justify-between">
              <span className="text-2xl font-bold text-white">
                {day.hours}h
              </span>
              <span className="text-xs text-emerald-400">
                {day.completed} tasks
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${day.percentage}%` }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 to-purple-500"
              />
            </div>
            <p className="mt-2 text-xs text-white/40">
              {day.percentage}% completion
            </p>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass rounded-2xl p-6"
      >
        <h3 className="mb-6 text-xl font-semibold text-white">
          Long-Term Progress
        </h3>
        <div className="grid gap-6">
          {longTermProgress.map((item, index) => (
            <div key={item.label}>
              <div className="mb-2 flex items-center justify-between">
                <span className="text-sm font-medium text-white/80">
                  {item.label}
                </span>
                <span className="text-sm font-bold text-white">
                  {item.percentage}%
                </span>
              </div>
              <div className="h-4 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${item.percentage}%` }}
                  transition={{ duration: 1.2, delay: index * 0.1 }}
                  className="h-full rounded-full animate-gradient"
                  style={{
                    background: `linear-gradient(90deg, ${item.from}, ${item.to})`,
                    backgroundSize: "200% 200%",
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

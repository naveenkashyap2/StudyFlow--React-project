import { motion } from "framer-motion";
import { FiCheckCircle, FiCircle } from "react-icons/fi";
import DateCard from "./DateCard";
import StudyTimer from "./StudyTimer";
import ProgressCard from "./ProgressCard";
import TodoSection from "./TodoSection";
import NotesSection from "./NotesSection";
import Charts from "./Charts";
import { useStudy } from "../context/StudyContext";
import { getTodayMode, getTopicIcon } from "../utils/studySchedule";
import {
  playTaskCompleteSound,
  resumeAudioContext,
} from "../utils/soundEffects";
import { useProgress } from "../hooks/useProgress";

export default function Dashboard() {
  const {
    tasks,
    dispatch,
    studyHours,
    completedTasks,
    pendingTasks,
    completionRate,
  } = useStudy();
  const progressItems = useProgress(studyHours);
  const mode = getTodayMode();

  const toggleTask = (id: string) => {
    resumeAudioContext();
    dispatch({ type: "TOGGLE_TASK", payload: id });
    const task = tasks.find((t) => t.id === id);
    if (task && !task.completed) {
      playTaskCompleteSound();
    }
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <DateCard />
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="glass-strong rounded-2xl px-5 py-3"
            >
              <p className="text-xs font-medium uppercase tracking-wider text-white/50">
                Today&apos;s Mode
              </p>
              <p className="text-xl font-bold text-white">
                {mode === "Backend" ? "🖥️ Backend Day" : "🎨 Frontend Day"}
              </p>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6"
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-xl font-semibold text-white">
                Today&apos;s Target
              </h3>
              <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white/70">
                {completedTasks}/{tasks.length} Done
              </span>
            </div>
            <div className="mb-4 h-2.5 w-full rounded-full bg-white/10">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${completionRate}%` }}
                transition={{ duration: 0.8 }}
                className="h-full rounded-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              {tasks.map((task, index) => (
                <motion.button
                  key={task.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => toggleTask(task.id)}
                  className={`flex items-center gap-3 rounded-xl border p-4 text-left transition-all ${
                    task.completed
                      ? "border-emerald-500/30 bg-emerald-500/10"
                      : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10"
                  }`}
                >
                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg text-lg ${
                      task.completed
                        ? "bg-emerald-500/20 text-emerald-400"
                        : "bg-white/5 text-white/70"
                    }`}
                  >
                    {getTopicIcon(task.label)}
                  </div>
                  <div className="flex-1">
                    <p
                      className={`text-sm font-semibold ${
                        task.completed
                          ? "text-emerald-200 line-through"
                          : "text-white"
                      }`}
                    >
                      {task.label}
                    </p>
                  </div>
                  {task.completed ? (
                    <FiCheckCircle className="text-emerald-400" size={20} />
                  ) : (
                    <FiCircle className="text-white/30" size={20} />
                  )}
                </motion.button>
              ))}
            </div>
          </motion.div>
        </div>

        <div className="space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass rounded-2xl p-5"
          >
            <h3 className="mb-4 text-lg font-semibold text-white">
              Study Timers
            </h3>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1">
              <StudyTimer
                title="HR Preparation"
                minutes={30}
                color="#ec4899"
                icon="🤝"
                onComplete={() =>
                  dispatch({
                    type: "ADD_HOURS",
                    payload: { topic: "HR Preparation", hours: 0.5 },
                  })
                }
              />
              <StudyTimer
                title="Technical Prep"
                minutes={30}
                color="#8b5cf6"
                icon="💻"
                onComplete={() =>
                  dispatch({
                    type: "ADD_HOURS",
                    payload: {
                      topic: "Technical Interview Preparation",
                      hours: 0.5,
                    },
                  })
                }
              />
              <StudyTimer
                title="Core Java"
                minutes={60}
                color="#f97316"
                icon="☕"
                onComplete={() =>
                  dispatch({
                    type: "ADD_HOURS",
                    payload: { topic: "Core Java", hours: 1 },
                  })
                }
              />
              <StudyTimer
                title="Coding Practice"
                minutes={90}
                color="#3b82f6"
                icon="🚀"
                onComplete={() =>
                  dispatch({
                    type: "ADD_HOURS",
                    payload: { topic: "React.js", hours: 1.5 },
                  })
                }
              />
            </div>
          </motion.div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <TodoSection />
        </div>
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-2xl p-6"
          >
            <h3 className="mb-4 text-lg font-semibold text-white">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                <span className="text-sm text-white/70">Completed Tasks</span>
                <span className="text-xl font-bold text-emerald-400">
                  {completedTasks}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                <span className="text-sm text-white/70">Pending Tasks</span>
                <span className="text-xl font-bold text-orange-400">
                  {pendingTasks}
                </span>
              </div>
              <div className="flex items-center justify-between rounded-xl bg-white/5 p-4">
                <span className="text-sm text-white/70">Completion Rate</span>
                <span className="text-xl font-bold text-blue-400">
                  {completionRate}%
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <section>
        <motion.h3
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mb-4 text-xl font-semibold text-white"
        >
          Today&apos;s Progress
        </motion.h3>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-7">
          {progressItems.map((item, index) => (
            <ProgressCard key={item.topic} {...item} index={index} />
          ))}
        </div>
      </section>

      <Charts />
      <NotesSection />
    </div>
  );
}

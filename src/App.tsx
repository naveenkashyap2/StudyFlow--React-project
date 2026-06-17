import { useState, useEffect, Suspense, lazy } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { Toaster, toast } from "react-hot-toast";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MotivationModal from "./components/MotivationModal";
import { StudyProvider, useStudy } from "./context/StudyContext";
import { useTheme } from "./hooks/useTheme";
import { playAchievementSound, resumeAudioContext } from "./utils/soundEffects";
import "./index.css";

const Home = lazy(() => import("./pages/Home"));
const Analytics = lazy(() => import("./pages/Analytics"));
const Calendar = lazy(() => import("./pages/Calendar"));
const Achievements = lazy(() => import("./pages/Achievements"));
const Settings = lazy(() => import("./pages/Settings"));

type Page = "home" | "analytics" | "calendar" | "achievements" | "settings";

function Loading() {
  return (
    <div className="flex h-96 items-center justify-center">
      <div className="h-10 w-10 animate-spin rounded-full border-2 border-white/10 border-t-blue-500" />
    </div>
  );
}

function MainContent() {
  const [activePage, setActivePage] = useState<Page>("home");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [confetti, setConfetti] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { achievements } = useStudy();
  const [prevAchievements, setPrevAchievements] = useState<string[]>([]);

  useEffect(() => {
    const hasSeenModal = sessionStorage.getItem("study-tracker-modal");
    if (hasSeenModal) {
      setShowModal(false);
    } else {
      sessionStorage.setItem("study-tracker-modal", "true");
    }
  }, []);

  useEffect(() => {
    if (prevAchievements.length > 0) {
      const newlyUnlocked = achievements.filter(
        (a) => !prevAchievements.includes(a),
      );
      newlyUnlocked.forEach((badge) => {
        playAchievementSound();
        setConfetti(true);
        toast.success(`Achievement Unlocked: ${badge}!`, { duration: 5000 });
        setTimeout(() => setConfetti(false), 4000);
      });
    }
    setPrevAchievements(achievements);
  }, [achievements, prevAchievements]);

  useEffect(() => {
    const handleClick = () => resumeAudioContext();
    window.addEventListener("click", handleClick);
    return () => window.removeEventListener("click", handleClick);
  }, []);

  const renderPage = () => {
    switch (activePage) {
      case "home":
        return <Home />;
      case "analytics":
        return <Analytics />;
      case "calendar":
        return <Calendar />;
      case "achievements":
        return <Achievements />;
      case "settings":
        return <Settings theme={theme} toggleTheme={toggleTheme} />;
      default:
        return <Home />;
    }
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-500 ${
        theme === "light"
          ? "light-mode bg-gradient-to-br from-slate-50 via-white to-slate-100"
          : "bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#1e293b]"
      }`}
    >
      <Navbar
        theme={theme}
        toggleTheme={toggleTheme}
        onMenuClick={() => setSidebarOpen(true)}
      />
      <Sidebar
        activePage={activePage}
        onPageChange={setActivePage}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="pt-24 pb-10 transition-all lg:pl-64">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Suspense fallback={<Loading />}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activePage}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
              >
                {renderPage()}
              </motion.div>
            </AnimatePresence>
          </Suspense>
        </div>
      </main>

      <AnimatePresence>
        {showModal && <MotivationModal onClose={() => setShowModal(false)} />}
      </AnimatePresence>

      {confetti && (
        <Confetti
          className="confetti-canvas"
          numberOfPieces={250}
          recycle={false}
          colors={["#3b82f6", "#8b5cf6", "#ec4899", "#10b981", "#f97316"]}
        />
      )}

      <Toaster position="top-right" />
    </div>
  );
}

export default function App() {
  return (
    <StudyProvider>
      <MainContent />
    </StudyProvider>
  );
}

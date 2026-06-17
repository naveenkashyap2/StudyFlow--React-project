import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX } from "react-icons/fi";
import { getRandomQuote } from "../utils/quotes";

interface MotivationModalProps {
  onClose: () => void;
}

export default function MotivationModal({ onClose }: MotivationModalProps) {
  const [quote, setQuote] = useState(getRandomQuote());

  useEffect(() => {
    setQuote(getRandomQuote());
  }, []);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.8, opacity: 0, y: 40 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={(e) => e.stopPropagation()}
          className="relative w-full max-w-lg overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-8 shadow-2xl ring-1 ring-white/10 md:p-10"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-pink-500/10" />
          <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-purple-500/20 blur-3xl" />
          <div className="absolute -bottom-10 -left-10 h-40 w-40 rounded-full bg-blue-500/20 blur-3xl" />

          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-white/50 transition-colors hover:bg-white/10 hover:text-white"
          >
            <FiX size={20} />
          </button>

          <div className="relative z-10 text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 text-4xl shadow-lg shadow-purple-500/25"
            >
              🚀
            </motion.div>

            <h2 className="mb-2 text-2xl font-bold text-white md:text-3xl">
              Daily Dose of Motivation
            </h2>
            <p className="mb-8 text-sm text-white/50">
              Start your study session with positive energy
            </p>

            <div className="mb-8 space-y-3 rounded-2xl bg-white/5 p-6 ring-1 ring-white/10">
              <p className="text-xl font-semibold text-white/90 md:text-2xl">
                &ldquo;{quote.hi}&rdquo;
              </p>
              <p className="text-lg text-blue-300">{quote.en}</p>
            </div>

            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={onClose}
              className="rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 font-semibold text-white shadow-lg shadow-purple-500/25 transition-shadow hover:shadow-purple-500/40"
            >
              Let&apos;s Study
            </motion.button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

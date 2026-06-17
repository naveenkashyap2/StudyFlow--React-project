import { useState, useEffect, useCallback, useRef } from "react";

interface TimerState {
  timeLeft: number;
  isRunning: boolean;
  totalTime: number;
}

interface UseTimerReturn extends TimerState {
  start: () => void;
  pause: () => void;
  reset: () => void;
  progress: number;
}

export function useTimer(initialMinutes: number): UseTimerReturn {
  const totalSeconds = initialMinutes * 60;
  const [timeLeft, setTimeLeft] = useState(totalSeconds);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const start = useCallback(() => {
    setIsRunning(true);
  }, []);

  const pause = useCallback(() => {
    setIsRunning(false);
  }, []);

  const reset = useCallback(() => {
    setIsRunning(false);
    setTimeLeft(totalSeconds);
  }, [totalSeconds]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            clearInterval(intervalRef.current!);
            setIsRunning(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const progress = totalSeconds > 0 ? ((totalSeconds - timeLeft) / totalSeconds) * 100 : 0;

  return {
    timeLeft,
    isRunning,
    totalTime: totalSeconds,
    start,
    pause,
    reset,
    progress,
  };
}

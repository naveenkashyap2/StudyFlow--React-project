import {
  createContext,
  useContext,
  useReducer,
  useEffect,
  ReactNode,
  useMemo,
} from "react";
import { getTodayTasks, type StudyTask } from "../utils/studySchedule";
import { getTodayKey } from "../utils/dateHelpers";

export interface Todo {
  id: string;
  text: string;
  completed: boolean;
  createdAt: string;
}

export interface Note {
  id: string;
  title: string;
  content: string;
  updatedAt: string;
}

export interface StudyState {
  tasks: StudyTask[];
  todos: Todo[];
  notes: Note[];
  studyHours: Record<string, number>;
  streak: number;
  longestStreak: number;
  totalDaysCompleted: number;
  completedDates: string[];
  achievements: string[];
}

type Action =
  | { type: "SET_STATE"; payload: Partial<StudyState> }
  | { type: "TOGGLE_TASK"; payload: string }
  | { type: "ADD_TODO"; payload: Todo }
  | { type: "UPDATE_TODO"; payload: Todo }
  | { type: "DELETE_TODO"; payload: string }
  | { type: "ADD_NOTE"; payload: Note }
  | { type: "UPDATE_NOTE"; payload: Note }
  | { type: "DELETE_NOTE"; payload: string }
  | { type: "ADD_HOURS"; payload: { topic: string; hours: number } }
  | { type: "UPDATE_STREAK" };

const initialState: StudyState = {
  tasks: getTodayTasks(),
  todos: [],
  notes: [],
  studyHours: {},
  streak: 0,
  longestStreak: 0,
  totalDaysCompleted: 0,
  completedDates: [],
  achievements: [],
};

function loadState(): StudyState {
  if (typeof window === "undefined") return initialState;
  const raw = localStorage.getItem("study-tracker-state");
  if (!raw) return { ...initialState, tasks: getTodayTasks() };
  try {
    const parsed = JSON.parse(raw) as StudyState;
    const todayKey = getTodayKey();
    const savedTodayKey = parsed.tasks[0]?.id.split("-")[0];
    if (savedTodayKey !== todayKey) {
      parsed.tasks = getTodayTasks();
    }
    return { ...initialState, ...parsed, tasks: parsed.tasks };
  } catch {
    return { ...initialState, tasks: getTodayTasks() };
  }
}

function reducer(state: StudyState, action: Action): StudyState {
  switch (action.type) {
    case "SET_STATE":
      return { ...state, ...action.payload };

    case "TOGGLE_TASK": {
      const tasks = state.tasks.map((t) =>
        t.id === action.payload ? { ...t, completed: !t.completed } : t,
      );
      const completedCount = tasks.filter((t) => t.completed).length;
      const todayKey = getTodayKey();
      const completedDates = new Set(state.completedDates);
      const isAllCompleted =
        completedCount === tasks.length && tasks.length > 0;

      let updated = { ...state, tasks };

      if (isAllCompleted && !completedDates.has(todayKey)) {
        completedDates.add(todayKey);
        const sortedDates = Array.from(completedDates).sort();
        const streak = computeStreak(sortedDates);
        const longestStreak = Math.max(state.longestStreak, streak);
        updated = {
          ...updated,
          completedDates: sortedDates,
          streak,
          longestStreak,
          totalDaysCompleted: sortedDates.length,
          achievements: computeAchievements(
            sortedDates.length,
            state.achievements,
          ),
        };
      }

      return updated;
    }

    case "ADD_TODO":
      return { ...state, todos: [action.payload, ...state.todos] };

    case "UPDATE_TODO":
      return {
        ...state,
        todos: state.todos.map((t) =>
          t.id === action.payload.id ? action.payload : t,
        ),
      };

    case "DELETE_TODO":
      return {
        ...state,
        todos: state.todos.filter((t) => t.id !== action.payload),
      };

    case "ADD_NOTE":
      return { ...state, notes: [action.payload, ...state.notes] };

    case "UPDATE_NOTE":
      return {
        ...state,
        notes: state.notes.map((n) =>
          n.id === action.payload.id ? action.payload : n,
        ),
      };

    case "DELETE_NOTE":
      return {
        ...state,
        notes: state.notes.filter((n) => n.id !== action.payload),
      };

    case "ADD_HOURS": {
      const { topic, hours } = action.payload;
      return {
        ...state,
        studyHours: {
          ...state.studyHours,
          [topic]: (state.studyHours[topic] || 0) + hours,
        },
      };
    }

    case "UPDATE_STREAK": {
      const sortedDates = Array.from(state.completedDates).sort();
      const streak = computeStreak(sortedDates);
      return {
        ...state,
        streak,
        longestStreak: Math.max(state.longestStreak, streak),
        totalDaysCompleted: sortedDates.length,
      };
    }

    default:
      return state;
  }
}

function computeStreak(dates: string[]): number {
  if (dates.length === 0) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const oneDay = 24 * 60 * 60 * 1000;
  let streak = 0;
  let current = today.getTime();
  const sorted = [...dates]
    .map((d) => new Date(d).getTime())
    .sort((a, b) => b - a);

  const hasToday = sorted[0] === current;
  const hasYesterday = sorted[0] === current - oneDay;

  if (!hasToday && !hasYesterday) return 0;
  if (hasYesterday) current -= oneDay;

  for (const time of sorted) {
    if (time === current) {
      streak++;
      current -= oneDay;
    }
  }

  return streak;
}

function computeAchievements(totalDays: number, current: string[]): string[] {
  const achievements = new Set(current);
  const milestones: Record<number, string> = {
    3: "Beginner",
    7: "Warrior",
    15: "Discipline Master",
    30: "Full Stack Legend",
  };
  Object.entries(milestones).forEach(([days, badge]) => {
    if (totalDays >= Number(days)) achievements.add(badge);
  });
  return Array.from(achievements);
}

interface StudyContextValue extends StudyState {
  dispatch: React.Dispatch<Action>;
  completedTasks: number;
  pendingTasks: number;
  completionRate: number;
  totalStudyHours: number;
}

const StudyContext = createContext<StudyContextValue | undefined>(undefined);

export function StudyProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState, loadState);

  useEffect(() => {
    localStorage.setItem("study-tracker-state", JSON.stringify(state));
  }, [state]);

  useEffect(() => {
    dispatch({ type: "UPDATE_STREAK" });
  }, []);

  const completedTasks = state.tasks.filter((t) => t.completed).length;
  const pendingTasks = state.tasks.length - completedTasks;
  const completionRate =
    state.tasks.length > 0
      ? Math.round((completedTasks / state.tasks.length) * 100)
      : 0;
  const totalStudyHours = Object.values(state.studyHours).reduce(
    (sum, h) => sum + h,
    0,
  );

  const value = useMemo(
    () => ({
      ...state,
      dispatch,
      completedTasks,
      pendingTasks,
      completionRate,
      totalStudyHours,
    }),
    [
      state,
      dispatch,
      completedTasks,
      pendingTasks,
      completionRate,
      totalStudyHours,
    ],
  );

  return (
    <StudyContext.Provider value={value}>{children}</StudyContext.Provider>
  );
}

export function useStudy(): StudyContextValue {
  const ctx = useContext(StudyContext);
  if (!ctx) throw new Error("useStudy must be used within StudyProvider");
  return ctx;
}

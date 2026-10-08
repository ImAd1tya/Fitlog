"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { toast } from "react-toastify";
import type { WorkoutSummary } from "@/lib/workout";

export const PLAN_CAP = 5;
const STORAGE_KEY = "fitlog:plan:v1";

type Stored = {
  plan: string[];
  saved: string[];
  done: string[];
  workouts: Record<string, WorkoutSummary>;
};

type PlanContextValue = {
  plan: string[];
  saved: string[];
  done: string[];
  workouts: Record<string, WorkoutSummary>;
  planCount: number;
  savedCount: number;
  isInPlan: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  isDone: (id: string) => boolean;
  addToPlan: (workout: WorkoutSummary) => void;
  addToSaved: (workout: WorkoutSummary) => void;
  saveForLater: (workout: WorkoutSummary) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  toggleDone: (id: string) => void;
  notify: (message: string) => void;
};

const PlanContext = createContext<PlanContextValue | null>(null);

const toIds = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

const isWorkoutSummary = (value: unknown): value is WorkoutSummary =>
  typeof value === "object" &&
  value !== null &&
  "id" in value &&
  typeof value.id === "number" &&
  "name" in value &&
  typeof value.name === "string" &&
  "image" in value &&
  typeof value.image === "string" &&
  "equipment" in value &&
  typeof value.equipment === "string" &&
  "duration" in value &&
  typeof value.duration === "number" &&
  "caloriesBurned" in value &&
  typeof value.caloriesBurned === "number" &&
  "rating" in value &&
  typeof value.rating === "number";

const toWorkoutSummaries = (value: unknown): Record<string, WorkoutSummary> => {
  if (!value || typeof value !== "object" || Array.isArray(value)) return {};

  return Object.fromEntries(
    Object.entries(value).filter(
      (entry): entry is [string, WorkoutSummary] => isWorkoutSummary(entry[1]),
    ),
  );
};

const readStored = (): Stored => {
  if (typeof window === "undefined") {
    return { plan: [], saved: [], done: [], workouts: {} };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { plan: [], saved: [], done: [], workouts: {} };
    }

    const data = JSON.parse(raw) as Partial<Stored>;
    return {
      plan: toIds(data.plan).slice(0, PLAN_CAP),
      saved: toIds(data.saved),
      done: toIds(data.done),
      workouts: toWorkoutSummaries(data.workouts),
    };
  } catch {
    return { plan: [], saved: [], done: [], workouts: {} };
  }
}

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<string[]>([]);
  const [saved, setSaved] = useState<string[]>([]);
  const [done, setDone] = useState<string[]>([]);
  const [workouts, setWorkouts] = useState<Record<string, WorkoutSummary>>({});
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const id = window.setTimeout(() => {
      const stored = readStored();
      setPlan(stored.plan);
      setSaved(stored.saved);
      setDone(stored.done);
      setWorkouts(stored.workouts);
      setHydrated(true);
    }, 0);

    return () => window.clearTimeout(id);
  }, []);

  // Persist after every change (only once loaded, so we never overwrite with empty state).
  useEffect(() => {
    if (!hydrated) return;

    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved, done, workouts }));
    } catch {
      /* storage full / blocked */
    }
  }, [hydrated, plan, saved, done, workouts]);

  const notify = useCallback((message: string) => {
    toast.info(message, {
      position: "bottom-right",
      autoClose: 2200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
    });
  }, []);

  const addToPlan = useCallback(
    (workout: WorkoutSummary) => {
      const id = String(workout.id);
      if (plan.includes(id)) return notify("Already in today's plan");
      if (plan.length >= PLAN_CAP) return notify("Plan is full — five lifts max");
      setPlan([...plan, id]);
      setWorkouts((current) => ({ ...current, [id]: workout }));
      notify("Added to today's plan");
    },
    [plan, notify],
  );

  const addToSaved = useCallback(
    (workout: WorkoutSummary) => {
      const id = String(workout.id);
      if (saved.includes(id)) return notify("Already saved");
      setSaved([...saved, id]);
      setWorkouts((current) => ({ ...current, [id]: workout }));
      notify("Saved for later");
    },
    [saved, notify],
  );

  const removeFromPlan = useCallback(
    (id: string) => {
      setPlan((p) => p.filter((x) => x !== id));
      setDone((d) => d.filter((x) => x !== id));
      notify("Removed from today's plan");
    },
    [notify],
  );

  const removeFromSaved = useCallback(
    (id: string) => {
      setSaved((s) => s.filter((x) => x !== id));
      notify("Removed from saved");
    },
    [notify],
  );

  const toggleDone = useCallback(
    (id: string) => {
      const isDone = done.includes(id);
      setDone(isDone ? done.filter((x) => x !== id) : [...done, id]);
      notify(isDone ? "Marked as not done" : "Marked as done");
    },
    [done, notify],
  );

  const value = useMemo<PlanContextValue>(
    () => ({
      plan,
      saved,
      done,
      workouts,
      planCount: plan.length,
      savedCount: saved.length,
      isInPlan: (id) => plan.includes(id),
      isSaved: (id) => saved.includes(id),
      isDone: (id) => done.includes(id),
      addToPlan,
      addToSaved,
      saveForLater: addToSaved,
      removeFromPlan,
      removeFromSaved,
      toggleDone,
      notify,
    }),
    [plan, saved, done, workouts, addToPlan, addToSaved, removeFromPlan, removeFromSaved, toggleDone, notify],
  );

  return <PlanContext.Provider value={value}>{children}</PlanContext.Provider>;
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}
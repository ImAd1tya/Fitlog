"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

export const PLAN_CAP = 5;
const STORAGE_KEY = "fitlog:plan:v1";

type Stored = { plan: string[]; saved: string[]; done: string[] };

type PlanContextValue = {
  plan: string[];
  saved: string[];
  done: string[];
  planCount: number;
  savedCount: number;
  isInPlan: (id: string) => boolean;
  isSaved: (id: string) => boolean;
  isDone: (id: string) => boolean;
  addToPlan: (id: string) => void;
  addToSaved: (id: string) => void;
  saveForLater: (id: string) => void;
  removeFromPlan: (id: string) => void;
  removeFromSaved: (id: string) => void;
  toggleDone: (id: string) => void;
  notify: (message: string) => void;
};

const PlanContext = createContext<PlanContextValue | null>(null);

const toIds = (v: unknown): string[] =>
  Array.isArray(v) ? v.filter((x): x is string => typeof x === "string") : [];

const readStored = (): Stored => {
  if (typeof window === "undefined") {
    return { plan: [], saved: [], done: [] };
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      return { plan: [], saved: [], done: [] };
    }

    const data = JSON.parse(raw) as Partial<Stored>;
    return {
      plan: toIds(data.plan).slice(0, PLAN_CAP),
      saved: toIds(data.saved),
      done: toIds(data.done),
    };
  } catch {
    return { plan: [], saved: [], done: [] };
  }
};

export function PlanProvider({ children }: { children: ReactNode }) {
  const [plan, setPlan] = useState<string[]>(() => readStored().plan);
  const [saved, setSaved] = useState<string[]>(() => readStored().saved);
  const [done, setDone] = useState<string[]>(() => readStored().done);
  const [toast, setToast] = useState<{ id: number; message: string } | null>(null);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Persist after every change (only once loaded, so we never overwrite with empty state).
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ plan, saved, done }));
    } catch {
      /* storage full / blocked */
    }
  }, [plan, saved, done]);

  const notify = useCallback((message: string) => {
    if (timer.current) clearTimeout(timer.current);
    setToast({ id: Date.now(), message });
    timer.current = setTimeout(() => setToast(null), 2200);
  }, []);

  const addToPlan = useCallback(
    (id: string) => {
      if (plan.includes(id)) return notify("Already in today's plan");
      if (plan.length >= PLAN_CAP) return notify("Plan is full — five lifts max");
      setPlan([...plan, id]);
      notify("Added to today's plan");
    },
    [plan, notify],
  );

  const addToSaved = useCallback(
    (id: string) => {
      if (saved.includes(id)) return notify("Already saved");
      setSaved([...saved, id]);
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
    [plan, saved, done, addToPlan, addToSaved, removeFromPlan, removeFromSaved, toggleDone, notify],
  );

  return (
    <PlanContext.Provider value={value}>
      {children}
      {toast && (
        <div
          key={toast.id}
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[#2b303d] bg-[#1f242d] px-5 py-2.5 text-sm text-white shadow-lg"
        >
          {toast.message}
        </div>
      )}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) throw new Error("usePlan must be used inside <PlanProvider>");
  return ctx;
}
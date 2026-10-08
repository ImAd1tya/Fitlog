"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

const PLAN_KEY = "fitlog:plan";
const SAVED_KEY = "fitlog:saved";
const EMPTY_STORAGE = "[]";
const fallbackStorage = new Map<string, string>();

type Toast = { id: number; message: string };

type PlanContextValue = {
  planIds: number[];
  savedIds: number[];
  planCount: number;
  savedCount: number;
  addToPlan: (id: number) => void;
  removeFromPlan: (id: number) => void;
  saveForLater: (id: number) => void;
  removeFromSaved: (id: number) => void;
};

const PlanContext = createContext<PlanContextValue | null>(null);

function readIds(raw: string): number[] {
  try {
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((n): n is number => typeof n === "number")
      : [];
  } catch {
    return [];
  }
}

function writeIds(key: string, ids: number[]) {
  const raw = JSON.stringify(ids);
  try {
    window.localStorage.setItem(key, raw);
    fallbackStorage.delete(key);
  } catch {
    fallbackStorage.set(key, raw);
  }
  window.dispatchEvent(new Event(`${key}:change`));
}

function getStoredIds(key: string): string {
  try {
    return window.localStorage.getItem(key) ?? fallbackStorage.get(key) ?? EMPTY_STORAGE;
  } catch {
    return fallbackStorage.get(key) ?? EMPTY_STORAGE;
  }
}

function subscribeToIds(key: string, callback: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === key || event.key === null) callback();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(`${key}:change`, callback);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(`${key}:change`, callback);
  };
}

function subscribeToPlan(callback: () => void) {
  return subscribeToIds(PLAN_KEY, callback);
}

function subscribeToSaved(callback: () => void) {
  return subscribeToIds(SAVED_KEY, callback);
}

function getPlanSnapshot() {
  return getStoredIds(PLAN_KEY);
}

function getSavedSnapshot() {
  return getStoredIds(SAVED_KEY);
}

export function PlanProvider({ children }: { children: React.ReactNode }) {
  const planRaw = useSyncExternalStore(
    subscribeToPlan,
    getPlanSnapshot,
    () => EMPTY_STORAGE,
  );
  const savedRaw = useSyncExternalStore(
    subscribeToSaved,
    getSavedSnapshot,
    () => EMPTY_STORAGE,
  );
  const planIds = useMemo(() => readIds(planRaw), [planRaw]);
  const savedIds = useMemo(() => readIds(savedRaw), [savedRaw]);
  const [toast, setToast] = useState<Toast | null>(null);

  // Auto-hide the toast
  useEffect(() => {
    if (!toast) return;
    const timer = setTimeout(() => setToast(null), 2500);
    return () => clearTimeout(timer);
  }, [toast]);

  const showToast = useCallback((message: string) => {
    setToast({ id: Date.now(), message });
  }, []);

  const addToPlan = useCallback(
    (id: number) => {
      const currentIds = readIds(getStoredIds(PLAN_KEY));
      if (currentIds.includes(id)) {
        showToast("Already in today's plan");
        return;
      }
      writeIds(PLAN_KEY, [...currentIds, id]);
      showToast("Added to today's plan");
    },
    [showToast],
  );

  const saveForLater = useCallback(
    (id: number) => {
      const currentIds = readIds(getStoredIds(SAVED_KEY));
      if (currentIds.includes(id)) {
        showToast("Already saved");
        return;
      }
      writeIds(SAVED_KEY, [...currentIds, id]);
      showToast("Saved for later");
    },
    [showToast],
  );

  const removeFromPlan = useCallback(
    (id: number) => {
      writeIds(
        PLAN_KEY,
        readIds(getStoredIds(PLAN_KEY)).filter((x) => x !== id),
      );
      showToast("Removed from today's plan");
    },
    [showToast],
  );

  const removeFromSaved = useCallback(
    (id: number) => {
      writeIds(
        SAVED_KEY,
        readIds(getStoredIds(SAVED_KEY)).filter((x) => x !== id),
      );
      showToast("Removed from saved");
    },
    [showToast],
  );

  const value = useMemo<PlanContextValue>(
    () => ({
      planIds,
      savedIds,
      planCount: planIds.length,
      savedCount: savedIds.length,
      addToPlan,
      removeFromPlan,
      saveForLater,
      removeFromSaved,
    }),
    [planIds, savedIds, addToPlan, removeFromPlan, saveForLater, removeFromSaved],
  );

  return (
    <PlanContext.Provider value={value}>
      {children}

      {toast && (
        <div className="toast toast-end toast-bottom z-[100]">
          <div
            key={toast.id}
            role="status"
            aria-live="polite"
            className="alert border border-[#222630] bg-[#15171d] text-sm text-base-content shadow-lg"
          >
            <svg
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="#c2f800"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="10" />
              <path d="m9 12 2 2 4-4" />
            </svg>
            <span>{toast.message}</span>
          </div>
        </div>
      )}
    </PlanContext.Provider>
  );
}

export function usePlan() {
  const ctx = useContext(PlanContext);
  if (!ctx) {
    throw new Error("usePlan must be used inside <PlanProvider>");
  }
  return ctx;
}
"use client";

import { useMemo, useState } from "react";
import { usePlan } from "@/app/components/providers/plan-provider";
import type { Workout } from "@/lib/workout";
import EmptyState from "./empty-state";
import MetricsSummary from "./metrics-summary";
import PlanCard from "./plan-card";
import PlanControls, { type SortKey, type Tab } from "./plan-controls";
import { toPlanItem, type PlanItem } from "./plan-item";

type Props = {
  workouts: Workout[];
  loadError: boolean;
};

export default function MyPlanView({ workouts, loadError }: Props) {
  const {
    plan, saved, workouts: savedWorkoutDetails, isDone,
    toggleDone, removeFromPlan, removeFromSaved,
  } = usePlan();

  const [tab, setTab] = useState<Tab>("plan");
  const [sort, setSort] = useState<SortKey>("duration");
  const itemsById = useMemo(
    () => ({
      ...Object.fromEntries(
        Object.entries(savedWorkoutDetails).map(([id, workout]) => [id, toPlanItem(workout)]),
      ),
      ...Object.fromEntries(workouts.map((workout) => {
        const item = toPlanItem(workout);
        return [item.id, item];
      })),
    }),
    [savedWorkoutDetails, workouts],
  );

  const planItems = useMemo(
    () => plan.map((id) => itemsById[id]).filter((x): x is PlanItem => Boolean(x)),
    [itemsById, plan],
  );

  const savedItems = useMemo(
    () => saved.map((id) => itemsById[id]).filter((x): x is PlanItem => Boolean(x)),
    [itemsById, saved],
  );

  // Metrics always describe today's plan, whichever tab is open.
  const totals = useMemo(
    () => ({
      exercises: planItems.length,
      minutes: planItems.reduce((s, i) => s + i.minutes, 0),
      calories: planItems.reduce((s, i) => s + i.calories, 0),
    }),
    [planItems],
  );

  const visible = useMemo(() => {
    const list = [...(tab === "plan" ? planItems : savedItems)];
    list.sort((a, b) =>
      sort === "duration" ? a.minutes - b.minutes
      : sort === "calories" ? a.calories - b.calories
      : b.rating - a.rating,
    );
    return list;
  }, [tab, sort, planItems, savedItems]);

  const handleToggleDone = (item: PlanItem) => {
    toggleDone(item.id);
  };

  const handleRemove = (item: PlanItem) => {
    if (tab === "plan") {
      removeFromPlan(item.id);
    } else {
      removeFromSaved(item.id);
    }
  };

  return (
    <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-4 py-8 sm:px-6 md:px-12 md:py-10">
      <header className="flex flex-col gap-2">
        <h1 className="font-[family-name:var(--font-oswald)] text-3xl font-bold tracking-[-0.75px] text-white">
          MY PLAN
        </h1>
        <p className="text-sm text-[#8a92a0]">
          Cap of five lifts for today. Finish them, then load more.
        </p>
      </header>

      <MetricsSummary {...totals} />

      <PlanControls tab={tab} onTab={setTab} sort={sort} onSort={setSort} />

      <section aria-label={tab === "plan" ? "Today’s plan" : "Saved workouts"}>
        {loadError && visible.length < (tab === "plan" ? plan : saved).length && (
          <div
            role="alert"
            className="rounded-2xl border border-[#232732] bg-[#14171e] p-6 text-sm text-[#d1d5db]"
          >
            Couldn&apos;t load workout details right now. Please refresh and try again.
          </div>
        )}
        {visible.length === 0 ? (
          loadError && (tab === "plan" ? plan : saved).length > 0 ? null : (
          <EmptyState />
          )
        ) : (
          <div className="flex flex-col gap-4">
            {visible.map((item) => (
              <PlanCard
                key={item.id}
                item={item}
                variant={tab}
                done={tab === "plan" && isDone(item.id)}
                onToggleDone={() => handleToggleDone(item)}
                onRemove={() => handleRemove(item)}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
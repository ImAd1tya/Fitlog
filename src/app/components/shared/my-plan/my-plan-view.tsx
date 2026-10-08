"use client";

import { useEffect, useMemo, useState } from "react";
import { usePlan } from "@/app/components/providers/plan-provider";
import EmptyState from "./empty-state";
import MetricsSummary from "./metrics-summary";
import PlanCard from "./plan-card";
import PlanControls, { type SortKey, type Tab } from "./plan-controls";
import { getPlanItem, type PlanItem } from "./plan-item";

export default function MyPlanView() {
  const {
    plan, saved, isDone,
    toggleDone, removeFromPlan, removeFromSaved,
  } = usePlan();

  const [tab, setTab] = useState<Tab>("plan");
  const [sort, setSort] = useState<SortKey>("duration");
  const [itemsById, setItemsById] = useState<Record<string, PlanItem>>({});

  useEffect(() => {
    let active = true;

    const loadItems = async () => {
      const ids = [...new Set([...plan, ...saved])];
      const resolved = await Promise.all(
        ids.map(async (id) => [id, await getPlanItem(id)] as const),
      );

      if (!active) return;

      const nextItems = Object.fromEntries(
        resolved.flatMap(([id, item]) => (item ? [[id, item]] : [])),
      );

      setItemsById(nextItems);
    };

    void loadItems();
    return () => {
      active = false;
    };
  }, [plan, saved]);

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

  return (
    <main className="mx-auto flex w-full max-w-[1280px] flex-col gap-6 px-6 py-10 md:px-12">
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
        {visible.length === 0 ? (
          <EmptyState />
        ) : (
          <div className="flex flex-col gap-4">
            {visible.map((item) => (
              <PlanCard
                key={item.id}
                item={item}
                variant={tab}
                done={tab === "plan" && isDone(item.id)}
                onToggleDone={() => toggleDone(item.id)}
                onRemove={() =>
                  tab === "plan" ? removeFromPlan(item.id) : removeFromSaved(item.id)
                }
              />
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
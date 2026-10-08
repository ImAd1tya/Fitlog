"use client";

import { usePlan } from "@/app/components/providers/plan-provider";

export default function WorkoutActions({ workoutId }: { workoutId: number }) {
  const { addToPlan, saveForLater } = usePlan();
  const planId = String(workoutId);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        type="button"
        onClick={() => addToPlan(planId)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl bg-[#ccff00] px-6 py-3 text-sm font-semibold leading-5 text-base-100 shadow-sm transition hover:bg-[#d8ff4d] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ccff00]"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2.2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M8 2v4" />
          <path d="M16 2v4" />
          <path d="M21 13V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h8" />
          <path d="M3 10h18" />
          <path d="M16 19h6" />
          <path d="M19 16v6" />
        </svg>
        Add to today&apos;s plan
      </button>

      <button
        type="button"
        onClick={() => saveForLater(planId)}
        className="inline-flex cursor-pointer items-center gap-2 rounded-xl border border-[#374151] px-6 py-3 text-sm font-medium leading-5 text-[#e5e7eb] transition hover:border-[#6b7280] hover:bg-white/5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e5e7eb]"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
        </svg>
        Save for later
      </button>
    </div>
  );
}
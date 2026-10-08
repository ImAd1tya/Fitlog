import Image from "next/image";
import type { Workout } from "@/lib/workout";
import WorkoutActions from "./workout-actions";

export default function WorkoutDetails({ workout }: { workout: Workout }) {
  const specs = [
    { label: "Equipment", value: workout.equipment },
    { label: "Difficulty", value: workout.difficulty },
    { label: "Sets", value: String(workout.sets) },
    { label: "Reps", value: workout.reps },
    { label: "Duration", value: `${workout.duration} min` },
    { label: "Calories", value: `${workout.caloriesBurned} kcal` },
    { label: "Rating", value: workout.rating.toFixed(1) },
  ];

  return (
    <article className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-14">
      {/* Left: visual */}
      <div className="relative aspect-[4/5] w-full self-start overflow-hidden rounded-2xl border border-[#232834] bg-[#171a21] shadow-[0_25px_50px_rgba(0,0,0,0.25)]">
        <Image
          src={workout.image}
          alt={workout.name}
          fill
          priority
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="object-cover"
        />
      </div>

      {/* Right: info */}
      <div className="flex min-w-0 flex-col">
        <h1 className="mb-3 font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase leading-10 tracking-[-0.025em] text-white sm:text-4xl">
          {workout.name}
        </h1>

        <p className="mb-5 max-w-xl text-base leading-6 text-neutral-content">
          {workout.description}
        </p>

        <ul className="mb-7 flex flex-wrap items-center gap-2.5">
          {workout.muscleGroups.map((group) => (
            <li
              key={group}
              className="rounded-full bg-[#ccff00] px-3.5 py-1 text-xs font-semibold leading-4 text-base-100"
            >
              {group}
            </li>
          ))}
        </ul>

        {/* Key specs */}
        <dl className="mb-8 overflow-hidden rounded-2xl border border-[#232834] bg-[#151922]">
          {specs.map(({ label, value }, i) => (
            <div
              key={label}
              className={`flex items-center justify-between gap-4 px-6 py-3.5 ${
                i > 0 ? "border-t border-[#1e2330]" : ""
              }`}
            >
              <dt className="text-xs font-bold uppercase leading-4 tracking-[0.6px] text-neutral-content">
                {label}
              </dt>
              <dd className="text-right text-sm font-medium leading-5 text-[#e5e7eb]">
                {value}
              </dd>
            </div>
          ))}
        </dl>

        {/* Instructions */}
        <section className="mb-9">
          <h2 className="mb-4 text-base font-extrabold uppercase leading-6 tracking-[0.8px] text-white">
            Instructions
          </h2>
          <ol className="flex list-decimal flex-col gap-3 pl-5 text-sm leading-[22.75px] text-[#d1d5db] marker:text-neutral-content">
            {workout.instructions.map((step, i) => (
              <li key={i} className="pl-1">
                {step}
              </li>
            ))}
          </ol>
        </section>

        <WorkoutActions workout={workout} />
      </div>
    </article>
  );
}
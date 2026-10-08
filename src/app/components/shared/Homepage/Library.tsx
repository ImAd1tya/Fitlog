import Image from "next/image";
import Link from "next/link";
import { getWorkouts, type Workout } from "@/lib/workout";

function StatIcon({ children }: { children: React.ReactNode }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

function WorkoutCard({ workout }: { workout: Workout }) {
  const {
    id,
    name,
    image,
    muscleGroups,
    equipment,
    duration,
    caloriesBurned,
    rating,
  } = workout;

  return (
    <li>
      <Link
        href={`/workouts/${id}`}
        className="group flex h-full flex-col overflow-hidden rounded-2xl border border-[#222630] bg-[#15171d] transition hover:-translate-y-0.5 hover:border-primary/60"
      >
        <div className="relative h-48 w-full shrink-0 bg-base-200">
          <Image
            src={image}
            alt={name}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover"
          />
        </div>

        <div className="flex flex-1 flex-col justify-between p-6">
          <div className="flex flex-col gap-1">
            <div className="flex flex-wrap items-center gap-2">
              {muscleGroups.map((group) => (
                <span
                  key={group}
                  className="rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold uppercase leading-[16.5px] tracking-[0.55px] text-primary-content"
                >
                  {group}
                </span>
              ))}
            </div>

            <h3 className="pt-3 font-[family-name:var(--font-oswald)] text-lg font-bold uppercase leading-7 tracking-[0.45px] text-white">
              {name}
            </h3>

            <p className="text-xs leading-4 text-neutral-content">{equipment}</p>
          </div>

          <ul className="mt-4 flex items-center gap-4 border-t border-[#20242e] pt-3 text-xs leading-4 text-neutral-content">
            <li className="flex items-center gap-1.5">
              <StatIcon>
                <circle cx="12" cy="12" r="10" />
                <polyline points="12 6 12 12 16 14" />
              </StatIcon>
              {duration} min
            </li>
            <li className="flex items-center gap-1.5">
              <StatIcon>
                <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
              </StatIcon>
              {caloriesBurned} kcal
            </li>
            <li className="flex items-center gap-1.5">
              <StatIcon>
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </StatIcon>
              {rating.toFixed(1)}
            </li>
          </ul>
        </div>
      </Link>
    </li>
  );
}

export default async function Library() {
  let workouts: Workout[] = [];
  let failed = false;

  try {
    workouts = await getWorkouts();
  } catch {
    failed = true;
  }

  return (
    <section id="library" className="scroll-mt-24">
      <div className="mb-8 flex flex-col gap-1">
        <h2 className="font-[family-name:var(--font-oswald)] text-3xl font-bold uppercase leading-9 tracking-[-0.025em] text-white">
          The Library
        </h2>
        <p className="text-sm leading-5 text-neutral-content">
          Twelve lifts covering every major muscle group.
        </p>
      </div>

      {failed ? (
        <div
          role="alert"
          className="rounded-2xl border border-[#222630] bg-[#15171d] p-6 text-sm text-neutral-content"
        >
          Couldn&apos;t load workouts right now. Please refresh and try again.
        </div>
      ) : (
        <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {workouts.map((workout) => (
            <WorkoutCard key={workout.id} workout={workout} />
          ))}
        </ul>
      )}
    </section>
  );
}
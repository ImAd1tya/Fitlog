import type { Metadata } from "next";
import { notFound } from "next/navigation";
import WorkoutDetails from "@/app/components/shared/details/workout-details";
import { getWorkout } from "@/lib/workout";

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const workout = await getWorkout(Number(id));
  return {
    title: workout ? `${workout.name} | FitLog` : "Workout not found | FitLog",
  };
}

export default async function WorkoutPage({ params }: Props) {
  const { id } = await params;
  const workout = await getWorkout(Number(id));

  if (!workout) notFound();

  return (
    <main className="mx-auto max-w-[1280px] px-6 py-12">
      <WorkoutDetails workout={workout} />
    </main>
  );
}
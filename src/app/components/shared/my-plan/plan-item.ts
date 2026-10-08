import type { WorkoutSummary } from "@/lib/workout";

export type PlanItem = {
  id: string;
  name: string;
  equipment: string;
  minutes: number;
  calories: number;
  rating: number;
  image: string;
};

export const toPlanItem = (workout: WorkoutSummary): PlanItem => ({
  id: String(workout.id),
  name: workout.name,
  equipment: workout.equipment,
  minutes: workout.duration,
  calories: workout.caloriesBurned,
  rating: workout.rating,
  image: workout.image,
});
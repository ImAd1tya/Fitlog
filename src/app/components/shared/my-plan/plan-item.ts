import type { StaticImageData } from "next/image";
import { getWorkouts, type Workout } from "@/lib/workout";

export type PlanItem = {
  id: string;
  name: string;
  equipment: string;
  minutes: number;
  calories: number;
  rating: number;
  image: string | StaticImageData;
};

const toPlanItem = (workout: Workout): PlanItem => ({
  id: String(workout.id),
  name: workout.name,
  equipment: workout.equipment,
  minutes: workout.duration,
  calories: workout.caloriesBurned,
  rating: workout.rating,
  image: workout.image,
});

let cachedPlanItems: PlanItem[] | null = null;
let pendingPlanItems: Promise<PlanItem[]> | null = null;

export function loadPlanItems(): Promise<PlanItem[]> {
  if (cachedPlanItems) return Promise.resolve(cachedPlanItems);
  if (pendingPlanItems) return pendingPlanItems;

  pendingPlanItems = getWorkouts()
    .then((workouts) => {
      cachedPlanItems = workouts.map(toPlanItem);
      return cachedPlanItems;
    })
    .catch(() => {
      cachedPlanItems = [];
      return cachedPlanItems;
    })
    .finally(() => {
      pendingPlanItems = null;
    });

  return pendingPlanItems;
}

export async function getPlanItem(id: string): Promise<PlanItem | undefined> {
  const items = await loadPlanItems();
  return items.find((item) => item.id === id);
}
export type Workout = {
  id: number;
  name: string;
  image: string;
  muscleGroups: string[];
  equipment: string;
  difficulty: string;
  duration: number;
  caloriesBurned: number;
  sets: number;
  reps: string;
  rating: number;
  description: string;
  instructions: string[];
};

export type WorkoutSummary = Pick<
  Workout,
  "id" | "name" | "image" | "equipment" | "duration" | "caloriesBurned" | "rating"
>;

const API_URL = "https://api.abcz.workers.dev/api/fitlog";

export async function getWorkouts(): Promise<Workout[]> {
  const res = await fetch(API_URL, { next: { revalidate: 3600 } });
  if (!res.ok) {
    throw new Error(`Failed to load workouts (${res.status})`);
  }
  return res.json();
}

export async function getWorkout(id: number): Promise<Workout | undefined> {
  const workouts = await getWorkouts();
  return workouts.find((w) => w.id === id);
}
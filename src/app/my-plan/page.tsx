import { Suspense } from "react";
import { connection } from "next/server";
import MyPlanView from "../components/shared/my-plan/my-plan-view";
import Spinner from "../components/shared/Spinner";
import { getWorkouts, type Workout } from "@/lib/workout";

export const metadata = { title: "My Plan — FitLog" };

async function MyPlanContent() {
  await connection();

  let workouts: Workout[] = [];
  let loadError = false;

  try {
    workouts = await getWorkouts();
  } catch (error) {
    console.error("Failed to load workouts for My Plan:", error);
    loadError = true;
  }

  return <MyPlanView workouts={workouts} loadError={loadError} />;
}

export default function MyPlanPage() {
  return (
    <Suspense fallback={<Spinner />}>
      <MyPlanContent />
    </Suspense>
  );
}
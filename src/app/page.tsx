import { Suspense } from "react";
import Banner from "@/app/components/shared/Homepage/Banner";
import Library from "@/app/components/shared/Homepage/Library";
import Spinner from "@/app/components/shared/Spinner";

export default function HomePage() {
  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 sm:py-12">
      <Banner />
      <Suspense fallback={<Spinner />}>
        <Library />
      </Suspense>
    </div>
  );
}
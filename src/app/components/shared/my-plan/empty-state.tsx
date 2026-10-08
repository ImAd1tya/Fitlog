import Link from "next/link";

export default function EmptyState() {
  return (
    <div className="flex min-h-[300px] flex-col items-center justify-center rounded-xl border border-white/10 bg-[#111317]/50 px-6 text-center">
      <h2 className="mb-2 font-[family-name:var(--font-oswald)] text-xl font-bold text-white">
        NOTHING HERE YET
      </h2>
      <p className="mb-6 max-w-xs text-xs text-[#a1a1aa]">
        Browse the library and add a lift to get today moving.
      </p>
      <Link
        href="/"
        className="rounded-full bg-[#c2f10d] px-5 py-2.5 text-xs font-semibold text-black transition-opacity hover:opacity-90"
      >
        Go to workouts
      </Link>
    </div>
  );
}
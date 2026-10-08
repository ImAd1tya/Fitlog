export default function Spinner() {
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-20 text-[#d1d5db]"
      role="status"
      aria-live="polite"
      aria-label="Loading workouts"
    >
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-[#222630] border-t-[#ccff00]" />
      <span className="text-sm font-medium">Loading workouts…</span>
    </div>
  );
}
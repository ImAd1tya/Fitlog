type Props = { exercises: number; minutes: number; calories: number };

export default function MetricsSummary({ exercises, minutes, calories }: Props) {
  const items = [
    { label: "Exercises", value: exercises, accent: true },
    { label: "Minutes", value: minutes, accent: false },
    { label: "Calories", value: calories, accent: false },
  ];

  return (
    <section
      aria-label="Plan summary"
      className="grid grid-cols-3 rounded-2xl border border-[#232732] bg-[#13161d] py-6"
    >
      {items.map((m, i) => (
        <div
          key={m.label}
          className={`px-4 sm:px-8 ${i > 0 ? "border-l border-[#232732]/60" : ""}`}
        >
          <p className="mb-1 text-xs text-[#8a92a0]">{m.label}</p>
          <p
            className={`font-[family-name:var(--font-oswald)] text-3xl font-bold sm:text-4xl ${
              m.accent ? "text-[#ccff00]" : "text-white"
            }`}
          >
            {m.value}
          </p>
        </div>
      ))}
    </section>
  );
}
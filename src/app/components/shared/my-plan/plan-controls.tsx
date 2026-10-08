import { ChevronDownIcon } from "./icons";

export type Tab = "plan" | "saved";
export type SortKey = "duration" | "calories" | "rating";

type Props = {
  tab: Tab;
  onTab: (t: Tab) => void;
  sort: SortKey;
  onSort: (s: SortKey) => void;
};

const TABS: { key: Tab; label: string }[] = [
  { key: "plan", label: "Today’s Plan" },
  { key: "saved", label: "Saved" },
];

export default function PlanControls({ tab, onTab, sort, onSort }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3">
      <div
        role="tablist"
        aria-label="Plan views"
        className="flex gap-1 rounded-xl border border-[#232732] bg-[#151921] p-1"
      >
        {TABS.map((t) => {
          const active = t.key === tab;
          return (
            <button
              key={t.key}
              role="tab"
              aria-selected={active}
              onClick={() => onTab(t.key)}
              className={`rounded-lg px-4 py-1.5 text-xs transition-colors ${
                active
                  ? "border border-[#2b303d] bg-[#1f242d] font-bold text-white"
                  : "border border-transparent text-[#8a92a0] hover:text-white"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <label className="flex items-center gap-3 text-xs text-[#8a92a0]">
        Sort By
        <span className="relative">
          <select
            value={sort}
            onChange={(e) => onSort(e.target.value as SortKey)}
            className="h-[34px] appearance-none rounded-[9px] border border-[#232732] bg-[#13161d] py-0 pl-3 pr-9 text-xs text-white outline-none focus-visible:border-[#ccff00]"
          >
            <option value="duration">Duration</option>
            <option value="calories">Calories</option>
            <option value="rating">Rating</option>
          </select>
          <ChevronDownIcon className="pointer-events-none absolute right-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-[#8a92a0]" />
        </span>
      </label>
    </div>
  );
}
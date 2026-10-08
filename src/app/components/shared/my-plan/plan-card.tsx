import Image from "next/image";
import Link from "next/link";
import type { PlanItem } from "./plan-item";
import { CheckIcon, ClockIcon, FlameIcon, StarIcon, XIcon } from "./icons";

type Props = {
  item: PlanItem;
  variant: "plan" | "saved";
  done?: boolean;
  onToggleDone?: () => void;
  onRemove: () => void;
};

export default function PlanCard({ item, variant, done, onToggleDone, onRemove }: Props) {
  return (
    <article
      className={`flex flex-col gap-4 rounded-2xl border border-[#232732] bg-[#14171e] p-4 sm:flex-row sm:items-center sm:justify-between ${
        done ? "opacity-60" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        <div className="relative h-20 w-36 shrink-0 overflow-hidden rounded-xl bg-[#1f2937]">
          <Image
            src={item.image}
            alt={item.name}
            fill
            sizes="144px"
            className="object-cover"
          />
        </div>

        <div className="flex flex-col gap-0.5">
          <h3
            className={`font-[family-name:var(--font-oswald)] text-base font-bold uppercase tracking-[0.4px] text-white ${
              done ? "line-through" : ""
            }`}
          >
            {item.name}
          </h3>
          <p className="text-xs font-semibold text-[#8a92a0]">{item.equipment}</p>
          <ul className="mt-1.5 flex items-center gap-3 text-xs text-[#d1d5db]">
            <li className="flex items-center gap-1.5">
              <ClockIcon className="h-3.5 w-3.5 text-[#ccff00]" />
              {item.minutes} min
            </li>
            <li className="flex items-center gap-1.5">
              <FlameIcon className="h-3.5 w-3.5 text-[#ccff00]" />
              {item.calories} kcal
            </li>
            <li className="flex items-center gap-1.5">
              <StarIcon className="h-3.5 w-3.5 text-[#ccff00]" />
              {item.rating}
            </li>
          </ul>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Link
          href={`/workouts/${item.id}`}
          className="rounded-full border border-[#374151] px-[18px] py-2 text-xs text-white transition-colors hover:border-white/60"
        >
          View Details
        </Link>

        {variant === "plan" && (
          <button
            onClick={onToggleDone}
            aria-pressed={done}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-opacity hover:opacity-90 ${
              done
                ? "border border-[#ccff00] text-[#ccff00]"
                : "bg-[#ccff00] text-black"
            }`}
          >
            <CheckIcon className="h-3.5 w-3.5" />
            {done ? "Done" : "Mark as Done"}
          </button>
        )}

        <button
          onClick={onRemove}
          aria-label={`Remove ${item.name}`}
          className="rounded-md p-1.5 text-[#6b7280] transition-colors hover:text-white"
        >
          <XIcon className="h-4 w-4" />
        </button>
      </div>
    </article>
  );
}
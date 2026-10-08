type P = { className?: string };

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

export const ClockIcon = ({ className }: P) => (
  <svg viewBox="0 0 14 14" strokeWidth="1.17" className={className} {...base}>
    <circle cx="7" cy="7" r="5.5" />
    <path d="M7 4v3.2l1.8 1" />
  </svg>
);

export const FlameIcon = ({ className }: P) => (
  <svg viewBox="0 0 14 14" fill="currentColor" className={className} aria-hidden>
    <path d="M7 1.2c.4 2-1.9 3-1.9 5.1 0 .8.4 1.4.9 1.8-.1-.8.3-1.4.8-1.9.6 1 2 1.6 2 3.1A2.9 2.9 0 0 1 7 12.2 3 3 0 0 1 4 9.3C4 6 7 5.2 7 1.2Z" />
  </svg>
);

export const StarIcon = ({ className }: P) => (
  <svg viewBox="0 0 14 14" strokeWidth="1.17" className={className} {...base}>
    <path d="M7 1.5l1.7 3.5 3.8.5-2.8 2.7.7 3.8L7 10.1 3.6 12l.7-3.8L1.5 5.5l3.8-.5L7 1.5Z" />
  </svg>
);

export const CheckIcon = ({ className }: P) => (
  <svg viewBox="0 0 14 14" strokeWidth="1.75" className={className} {...base}>
    <path d="M2.5 7.5l3 3 6-6.5" />
  </svg>
);

export const XIcon = ({ className }: P) => (
  <svg viewBox="0 0 14 14" strokeWidth="1.33" className={className} {...base}>
    <path d="M3 3l8 8M11 3l-8 8" />
  </svg>
);

export const ChevronDownIcon = ({ className }: P) => (
  <svg viewBox="0 0 14 14" strokeWidth="1.17" className={className} {...base}>
    <path d="M3 5l4 4 4-4" />
  </svg>
);
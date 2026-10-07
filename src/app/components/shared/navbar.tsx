"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import logo from "@/assets/logo.png"; // <- change to your actual file name in src/assets

type NavbarProps = {
  planCount?: number;
  savedCount?: number;
};

const NAV_LINKS = [
  { label: "Workouts", href: "/" },
  { label: "My Plan", href: "/my-plan" },
];

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

export default function Navbar({ planCount = 0, savedCount = 0 }: NavbarProps) {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-base-300 bg-base-200/95 backdrop-blur">
      <nav
        aria-label="Main"
        className="navbar mx-auto h-16 min-h-0 max-w-[1280px] px-3 sm:h-20 sm:px-6"
      >
        {/* Left: logo */}
        <div className="navbar-start min-w-0 flex-1">
          <Link
            href="/"
            aria-label="FitLog home"
            className="flex shrink-0 items-center gap-2.5"
          >
            <Image src={logo} alt="" priority className="h-7 w-auto" />
            {/* wordmark hidden on small phones to save space */}
            <span className="hidden font-[family-name:var(--font-oswald)] text-lg font-bold leading-7 tracking-[0.9px] text-white min-[400px]:inline">
              FITLOG
            </span>
          </Link>
        </div>

        {/* Center: navigation links */}
        <div className="navbar-center shrink-0">
          <ul className="menu menu-horizontal flex-nowrap gap-0 p-0 font-[family-name:var(--font-inter)] text-xs">
            {NAV_LINKS.map(({ label, href }) => {
              const active = isActive(pathname, href);
              return (
                <li key={href}>
                  <Link
                    href={href}
                    aria-current={active ? "page" : undefined}
                    className={`whitespace-nowrap rounded-full py-1.5 leading-4 ${
                      active
                        ? "bg-secondary px-3 font-semibold text-secondary-content hover:bg-secondary sm:px-4"
                        : "px-2.5 font-medium text-neutral-content hover:bg-transparent hover:text-base-content sm:px-5"
                    }`}
                  >
                    {label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Right: status badges */}
        <div className="navbar-end min-w-0 flex-1 gap-2 font-[family-name:var(--font-inter)] sm:gap-6">
          <Link
            href="/my-plan"
            aria-label={`Plan, ${planCount} items. Go to My Plan`}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <span className="hidden text-xs font-medium text-base-content sm:inline">
              Plan
            </span>
            <span
              aria-hidden="true"
              className="badge badge-primary badge-sm min-w-5 px-1 text-[11px] font-bold"
            >
              {planCount}
            </span>
          </Link>

          <Link
            href="/my-plan"
            aria-label={`Saved, ${savedCount} items. Go to My Plan`}
            className="flex items-center gap-2 transition-opacity hover:opacity-80"
          >
            <span className="hidden text-xs font-medium text-neutral-content sm:inline">
              Saved
            </span>
            <span
              aria-hidden="true"
              className="badge badge-outline badge-sm min-w-5 border-neutral px-1 text-[11px] font-medium text-base-content"
            >
              {savedCount}
            </span>
          </Link>
        </div>
      </nav>
    </header>
  );
}
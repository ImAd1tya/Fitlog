import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";

export default function Footer() {
  return (
    <footer className="bg-neutral-950 text-neutral-400">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-4 px-4 py-6 sm:flex-row sm:justify-between sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <Image src={logo} alt="FitLog logo" width={28} height={28} />
          <span className="text-lg font-extrabold tracking-wide text-white">FITLOG</span>
        </Link>
        <p className="text-center text-sm sm:text-right">
          © 2026 FitLog — Workout Library. Train hard, log honest.
        </p>
      </div>
    </footer>
  );
}
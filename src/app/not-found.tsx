import Link from "next/link";

export default function NotFound() {
  return (
    <section className="flex min-h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="text-7xl font-extrabold">404</h1>
      <p className="text-neutral-500">This page doesn&apos;t exist.</p>
      <Link href="/" className="rounded-lg bg-black px-6 py-3 font-semibold text-white">
        Back to Home
      </Link>
    </section>
  );
}
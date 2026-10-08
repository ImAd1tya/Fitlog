import Image from "next/image";
import bannerImage from "@/assets/banner.png"; 

export default function Banner() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="flex flex-col items-center justify-between gap-10 rounded-2xl border border-[#222630] bg-[#15171d] p-6 sm:p-10 lg:flex-row lg:gap-16 lg:p-14"
    >
     
      <div className="flex w-full max-w-[558px] flex-col gap-5">
        <p className="font-[family-name:var(--font-inter)] text-[11px] font-bold uppercase leading-[16.5px] tracking-[1.1px] text-primary">
          Workout Library
        </p>

        <h1
          id="hero-heading"
          className="font-[family-name:var(--font-oswald)] text-[40px] font-bold uppercase leading-none tracking-[-0.025em] text-white sm:text-[52px] lg:text-[60px]"
        >
          Train with intent. Log
          <br className="hidden lg:block" /> every set.
        </h1>

        <p className="max-w-[490px] font-[family-name:var(--font-inter)] text-base leading-6 text-neutral-content">
          FitLog is a dark, no-nonsense gym companion: pick a lift, lock it into
          today&apos;s plan, and watch the week&apos;s work add up.
        </p>

        <div className="pt-2">
          <a
            href="#library"
            className="btn btn-primary h-10 min-h-0 gap-2 rounded-md border-0 px-6 font-[family-name:var(--font-inter)] text-xs font-bold uppercase tracking-[0.3px] shadow-sm"
          >
            Browse Workouts
          </a>
        </div>
      </div>

      <Image
        src={bannerImage}
        alt="Anatomical figure using a preacher curl machine"
        priority
        sizes="(min-width: 1024px) 334px, 80vw"
        className="aspect-square h-auto w-full max-w-[334px] shrink-0 object-cover"
      />
    </section>
  );
}
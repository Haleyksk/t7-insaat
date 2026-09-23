import Link from "next/link";
import type { Genel } from "@/constants/content";

const HERO_VIDEO = "/hero.mp4?v=4";
const HERO_POSTER = "/hero-poster.jpg";
const MASAUSTU =
  "(min-width: 768px) and (prefers-reduced-motion: no-preference)";

export default function Hero({ genel }: { genel: Genel }) {
  return (
    <section className="relative isolate flex min-h-[100svh] flex-col overflow-hidden">
      <link rel="preload" href={HERO_VIDEO} as="video" type="video/mp4" media={MASAUSTU} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={HERO_POSTER}
        alt=""
        className="absolute inset-0 h-full w-full object-cover"
        fetchPriority="high"
        decoding="async"
      />
      <video
        className="absolute inset-0 hidden h-full w-full object-cover motion-reduce:hidden md:block"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        poster={HERO_POSTER}
        aria-hidden
      >
        <source src={HERO_VIDEO} type="video/mp4" media={MASAUSTU} />
      </video>
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/75 via-brand-dark/35 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/55 via-transparent to-black/20" />

      <div className="container relative z-10 flex flex-1 flex-col justify-center pb-20 pt-28">
        <p className="mb-5 text-[11px] font-medium uppercase tracking-[0.38em] text-brand-mint">{genel.heroUst}</p>
        <h1 className="max-w-4xl text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-[4.25rem]">
          {genel.heroBaslik}
          <span className="block text-brand-mint">{genel.heroAltBaslik}</span>
        </h1>
        <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-200/90 sm:text-lg">{genel.heroYazi}</p>
        <Link
          href="/iletisim"
          className="mt-10 inline-flex w-fit items-center justify-center border border-white/25 bg-white/5 px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-zinc-100 backdrop-blur-sm transition-colors hover:border-brand-mint hover:bg-white/10"
        >
          Teklif Talebi
        </Link>
      </div>
    </section>
  );
}

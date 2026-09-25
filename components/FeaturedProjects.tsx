"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Reference } from "@/constants/content";
import ReferansKart from "@/components/ReferansKart";

/** Ana sayfada önce görünen dört referans. Geri kalanı "Daha fazla gör" açar. */
const KAYMA_SURESI = 3000;
const ILK_SIRALAMA = [
  "kgm-tursan-kule",
  "tursan-park-sarj-istasyonu",
  "ptt-adana-il-mudurlugu",
  "my-dream-villalari",
];

export default function FeaturedProjects({ referanslar }: { referanslar: Reference[] }) {
  const [adim, setAdim] = useState(0);
  const [gorunur, setGorunur] = useState(false);
  const [fazlaAcik, setFazlaAcik] = useState(false);
  const alanRef = useRef<HTMLElement>(null);
  const oneCikan = ILK_SIRALAMA.flatMap((slug) => referanslar.filter((item) => item.slug === slug));
  const sirali = [...oneCikan, ...referanslar.filter((item) => !ILK_SIRALAMA.includes(item.slug))];
  const liste = fazlaAcik ? sirali : oneCikan;
  const fazlaVar = sirali.length > oneCikan.length;

  useEffect(() => {
    const alan = alanRef.current;
    if (!alan) return;
    const gozlemci = new IntersectionObserver(([kayit]) => setGorunur(kayit.isIntersecting), {
      rootMargin: "120px",
    });
    gozlemci.observe(alan);
    return () => gozlemci.disconnect();
  }, []);

  useEffect(() => {
    if (!gorunur) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const zaman = window.setInterval(() => setAdim((onceki) => onceki + 1), KAYMA_SURESI);
    return () => window.clearInterval(zaman);
  }, [gorunur]);

  return (
    <section ref={alanRef} id="projeler" className="scroll-mt-24 bg-brand-dark py-20 lg:py-28">
      <div className="container">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-brand-mint">
              Müşterilerimiz · Referanslar
            </p>
            <h2 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight text-white lg:text-5xl">
              Yaptığımız işler.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-zinc-400 lg:text-base">
              Müşterilerimizin tesisleri. Fotoğrafa tıklayınca o işin tüm görselleri açılır.
            </p>
          </div>
          <div className="lg:col-span-4 lg:text-right">
            <Link
              href="/projeler"
              className="inline-flex items-center gap-2 bg-brand-accent px-5 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-dark hover:bg-brand-mint"
            >
              Tüm referanslar
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {liste.map((item, index) => (
            <ReferansKart key={item.slug} item={item} adim={adim} oncelik={index === 0} />
          ))}
        </div>

        {fazlaVar && !fazlaAcik ? (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setFazlaAcik(true)}
              className="inline-flex items-center gap-2 border border-white/20 px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-zinc-100 transition-colors hover:border-brand-mint hover:text-brand-mint"
            >
              Daha fazla gör
              <ArrowUpRight className="h-4 w-4" />
            </button>
          </div>
        ) : null}
      </div>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import GorunenVideo from "@/components/GorunenVideo";
import type { Reference } from "@/constants/content";

type Props = {
  item: Reference;
  adim: number;
  oncelik?: boolean;
};

const YAZI_KARARTMA =
  "pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[62%] bg-gradient-to-t from-brand-dark via-brand-dark/45 to-transparent";

function VideoKart({ item }: { item: Reference }) {
  if (!item.video) return null;
  return (
    <article className="overflow-hidden border border-white/10 bg-brand-card">
      <div className="relative aspect-[16/10] overflow-hidden bg-brand-card">
        <GorunenVideo src={item.video} poster={item.cover} className="absolute inset-0 h-full w-full object-cover" />
        <div className={YAZI_KARARTMA} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden bg-white">
              <Image
                src={item.logo}
                alt=""
                fill
                className={item.visual === "photo" ? "object-cover" : "object-contain p-1"}
                sizes="40px"
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-brand-mint">{item.brand}</p>
              <h3 className="text-base font-semibold text-white">{item.name}</h3>
            </div>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-zinc-200">{item.promise}</p>
          <div className="mt-4 flex justify-end">
            <Link
              href={`/projeler/${item.slug}`}
              className="pointer-events-auto text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-mint hover:text-brand-accent"
            >
              İncele
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function FotoKart({ item, adim, oncelik = false }: Props) {
  const fotograflar = item.gallery;
  const adet = fotograflar.length;
  const slaytlar = adet > 1 ? [...fotograflar, fotograflar[0]] : fotograflar;
  const [kaydir, setKaydir] = useState(0);
  const [animasyon, setAnimasyon] = useState(true);

  useEffect(() => {
    if (adet < 2) return;

    setKaydir((onceki) => {
      const simdiki = onceki === adet ? 0 : onceki;
      const hedef = adim % adet;
      if (hedef === simdiki) return simdiki;
      if (hedef === 0 && simdiki === adet - 1) {
        setAnimasyon(true);
        return adet;
      }
      setAnimasyon(true);
      return hedef;
    });
  }, [adim, adet]);

  const kaymaBitti = () => {
    if (kaydir !== adet) return;
    setAnimasyon(false);
    setKaydir(0);
  };

  useEffect(() => {
    if (animasyon || kaydir !== 0) return;
    const kare = requestAnimationFrame(() => setAnimasyon(true));
    return () => cancelAnimationFrame(kare);
  }, [animasyon, kaydir]);

  const gosterge = kaydir === adet ? 0 : kaydir;

  return (
    <article className="overflow-hidden border border-white/10 bg-brand-card">
      <div className="relative aspect-[16/10] overflow-hidden">
        <div
          className={`flex h-full ${animasyon ? "transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]" : ""}`}
          style={{ transform: `translateX(-${kaydir * 100}%)` }}
          onTransitionEnd={kaymaBitti}
        >
          {slaytlar.map((src, index) => {
            const yakin = Math.abs(index - kaydir) <= 1;
            return (
              <div key={`${src}-${index}`} className="relative h-full w-full shrink-0 bg-brand-card">
                {yakin ? (
                  <Image
                    src={src}
                    alt={`${item.name} ${index + 1}`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                    quality={70}
                    priority={oncelik && index === 0}
                  />
                ) : null}
              </div>
            );
          })}
        </div>

        <div className={YAZI_KARARTMA} />

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-10 p-5">
          <div className="mb-3 flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden bg-white">
              <Image
                src={item.logo}
                alt=""
                fill
                className={item.visual === "photo" ? "object-cover" : "object-contain p-1"}
                sizes="40px"
              />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-[0.18em] text-brand-mint">{item.brand}</p>
              <h3 className="text-base font-semibold text-white">{item.name}</h3>
            </div>
          </div>
          <p className="max-w-sm text-xs leading-relaxed text-zinc-200">{item.promise}</p>

          <div className="mt-4 flex items-center justify-between gap-3">
            <div className="flex gap-1.5" aria-hidden>
              {fotograflar.map((src, index) => (
                <span
                  key={src}
                  className={`h-1.5 rounded-full transition-all ${
                    index === gosterge ? "w-6 bg-brand-accent" : "w-1.5 bg-white/35"
                  }`}
                />
              ))}
            </div>
            <Link
              href={`/projeler/${item.slug}`}
              className="pointer-events-auto text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-mint hover:text-brand-accent"
            >
              İncele
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

export default function ReferansKart(props: Props) {
  if (props.item.video) return <VideoKart item={props.item} />;
  return <FotoKart {...props} />;
}

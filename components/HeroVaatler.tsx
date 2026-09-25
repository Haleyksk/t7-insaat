"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import HeroVideo from "@/components/HeroVideo";

/** Video yüklenene kadar görünen kapak. Slayt değişince video yeniden başlamasın diye video bu bileşenin dışında durur. */
const POSTER = "/hero-poster.jpg?v=8";

const SLAYTLAR = [
  {
    parcalar: [
      { metin: "Uçtan Uca", mint: true },
      { metin: "Çözüm", mint: false },
    ],
    alt: "Hafriyattan çatıya, tüm süreç tek elde. Sıfır pürüz, anahtar teslim güvencesi.",
  },
  {
    parcalar: [
      { metin: "Size Özel", mint: false },
      { metin: "Mühendislik", mint: true },
    ],
    alt: "Ölçü, yük ve operasyon dinamiklerinize göre tamamen size özel kusursuz projelendirme.",
  },
  {
    parcalar: [
      { metin: "Tam Zamanında", mint: true },
      { metin: "Teslimat", mint: false },
    ],
    alt: "Fabrika üretimi ve CFS kuru montaj ile gecikmesiz, hızlı ve öngörülebilir teslim.",
  },
  {
    parcalar: [
      { metin: "Çok Yönlü", mint: false },
      { metin: "Uzmanlık", mint: true },
    ],
    alt: "Fabrika, villa veya tarım tesisi... Tüm projelerde tek muhatap güvencesiyle süreç yönetimi.",
  },
  {
    parcalar: [
      { metin: "Entegre", mint: true },
      { metin: "İnşaat Ağı", mint: false },
    ],
    alt: "Malzeme tedariğinden şantiye uygulamasına kadar, kendi ekibimizle tavizsiz kontrol.",
  },
  {
    parcalar: [
      { metin: "Sıfır Risk,", mint: true },
      { metin: "Tam Güven", mint: false },
    ],
    alt: "Tüm statik yükler baştan hesaplanır. Yarına meydan okuyan, sarsılmaz yapılar.",
  },
] as const;

const SURE = 6800;
const CIKIS = 400;

function MaskSatir({
  children,
  gecikme,
  kapan,
  hareket,
}: {
  children: React.ReactNode;
  gecikme: number;
  kapan: boolean;
  hareket: boolean;
}) {
  return (
    <span className="inline-block overflow-hidden align-bottom">
      <span
        className={`inline-block ${hareket ? (kapan ? "hero-mask-cik" : "hero-mask-gir") : ""}`}
        style={hareket ? { animationDelay: `${gecikme}ms` } : undefined}
      >
        {children}
      </span>
    </span>
  );
}

export default function HeroVaatler({ etiket }: { etiket: string }) {
  const [indeks, setIndeks] = useState(0);
  const [kapan, setKapan] = useState(false);
  const [hareket, setHareket] = useState(true);
  const gecisRef = useRef(0);
  const indeksRef = useRef(0);

  indeksRef.current = indeks;

  const git = (hedef: number) => {
    if (hedef === indeksRef.current) return;
    if (!hareket) {
      setIndeks(hedef);
      return;
    }
    window.clearTimeout(gecisRef.current);
    setKapan(true);
    gecisRef.current = window.setTimeout(() => {
      setIndeks(hedef);
      setKapan(false);
    }, CIKIS);
  };

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setHareket(false);
      return;
    }
    const zaman = window.setInterval(() => {
      git((indeksRef.current + 1) % SLAYTLAR.length);
    }, SURE);
    return () => {
      window.clearInterval(zaman);
      window.clearTimeout(gecisRef.current);
    };
  }, []);

  const slayt = SLAYTLAR[indeks];
  const etiketAdi = slayt.parcalar.map((p) => p.metin).join(" ");

  return (
    <>
      <div className="absolute inset-0 overflow-hidden">
        <div className={hareket ? "hero-kenburns absolute inset-0" : "absolute inset-0"}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={POSTER} alt="" className="absolute inset-0 h-full w-full object-cover" fetchPriority="high" decoding="async" />
          <HeroVideo />
        </div>
      </div>
      <div className="absolute inset-0 bg-brand-dark/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-dark/85 via-brand-dark/50 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-brand-dark/40" />

      <div className="relative z-10 mx-auto flex h-full w-full max-w-[1280px] items-center px-6 sm:px-8 lg:px-12">
        <div className="flex w-full max-w-3xl flex-col items-start gap-6 sm:gap-8">
          <MaskSatir gecikme={0} kapan={false} hareket={hareket}>
            <span className="text-[11px] font-medium uppercase tracking-[0.38em] text-brand-mint">
              {etiket}
            </span>
          </MaskSatir>

          <div aria-live="polite">
            <h1
              key={`${etiketAdi}-b`}
              className="text-balance text-[clamp(1.85rem,8vw,4.35rem)] font-bold leading-tight tracking-tighter text-white"
            >
              {slayt.parcalar.map((parca, i) => (
                <span key={`${etiketAdi}-${i}`}>
                  <MaskSatir gecikme={90 + i * 90} kapan={kapan} hareket={hareket}>
                    <span className={parca.mint ? "text-brand-accent" : "text-white"}>{parca.metin}</span>
                  </MaskSatir>
                  {i < slayt.parcalar.length - 1 ? " " : null}
                </span>
              ))}
            </h1>
            <p key={`${etiketAdi}-a`} className="mt-5 max-w-lg">
              <MaskSatir gecikme={280} kapan={kapan} hareket={hareket}>
                <span className="block text-pretty text-sm leading-relaxed text-white/80 sm:text-base">{slayt.alt}</span>
              </MaskSatir>
            </p>
          </div>

          <div className="w-full overflow-hidden">
            <div
              className={hareket ? "hero-mask-gir" : ""}
              style={hareket ? { animationDelay: "420ms" } : undefined}
            >
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row sm:items-center">
                <Link
                  href="/projeler"
                  className="inline-flex w-full items-center justify-center bg-brand-accent px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-dark transition duration-300 hover:-translate-y-0.5 hover:bg-brand-mint hover:shadow-[0_12px_32px_-8px_rgba(48,176,160,0.65)] sm:w-auto"
                >
                  Projelerimizi İnceleyin
                </Link>
                <Link
                  href="/iletisim"
                  className="inline-flex w-full items-center justify-center border border-white/20 bg-white/5 px-7 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-white backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:border-white/40 hover:bg-white/10 sm:w-auto"
                >
                  Bize Ulaşın
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-6 z-10 sm:left-8 lg:left-12">
        <div className="flex gap-3 sm:gap-3.5" role="tablist" aria-label="Hero slaytları">
          {SLAYTLAR.map((item, i) => {
            const ad = item.parcalar.map((p) => p.metin).join(" ");
            return (
              <button
                key={ad}
                type="button"
                role="tab"
                aria-selected={i === indeks}
                aria-label={ad}
                onClick={() => git(i)}
                className={`h-[2px] overflow-hidden bg-white/50 transition-opacity ${
                  i === indeks ? "w-10 opacity-100 sm:w-14" : "w-6 opacity-30 sm:w-8"
                }`}
              >
                {i === indeks && hareket && (
                  <span key={`${ad}-dol`} className="hero-dol block h-full bg-brand-accent" style={{ animationDuration: `${SURE}ms` }} />
                )}
                {i === indeks && !hareket && <span className="block h-full w-full bg-brand-accent" />}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

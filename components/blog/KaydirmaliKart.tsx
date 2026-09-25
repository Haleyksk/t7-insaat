"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useRef, useState } from "react";
import type { BlogYazi } from "@/constants/blog";

/** Tek gönderinin kareleri. Ok, nokta veya kaydırma ile değişir. */
export default function KaydirmaliKart({
  yazi,
  video,
  sigdir = false,
}: {
  yazi: BlogYazi;
  video?: string;
  sigdir?: boolean;
}) {
  const [aktif, setAktif] = useState(0);
  const baslangic = useRef<number | null>(null);
  const bolum = yazi.bolumler[aktif];
  const son = yazi.bolumler.length - 1;

  function git(yon: number) {
    setAktif((deger) => Math.min(son, Math.max(0, deger + yon)));
  }

  return (
    <div className={`relative overflow-hidden bg-[#1A1C1F] text-white ${sigdir ? "sm:flex sm:min-h-0 sm:flex-1 sm:flex-col" : ""}`}>
      <div
        className={`touch-pan-y px-5 py-6 sm:px-10 ${sigdir ? "sm:flex sm:min-h-0 sm:flex-1 sm:flex-col sm:py-4" : ""}`}
        onTouchStart={(olay) => {
          baslangic.current = olay.changedTouches[0].clientX;
        }}
        onTouchEnd={(olay) => {
          if (baslangic.current === null) return;
          const fark = olay.changedTouches[0].clientX - baslangic.current;
          if (fark > 48) git(-1);
          if (fark < -48) git(1);
          baslangic.current = null;
        }}
      >
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <Image src="/logo-mark.png" alt="" width={72} height={32} className="h-6 w-auto" />
          <span className="text-[12px] font-medium tracking-[0.18em] text-white">T7 İNŞAAT</span>
        </div>

        <div key={bolum.id} className={`mx-auto mt-6 max-w-xl ${sigdir ? "sm:mt-4 sm:flex sm:min-h-0 sm:w-full sm:flex-1 sm:flex-col" : ""}`}>
          <h2 className="shrink-0 text-xl font-semibold uppercase tracking-tight">{bolum.baslik}</h2>
          {video && aktif === 0 ? (
            <video className={`mt-4 aspect-[4/3] w-full object-cover ${sigdir ? "sm:aspect-auto sm:h-[min(22rem,calc(100dvh-26rem))] sm:min-h-[8rem] sm:flex-none" : ""}`} src={video} poster={bolum.gorsel?.src} controls playsInline />
          ) : bolum.gorsel ? (
            <div className={`relative mt-4 aspect-[4/3] ${sigdir ? "sm:aspect-auto sm:h-[min(22rem,calc(100dvh-26rem))] sm:min-h-[8rem] sm:flex-none" : ""}`}>
              <Image src={bolum.gorsel.src} alt={bolum.gorsel.alt} fill className="object-cover" sizes="640px" />
            </div>
          ) : null}
          <div className={`mt-4 space-y-3 text-sm leading-relaxed text-zinc-300 ${sigdir ? "shrink-0 sm:mt-3 sm:space-y-1.5 sm:leading-snug" : ""}`}>
            <p>{bolum.ozet}</p>
            {bolum.maddeler.map((madde) => (
              <p key={madde}>{madde}</p>
            ))}
          </div>
        </div>
      </div>

      <button type="button" aria-label="Önceki kart" disabled={aktif === 0} onClick={() => git(-1)} className="absolute left-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center text-white disabled:opacity-30 sm:grid">
        <ChevronLeft className="h-5 w-5" />
      </button>
      <button type="button" aria-label="Sonraki kart" disabled={aktif === son} onClick={() => git(1)} className="absolute right-2 top-1/2 hidden h-9 w-9 -translate-y-1/2 place-items-center text-white disabled:opacity-30 sm:grid">
        <ChevronRight className="h-5 w-5" />
      </button>

      <div className={`flex items-center justify-between px-3 pb-5 sm:justify-center ${sigdir ? "shrink-0 sm:pb-4" : ""}`}>
        <button type="button" aria-label="Önceki kart" disabled={aktif === 0} onClick={() => git(-1)} className="grid h-9 w-9 place-items-center text-white disabled:opacity-30 sm:hidden">
          <ChevronLeft className="h-5 w-5" />
        </button>
        <div className="flex justify-center gap-1.5">
          {yazi.bolumler.map((item, index) => (
            <button key={item.id} type="button" aria-label={`${index + 1}. kart`} onClick={() => setAktif(index)} className={`h-1.5 rounded-full ${index === aktif ? "w-4 bg-brand-mint" : "w-1.5 bg-white/30"}`} />
          ))}
        </div>
        <button type="button" aria-label="Sonraki kart" disabled={aktif === son} onClick={() => git(1)} className="grid h-9 w-9 place-items-center text-white disabled:opacity-30 sm:hidden">
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}

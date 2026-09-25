"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";
import type { BlogYazi } from "@/constants/blog";

/** Instagram gönderisindeki gibi tek kart. Okla veya noktayla kayar. */
export default function BlogOkuyucu({ yazi }: { yazi: BlogYazi }) {
  const [aktif, setAktif] = useState(0);
  const bolum = yazi.bolumler[aktif];
  const son = yazi.bolumler.length - 1;

  function git(yon: number) {
    setAktif((deger) => Math.min(son, Math.max(0, deger + yon)));
  }

  return (
    <article>
      <Link href="/blog" className="inline-flex items-center gap-2 text-[13px] text-zinc-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Blog
      </Link>

      <div className="relative mt-6 overflow-hidden bg-gradient-to-b from-[#e7f7f4] to-[#c5efe8] px-4 py-8 text-brand-dark sm:px-10 sm:py-12">
        <div className="mx-auto flex max-w-xl items-center gap-3">
          <Image src="/logo-mark.png" alt="" width={72} height={32} className="h-7 w-auto" />
          <span className="text-sm font-semibold tracking-[0.14em] text-[#1a9b8c]">T7 İNŞAAT</span>
        </div>
        <div className="mx-auto mt-3 h-px max-w-xl bg-[#7fd9cc]" />

        <div className="mx-auto mt-6 max-w-xl">
          <h1 className="inline-block rounded-full border border-white/80 bg-white px-5 py-3 text-lg font-semibold shadow-sm sm:text-xl">
            {bolum.baslik}
          </h1>

          {bolum.gorsel ? (
            <div className="mt-4 overflow-hidden rounded-2xl border border-white bg-white p-2 shadow-sm">
              <div className="relative aspect-[4/3]">
                <Image src={bolum.gorsel.src} alt={bolum.gorsel.alt} fill className="object-cover" sizes="640px" />
              </div>
            </div>
          ) : null}

          <div className="mt-4 rounded-2xl border border-white/80 bg-white px-5 py-4 text-sm leading-relaxed shadow-sm">
            <p>{bolum.ozet}</p>
            {bolum.maddeler.length > 0 ? (
              <div className="mt-3 space-y-3">
                {bolum.maddeler.map((madde) => (
                  <p key={madde}>{madde}</p>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <button
          type="button"
          aria-label="Önceki kart"
          disabled={aktif === 0}
          onClick={() => git(-1)}
          className="absolute left-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand-dark shadow disabled:opacity-30 sm:left-4"
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Sonraki kart"
          disabled={aktif === son}
          onClick={() => git(1)}
          className="absolute right-2 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-white/90 text-brand-dark shadow disabled:opacity-30 sm:right-4"
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="mt-6 flex justify-center gap-1.5">
          {yazi.bolumler.map((item, index) => (
            <button
              key={item.id}
              type="button"
              aria-label={`${index + 1}. kart`}
              onClick={() => setAktif(index)}
              className={`h-1.5 rounded-full transition-all ${index === aktif ? "w-4 bg-[#1a9b8c]" : "w-1.5 bg-[#1a9b8c]/35"}`}
            />
          ))}
        </div>
      </div>

      <div className="mt-8 flex flex-wrap items-center gap-4">
        {yazi.urun ? (
          <Link href={yazi.urun.href} className="text-sm text-brand-mint hover:text-white">
            {yazi.urun.etiket}
          </Link>
        ) : null}
        <Link href="/iletisim" className="bg-brand-accent px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-dark">
          Teklif alın
        </Link>
      </div>
    </article>
  );
}

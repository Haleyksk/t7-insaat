"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import KaydirmaliKart from "@/components/blog/KaydirmaliKart";
import type { AkisYazi } from "@/lib/blog-akis";

/** Post ızgarası. Başlığa basınca gönderinin kareleri pencerede kayar. */
export default function BlogIzgarasi({ yazilar }: { yazilar: AkisYazi[] }) {
  const [acik, setAcik] = useState<AkisYazi | null>(null);

  useEffect(() => {
    if (!acik) return;
    const yer = window.scrollY;
    const onceki = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    function tus(olay: KeyboardEvent) {
      if (olay.key === "Escape") setAcik(null);
    }
    window.addEventListener("keydown", tus);
    return () => {
      document.body.style.overflow = onceki;
      window.scrollTo(0, yer);
      window.removeEventListener("keydown", tus);
    };
  }, [acik]);

  return (
    <>
      <ul className="mt-8 grid grid-cols-2 gap-3 lg:grid-cols-3 xl:grid-cols-4">
        {yazilar.map((yazi) => (
          <li key={yazi.slug}>
            <button type="button" onClick={() => setAcik(yazi)} className="block w-full overflow-hidden border border-white/10 bg-brand-card text-left transition hover:border-brand-mint/40">
              <div className="relative aspect-[5/4] bg-black">
                {yazi.kapak ? (
                  <Image src={yazi.kapak} alt="" fill className="object-cover" sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, 50vw" />
                ) : (
                  <span className="grid h-full place-items-end p-3 text-sm font-semibold text-white">{yazi.baslik}</span>
                )}
              </div>
              <div className="p-3">
                <p className="text-[10px] uppercase tracking-[0.14em] text-brand-mint">{yazi.bolumler.length} kare</p>
                <h2 className="mt-1.5 text-sm font-semibold leading-snug text-white">{yazi.baslik}</h2>
                <p className="mt-1.5 line-clamp-2 text-[13px] leading-relaxed text-zinc-400">{yazi.cevap}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>

      {acik ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center bg-black/70 sm:items-center sm:p-6" onClick={() => setAcik(null)}>
          <div role="dialog" aria-modal="true" aria-labelledby="post-baslik" className="flex max-h-[100dvh] w-full flex-col overflow-y-auto bg-brand-dark sm:max-h-full sm:max-w-3xl sm:overflow-hidden" onClick={(olay) => olay.stopPropagation()}>
            <div className="flex shrink-0 items-center justify-between px-4 py-3">
              <h2 id="post-baslik" className="text-sm font-semibold text-white">{acik.baslik}</h2>
              <button type="button" aria-label="Kapat" onClick={() => setAcik(null)} className="text-zinc-300">
                <X className="h-5 w-5" />
              </button>
            </div>
            <KaydirmaliKart key={acik.slug} yazi={acik} video={acik.video} sigdir />
            <div className="flex shrink-0 flex-wrap items-center gap-4 px-4 py-4">
              {acik.urun ? (
                <Link href={acik.urun.href} className="text-sm text-brand-mint">{acik.urun.etiket}</Link>
              ) : null}
              <Link href="/iletisim" className="bg-brand-accent px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-dark">Teklif alın</Link>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

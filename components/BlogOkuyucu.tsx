"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import KaydirmaliKart from "@/components/blog/KaydirmaliKart";
import type { BlogYazi } from "@/constants/blog";

/** Yazı sayfası. Aynı kaydırmalı gönderi, listeye dönüş linkiyle. */
export default function BlogOkuyucu({ yazi, video }: { yazi: BlogYazi; video?: string }) {
  return (
    <article>
      <Link href="/blog" className="inline-flex items-center gap-2 text-[13px] text-zinc-400 hover:text-white">
        <ArrowLeft className="h-4 w-4" aria-hidden />
        Blog
      </Link>
      <div className="mt-6">
        <KaydirmaliKart yazi={yazi} video={video} />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        {yazi.urun ? (
          <Link href={yazi.urun.href} className="text-sm text-brand-mint hover:text-white">{yazi.urun.etiket}</Link>
        ) : null}
        <Link href="/iletisim" className="bg-brand-accent px-4 py-2.5 text-[12px] font-semibold uppercase tracking-[0.14em] text-brand-dark">
          Teklif alın
        </Link>
      </div>
    </article>
  );
}

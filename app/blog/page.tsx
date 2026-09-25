import type { Metadata } from "next";
import Link from "next/link";
import { akisYazilari } from "@/lib/blog-akis";

export const metadata: Metadata = {
  title: "Blog",
  description: "Çelik yapı, fabrika ve depo işlerinde teklif öncesi kısa rehberler.",
};

/** Yazı listesi. Ana sayfa bu sayfayı çağırmaz. */
export default function BlogSayfasi() {
  const yazilar = akisYazilari();

  return (
    <main className="bg-brand-dark pt-28">
      <div className="container pb-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-mint">Blog</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Kısa rehberler</h1>
        <p className="mt-3 max-w-xl text-sm text-zinc-400">Tek cümlelik cevap, sonra karar için gereken maddeler.</p>
        <ul className="mt-10 max-w-2xl space-y-4">
          {yazilar.map((yazi) => (
            <li key={yazi.slug}>
              <Link href={`/blog/${yazi.slug}`} className="block border border-white/10 bg-brand-card p-5 transition hover:border-brand-mint/40">
                <p className="text-[11px] uppercase tracking-[0.16em] text-brand-mint">{yazi.okuma} okuma</p>
                <h2 className="mt-2 text-lg font-semibold text-white">{yazi.baslik}</h2>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">{yazi.cevap}</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </main>
  );
}

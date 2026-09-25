import type { Metadata } from "next";
import BlogIzgarasi from "@/components/blog/BlogIzgarasi";
import { akisYazilari } from "@/lib/blog-akis";

export const metadata: Metadata = {
  title: "Blog",
  description: "Çelik yapı, fabrika ve depo işlerinde teklif öncesi kısa rehberler.",
};

/** Yazı listesi. Ana sayfa bu sayfayı çağırmaz. */
export default function BlogSayfasi() {
  return (
    <main className="bg-brand-dark pt-28">
      <div className="container pb-20">
        <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-brand-mint">Blog</p>
        <h1 className="mt-3 text-3xl font-semibold text-white sm:text-4xl">Kısa rehberler</h1>
        <p className="mt-3 max-w-xl text-sm text-zinc-400">Tek cümlelik cevap, sonra karar için gereken maddeler.</p>
        <BlogIzgarasi yazilar={akisYazilari()} />
      </div>
    </main>
  );
}

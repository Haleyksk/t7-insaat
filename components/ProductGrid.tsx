import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { Product } from "@/constants/content";

export default function ProductGrid({ urunler }: { urunler: Product[] }) {
  return (
    <section id="urunler" className="scroll-mt-24 bg-brand-card py-16 lg:py-24">
      <div className="container">
        <div className="max-w-2xl">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-brand-mint">Ürünlerimiz</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white lg:text-4xl">
            Endüstriyel yapı sistemlerinden treylere
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-400 lg:text-base">
            Çelik, CFS, hibrit beton, betonarme konut, çelik ev, etriye/çiroz, C-M profil ve treyler.
          </p>
        </div>

        <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {urunler.map((product) => (
            <Link
              key={product.slug}
              href={`/urunler/${product.slug}`}
              className="group overflow-hidden border border-white/10 bg-brand-dark"
            >
              <div className="relative aspect-[16/9] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(min-width: 1280px) 240px, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/15 to-transparent" />
              </div>
              <div className="space-y-2 px-4 py-4">
                <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">{product.group}</p>
                <h3 className="text-[15px] font-semibold tracking-tight text-white">{product.title}</h3>
                <p className="line-clamp-2 text-xs leading-relaxed text-zinc-400">{product.summary}</p>
                <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-mint">
                  İncele
                  <ArrowUpRight className="h-3 w-3" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

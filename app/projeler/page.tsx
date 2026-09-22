import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { referanslariOku } from "@/lib/referanslar";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Referanslar",
  description: "T7 İnşaat müşteri işleri ve saha fotoğrafları.",
};

export default async function ProjelerPage() {
  const referanslar = await referanslariOku();
  return (
    <main className="pt-28 lg:pt-32">
      <section className="container py-16 lg:py-24">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-brand-mint">Müşterilerimiz</p>
        <h1 className="mt-3 max-w-3xl text-4xl font-semibold tracking-tight text-white lg:text-5xl">
          Birlikte teslim ettiğimiz yapılar.
        </h1>
        <p className="mt-5 max-w-2xl text-sm leading-relaxed text-zinc-400 lg:text-base">
          Her kart bir müşteri işi. Tüm saha fotoğraflarını açarak ölçeği, detayı ve uygulama dilini görebilirsiniz.
        </p>

        <div className="mt-14 space-y-8">
          {referanslar.map((item) => (
            <Link
              key={item.slug}
              href={`/projeler/${item.slug}`}
              className="group grid overflow-hidden border border-white/10 bg-brand-card lg:grid-cols-12"
            >
              <div className="relative aspect-[16/10] lg:col-span-5 lg:aspect-auto lg:min-h-[18rem]">
                <Image
                  src={item.cover}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 40vw, 100vw"
                />
              </div>
              <div className="flex flex-col justify-between gap-6 px-6 py-6 lg:col-span-7 lg:px-8 lg:py-8">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="relative h-11 w-11 overflow-hidden bg-white">
                      <Image
                        src={item.logo}
                        alt=""
                        fill
                        className={item.visual === "photo" ? "object-cover" : "object-contain p-1.5"}
                        sizes="44px"
                      />
                    </div>
                    <div>
                      <p className="text-[10px] uppercase tracking-[0.16em] text-brand-mint">{item.sector}</p>
                      <h2 className="text-xl font-semibold text-white">{item.name}</h2>
                    </div>
                  </div>
                  <p className="mt-4 max-w-xl text-sm leading-relaxed text-zinc-400">{item.promise}</p>
                </div>
                <div className="grid grid-cols-4 gap-2 sm:grid-cols-6">
                  {item.gallery.map((src) => (
                    <div key={src} className="relative aspect-[4/3] overflow-hidden">
                      <Image src={src} alt="" fill className="object-cover" sizes="120px" />
                    </div>
                  ))}
                </div>
                <span className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-mint">
                  {item.gallery.length} saha fotoğrafı
                  <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

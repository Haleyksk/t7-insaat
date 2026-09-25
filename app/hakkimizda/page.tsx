/** Webde fotoğraf ve metin aynı yükseklikte yan yana; telefonda başlık, fotoğraf, metin sırası. */
import type { Metadata } from "next";
import Image from "next/image";
import YonetimKurulu from "@/components/YonetimKurulu";
import { genelOku } from "@/lib/icerik";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "T7 İnşaat kurumsal.",
};

export default async function HakkimizdaPage() {
  const genel = await genelOku();

  return (
    <main className="pt-28 lg:pt-32">
      <section className="container max-w-6xl py-16 lg:py-24">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-brand-mint">Kurumsal</p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Hakkımızda</h1>
        <div className="mt-8 grid items-stretch gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto lg:h-full">
            <Image
              src="/hakkimizda.jpg"
              alt="T7 İnşaat üretim tesisi"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 36rem, 100vw"
              priority
            />
          </div>
          <div className="min-w-0">
            <p className="text-base leading-relaxed text-zinc-300">{genel.aboutText}</p>
            <dl className="mt-12 grid gap-8 border-t border-white/10 pt-10 sm:grid-cols-3">
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Tesis</dt>
                <dd className="mt-2 text-lg font-semibold text-white">{genel.location}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Alan</dt>
                <dd className="mt-2 text-lg font-semibold text-white">{genel.area}</dd>
              </div>
              <div>
                <dt className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Odak</dt>
                <dd className="mt-2 text-lg font-semibold text-white">{genel.heroUst}</dd>
              </div>
            </dl>
          </div>
        </div>

        <div className="mt-16 lg:mt-20">
          <YonetimKurulu />
        </div>
      </section>
    </main>
  );
}

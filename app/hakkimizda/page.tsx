import type { Metadata } from "next";
import { genelOku } from "@/lib/icerik";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "T7 İnşaat kurumsal.",
};

export default async function HakkimizdaPage() {
  const genel = await genelOku();

  return (
    <main className="pt-28 lg:pt-32">
      <section className="container max-w-3xl py-16 lg:py-24">
        <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-brand-mint">Kurumsal</p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">Hakkımızda</h1>
        <p className="mt-8 text-base leading-relaxed text-zinc-300">{genel.aboutText}</p>
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
      </section>
    </main>
  );
}

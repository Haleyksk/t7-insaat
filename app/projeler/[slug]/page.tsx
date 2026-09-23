import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProjeVideo from "@/components/ProjeVideo";
import { referansBul, referanslariOku } from "@/lib/referanslar";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await referansBul(slug);
  if (!item) return { title: "Referans" };
  return { title: item.name, description: `${item.brand} — ${item.promise}` };
}

export default async function ProjeDetayPage({ params }: Props) {
  const { slug } = await params;
  const item = await referansBul(slug);
  if (!item) notFound();

  const [kapak, ...digerleri] = item.gallery;
  const others = (await referanslariOku()).filter((ref) => ref.slug !== item.slug);

  return (
    <main className="pt-28 lg:pt-32">
      <section className="container py-12 lg:py-20">
        <Link href="/projeler" className="text-[11px] uppercase tracking-[0.2em] text-brand-mint hover:text-brand-accent">
          Tüm müşteri işleri
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-4">
          <div className="relative h-14 w-14 overflow-hidden bg-white">
            <Image
              src={item.logo}
              alt=""
              fill
              className={item.visual === "photo" ? "object-cover" : "object-contain p-2"}
              sizes="56px"
            />
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-zinc-500">{item.sector}</p>
            <h1 className="text-3xl font-semibold tracking-tight text-white lg:text-5xl">{item.name}</h1>
          </div>
        </div>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-300">{item.promise}</p>
        {item.yazi ? <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-400">{item.yazi}</p> : null}
        <p className="mt-2 text-sm text-zinc-500">
          {item.video ? "Proje videosu" : `${item.gallery.length} saha fotoğrafı`} · T7 İnşaat teslimatı
        </p>

        {item.video ? <ProjeVideo src={item.video} poster={item.cover} baslik={item.name} /> : null}

        {!item.video ? (
          <div className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {kapak && (
              <div className="relative aspect-[16/10] overflow-hidden border border-white/10 sm:col-span-2 lg:col-span-3 lg:aspect-[21/9]">
                <Image src={kapak} alt={item.name} fill className="object-cover" sizes="100vw" priority />
              </div>
            )}
            {digerleri.map((src, index) => (
              <div key={src} className="relative aspect-[16/11] overflow-hidden border border-white/10">
                <Image
                  src={src}
                  alt={`${item.name} ${index + 2}`}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 33vw, 50vw"
                />
              </div>
            ))}
          </div>
        ) : null}
      </section>

      {others.length > 0 && (
        <section className="container pb-16">
          <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Diğer müşteriler</p>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((ref) => (
              <Link
                key={ref.slug}
                href={`/projeler/${ref.slug}`}
                className="group overflow-hidden border border-white/10 bg-brand-card hover:border-brand-mint/40"
              >
                <div className="relative aspect-[16/10]">
                  <Image src={ref.cover} alt={ref.name} fill className="object-cover" sizes="300px" />
                </div>
                <p className="px-4 py-3 text-sm font-semibold text-white group-hover:text-brand-mint">{ref.brand}</p>
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

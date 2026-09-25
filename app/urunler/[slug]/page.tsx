import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { urunBul, urunleriOku } from "@/lib/icerik";

type Props = { params: Promise<{ slug: string }> };

export const revalidate = 60;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const product = await urunBul(slug);
  if (!product) return { title: "Ürün" };
  return { title: product.title, description: product.summary };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const [product, urunler] = await Promise.all([urunBul(slug), urunleriOku()]);
  if (!product) notFound();

  const related = urunler.filter((item) => item.group === product.group && item.slug !== product.slug).slice(0, 3);

  return (
    <main className="pt-28 lg:pt-32">
      <section className="container grid gap-12 py-12 lg:grid-cols-2 lg:py-20">
        <div className="relative aspect-[16/11] overflow-hidden border border-white/10">
          <Image src={product.image} alt={product.title} fill className="object-cover" sizes="(min-width: 1024px) 50vw, 100vw" />
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-brand-mint">{product.group}</p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{product.title}</h1>
          <div className="mt-8 space-y-4">
            {product.body.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className="text-sm leading-relaxed text-zinc-300 lg:text-base">
                {paragraph}
              </p>
            ))}
          </div>
          {product.bullets && product.bullets.length > 0 && (
            <ul className="mt-8 space-y-2 border-t border-white/10 pt-8">
              {product.bullets.map((bullet) => (
                <li key={bullet} className="text-sm text-zinc-300">
                  <span className="mr-2 text-brand-mint">—</span>
                  {bullet}
                </li>
              ))}
            </ul>
          )}
          <Link
            href="/iletisim"
            className="mt-10 inline-flex bg-brand-accent px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-dark hover:bg-brand-mint"
          >
            Teklif alın
          </Link>
        </div>
      </section>

      {related.length > 0 && (
        <section className="container pb-16">
          <p className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Aynı grup</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {related.map((item) => (
              <Link
                key={item.slug}
                href={`/urunler/${item.slug}`}
                className="border border-white/15 px-4 py-2 text-sm text-zinc-300 hover:border-brand-mint hover:text-white"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import BlogOkuyucu from "@/components/BlogOkuyucu";
import { akisYazilari } from "@/lib/blog-akis";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return akisYazilari().map((yazi) => ({ slug: yazi.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const yazi = akisYazilari().find((item) => item.slug === slug);
  if (!yazi) return { title: "Yazı bulunamadı" };
  return { title: yazi.baslik, description: yazi.cevap };
}

export default async function BlogYaziSayfasi({ params }: Props) {
  const { slug } = await params;
  const yazi = akisYazilari().find((item) => item.slug === slug);
  if (!yazi) notFound();

  return (
    <main className="bg-brand-dark pt-28">
      <div className="container pb-20">
        <BlogOkuyucu yazi={yazi} />
      </div>
    </main>
  );
}

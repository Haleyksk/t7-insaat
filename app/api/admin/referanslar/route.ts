import { NextResponse } from "next/server";
import type { Reference } from "@/constants/content";
import { referanslariOku, referanslariYaz } from "@/lib/referanslar";
import { slugYap } from "@/lib/slug";

export const dynamic = "force-dynamic";

export async function GET() {
  const liste = await referanslariOku();
  return NextResponse.json(liste);
}

export async function POST(istek: Request) {
  const gelen = (await istek.json()) as Partial<Reference>;
  if (!gelen.name) {
    return NextResponse.json({ hata: "İsim gerekli" }, { status: 400 });
  }

  const liste = await referanslariOku();
  const slug = gelen.slug || slugYap(gelen.name);
  const kayit: Reference = {
    slug,
    name: gelen.name,
    brand: gelen.brand || gelen.name,
    sector: gelen.sector || "Referans",
    promise: gelen.promise || "",
    logo: gelen.logo || gelen.cover || "/logo-mark.png",
    cover: gelen.cover || gelen.gallery?.[0] || gelen.logo || "/logo-mark.png",
    gallery: gelen.gallery?.length ? gelen.gallery : [gelen.cover || gelen.logo || "/logo-mark.png"],
    visual: gelen.visual === "photo" ? "photo" : "logo",
    video: gelen.video || undefined,
    yazi: gelen.yazi || undefined,
  };

  const indeks = liste.findIndex((item) => item.slug === slug);
  if (indeks >= 0) liste[indeks] = kayit;
  else liste.push(kayit);

  await referanslariYaz(liste);
  return NextResponse.json(kayit);
}

export async function DELETE(istek: Request) {
  const { searchParams } = new URL(istek.url);
  const slug = searchParams.get("slug");
  if (!slug) return NextResponse.json({ hata: "Slug yok" }, { status: 400 });

  const liste = await referanslariOku();
  await referanslariYaz(liste.filter((item) => item.slug !== slug));
  return NextResponse.json({ tamam: true });
}

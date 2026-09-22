import { NextResponse } from "next/server";
import type { Faq, Genel, Product } from "@/constants/content";
import { genelOku, genelYaz, sssOku, sssYaz, urunleriOku, urunleriYaz } from "@/lib/icerik";

export const dynamic = "force-dynamic";

export async function GET() {
  const [genel, urunler, sss] = await Promise.all([genelOku(), urunleriOku(), sssOku()]);
  return NextResponse.json({ genel, urunler, sss });
}

export async function POST(istek: Request) {
  const govde = (await istek.json()) as { tur?: string; veri?: unknown };
  if (govde.tur === "genel") {
    await genelYaz(govde.veri as Genel);
    return NextResponse.json({ tamam: true });
  }
  if (govde.tur === "urunler") {
    await urunleriYaz(govde.veri as Product[]);
    return NextResponse.json({ tamam: true });
  }
  if (govde.tur === "sss") {
    await sssYaz(govde.veri as Faq[]);
    return NextResponse.json({ tamam: true });
  }
  return NextResponse.json({ hata: "Tür geçersiz" }, { status: 400 });
}

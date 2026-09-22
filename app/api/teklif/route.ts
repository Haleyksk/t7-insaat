import { NextResponse } from "next/server";
import { genelOku } from "@/lib/icerik";
import { teklifPostala } from "@/lib/posta";
import { teklifKaydet } from "@/lib/teklifler";

export const dynamic = "force-dynamic";

function temizle(deger: unknown, limit: number) {
  return String(deger ?? "").trim().slice(0, limit);
}

export async function POST(istek: Request) {
  const govde = (await istek.json()) as Record<string, unknown>;
  if (temizle(govde.web, 80)) {
    return NextResponse.json({ tamam: true });
  }

  const ad = temizle(govde.ad, 120);
  const email = temizle(govde.email, 160);
  const konu = temizle(govde.konu, 160);
  const mesaj = temizle(govde.mesaj, 4000);

  if (!ad || !email || !mesaj || !email.includes("@")) {
    return NextResponse.json({ hata: "Ad, e-posta ve mesaj gerekli." }, { status: 400 });
  }

  const kayit = {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    tarih: new Date().toISOString(),
    ad,
    email,
    konu,
    mesaj,
  };

  await teklifKaydet(kayit);

  const genel = await genelOku();
  try {
    await teklifPostala({ alici: genel.email, ad, email, konu, mesaj });
  } catch {
    // Panelde durur; posta hesabı henüz doğrulanmamış olabilir.
  }

  return NextResponse.json({ tamam: true });
}

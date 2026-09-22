import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const GORSEL = [".jpg", ".jpeg", ".png", ".webp"];

export async function POST(istek: Request) {
  const form = await istek.formData();
  const dosya = form.get("dosya");
  if (!(dosya instanceof File)) {
    return NextResponse.json({ hata: "Dosya yok" }, { status: 400 });
  }

  const uzanti = path.extname(dosya.name || "").toLowerCase() || ".jpg";
  const tampon = Buffer.from(await dosya.arrayBuffer());

  if (form.get("hedef") === "hero") {
    if (uzanti !== ".mp4") {
      return NextResponse.json({ hata: "Hero için MP4 yükleyin" }, { status: 400 });
    }
    await fs.writeFile(path.join(process.cwd(), "public", "hero.mp4"), tampon);
    return NextResponse.json({ yol: "/hero.mp4" });
  }

  if (!GORSEL.includes(uzanti)) {
    return NextResponse.json({ hata: "Sadece görsel yükleyin" }, { status: 400 });
  }

  const klasorAdi = form.get("klasor") === "urunler" ? "urunler" : "referanslar";
  const ad = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}${uzanti}`;
  const klasor = path.join(process.cwd(), "public", klasorAdi);
  await fs.mkdir(klasor, { recursive: true });
  await fs.writeFile(path.join(klasor, ad), tampon);

  return NextResponse.json({ yol: `/${klasorAdi}/${ad}` });
}

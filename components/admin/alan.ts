export const alanSinif =
  "w-full border border-white/10 bg-brand-dark px-4 py-2.5 text-white outline-none focus:border-brand-mint";

export async function icerikKaydet(tur: "genel" | "urunler" | "sss", veri: unknown) {
  const yanit = await fetch("/api/admin/icerik", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ tur, veri }),
  });
  return yanit.ok;
}

export async function dosyaGonder(dosya: File, ekstra?: Record<string, string>) {
  const data = new FormData();
  data.append("dosya", dosya);
  Object.entries(ekstra ?? {}).forEach(([anahtar, deger]) => data.append(anahtar, deger));
  const yanit = await fetch("/api/admin/yukle", { method: "POST", body: data, credentials: "include" });
  return (await yanit.json()) as { yol?: string; hata?: string };
}

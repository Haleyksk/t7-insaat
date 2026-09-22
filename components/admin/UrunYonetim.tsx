"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Product } from "@/constants/content";
import { slugYap } from "@/lib/slug";
import { alanSinif, dosyaGonder, icerikKaydet } from "@/components/admin/alan";

const bos: Product = {
  slug: "",
  title: "",
  group: "",
  summary: "",
  body: [],
  bullets: [],
  image: "",
  anaSayfa: false,
};

export default function UrunYonetim() {
  const [liste, setListe] = useState<Product[]>([]);
  const [form, setForm] = useState<Product>(bos);
  const [govdeMetin, setGovdeMetin] = useState("");
  const [maddeMetin, setMaddeMetin] = useState("");
  const [durum, setDurum] = useState("");

  const yukle = async () => {
    const yanit = await fetch("/api/admin/icerik", { credentials: "include" });
    if (!yanit.ok) return;
    const govde = (await yanit.json()) as { urunler: Product[] };
    setListe(govde.urunler);
  };

  useEffect(() => {
    void yukle();
  }, []);

  const duzenle = (urun: Product) => {
    setForm(urun);
    setGovdeMetin(urun.body.join("\n\n"));
    setMaddeMetin((urun.bullets ?? []).join("\n"));
  };

  const kaydet = async (olay: FormEvent) => {
    olay.preventDefault();
    const kayit: Product = {
      ...form,
      slug: form.slug || slugYap(form.title),
      body: govdeMetin.split("\n").map((s) => s.trim()).filter(Boolean),
      bullets: maddeMetin.split("\n").map((s) => s.trim()).filter(Boolean),
    };
    const sonraki = liste.some((item) => item.slug === kayit.slug)
      ? liste.map((item) => (item.slug === kayit.slug ? kayit : item))
      : [...liste, kayit];
    const ok = await icerikKaydet("urunler", sonraki);
    setDurum(ok ? "Kaydedildi." : "Kayıt başarısız.");
    if (ok) {
      setListe(sonraki);
      setForm(bos);
      setGovdeMetin("");
      setMaddeMetin("");
    }
  };

  const sil = async (slug: string) => {
    if (!confirm("Bu ürün silinsin mi?")) return;
    const sonraki = liste.filter((item) => item.slug !== slug);
    const ok = await icerikKaydet("urunler", sonraki);
    if (ok) setListe(sonraki);
  };

  return (
    <div className="space-y-8">
      <p className="text-sm text-zinc-400">Menüdeki ürünler buradan gelir. Ana sayfada görünsün kutusunu işaretleyin.</p>
      <ul className="space-y-2">
        {liste.map((item) => (
          <li key={item.slug} className="flex items-center justify-between gap-3 border border-white/10 bg-brand-card px-4 py-3">
            <div>
              <p className="font-semibold">{item.title}</p>
              <p className="text-xs text-zinc-500">
                {item.group}
                {item.anaSayfa ? " · ana sayfa" : ""}
              </p>
            </div>
            <div className="flex gap-3 text-sm">
              <button type="button" className="text-brand-mint" onClick={() => duzenle(item)}>
                Düzenle
              </button>
              <button type="button" className="text-red-400" onClick={() => void sil(item.slug)}>
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>

      <form onSubmit={kaydet} className="space-y-4 border border-white/10 bg-brand-card p-6">
        <h2 className="text-lg font-semibold">{form.slug ? "Ürünü düzenle" : "Yeni ürün"}</h2>
        <input className={alanSinif} placeholder="Başlık" value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} required />
        <input className={alanSinif} placeholder="Grup (ör. Treyler)" value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })} required />
        <input className={alanSinif} placeholder="Kısa özet" value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} required />
        <textarea className={alanSinif} rows={6} placeholder="Detay metin (her paragraf ayrı satır)" value={govdeMetin} onChange={(e) => setGovdeMetin(e.target.value)} />
        <textarea className={alanSinif} rows={4} placeholder="Madde listesi (her satır bir madde, isteğe bağlı)" value={maddeMetin} onChange={(e) => setMaddeMetin(e.target.value)} />
        <label className="flex items-center gap-2 text-sm text-zinc-300">
          <input type="checkbox" checked={Boolean(form.anaSayfa)} onChange={(e) => setForm({ ...form, anaSayfa: e.target.checked })} />
          Ana sayfada göster
        </label>
        <label className="block text-sm text-zinc-400">
          Ürün fotoğrafı
          <input
            className="mt-2 block"
            type="file"
            accept="image/*"
            onChange={(e) =>
              e.target.files?.[0] &&
              void dosyaGonder(e.target.files[0], { klasor: "urunler" }).then((g) => {
                if (g.yol) setForm((onceki) => ({ ...onceki, image: g.yol || "" }));
                else setDurum(g.hata || "Yükleme başarısız");
              })
            }
          />
        </label>
        {form.image && <p className="text-xs text-zinc-500">{form.image}</p>}
        <button type="submit" className="bg-brand-accent px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-dark">
          Kaydet
        </button>
        {durum && <p className="text-sm text-brand-mint">{durum}</p>}
      </form>
    </div>
  );
}

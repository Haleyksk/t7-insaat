"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Reference } from "@/constants/content";
import { alanSinif, dosyaGonder } from "@/components/admin/alan";

const bosForm = {
  slug: "",
  name: "",
  brand: "",
  sector: "",
  promise: "",
  logo: "",
  cover: "",
  galleryMetin: "",
  visual: "logo" as Reference["visual"],
};

export default function ReferansYonetim() {
  const [liste, setListe] = useState<Reference[]>([]);
  const [form, setForm] = useState(bosForm);
  const [durum, setDurum] = useState("");

  const yukle = async () => {
    const yanit = await fetch("/api/admin/referanslar", { credentials: "include" });
    if (yanit.ok) setListe((await yanit.json()) as Reference[]);
  };

  useEffect(() => {
    void yukle();
  }, []);

  const duzenle = (item: Reference) => {
    setForm({
      slug: item.slug,
      name: item.name,
      brand: item.brand,
      sector: item.sector,
      promise: item.promise,
      logo: item.logo,
      cover: item.cover,
      galleryMetin: item.gallery.join("\n"),
      visual: item.visual,
    });
  };

  const dosyaYukle = async (dosya: File, alan: "logo" | "cover" | "gallery") => {
    const govde = await dosyaGonder(dosya);
    if (!govde.yol) {
      setDurum(govde.hata || "Yükleme başarısız");
      return;
    }
    if (alan === "gallery") {
      setForm((onceki) => ({
        ...onceki,
        galleryMetin: [onceki.galleryMetin, govde.yol].filter(Boolean).join("\n"),
        cover: onceki.cover || govde.yol || "",
      }));
      return;
    }
    setForm((onceki) => ({ ...onceki, [alan]: govde.yol }));
  };

  const kaydet = async (olay: FormEvent) => {
    olay.preventDefault();
    const gallery = form.galleryMetin.split("\n").map((satir) => satir.trim()).filter(Boolean);
    const yanit = await fetch("/api/admin/referanslar", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify({
        slug: form.slug || undefined,
        name: form.name,
        brand: form.brand,
        sector: form.sector,
        promise: form.promise,
        logo: form.logo,
        cover: form.cover || gallery[0],
        gallery,
        visual: form.visual,
      }),
    });
    setDurum(yanit.ok ? "Kaydedildi." : "Kayıt başarısız.");
    if (yanit.ok) {
      setForm(bosForm);
      await yukle();
    }
  };

  const sil = async (slug: string) => {
    if (!confirm("Bu referans silinsin mi?")) return;
    await fetch(`/api/admin/referanslar?slug=${encodeURIComponent(slug)}`, {
      method: "DELETE",
      credentials: "include",
    });
    await yukle();
  };

  return (
    <div className="space-y-8">
      <p className="text-sm text-zinc-400">Müşteri işleri, logolar ve saha fotoğrafları. Kaydetince ana sayfa ve referanslar güncellenir.</p>
      <ul className="space-y-2">
        {liste.map((item) => (
          <li key={item.slug} className="flex items-center justify-between gap-3 border border-white/10 bg-brand-card px-4 py-3">
            <div>
              <p className="font-semibold">{item.name}</p>
              <p className="text-xs text-zinc-500">{item.sector}</p>
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
        <h2 className="text-lg font-semibold">{form.slug ? "Referansı düzenle" : "Yeni referans"}</h2>
        <input className={alanSinif} placeholder="Proje adı" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <input className={alanSinif} placeholder="Marka" value={form.brand} onChange={(e) => setForm({ ...form, brand: e.target.value })} />
        <input className={alanSinif} placeholder="Sektör" value={form.sector} onChange={(e) => setForm({ ...form, sector: e.target.value })} />
        <textarea className={alanSinif} placeholder="Kısa açıklama" rows={2} value={form.promise} onChange={(e) => setForm({ ...form, promise: e.target.value })} />
        <select className={alanSinif} value={form.visual} onChange={(e) => setForm({ ...form, visual: e.target.value as "logo" | "photo" })}>
          <option value="logo">Logo kartı</option>
          <option value="photo">Fotoğraf kartı</option>
        </select>
        <label className="block text-sm text-zinc-400">
          Logo
          <input className="mt-2 block" type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && void dosyaYukle(e.target.files[0], "logo")} />
        </label>
        <label className="block text-sm text-zinc-400">
          Kapak
          <input className="mt-2 block" type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && void dosyaYukle(e.target.files[0], "cover")} />
        </label>
        <label className="block text-sm text-zinc-400">
          Saha fotoğrafı ekle
          <input className="mt-2 block" type="file" accept="image/*" onChange={(e) => e.target.files?.[0] && void dosyaYukle(e.target.files[0], "gallery")} />
        </label>
        <textarea className={`min-h-28 ${alanSinif}`} placeholder="Galeri yolları (her satır bir görsel)" value={form.galleryMetin} onChange={(e) => setForm({ ...form, galleryMetin: e.target.value })} />
        <button type="submit" className="bg-brand-accent px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-dark">
          Kaydet
        </button>
        {durum && <p className="text-sm text-brand-mint">{durum}</p>}
      </form>
    </div>
  );
}

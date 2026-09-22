"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Genel } from "@/constants/content";
import { genelVarsayilan } from "@/constants/content";
import { alanSinif, dosyaGonder, icerikKaydet } from "@/components/admin/alan";

export default function GenelYonetim() {
  const [form, setForm] = useState<Genel>(genelVarsayilan);
  const [durum, setDurum] = useState("");

  useEffect(() => {
    void fetch("/api/admin/icerik", { credentials: "include" })
      .then((yanit) => yanit.json())
      .then((govde: { genel?: Genel }) => {
        if (govde.genel) setForm(govde.genel);
      });
  }, []);

  const kaydet = async (olay: FormEvent) => {
    olay.preventDefault();
    const ok = await icerikKaydet("genel", form);
    setDurum(ok ? "Kaydedildi. Sitede hemen görünür." : "Kayıt başarısız.");
  };

  const alan = (anahtar: keyof Genel, yer: string, coklu = false) =>
    coklu ? (
      <textarea
        className={alanSinif}
        rows={anahtar === "aboutText" ? 8 : 3}
        placeholder={yer}
        value={form[anahtar]}
        onChange={(e) => setForm({ ...form, [anahtar]: e.target.value })}
      />
    ) : (
      <input
        className={alanSinif}
        placeholder={yer}
        value={form[anahtar]}
        onChange={(e) => setForm({ ...form, [anahtar]: e.target.value })}
      />
    );

  return (
    <form onSubmit={kaydet} className="space-y-8">
      <p className="text-sm text-zinc-400">
        Telefon, e-posta, hakkımızda metni ve ana sayfa yazıları tek yerden değişir. Teklif formundaki mesajlar bu
        e-postaya ve paneldeki Teklifler sekmesine gider.
      </p>

      <section className="space-y-4 border border-white/10 bg-brand-card p-6">
        <h2 className="text-lg font-semibold">İletişim</h2>
        {alan("name", "Firma adı")}
        {alan("phone", "Telefon")}
        {alan("email", "E-posta")}
        {alan("location", "Konum")}
        {alan("area", "Tesis alanı (ör. 42.000 m²)")}
        {alan("yil", "Kuruluş yılı")}
      </section>

      <section className="space-y-4 border border-white/10 bg-brand-card p-6">
        <h2 className="text-lg font-semibold">Ana sayfa (hero)</h2>
        {alan("heroUst", "Üst küçük yazı")}
        {alan("heroBaslik", "Başlık 1. satır")}
        {alan("heroAltBaslik", "Başlık 2. satır (yeşil)")}
        {alan("heroYazi", "Kısa açıklama", true)}
        <label className="block text-sm text-zinc-400">
          Hero videosu (MP4)
          <input
            className="mt-2 block"
            type="file"
            accept="video/mp4"
            onChange={(e) => e.target.files?.[0] && void dosyaGonder(e.target.files[0], { hedef: "hero" }).then((g) => setDurum(g.yol ? "Video yüklendi." : g.hata || "Video yüklenemedi"))}
          />
        </label>
      </section>

      <section className="space-y-4 border border-white/10 bg-brand-card p-6">
        <h2 className="text-lg font-semibold">Hakkımızda</h2>
        {alan("aboutText", "Hakkımızda metni", true)}
      </section>

      <button type="submit" className="bg-brand-accent px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-dark">
        Kaydet
      </button>
      {durum && <p className="text-sm text-brand-mint">{durum}</p>}
    </form>
  );
}

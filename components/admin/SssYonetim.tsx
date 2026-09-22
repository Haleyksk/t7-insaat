"use client";

import { FormEvent, useEffect, useState } from "react";
import type { Faq } from "@/constants/content";
import { alanSinif, icerikKaydet } from "@/components/admin/alan";

export default function SssYonetim() {
  const [liste, setListe] = useState<Faq[]>([]);
  const [soru, setSoru] = useState("");
  const [cevap, setCevap] = useState("");
  const [indeks, setIndeks] = useState<number | null>(null);
  const [durum, setDurum] = useState("");

  useEffect(() => {
    void fetch("/api/admin/icerik", { credentials: "include" })
      .then((yanit) => yanit.json())
      .then((govde: { sss?: Faq[] }) => {
        if (govde.sss) setListe(govde.sss);
      });
  }, []);

  const kaydetListe = async (sonraki: Faq[]) => {
    const ok = await icerikKaydet("sss", sonraki);
    if (ok) {
      setListe(sonraki);
      setDurum("Kaydedildi.");
      setSoru("");
      setCevap("");
      setIndeks(null);
    } else setDurum("Kayıt başarısız.");
  };

  const kaydet = async (olay: FormEvent) => {
    olay.preventDefault();
    const kayit = { q: soru, a: cevap };
    const sonraki =
      indeks === null ? [...liste, kayit] : liste.map((item, i) => (i === indeks ? kayit : item));
    await kaydetListe(sonraki);
  };

  return (
    <div className="space-y-8">
      <p className="text-sm text-zinc-400">Sık sorulan sorular ana sayfanın altındaki bölümde çıkar.</p>
      <ul className="space-y-2">
        {liste.map((item, i) => (
          <li key={`${item.q}-${i}`} className="flex items-center justify-between gap-3 border border-white/10 bg-brand-card px-4 py-3">
            <p className="text-sm font-medium">{item.q}</p>
            <div className="flex gap-3 text-sm">
              <button
                type="button"
                className="text-brand-mint"
                onClick={() => {
                  setIndeks(i);
                  setSoru(item.q);
                  setCevap(item.a);
                }}
              >
                Düzenle
              </button>
              <button type="button" className="text-red-400" onClick={() => void kaydetListe(liste.filter((_, j) => j !== i))}>
                Sil
              </button>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={kaydet} className="space-y-4 border border-white/10 bg-brand-card p-6">
        <h2 className="text-lg font-semibold">{indeks === null ? "Yeni soru" : "Soruyu düzenle"}</h2>
        <input className={alanSinif} placeholder="Soru" value={soru} onChange={(e) => setSoru(e.target.value)} required />
        <textarea className={alanSinif} rows={4} placeholder="Cevap" value={cevap} onChange={(e) => setCevap(e.target.value)} required />
        <button type="submit" className="bg-brand-accent px-6 py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-dark">
          Kaydet
        </button>
        {durum && <p className="text-sm text-brand-mint">{durum}</p>}
      </form>
    </div>
  );
}

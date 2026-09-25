"use client";

import { FormEvent, useState } from "react";

const alan =
  "mt-2 w-full border border-white/10 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-mint";

export default function IletisimForm() {
  const [durum, setDurum] = useState<"idle" | "yukleniyor" | "ok" | "hata">("idle");

  const gonder = async (olay: FormEvent<HTMLFormElement>) => {
    olay.preventDefault();
    setDurum("yukleniyor");
    const form = olay.currentTarget;
    const data = new FormData(form);
    const yanit = await fetch("/api/teklif", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ad: data.get("ad"),
        email: data.get("email"),
        konu: data.get("konu"),
        mesaj: data.get("mesaj"),
        web: data.get("web"),
      }),
    });
    if (!yanit.ok) {
      setDurum("hata");
      return;
    }
    form.reset();
    setDurum("ok");
  };

  return (
    <form onSubmit={gonder} className="space-y-4 border border-white/10 bg-brand-card p-5 sm:p-8">
      <div className="hidden" aria-hidden>
        <input name="web" tabIndex={-1} autoComplete="off" />
      </div>
      <label className="block text-sm text-zinc-300">
        Ad soyad
        <input name="ad" required className={alan} />
      </label>
      <label className="block text-sm text-zinc-300">
        E-posta
        <input name="email" type="email" required className={alan} />
      </label>
      <label className="block text-sm text-zinc-300">
        Konu
        <input name="konu" className={alan} />
      </label>
      <label className="block text-sm text-zinc-300">
        Mesaj
        <textarea name="mesaj" rows={5} required className={alan} />
      </label>
      <button
        type="submit"
        disabled={durum === "yukleniyor"}
        className="bg-brand-accent px-7 py-3.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-dark hover:bg-brand-mint disabled:opacity-60"
      >
        {durum === "yukleniyor" ? "Gönderiliyor…" : "Gönder"}
      </button>
      {durum === "ok" && (
        <p className="text-sm text-brand-mint">Talebiniz iletildi. En kısa sürede dönüş yapacağız.</p>
      )}
      {durum === "hata" && (
        <p className="text-sm text-red-400">Gönderilemedi. Lütfen telefon veya e-posta ile yazın.</p>
      )}
    </form>
  );
}

"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGirisPage() {
  const router = useRouter();
  const [sifre, setSifre] = useState("");
  const [hata, setHata] = useState("");

  const gonder = async (olay: FormEvent) => {
    olay.preventDefault();
    setHata("");
    const yanit = await fetch("/api/admin/giris", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sifre }),
      credentials: "include",
    });
    if (!yanit.ok) {
      setHata("Şifre hatalı.");
      return;
    }
    router.replace("/admin/panel");
    router.refresh();
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-brand-dark px-4">
      <form onSubmit={gonder} className="w-full max-w-sm space-y-5 border border-white/10 bg-brand-card p-8">
        <p className="text-[11px] uppercase tracking-[0.28em] text-brand-mint">Kontrol paneli</p>
        <h1 className="text-2xl font-semibold text-white">T7 yönetim</h1>
        <p className="text-sm text-zinc-400">Yazılar, ürünler, referanslar ve SSS buradan güncellenir.</p>
        <label className="block text-sm text-zinc-300">
          Şifre
          <input
            type="password"
            value={sifre}
            onChange={(e) => setSifre(e.target.value)}
            className="mt-2 w-full border border-white/10 bg-brand-dark px-4 py-3 text-white outline-none focus:border-brand-mint"
            required
          />
        </label>
        {hata && <p className="text-sm text-red-400">{hata}</p>}
        <button
          type="submit"
          className="w-full bg-brand-accent py-3 text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-dark hover:bg-brand-mint"
        >
          Giriş
        </button>
      </form>
    </main>
  );
}

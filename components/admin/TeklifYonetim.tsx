"use client";

import { useEffect, useState } from "react";
import type { Teklif } from "@/lib/teklif-tip";

export default function TeklifYonetim() {
  const [liste, setListe] = useState<Teklif[]>([]);

  useEffect(() => {
    void fetch("/api/admin/teklifler", { credentials: "include" })
      .then((yanit) => yanit.json())
      .then((govde: Teklif[]) => setListe(govde));
  }, []);

  if (!liste.length) {
    return <p className="text-sm text-zinc-400">Henüz teklif talebi yok. Formdan gelenler burada listelenir.</p>;
  }

  return (
    <ul className="space-y-4">
      {liste.map((item) => (
        <li key={item.id} className="border border-white/10 bg-brand-card p-5">
          <div className="flex flex-wrap items-baseline justify-between gap-2">
            <p className="font-semibold">{item.ad}</p>
            <p className="text-xs text-zinc-500">{new Date(item.tarih).toLocaleString("tr-TR")}</p>
          </div>
          <p className="mt-1 text-sm text-brand-mint">{item.email}</p>
          {item.konu && <p className="mt-2 text-sm text-zinc-300">{item.konu}</p>}
          <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-zinc-400">{item.mesaj}</p>
        </li>
      ))}
    </ul>
  );
}

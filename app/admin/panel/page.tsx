"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import GenelYonetim from "@/components/admin/GenelYonetim";
import ReferansYonetim from "@/components/admin/ReferansYonetim";
import UrunYonetim from "@/components/admin/UrunYonetim";
import SssYonetim from "@/components/admin/SssYonetim";
import TeklifYonetim from "@/components/admin/TeklifYonetim";

const sekmeler = [
  { id: "teklifler", etiket: "Teklifler" },
  { id: "genel", etiket: "Genel & iletişim" },
  { id: "referanslar", etiket: "Referanslar" },
  { id: "urunler", etiket: "Ürünler" },
  { id: "sss", etiket: "SSS" },
] as const;

type Sekme = (typeof sekmeler)[number]["id"];

export default function AdminPanelPage() {
  const router = useRouter();
  const [sekme, setSekme] = useState<Sekme>("teklifler");

  const cikis = async () => {
    await fetch("/api/admin/cikis", { method: "POST" });
    router.push("/admin");
  };

  return (
    <main className="min-h-screen bg-brand-dark px-4 py-10 text-zinc-100">
      <div className="mx-auto max-w-5xl space-y-8">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <p className="text-[11px] uppercase tracking-[0.28em] text-brand-mint">Kontrol paneli</p>
            <h1 className="mt-2 text-3xl font-semibold">Siteyi buradan yönetin</h1>
            <p className="mt-2 max-w-xl text-sm text-zinc-400">
              Yazılar, iletişim, ürünler, referanslar, SSS ve gelen teklif talepleri.
            </p>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <Link href="/" className="text-brand-mint hover:text-white" target="_blank">
              Siteyi gör
            </Link>
            <button type="button" onClick={cikis} className="text-zinc-400 hover:text-white">
              Çıkış
            </button>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 border-b border-white/10 pb-3">
          {sekmeler.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => setSekme(item.id)}
              className={`px-4 py-2 text-sm ${sekme === item.id ? "bg-brand-accent text-brand-dark" : "border border-white/15 text-zinc-300"}`}
            >
              {item.etiket}
            </button>
          ))}
        </div>

        {sekme === "teklifler" && <TeklifYonetim />}
        {sekme === "genel" && <GenelYonetim />}
        {sekme === "referanslar" && <ReferansYonetim />}
        {sekme === "urunler" && <UrunYonetim />}
        {sekme === "sss" && <SssYonetim />}
      </div>
    </main>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import type { MenuGrup } from "@/constants/content";

type Props = {
  acik: boolean;
  kapat: () => void;
  menu: MenuGrup[];
};

export default function MobilMenu({ acik, kapat, menu }: Props) {
  const [urunAcik, setUrunAcik] = useState(false);

  useEffect(() => {
    if (!acik) setUrunAcik(false);
  }, [acik]);

  useEffect(() => {
    const kacis = (olay: KeyboardEvent) => {
      if (olay.key === "Escape") kapat();
    };
    window.addEventListener("keydown", kacis);
    return () => window.removeEventListener("keydown", kacis);
  }, [kapat]);

  const baglanti = "block py-3 text-[15px] font-medium tracking-wide text-zinc-200 transition-colors hover:text-white";

  return (
    <div className="xl:hidden">
      <button
        type="button"
        tabIndex={acik ? 0 : -1}
        aria-label="Menüyü kapat"
        onClick={kapat}
        className={`fixed inset-0 z-[60] bg-black/55 backdrop-blur-[2px] transition-opacity duration-300 ${
          acik ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        id="mobil-menu"
        aria-hidden={!acik}
        className={`fixed inset-y-0 right-0 z-[70] flex h-dvh w-[min(20.5rem,86vw)] flex-col border-l border-white/10 bg-[#16181B] shadow-[-24px_0_60px_rgba(0,0,0,0.45)] transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          acik ? "translate-x-0" : "pointer-events-none translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 px-5 pb-4 pt-[max(1.25rem,env(safe-area-inset-top))]">
          <Link href="/" onClick={kapat} className="flex items-center gap-2">
            <Image src="/logo-mark.png" alt="" width={80} height={36} className="h-5 w-auto" sizes="72px" />
            <span className="text-[10px] font-medium tracking-[0.2em] text-white">T7 İNŞAAT</span>
          </Link>
          <button
            type="button"
            onClick={kapat}
            className="inline-flex h-9 w-9 items-center justify-center border border-white/15 text-zinc-200 hover:border-brand-mint hover:text-brand-mint"
            aria-label="Menüyü kapat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto px-6 py-6" aria-label="Mobil menü">
          <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.28em] text-brand-mint">Menü</p>
          <Link href="/hakkimizda" onClick={kapat} className={baglanti}>
            Hakkımızda
          </Link>
          <button
            type="button"
            onClick={() => setUrunAcik((deger) => !deger)}
            className={`${baglanti} flex w-full items-center justify-between text-left`}
            aria-expanded={urunAcik}
          >
            Ürünlerimiz
            <ChevronDown className={`h-4 w-4 text-brand-mint transition-transform duration-200 ${urunAcik ? "rotate-180" : ""}`} />
          </button>
          <div
            className={`overflow-hidden transition-[max-height,opacity] duration-300 ${
              urunAcik ? "max-h-[40rem] opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="mb-3 space-y-4 border-l border-brand-mint/30 py-1 pl-4">
              {menu.map((grup) => (
                <div key={grup.label}>
                  <p className="text-[10px] uppercase tracking-[0.16em] text-zinc-500">{grup.label}</p>
                  {grup.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={kapat}
                      className="block py-1.5 text-[13px] text-zinc-400 hover:text-brand-mint"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <Link href="/projeler" onClick={kapat} className={baglanti}>
            Referanslar
          </Link>
          <Link href="/iletisim" onClick={kapat} className={baglanti}>
            İletişim
          </Link>
        </nav>

        <div className="border-t border-white/10 p-5 pb-[max(1.25rem,env(safe-area-inset-bottom))]">
          <Link
            href="/iletisim"
            onClick={kapat}
            className="flex items-center justify-center bg-brand-accent px-5 py-3.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-brand-dark hover:bg-brand-mint"
          >
            Teklif Alın
          </Link>
        </div>
      </aside>
    </div>
  );
}

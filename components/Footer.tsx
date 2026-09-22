"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Genel, MenuGrup } from "@/constants/content";
import { telefonLink } from "@/constants/content";

export default function Footer({ genel, menu }: { genel: Genel; menu: MenuGrup[] }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/admin")) return null;

  const gruplar = menu.filter(
    (group) => group.label === "Endüstriyel Yapı Sistemleri" || group.label === "Treyler",
  );
  const goster = gruplar.length ? gruplar : menu.slice(0, 2);

  return (
    <footer className="border-t border-white/10 bg-brand-dark">
      <div className="container grid gap-12 py-16 lg:grid-cols-4">
        <div>
          <p className="text-[13px] font-semibold tracking-[0.18em] text-white">{genel.name.toUpperCase()}</p>
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
            {genel.location} tesisinde {genel.area} üretim kapasitesiyle çelik yapı, CFS, betonarme ve treyler çözümleri.
          </p>
        </div>
        {goster.map((group) => (
          <div key={group.label}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-mint">{group.label}</p>
            <ul className="mt-4 space-y-2">
              {group.items.map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className="text-sm text-zinc-400 hover:text-white">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-brand-mint">İletişim</p>
          <ul className="mt-4 space-y-2 text-sm text-zinc-400">
            <li>
              <a href={telefonLink(genel.phone)} className="hover:text-white">
                {genel.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${genel.email}`} className="hover:text-white">
                {genel.email}
              </a>
            </li>
            <li>{genel.location}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-6 text-center text-xs text-zinc-500">
        © {genel.yil}–2026 {genel.name}. Tüm hakları saklıdır.
      </div>
    </footer>
  );
}

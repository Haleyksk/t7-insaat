"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu } from "lucide-react";
import type { MenuGrup } from "@/constants/content";
import MobilMenu from "@/components/MobilMenu";

export default function Header({ menu }: { menu: MenuGrup[] }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [desktopProductsOpen, setDesktopProductsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  const closeMobile = () => setMobileOpen(false);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300 ${
        scrolled
          ? "border-white/10 bg-brand-dark/95 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="container flex h-[4.5rem] items-center justify-between gap-4 lg:h-[5.25rem]">
        <Link href="/" className="flex items-center gap-2" onClick={closeMobile}>
          <Image
            src="/logo-mark.png"
            alt="T7 İnşaat"
            width={80}
            height={36}
            className="h-6 w-auto lg:h-7"
            sizes="80px"
            priority
          />
          <span className="text-[11px] font-medium tracking-[0.18em] text-white lg:text-[12px]">
            T7 İNŞAAT
          </span>
        </Link>

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Ana menü">
          <Link
            href="/hakkimizda"
            className="text-[13px] font-medium tracking-wide text-zinc-300 transition-colors hover:text-white"
          >
            Hakkımızda
          </Link>

          <div
            className="relative"
            onMouseEnter={() => setDesktopProductsOpen(true)}
            onMouseLeave={() => setDesktopProductsOpen(false)}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1.5 text-[13px] font-medium tracking-wide text-zinc-300 transition-colors hover:text-white"
              aria-expanded={desktopProductsOpen}
              aria-haspopup="menu"
            >
              Ürünlerimiz
              <ChevronDown className={`h-3.5 w-3.5 transition-transform ${desktopProductsOpen ? "rotate-180" : ""}`} />
            </button>
            <div
              className={`absolute left-1/2 top-full z-50 w-[42rem] -translate-x-1/2 pt-3 transition-all duration-200 ${
                desktopProductsOpen ? "visible opacity-100" : "invisible opacity-0"
              }`}
            >
              <div className="grid grid-cols-3 gap-6 border border-white/10 bg-brand-card p-6 shadow-2xl shadow-black/40">
                {menu.map((group) => (
                  <div key={group.label}>
                    <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-brand-mint">
                      {group.label}
                    </p>
                    {group.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="block py-1.5 text-[13px] text-zinc-300 transition-colors hover:text-white"
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/projeler"
            className="text-[13px] font-medium tracking-wide text-zinc-300 transition-colors hover:text-white"
          >
            Referanslar
          </Link>
          <Link
            href="/iletisim"
            className="text-[13px] font-medium tracking-wide text-zinc-300 transition-colors hover:text-white"
          >
            İletişim
          </Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/iletisim"
            className="hidden bg-brand-accent px-5 py-2.5 text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-dark transition-colors hover:bg-brand-mint sm:inline-flex"
          >
            Teklif Alın
          </Link>
          <button
            type="button"
            className="inline-flex h-10 w-10 items-center justify-center border border-white/15 text-zinc-100 transition-colors hover:border-brand-mint hover:text-brand-mint xl:hidden"
            onClick={() => setMobileOpen(true)}
            aria-expanded={mobileOpen}
            aria-controls="mobil-menu"
            aria-label="Menüyü aç"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>
    </header>
    <MobilMenu acik={mobileOpen} kapat={closeMobile} menu={menu} />
    </>
  );
}

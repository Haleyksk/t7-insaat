"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { Faq } from "@/constants/content";

export default function Faq({ sorular }: { sorular: Faq[] }) {
  const [open, setOpen] = useState(0);

  return (
    <section className="bg-brand-card py-20 lg:py-28">
      <div className="container grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-brand-mint">Sık sorulan sorular</p>
          <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white">
            Çelik yapı ve endüstriyel çözümlere dair
          </h2>
        </div>
        <div className="lg:col-span-8">
          {sorular.map((item, index) => {
            const isOpen = open === index;
            return (
              <div key={item.q} className="border-b border-white/10">
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  onClick={() => setOpen(isOpen ? -1 : index)}
                  aria-expanded={isOpen}
                >
                  <span className="text-sm font-semibold text-white sm:text-base">{item.q}</span>
                  <ChevronDown className={`h-4 w-4 shrink-0 text-brand-mint transition-transform ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && <p className="pb-5 text-sm leading-relaxed text-zinc-400">{item.a}</p>}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

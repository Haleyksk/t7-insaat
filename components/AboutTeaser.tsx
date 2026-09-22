import Link from "next/link";
import type { Genel } from "@/constants/content";

const points = [
  {
    title: "Uluslararası standart",
    text: "Projeler uluslararası yapı standartlarına ve tanımlı yüklere göre tasarlanır.",
  },
  {
    title: "Düzce üretim tesisi",
    text: "Yüksek kapasiteli, kalite odaklı üretim.",
  },
  {
    title: "Tek elden süreç",
    text: "Hafriyattan çatı kaplamasına, etriyeden treylere kadar üretim ve uygulama aynı çatıda.",
  },
];

export default function AboutTeaser({ genel }: { genel: Genel }) {
  return (
    <section className="bg-brand-dark py-20 lg:py-28">
      <div className="container grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-brand-mint">Hakkımızda</p>
          <h2 className="mt-3 max-w-md text-3xl font-semibold tracking-tight text-white lg:text-4xl">
            Köklü deneyim, güçlü üretim altyapısı.
          </h2>
          <Link
            href="/hakkimizda"
            className="mt-8 inline-flex text-[12px] font-semibold uppercase tracking-[0.16em] text-brand-mint hover:text-brand-accent"
          >
            Kurumsalı incele
          </Link>
        </div>
        <div className="lg:col-span-7">
          <p className="text-sm leading-relaxed text-zinc-400 lg:text-base">{genel.aboutText}</p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {points.map((item) => (
              <div key={item.title} className="border-t border-white/10 pt-5">
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-400">
                  {item.title === "Düzce üretim tesisi"
                    ? `${genel.area} arazi üzerinde yüksek kapasiteli, kalite odaklı üretim.`
                    : item.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

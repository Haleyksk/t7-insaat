/** Hakkımızda sayfasındaki kurul. Telefon kaydırmalı, tablet 3'lü, geniş ekran 5'li. */
import Image from "next/image";

const UYELER = [
  {
    ad: "Ertuğrul Yasin TÜRKESEVEN",
    unvan: "Yönetim Kurulu Başkanı",
    foto: "/yonetim/ertugrul-yasin-turkeseven-v3.png",
  },
  {
    ad: "Prof. Dr. İbrahim ÖZKOL",
    unvan: "Teknik ve Strateji Danışmanı",
    foto: "/yonetim/ibrahim-ozkol-v3.png",
    baglanti: "https://akademi.itu.edu.tr/ozkol",
  },
  {
    ad: "Doç. Dr. Fatih ALEMDAR",
    unvan: "Çelik Yapılar Akademik Danışmanı",
    foto: "/yonetim/fatih-alemdar-v3.png",
  },
  {
    ad: "Fatih YILMAZ",
    unvan: "İnşaat Mühendisi",
    foto: "/yonetim/fatih-yilmaz-v3.png",
  },
  {
    ad: "Hatice MUTLU",
    unvan: "Finans ve Muhasebe Sorumlusu",
    foto: "/yonetim/hatice-mutlu-v3.png",
  },
] as const;

function UyeKart({
  uye,
}: {
  uye: (typeof UYELER)[number];
}) {
  const govde = (
    <>
      <div className="relative aspect-square overflow-hidden">
        <Image src={uye.foto} alt={uye.ad} fill className="object-cover object-top" sizes="(min-width: 1024px) 20vw, 70vw" />
      </div>
      <div className="pt-4">
        <p className="text-sm font-semibold text-white">{uye.ad}</p>
        <p className="mt-1 text-[11px] font-medium uppercase tracking-[0.14em] text-brand-mint">{uye.unvan}</p>
      </div>
    </>
  );

  if ("baglanti" in uye && uye.baglanti) {
    return (
      <a href={uye.baglanti} target="_blank" rel="noreferrer" className="block min-w-[72%] snap-center lg:min-w-0">
        {govde}
      </a>
    );
  }

  return <article className="min-w-[72%] snap-center lg:min-w-0">{govde}</article>;
}

export default function YonetimKurulu() {
  return (
    <section className="border-t border-white/10 pt-14 lg:pt-16">
      <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-brand-mint">Kurumsal</p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight text-white lg:text-3xl">Yönetim Kurulu</h2>

      <div className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-2 md:hidden">
        {UYELER.map((uye) => (
          <UyeKart key={uye.ad} uye={uye} />
        ))}
      </div>

      <div className="mt-10 hidden gap-5 md:grid md:grid-cols-3 xl:grid-cols-5">
        {UYELER.map((uye) => (
          <UyeKart key={uye.ad} uye={uye} />
        ))}
      </div>
    </section>
  );
}

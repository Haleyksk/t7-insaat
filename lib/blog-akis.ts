import { blogYazilari, type BlogYazi } from "@/constants/blog";

export type AkisKategori = "ipuclari" | "malzeme" | "santiye" | "oncesi" | "video";
export type AkisTip = "standard" | "carousel" | "before_after" | "video";

export type AkisYazi = BlogYazi & {
  kategori: AkisKategori;
  tip: AkisTip;
  okuma: string;
  tarih: string;
  begeni: number;
  kapak: string | null;
  galeri: { src: string; alt: string }[];
  video?: string;
  once?: { src: string; alt: string };
  sonra?: { src: string; alt: string };
};

export const hikayeler: { id: AkisKategori | "tumu"; ad: string; src: string | null }[] = [
  { id: "tumu", ad: "Tümü", src: "/referanslar/prisma-5.webp" },
  { id: "ipuclari", ad: "İpuçları", src: "/referanslar/prisma-1.webp" },
  { id: "malzeme", ad: "Malzeme", src: null },
  { id: "santiye", ad: "Şantiye", src: "/referanslar/aglasan-1.webp" },
  { id: "oncesi", ad: "Öncesi / Sonrası", src: "/referanslar/hayvancilik-1.webp" },
  { id: "video", ad: "Videolar", src: "/referanslar/istasyon-1.jpg" },
];

const videoYazilari: AkisYazi[] = [
  {
    slug: "tursan-park-video",
    baslik: "Türsan Park şarj istasyonu",
    cevap: "96 araca aynı anda şarj veren tesisin çelik konstrüksiyonu, montajı ve altyapısı.",
    cta: "Benzer bir kanopi için açıklık ve araç sayısını yazın.",
    urun: { href: "/urunler/endustriyel-celik-yapilar", etiket: "Endüstriyel çelik yapılar" },
    kartlar: [],
    bolumler: [
      {
        id: "is",
        baslik: "İş",
        ozet: "Türsan Park Dinlenme Tesisleri’ndeki toplu şarj alanı.",
        maddeler: ["Çelik konstrüksiyon imalatı ve montajı T7 İnşaat’ta.", "Altyapı işi aynı teslimatın içinde."],
      },
    ],
    kategori: "video",
    tip: "video",
    okuma: "1 dk",
    tarih: "18 Eylül 2026",
    begeni: 0,
    kapak: "/referanslar/istasyon-1.jpg",
    galeri: [],
    video: "/istasyon.mp4",
  },
];

const sunum: Record<string, Partial<AkisYazi>> = {
  "1000-m2-celik-fabrika": {
    kategori: "ipuclari",
    tip: "carousel",
    okuma: "2 dk",
    tarih: "20 Eylül 2026",
    galeri: [
      { src: "/referanslar/prisma-1.webp", alt: "Prisma Mobilya. Çelik birleşim." },
      { src: "/referanslar/prisma-2.webp", alt: "Prisma Mobilya. Geniş açıklık." },
      { src: "/referanslar/prisma-5.webp", alt: "Prisma Mobilya. Tamamlanmış cephe." },
    ],
  },
  "celik-depo-betonarme": { kategori: "ipuclari", tip: "standard", okuma: "1 dk", tarih: "12 Eylül 2026", kapak: "/referanslar/prisma-5.webp" },
  "hayvancilik-celik-yapi": {
    kategori: "santiye",
    tip: "carousel",
    okuma: "1 dk",
    tarih: "8 Eylül 2026",
    galeri: [
      { src: "/referanslar/aglasan-1.webp", alt: "Ağlaşan Hayvancılık Tesisi." },
      { src: "/referanslar/hayvancilik-1.webp", alt: "Çatı kaplaması sürerken." },
      { src: "/referanslar/hayvancilik-3.webp", alt: "Kaplaması tamamlanan saçak." },
    ],
  },
  "cfs-hafif-celik-depo": { kategori: "ipuclari", tip: "standard", okuma: "1 dk", tarih: "22 Eylül 2026" },
  "celik-ev-betonarme": { kategori: "ipuclari", tip: "standard", okuma: "1 dk", tarih: "15 Eylül 2026" },
  "hibrit-beton-celik-cati": { kategori: "ipuclari", tip: "standard", okuma: "1 dk", tarih: "11 Eylül 2026" },
  "etriye-ciroz-siparis": { kategori: "malzeme", tip: "standard", okuma: "1 dk", tarih: "6 Eylül 2026" },
  "c-ve-m-profil": { kategori: "malzeme", tip: "standard", okuma: "1 dk", tarih: "4 Eylül 2026" },
  "damperli-dorse-cesitleri": { kategori: "ipuclari", tip: "standard", okuma: "1 dk", tarih: "2 Eylül 2026" },
  "lpg-tanker-dorse": { kategori: "ipuclari", tip: "standard", okuma: "1 dk", tarih: "1 Eylül 2026" },
};

const catiKarsilastirma: AkisYazi = {
  slug: "cati-kaplamasi",
  baslik: "Çatı kaplaması: açık saçak, kapalı saçak",
  cevap: "Aynı hayvancılık tesisinde kaplama sürerken ve saçak kapandıktan sonra.",
  cta: "Saçak boyu ve kaplama tipini yazın.",
  urun: { href: "/urunler/endustriyel-celik-yapilar", etiket: "Endüstriyel çelik yapılar" },
  kartlar: [],
  bolumler: [
    {
      id: "karsilastir",
      baslik: "Ne değişti",
      ozet: "Solda kaplama henüz tamamlanmamış saçak, sağda kapanmış çatı.",
      maddeler: ["Çizgiyi sürükleyerek iki hali görün.", "İki kare de hayvancılık tesisi galerisinden."],
    },
  ],
  kategori: "oncesi",
  tip: "before_after",
  okuma: "1 dk",
  tarih: "9 Eylül 2026",
  begeni: 0,
  kapak: "/referanslar/hayvancilik-3.webp",
  galeri: [],
  once: { src: "/referanslar/hayvancilik-1.webp", alt: "Çatı kaplaması sürerken." },
  sonra: { src: "/referanslar/hayvancilik-3.webp", alt: "Kaplaması biten saçak." },
};

function zenginlestir(yazi: BlogYazi): AkisYazi {
  const ek = sunum[yazi.slug] ?? {};
  const galeri = ek.galeri ?? yazi.bolumler.flatMap((b) => (b.gorsel ? [b.gorsel] : []));
  return {
    ...yazi,
    kategori: ek.kategori ?? "ipuclari",
    tip: ek.tip ?? (galeri.length > 1 ? "carousel" : "standard"),
    okuma: ek.okuma ?? "1 dk",
    tarih: ek.tarih ?? "Eylül 2026",
    begeni: 0,
    kapak: ek.kapak ?? galeri[0]?.src ?? null,
    galeri,
    ...ek,
  };
}

export function akisYazilari(): AkisYazi[] {
  return [...blogYazilari.map(zenginlestir), catiKarsilastirma, ...videoYazilari];
}

/** Blog yazıları. Ana sayfada gösterilmez; /blog üzerinden okunur. */

import { blogEkYazilar } from "@/constants/blog-ek";
import { blogMalzemeYazilar } from "@/constants/blog-malzeme";

export type BlogGorsel = { src: string; alt: string };

export type BlogBolum = {
  id: string;
  baslik: string;
  ozet: string;
  maddeler: string[];
  gorsel?: BlogGorsel;
};

export type BlogYazi = {
  slug: string;
  baslik: string;
  cevap: string;
  cta: string;
  urun?: { href: string; etiket: string };
  kartlar: { etiket: string; deger: string }[];
  bolumler: BlogBolum[];
};

export const blogYazilari: BlogYazi[] = [
  {
    slug: "1000-m2-celik-fabrika",
    baslik: "1000 m² çelik fabrika neye göre tutar?",
    cevap:
      "Metrekare tek başına fiyat vermez. Tutarı açıklık, yükseklik, vinç, zemin ve teklifin içine yazılan kalemler belirler.",
    cta: "Net ölçü ve vinç bilgisiyle teklif satır satır çıkar. Sabit bir metrekare fiyatı vermiyoruz.",
    urun: { href: "/urunler/endustriyel-celik-yapilar", etiket: "Endüstriyel çelik yapılar" },
    kartlar: [
      { etiket: "Süre", deger: "Proje ve zemin netleşince konuşulur" },
      { etiket: "Fiyatı değiştiren", deger: "Açıklık, vinç, yükseklik, zemin" },
      { etiket: "Teklif", deger: "Aynı kalemler yan yana durmalı" },
    ],
    bolumler: [
      {
        id: "neye-gore",
        baslik: "Neye göre değişir",
        ozet: "Aynı 1000 m², farklı açıklık ve yükseklikte farklı çelik demektir.",
        maddeler: [
          "Kolon aralığı büyüdükçe kiriş ve kolon kesiti büyür.",
          "Saçak yükseldikçe rüzgar ve cephe alanı artar.",
          "Kar, rüzgar ve deprem bölgesi kesiti değiştirir.",
          "Zayıf zemin temeli, dolayısıyla toplam işi büyütür.",
        ],
        gorsel: {
          src: "/referanslar/prisma-1.webp",
          alt: "Prisma Mobilya Fabrikası. Geniş açıklıklı çelik üretim tesisi.",
        },
      },
      {
        id: "kapsam",
        baslik: "Teklife neler girer",
        ozet: "Ucuz görünen teklif çoğu zaman eksik kalemdir.",
        maddeler: [
          "Çelik imalat ve montaj ayrı satır olmalı.",
          "Çatı ve cephe kaplaması dahil mi, net yazılmalı.",
          "Temel, zemin betonu ve çevre düzeni çoğu teklifte dışarıda kalır.",
          "Elektrik, mekanik ve yangın genelde ayrı iş kalemidir.",
        ],
      },
      {
        id: "vinc",
        baslik: "Vinç ve yükseklik",
        ozet: "Gezer vinç, binayı sadece bir ekipman olmaktan çıkarır.",
        maddeler: [
          "Vinç tonajı kolon ve kiriş hesabını büyütür.",
          "Vinç yolu ve konsol, çelik miktarını artırır.",
          "Yüksek saçak hem çeliği hem cephe kaplamasını artırır.",
          "Vinç yoksa aynı alanda daha sade bir iskelet yeter.",
        ],
      },
      {
        id: "karsilastirma",
        baslik: "Çelik mi, betonarme mi",
        ozet: "İkisi de doğru tasarlanırsa ayakta durur. Seçim açıklık ve süreye göre yapılır.",
        maddeler: [
          "Geniş açıklık ve hızlı kurulumda çelik öne çıkar.",
          "Betonarme, yoğun bölme ve yangın senaryosunda tercih edilebilir.",
          "Karar, tek cümlelik “hangisi ucuz” sorusuyla verilmez.",
          "Karşılaştırma aynı açıklık, yükseklik ve kapsamla yapılmalı.",
        ],
      },
      {
        id: "sorular",
        baslik: "Teklif isterken ne sorun",
        ozet: "Bu cevaplar olmadan gelen rakam karşılaştırılamaz.",
        maddeler: [
          "Net açıklık ve saçak yüksekliği nedir?",
          "Vinç var mı, varsa tonajı nedir?",
          "Zemin etüdü hazır mı?",
          "Çatı, cephe ve temel teklifin içinde mi?",
        ],
      },
    ],
  },
  {
    slug: "celik-depo-betonarme",
    baslik: "Çelik depo mu, betonarme depo mu?",
    cevap: "Geniş açıklık ve kısa kurulum süresi isteniyorsa çelik öne çıkar. Sık bölme ve yangın senaryosu betonarmeyi gündeme getirir.",
    cta: "Açıklık, yükseklik ve kaplama kapsamını yazın. İki sistemi aynı listeyle kıyaslarız.",
    urun: { href: "/urunler/endustriyel-celik-yapilar", etiket: "Endüstriyel çelik yapılar" },
    kartlar: [
      { etiket: "Çeliği öne çıkaran", deger: "Açıklık ve kurulum süresi" },
      { etiket: "Betonarmeyi öne çıkaran", deger: "Bölme ve yangın" },
      { etiket: "Karar", deger: "Aynı kapsamla kıyas" },
    ],
    bolumler: [
      {
        id: "aciklik",
        baslik: "Açıklık",
        ozet: "Depoda kolon azaldıkça raf ve araç yolu rahatlar. Bu açıklığı çelik daha ince kesitle geçer.",
        maddeler: [
          "Kolon sıklığı, raf düzenini ve tır manevrasını belirler.",
          "Aynı açıklıkta çelik iskelet daha kısa sürede kurulur.",
          "Betonarme, kısa açıklık ve çok katlı depoda sade kalabilir.",
        ],
        gorsel: {
          src: "/referanslar/prisma-2.webp",
          alt: "Prisma Mobilya Fabrikası. Kolon aralığı geniş çelik tesis.",
        },
      },
      {
        id: "sure",
        baslik: "Süre",
        ozet: "Çelik atölyede üretilir, sahada birleşir. Betonarme sahada dökülür ve kür bekler.",
        maddeler: [
          "Çelikte imalat, temel işiyle birlikte yürüyebilir.",
          "Betonarmede kalıp, döküm ve kalıp sökümü sahayı tutar.",
          "Teslim tarihi sıkıysa süre, birim fiyattan önce konuşulur.",
        ],
      },
      {
        id: "yangin",
        baslik: "Yangın ve bölme",
        ozet: "Yangın dayanımı ve iç bölme, sistem seçimini fiyat kadar etkiler.",
        maddeler: [
          "Çelik, yangın senaryosuna göre boya veya kaplama ister.",
          "Betonarme kesit, yangında kendi payını daha rahat taşır.",
          "Çok sayıda oda varsa bölme maliyeti ayrıca yazılmalı.",
        ],
      },
      {
        id: "sor",
        baslik: "Teklif isterken ne sorun",
        ozet: "İki teklif aynı cümleleri taşımıyorsa rakamlar kıyaslanamaz.",
        maddeler: [
          "Net açıklık ve saçak yüksekliği nedir?",
          "Çatı, cephe ve temel dahil mi?",
          "Yangın dayanımı kaç dakika isteniyor?",
        ],
      },
    ],
  },
  {
    slug: "hayvancilik-celik-yapi",
    baslik: "Hayvancılık tesisinde çelik yapı",
    cevap: "Ahır ve sundurma ölçüsü hayvan sayısına, havalandırmaya ve servis yoluna göre çıkar. Metrekare sonra gelir.",
    cta: "Hayvan sayısı, açıklık ve kapalı-açık alan oranını yazın. Tesise göre çelik karkas çıkar.",
    urun: { href: "/urunler/endustriyel-celik-yapilar", etiket: "Endüstriyel çelik yapılar" },
    kartlar: [
      { etiket: "Ölçüyü belirleyen", deger: "Hayvan sayısı ve servis yolu" },
      { etiket: "Konfor", deger: "Havalandırma ve saçak" },
      { etiket: "Kaplama", deger: "Çatı ayrı, cephe ayrı yazılır" },
    ],
    bolumler: [
      {
        id: "olcu",
        baslik: "Ölçü nereden gelir",
        ozet: "Sıra sayısı, yem yolu ve gübre hattı açıklığı belirler. Hazır bir tip proje yetmez.",
        maddeler: [
          "Her sıranın genişliği ve sayısı net açıklığı verir.",
          "Servis aracı girecekse kapı ve kolon aralığı buna göre açılır.",
          "Saçak, yağmurun yem yoluna düşmemesi için uzatılır.",
        ],
        gorsel: {
          src: "/referanslar/aglasan-1.webp",
          alt: "Ağlaşan Hayvancılık Tesisi. Açık düzenli çelik çiftlik yapısı.",
        },
      },
      {
        id: "hava",
        baslik: "Havalandırma",
        ozet: "Kapalı kutu ahır, sıcak ve nem biriktirir. Mahya ve yan açıklık tasarımın parçasıdır.",
        maddeler: [
          "Mahya açıklığı sıcak havayı yukarı alır.",
          "Yan perdeler rüzgara göre açılıp kapanır.",
          "Cepheyi tamamen kapatmak, havalandırmayı ayrıca çözmeyi gerektirir.",
        ],
        gorsel: {
          src: "/referanslar/hayvancilik-1.webp",
          alt: "Hayvancılık tesisi. Saçaklı çelik karkas.",
        },
      },
      {
        id: "kapsam",
        baslik: "Teklife neler girer",
        ozet: "Karkas, çatı ve zemin çoğu zaman ayrı ekiptir. Tek rakamda hepsi varmış gibi okunmamalı.",
        maddeler: [
          "Çelik karkas ve montaj ayrı satır olmalı.",
          "Çatı kaplaması ve oluk dahil mi, yazılmalı.",
          "Yemlik, suluk ve zemin betonu genelde ayrı kalemdir.",
        ],
      },
    ],
  },
  ...blogEkYazilar,
  ...blogMalzemeYazilar,
];

export function blogYaziBul(slug: string) {
  return blogYazilari.find((yazi) => yazi.slug === slug);
}

import type { BlogYazi } from "@/constants/blog";

/** Yeni rehberler. Fotoğrafı olmayan konuda görsel zorlanmaz. */
export const blogEkYazilar: BlogYazi[] = [
  {
    slug: "cfs-hafif-celik-depo",
    baslik: "Hafif çelik depo nedir?",
    cevap: "CFS, soğuk şekillendirilmiş ince kesitli çeliktir. Hafif depo ve bölüntülü yapıda kullanılır. Vinçli, çok yüksek açıklık ağır çeliğe kalır.",
    cta: "Açıklık, yükseklik ve vinç olup olmadığını yazın. Hafif sistem yetiyor mu, ona göre bakarız.",
    urun: { href: "/urunler/cfs-hafif-celik-depolar", etiket: "CFS hafif çelik depolar" },
    kartlar: [
      { etiket: "CFS", deger: "Soğuk şekillendirilmiş ince profil" },
      { etiket: "Yeterli olduğu yer", deger: "Hafif depo ve bölme" },
      { etiket: "Yetmediği yer", deger: "Vinç ve çok geniş açıklık" },
    ],
    bolumler: [
      {
        id: "nedir",
        baslik: "Ne işe yarar",
        ozet: "Profil fabrikada bükülür, sahada vidalanır. Ağır kaynaklı çerçeveden daha hafif bir iskelettir.",
        maddeler: [
          "Duvar ve çatı aynı profil ailesiyle kurulabilir.",
          "Kaplama, yalıtım ve bölme sonradan eklenir.",
          "Küçük depo ve ofis-depo karışımında süre kısalır.",
        ],
      },
      {
        id: "sinir",
        baslik: "Ne zaman yetmez",
        ozet: "İnce profil her yükü taşımaz. Sınır, açıklık ve vinçle gelir.",
        maddeler: [
          "Gezer vinç varsa kesit ağır çeliğe döner.",
          "Çok geniş açıklıkta kolon-kiriş sistemi gerekir.",
          "Kar ve rüzgar bölgesi kesiti büyütür; bazen sistemi değiştirir.",
        ],
      },
      {
        id: "sor",
        baslik: "Teklif isterken ne sorun",
        ozet: "Hafif yazısı, işin hafif olduğu anlamına gelmez. Kapsam satırda durmalı.",
        maddeler: [
          "Net açıklık ve saçak yüksekliği nedir?",
          "Raf veya asma kat yükü var mı?",
          "Çatı, cephe ve temel teklifin içinde mi?",
        ],
      },
    ],
  },
  {
    slug: "celik-ev-betonarme",
    baslik: "Çelik ev mi, betonarme mi?",
    cevap: "Deprem, maliyet, süre ve enerji açısından çelik ev ile betonarme ev aynı listede durur.",
    cta: "Önceliğinizi yazın. İki sistemi aynı kapsamla konuşuruz.",
    urun: { href: "/urunler/celik-ev", etiket: "Çelik ev" },
    kartlar: [
      { etiket: "Çelik", deger: "Hızlı teslim, hafif iskelet" },
      { etiket: "Betonarme", deger: "Yaygın işçilik" },
      { etiket: "Karar", deger: "Önceliğe göre" },
    ],
    bolumler: [
      {
        id: "giris",
        baslik: "Çelik ev mi, betonarme mi?",
        ozet: "Deprem güvenliği, maliyet, inşaat süresi ve enerji verimliliği. Güncel karşılaştırma.",
        maddeler: [],
      },
      {
        id: "deprem",
        baslik: "Deprem ve maliyet",
        ozet: "Çelik esnek bir malzemedir. Deprem enerjisini absorbe eder ve hafif yapısı zemine daha az yük bindirir.",
        maddeler: [
          "Betonarme rijittir. Kalitesiz işçilik veya uygun olmayan zemin, hasar riskini artırabilir.",
        ],
        gorsel: { src: "/referanslar/prisma-1.webp", alt: "Çelik birleşim detayı." },
      },
      {
        id: "sure",
        baslik: "İnşaat süresi ve yalıtım",
        ozet: "Çelik konstrüksiyon ev, fabrikasyon üretimle 2–4 ayda tamamlanabiliyor. Betonarme ev, kür süresine bağlı olarak 6–12 ay sürebilir.",
        maddeler: [
          "Çelik sistemde yalıtım katmanı baştan seçilir.",
          "Betonarmede ek mantolama gerekir. Isı köprüsü riski daha yüksektir.",
        ],
      },
      {
        id: "omur",
        baslik: "Ömür, bakım ve mimari esneklik",
        ozet: "Galvanizli korumayla çelik, doğru izolasyonla 70 yılı aşan bir ömre ulaşabiliyor.",
        maddeler: [
          "Betonarmede ömür 50–100 yıl arasında değişebilir. Donatı korozyonu ve çatlak onarımı zamanla maliyet oluşturabiliyor.",
        ],
      },
      {
        id: "uygun",
        baslik: "Hangisi size uygun?",
        ozet: "Deprem, hızlı teslim, enerji ve düşük bakım önceliğinizse çelik daha mantıklı olabilir.",
        maddeler: [
          "Yaygın işçilik ve daha düşük başlangıç maliyeti önceliğinizse betonarme tercih edilebilir.",
        ],
      },
    ],
  },
  {
    slug: "hibrit-beton-celik-cati",
    baslik: "Hibrit yapı: beton kolon, çelik çatı",
    cevap: "Kolonlar betonarmede kalır, geniş açıklık çelik çatıyla geçilir. Dayanım ve montaj hızı aynı işte birleşir.",
    cta: "Açıklık, kolon aksı ve çatı yükünü yazın. Hibrit uygun mu, ona göre çıkar.",
    urun: { href: "/urunler/hibrit-beton-yapilar", etiket: "Hibrit beton yapılar" },
    kartlar: [
      { etiket: "Kolon", deger: "Betonarme taşıyıcı" },
      { etiket: "Çatı", deger: "Çelik açıklık" },
      { etiket: "Kritik yer", deger: "Kolon-çatı birleşimi" },
    ],
    bolumler: [
      {
        id: "nerede",
        baslik: "Nerede işe yarar",
        ozet: "Depo ve üretim holünde ortada az kolon istenir. Çatı bu açıklığı alır.",
        maddeler: [
          "Beton kolon yangın ve rijitlik tarafını taşır.",
          "Çelik çatı makası veya kirişi açıklığı geçer.",
          "Tam çelik iskelet şart değildir.",
        ],
      },
      {
        id: "birlesim",
        baslik: "Birleşim",
        ozet: "İşin riski çatıda değil, kolonun tepesindedir. Ankraj baştan yazılır.",
        maddeler: [
          "Ankraj plakası beton dökülmeden yerleşmelidir.",
          "Kot farkı montajı kilitler.",
          "Çatı yükü ve rüzgar, kolon hesabına girer.",
        ],
      },
      {
        id: "sor",
        baslik: "Teklif isterken ne sorun",
        ozet: "Hibrit teklifte iki ekip varsa sınır net olmalı.",
        maddeler: [
          "Betonarme kolon teklifin içinde mi?",
          "Çelik yalnızca çatı mı, cephe de var mı?",
          "Ankraj ve montaj kimde?",
        ],
      },
    ],
  },
  {
    slug: "etriye-ciroz-siparis",
    baslik: "Etriye ve çiroz siparişinde ne yazılır?",
    cevap: "Şekil, dış ölçü, demir çapı ve adet olmadan etriye üretilemez. “Bir miktar etriye” ifadesi yetmez.",
    cta: "Ölçü, çap ve adedi yazın. Otomatik hatta buna göre kesilir.",
    urun: { href: "/urunler/etriye-ciroz", etiket: "Etriye ve çiroz" },
    kartlar: [
      { etiket: "Şekil", deger: "Kare, dikdörtgen veya çiroz" },
      { etiket: "Ölçü", deger: "Dıştan dışa, santimetre" },
      { etiket: "Adet", deger: "Çap ile birlikte" },
    ],
    bolumler: [
      {
        id: "etriye",
        baslik: "Etriye",
        ozet: "Kolon ve kirişte boyuna demiri sarar. Kanca ve ölçü statik projeden okunur.",
        maddeler: [
          "Dış ölçü, beton örtüsü düşüldükten sonraki halidir.",
          "Çap, projedeki etriye çapıdır.",
          "Kanca açısı projede yazıyorsa ayrıca belirtilir.",
        ],
      },
      {
        id: "ciroz",
        baslik: "Çiroz",
        ozet: "Çiroz, etriyenin tutmadığı ara demiri bağlar. Ölçüsü etriyeden kısadır.",
        maddeler: [
          "Tek kol veya çift kol olduğu yazılmalı.",
          "Boy, bağlayacağı iki demir arasındaki açıklıktır.",
          "Adet, etriye adedinden ayrı istenir.",
        ],
      },
      {
        id: "sor",
        baslik: "Sipariş notu",
        ozet: "Bu satırlar üretimi başlatır.",
        maddeler: [
          "Şekil ve dış ölçü.",
          "Demir çapı.",
          "Adet ve teslim yeri.",
        ],
      },
    ],
  },
];

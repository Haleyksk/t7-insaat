import type { BlogYazi } from "@/constants/blog";

/** Profil ve dorse rehberleri. */
export const blogMalzemeYazilar: BlogYazi[] = [
  {
    slug: "c-ve-m-profil",
    baslik: "C ve M profil ne işe yarar?",
    cevap: "C profil taşıyıcı dikme ve kiriş olur. M profil, C’nin uçlarını kapatan ve sistemi tamamlayan elemandır.",
    cta: "Açıklık, profil yüksekliği ve galvaniz isteğini yazın. Ölçüye göre tedarik edilir.",
    urun: { href: "/urunler/c-m-celik-profil", etiket: "C ve M çelik profil" },
    kartlar: [
      { etiket: "C", deger: "Duvar, döşeme, çatı dikmesi" },
      { etiket: "M", deger: "Başlık ve bitiş profili" },
      { etiket: "Kaplama", deger: "Galvaniz, korozyon için" },
    ],
    bolumler: [
      {
        id: "c",
        baslik: "C profil",
        ozet: "Soğuk bükülmüş, tek yöne açık kesittir. CFS duvar ve çatıda ana elemandır.",
        maddeler: [
          "Yükseklik ve et kalınlığı taşıma gücünü belirler.",
          "Delik ve bindirme, montaj hızını etkiler.",
          "Ağır vinç yükü bu profile bırakılmaz.",
        ],
      },
      {
        id: "m",
        baslik: "M profil",
        ozet: "C’nin ağzını kapatır. Üst başlık, alt başlık ve lentoda tamamlayıcıdır.",
        maddeler: [
          "C ile aynı yükseklikte seçilir.",
          "Tek başına geniş açıklık kirişi değildir.",
          "Eksik M, duvarın başını açık bırakır.",
        ],
      },
      {
        id: "sor",
        baslik: "Teklif isterken ne sorun",
        ozet: "Profil listesi metre ve adet olarak durmalı.",
        maddeler: [
          "Yükseklik, et kalınlığı ve boy nedir?",
          "C ve M ayrı satır mı?",
          "Galvaniz isteniyor mu?",
        ],
      },
    ],
  },
  {
    slug: "damperli-dorse-cesitleri",
    baslik: "Damperli dorse çeşitleri",
    cevap: "Damper, dökme yükü devirerek boşaltan dorsedir. Tipi, yükün cinsine ve boşaltma yönüne göre seçilir.",
    cta: "Yük cinsi, hacim ve boşaltma yönünü yazın. Gövde ve hidrolik buna göre konuşulur.",
    urun: { href: "/urunler/damper-grubu", etiket: "Damper grubu" },
    kartlar: [
      { etiket: "Arkadan", deger: "Yola ve şantiyeye dökme yük" },
      { etiket: "Yandan", deger: "Dar alanda yan boşaltma" },
      { etiket: "Seçim", deger: "Yük, hacim, dingil" },
    ],
    bolumler: [
      {
        id: "tipler",
        baslik: "Tipler",
        ozet: "İsim gövdenin şeklinden gelir. Aynı kelime her yükte aynı dorsi tutmaz.",
        maddeler: [
          "Arkadan damper, yığın ve hafriyatta sık görülür.",
          "Yandan damper, boşaltmanın yana olduğu sahada kullanılır.",
          "Havuz gövde, yapışkan ve iri taşa göre ayrıca seçilir.",
        ],
      },
      {
        id: "secim",
        baslik: "Neye göre seçilir",
        ozet: "Hacim kadar, yükün yoğunluğu ve şasi önemlidir.",
        maddeler: [
          "Tonaj, gövdeyi ve dingil sayısını büyütür.",
          "Hidrolik, gövdeyle birlikte düşünülür.",
          "Saha zemini, lastik ve şasi yüksekliğini etkiler.",
        ],
      },
      {
        id: "sor",
        baslik: "Teklif isterken ne sorun",
        ozet: "Üç cevap gövdeyi belirler.",
        maddeler: [
          "Ne taşınacak, metreküp mü ton mu?",
          "Boşaltma arkadan mı, yandan mı?",
          "Dingil ve hidrolik teklifin içinde mi?",
        ],
      },
    ],
  },
  {
    slug: "lpg-tanker-dorse",
    baslik: "LPG tanker dorsede nelere bakılır?",
    cevap: "Alıcı; kapasite, bölme, şasi ve şartnamedeki güvenlik kalemlerine bakar. Üretim ölçüsü teklifte netleşir.",
    cta: "Kapasite ve şartname özetini iletin. Tanker ve şasi birlikte değerlendirilir.",
    urun: { href: "/urunler/lpg-tankerleri", etiket: "LPG tankerleri" },
    kartlar: [
      { etiket: "Kapasite", deger: "Taşınacak hacim" },
      { etiket: "Şasi", deger: "Dingil ve bağlantı" },
      { etiket: "Şartname", deger: "Güvenlik kalemleri ayrı yazılır" },
    ],
    bolumler: [
      {
        id: "alici",
        baslik: "Alıcı ne sorar",
        ozet: "İlk soru fiyat değil, taşınacak ürün ve hacimdir.",
        maddeler: [
          "Kapasite ve bölme sayısı işi ayırır.",
          "Çekici uyumu ve dingil yerleşimi şasiyi belirler.",
          "Donanım listesi eksikse tankerler kıyaslanamaz.",
        ],
      },
      {
        id: "guvenlik",
        baslik: "Güvenlik kalemleri",
        ozet: "LPG tehlikeli maddedir. Teklif, şartnamedeki güvenlik maddelerini tek tek göstermelidir.",
        maddeler: [
          "Sızdırmazlık ve donanım, gövde fiyatının içinde sayılmamalı.",
          "Hangi standart ve şartname geçerli, yazıyla durmalı.",
          "Eksik kalem, ucuz teklifin nedenidir.",
        ],
      },
      {
        id: "sor",
        baslik: "Teklif isterken ne sorun",
        ozet: "Şu üç satır karşılaştırmayı mümkün kılar.",
        maddeler: [
          "İstenen kapasite nedir?",
          "Şartname veya standart hangisi?",
          "Şasi, yürür aksam ve donanım dahil mi?",
        ],
      },
    ],
  },
];

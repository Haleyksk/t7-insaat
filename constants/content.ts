export const site = {
  name: "T7 İnşaat",
  shortName: "T7",
  email: "info@t7insaat.com",
  phone: "0380 549 76 76",
  phoneHref: "tel:+903805497676",
  location: "Düzce",
  area: "42.000 m²",
};

export type Genel = {
  name: string;
  email: string;
  phone: string;
  location: string;
  area: string;
  aboutText: string;
  heroUst: string;
  heroBaslik: string;
  heroAltBaslik: string;
  heroYazi: string;
  ctaBaslik: string;
  ctaYazi: string;
  yil: string;
};

export const genelVarsayilan: Genel = {
  name: "T7 İnşaat",
  email: "info@t7insaat.com",
  phone: "0380 549 76 76",
  location: "Düzce",
  area: "42.000 m²",
  aboutText: `T7 İnşaat, projelerini uluslararası yapı standartlarına göre tasarlayan, modern mühendislik yaklaşımlarını üretim süreçlerine entegre eden; çelik yapılarda hızlı kurulum, hafiflik ve dayanıklılığı hedefleyen yenilikçi bir firmadır. Düzce’de 42.000 m² arazi üzerinde kurulu üretim tesislerimiz sayesinde, projelerimizi yüksek kapasiteyle ve kalite standartlarına uygun şekilde hayata geçiriyoruz. Genç ve dinamik kadromuzun enerjisini, alanında uzman danışmanlarımızın rehberliğiyle birleştirerek her projede güvenli ve sürdürülebilir çözümler sunuyoruz. Ayrıca, özgün tasarımlara sahip treyler üretimiyle endüstriyel taşımacılık ihtiyaçlarına da yüksek kaliteyle cevap veriyoruz.`,
  heroUst: "Çelik yapı · CFS · Treyler",
  heroBaslik: "Yapı işiniz",
  heroAltBaslik: "tek adreste.",
  heroYazi:
    "Uluslararası yüklere göre hesaplanan çelik ve hibrit sistemler; Düzce’de 42.000 m² kapasiteyle hızlı kurulum, hafiflik ve dayanıklılık.",
  ctaBaslik: "Projeniz için güçlü ve güvenilir çelik çözümler T7’de.",
  ctaYazi: "Mühendislikten üretime, uygulamadan teslimata kadar tüm süreci tek çatı altında yönetiyoruz.",
  yil: "2013",
};

export function telefonLink(phone: string) {
  const rakam = phone.replace(/\D/g, "");
  return `tel:+${rakam.startsWith("90") ? rakam : `90${rakam}`}`;
}

export type MenuGrup = { label: string; items: { href: string; label: string }[] };

export function urunMenu(urunler: Product[]): MenuGrup[] {
  const gruplar = new Map<string, { href: string; label: string }[]>();
  for (const urun of urunler) {
    const kalemler = gruplar.get(urun.group) ?? [];
    kalemler.push({ href: `/urunler/${urun.slug}`, label: urun.title });
    gruplar.set(urun.group, kalemler);
  }
  return [...gruplar.entries()].map(([label, items]) => ({ label, items }));
}

export const aboutText = genelVarsayilan.aboutText;

export type Reference = {
  slug: string;
  name: string;
  brand: string;
  sector: string;
  promise: string;
  logo: string;
  cover: string;
  gallery: string[];
  visual: "logo" | "photo";
  video?: string;
  yazi?: string;
};

export const faqs = [
  {
    q: "Projelerinizde özel üretim yapıyor musunuz?",
    a: "Evet. Tasarım, üretim ve uygulama süreçlerini entegre yönetiyoruz. Proje planlamasından mühendislik hesaplarına, üretimden sahada teslimata kadar tek elden ilerliyoruz.",
  },
  {
    q: "Üretim ve uygulama süreçlerini birlikte mi yürütüyorsunuz?",
    a: "Evet. Tasarım, üretim ve uygulamayı aynı çatı altında toplayarak projelerin her aşamasında kalite ve sürekliliği sağlıyoruz.",
  },
  {
    q: "Bizimle çalışmanın en büyük avantajı nedir?",
    a: "Sürecin her aşamasında şeffaf iletişim, güvenilir planlama ve Düzce’deki üretim kapasitemizle sahada doğrulanmış teslimat.",
  },
  {
    q: "Çözümlerinizi diğerlerinden ayıran nedir?",
    a: "Standart üretim yerine, uluslararası tanımlı yüklere göre hesaplanan, dayanıklılığı ve kurulum hızını ön planda tutan mühendislik çözümleri.",
  },
];

export type Faq = { q: string; a: string };

export type Product = {
  slug: string;
  title: string;
  group: string;
  summary: string;
  body: string[];
  bullets?: string[];
  image: string;
  anaSayfa?: boolean;
};

export const products: Product[] = [
  {
    slug: "endustriyel-celik-yapilar",
    title: "Endüstriyel Çelik Yapılar",
    group: "Endüstriyel Yapı Sistemleri",
    summary:
      "Sanayi tesisleri ve üretim yapıları için ağır çelik konstrüksiyon ile fabrika inşaatı.",
    body: [
      "T7 İnşaat olarak, sanayi tesisleri ve üretim yapıları için ağır çelik konstrüksiyon sistemleriyle endüstriyel fabrika inşaatları gerçekleştiriyoruz.",
      "Hafriyattan çatı kaplamasına kadar tüm süreçleri tek elden yönetiyor, projelerinizi hızlı ve güvenli şekilde hayata geçiriyoruz. Yüksek açıklık geçişi, ağır yük taşıma kapasitesi ve uzun ömürlü kullanım için özel olarak projelendirilen yapılarımız, endüstriyel tesislerin ihtiyaç duyduğu geniş alan ve yüksek tavan gereksinimlerine tam uyum sağlar.",
    ],
    image:
      "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "cfs-hafif-celik-depolar",
    title: "CFS Hafif Çelik Depolar",
    group: "Endüstriyel Yapı Sistemleri",
    summary:
      "Soğuk şekillendirilmiş çelik (CFS) ile hızlı, hafif ve korozyona dayanıklı depo yapıları.",
    body: [
      "CFS (Cold-Formed Steel – Soğuk Şekillendirilmiş Çelik) sistemi, yüksek dayanımlı yapı çeliklerinin ileri mühendislik hesaplarıyla, CNC kontrollü üretim hatlarında minimum toleransla şekillendirilmesiyle oluşan modern bir yapı teknolojisidir.",
      "T7 İnşaat olarak, CFS teknolojisiyle ürettiğimiz tüm yapıları; deprem, rüzgar, kar gibi uluslararası tanımlı yüklerle ve proje özel ihtiyaçlara göre statik-dinamik hesaplarla tasarlıyoruz. Üretim sürecinde kaynak, kumlama ve boyama gibi geleneksel işlemlere ihtiyaç kalmaz; galvaniz kaplama bozulmaz, korozyon direnci maksimum düzeyde korunur.",
      "CFS sistemi, konutlardan endüstriyel yapılara, geçici ya da kalıcı birçok projede kullanılabilir. T7 İnşaat’ın AR-GE destekli altyapısıyla üretilen bu sistem; modern, sürdürülebilir ve güvenli yapıların temelini oluşturur.",
    ],
    bullets: [
      "Kaynak, kumlama, boyama gibi işlemleri ortadan kaldıran üretim süreci",
      "Geleneksel sistemlere göre çok daha hızlı kurulum",
      "Daha hafif, daha dayanıklı ve estetik yapılar",
      "Şantiyede minimum çevresel etki, kuru inşaat prensibi",
      "Yüksek mühendislik güvencesiyle uzun ömürlü kullanım",
      "Mimaride özgürlük, esnek tasarım imkânı",
    ],
    image:
      "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "hibrit-beton-yapilar",
    title: "Hibrit Beton Yapılar",
    group: "Endüstriyel Yapı Sistemleri",
    summary:
      "Betonarme kolon ile çelik çatının birleştiği, hızlı ve yüksek açıklıklı hibrit sistemler.",
    body: [
      "T7 İnşaat olarak, hibrit yapı sistemlerinde betonarme kolonlar ile çelik çatıyı bir araya getirerek hem yapısal dayanım hem de inşaat hızı açısından güçlü çözümler sunuyoruz.",
      "Betonarme taşıyıcı sistemin sağlamlığı ile çelik çatının hafifliği ve montaj kolaylığı birleşerek, özellikle yüksek açıklık gerektiren endüstriyel yapılar, depo ve üretim tesisleri için ideal bir yapı çözümü oluşturur.",
      "Her projeye özel mühendislik yaklaşımlarıyla, ihtiyaca özel çözümler geliştiriyor; güvenli, hızlı ve işlevsel yapılar inşa ediyoruz.",
    ],
    image:
      "https://images.unsplash.com/photo-1503387837-b154d5074bd2?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "betonarme-konut-insaati",
    title: "Betonarme Konut İnşaatı",
    group: "Betonarme Konut İnşaatı",
    summary:
      "Kaba inşaat, kalıp-demir ekipleri ve malzeme tedarikinin tek merkezden yönetimi.",
    body: [
      "Betonarme konut projelerinizin kaba inşaat süreçlerini, kendi bünyemizde bulunan deneyimli kalıp ve demir ekiplerimiz ile profesyonel, planlı ve yüksek kalite standartlarında yürütüyoruz.",
      "Projenin ihtiyaçlarına yönelik inşaat demiri ve beton tedarikini de kendi bünyemizden organize ederek, uygulama ve malzeme tedariğini tek bir merkezden yönetiyoruz. Bu sayede iş süreçlerinde koordinasyonu güçlendiriyor, zaman ve maliyet avantajı sağlıyor, projenizin güvenli ve sorunsuz şekilde ilerlemesine katkı sunuyoruz.",
      "Kalıp, demir, beton ve kaba inşaat süreçlerinde uçtan uca profesyonel çözüm sunuyoruz.",
    ],
    image:
      "https://images.unsplash.com/photo-1541976590-713941681591?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "celik-ev",
    title: "Çelik Ev",
    group: "Çelik Ev",
    summary:
      "Hızlı kurulum, yüksek dayanım ve modern tasarıma sahip çelik konut çözümleri.",
    body: [
      "Hızlı kurulum, yüksek dayanım ve modern tasarıma sahip çelik konut çözümleri üretiyoruz.",
      "CFS hafif çelik sistemleriyle kurgulanan çelik evler; deprem, rüzgar ve kar yüklerine göre hesaplanır. Fabrika ortamında üretilen taşıyıcı sistem, sahada kısa sürede monte edilir; kuru inşaat prensibiyle şantiye süresi ve çevresel etki azalır.",
      "Düzce üretim tesislerimizden çıkan çelik evler; konut, villa ve toplu yerleşim projelerinde hafif, dayanıklı ve enerji verimli bir alternatif sunar.",
    ],
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "etriye-ciroz",
    title: "Etriye / Çiroz Satışı",
    group: "Etriye / Çiroz Satışı",
    summary: "24 saat kesintisiz otomatik üretim ile ölçüye özel etriye ve çiroz.",
    body: [
      "Tam otomatik etriye üretim makinemiz ile 24 saat kesintisiz üretim gerçekleştirerek, inşaat projelerinizin ihtiyaç duyduğu etriye ve çirozları yüksek kalite ve standartlarda üretiyoruz.",
      "Otomatik üretim sistemimiz sayesinde üretim sürecini hızlandırıyor ve saha koşullarından kaynaklanabilecek zaman kayıplarının önüne geçiyoruz. Üretim sürecimizin hassas ve kontrollü yapısı sayesinde demir zayiatını minimum seviyeye indiriyor ve maksimum verimlilik sağlıyoruz.",
      "Projenizin ihtiyaçlarına göre istenilen ölçü ve adetlerde üretim gerçekleştiriyor, siparişlerinizi doğrudan şantiyenize veya belirttiğiniz adrese teslim ediyoruz.",
    ],
    image:
      "https://images.unsplash.com/photo-1531834685032-c34bf0d84c77?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "c-m-celik-profil",
    title: "C ve M Çelik Profil Satışı",
    group: "C ve M Çelik Profil Satışı",
    summary:
      "Endüstriyel ve CFS uygulamaları için C ve M soğuk şekillendirilmiş çelik profiller.",
    body: [
      "C ve M çelik profil satış bölümümüzde, soğuk şekillendirilmiş yapı profillerini proje ölçülerine göre tedarik ediyoruz.",
      "C profiller taşıyıcı duvar ve döşeme sistemlerinde; M profiller ise CFS ve hafif çelik uygulamalarında tamamlayıcı eleman olarak kullanılır. Galvaniz kaplamalı profiller, korozyon direnci ve montaj hızı gerektiren endüstriyel ve konut projelerinde tercih edilir.",
      "Üretim tesisimizden şantiye teslimine kadar ölçü, adet ve sevkiyatı tek elden planlıyoruz.",
    ],
    image:
      "https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "treyler",
    title: "Treyler",
    group: "Treyler",
    summary:
      "Özgün tasarımlı treyler üretimi: sal, damper ve LPG tanker grupları.",
    body: [
      "Özgün tasarımlara sahip treyler üretimiyle endüstriyel taşımacılık ihtiyaçlarına yüksek kaliteyle cevap veriyoruz.",
      "Sal grubu, damper grubu ve LPG tankerleri olmak üzere üç ana ürün ailesinde; şasi dayanımı, yük güvenliği ve saha koşullarına uygun özel üretim sunuyoruz.",
    ],
    image:
      "https://images.unsplash.com/photo-1566576721346-d4a3b4eaeb55?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "sal-grubu",
    title: "Sal Grubu",
    group: "Treyler",
    summary: "Ağır yük ve lojistik taşımacılığı için sal tipi treyler üretimi.",
    body: [
      "Sal grubu treylerlerimiz, uzun ve ağır yüklerin güvenli taşınması için projelendirilir.",
      "Şasi geometrisi, dingil yerleşimi ve zemin detayları müşteri operasyonuna göre özelleştirilir; üretim Düzce tesislerimizde gerçekleştirilir.",
    ],
    image:
      "https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "damper-grubu",
    title: "Damper Grubu",
    group: "Treyler",
    summary: "Dökme yük ve saha lojistiği için damper treyler çözümleri.",
    body: [
      "Damper grubu, dökme malzeme ve şantiye lojistiğinde hızlı boşaltma ihtiyacına göre üretilir.",
      "Gövde dayanımı, hidrolik sistem uyumu ve ağır hizmet koşulları esas alınarak her ünite ölçüye özel kurgulanır.",
    ],
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=1600&q=80",
  },
  {
    slug: "lpg-tankerleri",
    title: "LPG Tankerleri",
    group: "Treyler",
    summary: "LPG taşımacılığına yönelik tanker treyler üretimi.",
    body: [
      "LPG tankerleri, tehlikeli madde taşımacılığının gerektirdiği güvenlik ve sızdırmazlık kriterlerine göre üretilir.",
      "Tanker geometrisi, şasi bağlantısı ve donanım yerleşimi proje şartnamesine uygun şekilde teslim edilir.",
    ],
    image:
      "https://images.unsplash.com/photo-1580674285054-bed31e145f59?auto=format&fit=crop&w=1600&q=80",
  },
];

export const productNav = [
  {
    label: "Endüstriyel Yapı Sistemleri",
    items: [
      { href: "/urunler/endustriyel-celik-yapilar", label: "Endüstriyel Çelik Yapılar" },
      { href: "/urunler/cfs-hafif-celik-depolar", label: "CFS Hafif Çelik Depolar" },
      { href: "/urunler/hibrit-beton-yapilar", label: "Hibrit Beton Yapılar" },
    ],
  },
  {
    label: "Betonarme Konut İnşaatı",
    items: [{ href: "/urunler/betonarme-konut-insaati", label: "Kaba İnşaat ve Malzeme Tedariği" }],
  },
  {
    label: "Çelik Ev",
    items: [{ href: "/urunler/celik-ev", label: "Çelik Ev" }],
  },
  {
    label: "Etriye / Çiroz Satışı",
    items: [{ href: "/urunler/etriye-ciroz", label: "Etriye / Çiroz" }],
  },
  {
    label: "C ve M Çelik Profil Satışı",
    items: [{ href: "/urunler/c-m-celik-profil", label: "C ve M Çelik Profil" }],
  },
  {
    label: "Treyler",
    items: [
      { href: "/urunler/treyler", label: "Treyler" },
      { href: "/urunler/sal-grubu", label: "Sal Grubu" },
      { href: "/urunler/damper-grubu", label: "Damper Grubu" },
      { href: "/urunler/lpg-tankerleri", label: "LPG Tankerleri" },
    ],
  },
];

export const homeProducts = products.filter((p) =>
  [
    "endustriyel-celik-yapilar",
    "cfs-hafif-celik-depolar",
    "hibrit-beton-yapilar",
    "betonarme-konut-insaati",
    "celik-ev",
    "etriye-ciroz",
    "c-m-celik-profil",
    "treyler",
  ].includes(p.slug),
);

export function getProduct(slug: string) {
  return products.find((item) => item.slug === slug);
}

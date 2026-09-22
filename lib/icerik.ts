import { promises as fs } from "fs";
import path from "path";
import type { Faq, Genel, Product } from "@/constants/content";
import { faqs, genelVarsayilan, products } from "@/constants/content";

async function oku<T>(ad: string, varsayilan: T): Promise<T> {
  const yol = path.join(process.cwd(), "data", ad);
  try {
    return JSON.parse(await fs.readFile(yol, "utf8")) as T;
  } catch {
    await fs.mkdir(path.dirname(yol), { recursive: true });
    await fs.writeFile(yol, `${JSON.stringify(varsayilan, null, 2)}\n`);
    return varsayilan;
  }
}

async function yaz<T>(ad: string, veri: T) {
  const yol = path.join(process.cwd(), "data", ad);
  await fs.mkdir(path.dirname(yol), { recursive: true });
  await fs.writeFile(yol, `${JSON.stringify(veri, null, 2)}\n`);
}

export async function genelOku() {
  return oku<Genel>("genel.json", genelVarsayilan);
}

export async function genelYaz(veri: Genel) {
  await yaz("genel.json", veri);
}

export async function urunleriOku() {
  return oku<Product[]>("urunler.json", products);
}

export async function urunleriYaz(veri: Product[]) {
  await yaz("urunler.json", veri);
}

export async function urunBul(slug: string) {
  const liste = await urunleriOku();
  return liste.find((item) => item.slug === slug);
}

export async function sssOku() {
  return oku<Faq[]>("sss.json", faqs);
}

export async function sssYaz(veri: Faq[]) {
  await yaz("sss.json", veri);
}

const ANA_SAYFA_SLUG = [
  "endustriyel-celik-yapilar",
  "cfs-hafif-celik-depolar",
  "hibrit-beton-yapilar",
  "betonarme-konut-insaati",
  "celik-ev",
  "etriye-ciroz",
  "c-m-celik-profil",
  "treyler",
];

export function anaSayfaUrunleri(liste: Product[]) {
  const isaretli = liste.filter((urun) => urun.anaSayfa);
  if (isaretli.length) return isaretli;
  return liste.filter((urun) => ANA_SAYFA_SLUG.includes(urun.slug));
}

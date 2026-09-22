import { promises as fs } from "fs";
import path from "path";
import type { Reference } from "@/constants/content";
export { slugYap } from "@/lib/slug";

const dosyaYolu = path.join(process.cwd(), "data", "referanslar.json");

export async function referanslariOku(): Promise<Reference[]> {
  const ham = await fs.readFile(dosyaYolu, "utf8");
  return JSON.parse(ham) as Reference[];
}

export async function referanslariYaz(liste: Reference[]) {
  await fs.writeFile(dosyaYolu, `${JSON.stringify(liste, null, 2)}\n`, "utf8");
}

export async function referansBul(slug: string) {
  const liste = await referanslariOku();
  return liste.find((item) => item.slug === slug);
}

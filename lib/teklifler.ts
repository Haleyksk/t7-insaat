import { promises as fs } from "fs";
import path from "path";
import type { Teklif } from "@/lib/teklif-tip";

const yol = path.join(process.cwd(), "data", "teklifler.json");

export async function teklifleriOku(): Promise<Teklif[]> {
  try {
    return JSON.parse(await fs.readFile(yol, "utf8")) as Teklif[];
  } catch {
    await fs.writeFile(yol, "[]\n");
    return [];
  }
}

export async function teklifKaydet(kayit: Teklif) {
  const liste = await teklifleriOku();
  liste.unshift(kayit);
  await fs.writeFile(yol, `${JSON.stringify(liste, null, 2)}\n`);
}

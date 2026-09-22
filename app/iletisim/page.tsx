import type { Metadata } from "next";
import IletisimForm from "@/components/IletisimForm";
import { telefonLink } from "@/constants/content";
import { genelOku } from "@/lib/icerik";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "İletişim",
  description: "T7 İnşaat teklif ve iletişim.",
};

export default async function IletisimPage() {
  const genel = await genelOku();

  return (
    <main className="pt-28 lg:pt-32">
      <section className="container grid gap-12 py-16 lg:grid-cols-2 lg:py-24">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.32em] text-brand-mint">İletişim</p>
          <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white">Teklif ve proje görüşmesi</h1>
          <p className="mt-6 max-w-md text-sm leading-relaxed text-zinc-400">
            Üretim, uygulama ve teslimat süreçlerini {genel.location} tesisimizden yönetiyoruz. Ölçü, kapasite ve teslim
            tarihi için bize yazın.
          </p>
          <dl className="mt-10 space-y-6">
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Telefon</dt>
              <dd className="mt-1 text-lg text-white">
                <a href={telefonLink(genel.phone)}>{genel.phone}</a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">E-posta</dt>
              <dd className="mt-1 text-lg text-white">
                <a href={`mailto:${genel.email}`}>{genel.email}</a>
              </dd>
            </div>
            <div>
              <dt className="text-[11px] uppercase tracking-[0.16em] text-zinc-500">Tesis</dt>
              <dd className="mt-1 text-lg text-white">
                {genel.location} · {genel.area}
              </dd>
            </div>
          </dl>
        </div>

        <IletisimForm />
      </section>
    </main>
  );
}

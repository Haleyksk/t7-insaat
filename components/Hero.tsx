/** Ana sayfanın ilk ekranı: tam ekran video ve üstüne binen vaat slaytı. */
import type { Genel } from "@/constants/content";
import HeroVaatler from "@/components/HeroVaatler";

export default function Hero({ genel }: { genel: Genel }) {
  return (
    <section className="relative isolate h-[100svh] min-h-[40rem] overflow-hidden">
      <HeroVaatler etiket={genel.heroUst} />
    </section>
  );
}

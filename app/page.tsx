import Hero from "@/components/Hero";
import AboutTeaser from "@/components/AboutTeaser";
import ProductGrid from "@/components/ProductGrid";
import FeaturedProjects from "@/components/FeaturedProjects";
import Faq from "@/components/Faq";
import { referanslariOku } from "@/lib/referanslar";
import { anaSayfaUrunleri, genelOku, sssOku, urunleriOku } from "@/lib/icerik";

export const revalidate = 60;

export default async function Home() {
  const [referanslar, genel, urunler, sss] = await Promise.all([
    referanslariOku(),
    genelOku(),
    urunleriOku(),
    sssOku(),
  ]);

  return (
    <main>
      <Hero genel={genel} />
      <FeaturedProjects referanslar={referanslar} />
      <AboutTeaser genel={genel} />
      <ProductGrid urunler={anaSayfaUrunleri(urunler)} />
      <Faq sorular={sss} />
    </main>
  );
}

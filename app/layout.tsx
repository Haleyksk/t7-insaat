import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { urunMenu } from "@/constants/content";
import { genelOku, urunleriOku } from "@/lib/icerik";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-inter",
});

export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL("https://t7insaat.com"),
  title: {
    default: "T7 İnşaat | Çelik Yapı, CFS ve Treyler",
    template: "%s | T7 İnşaat",
  },
  description:
    "Düzce’de 42.000 m² üretim tesisiyle endüstriyel çelik yapılar, CFS hafif çelik depolar, hibrit beton, betonarme konut, çelik ev, etriye/çiroz, C-M profil ve treyler.",
  icons: {
    icon: [{ url: "/icon.png", type: "image/png" }],
    apple: [{ url: "/apple-icon.png" }],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [genel, urunler] = await Promise.all([genelOku(), urunleriOku()]);
  const menu = urunMenu(urunler);

  return (
    <html lang="tr" className={inter.variable}>
      <body className={`${inter.className} bg-brand-dark text-zinc-100 antialiased`}>
        <Header menu={menu} />
        {children}
        <Footer genel={genel} menu={menu} />
      </body>
    </html>
  );
}

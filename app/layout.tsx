import type { Metadata, Viewport } from "next";
import { Bodoni_Moda, Cormorant_Garamond, Jost, Readex_Pro } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { CartProvider } from "@/components/cart";
import { MotionProvider } from "@/components/motion";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { WhatsAppButton } from "@/components/whatsapp-button";
import { site } from "@/lib/config";
import "lenis/dist/lenis.css";
import "./globals.css";

const readex = Readex_Pro({ variable: "--font-readex", subsets: ["arabic", "latin"] });
const bodoni = Bodoni_Moda({ variable: "--font-bodoni", subsets: ["latin"] });
const cormorant = Cormorant_Garamond({ variable: "--font-cormorant", subsets: ["latin"], weight: ["400", "500"] });
const jost = Jost({ variable: "--font-jost", subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "فَخْم | FAKHM Perfumes",
    template: "%s | فَخْم FAKHM",
  },
  description: "فَخْم — عطور مصرية فاخرة. Scent of Distinction.",
  openGraph: { siteName: "FAKHM Perfumes", locale: "ar_EG", type: "website" },
};

export const viewport: Viewport = { themeColor: "#0a1f1a" };

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${readex.variable} ${bodoni.variable} ${cormorant.variable} ${jost.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <MotionProvider>
          <CartProvider>
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
            <WhatsAppButton />
          </CartProvider>
        </MotionProvider>
        <Analytics />
      </body>
    </html>
  );
}

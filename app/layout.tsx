import type { Metadata } from "next";
import { Caveat, Onest, Unbounded } from "next/font/google";
import "./globals.css";
import SiteHeader from "@/components/site-header";
import SiteFooter from "@/components/site-footer";

const body = Onest({ subsets: ["latin", "cyrillic"], variable: "--ff-body" });
const display = Unbounded({
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500"],
  variable: "--ff-display",
});

// Рукописный шрифт «как перьевой ручкой» для второстепенных заголовков.
const hand = Caveat({ subsets: ["latin", "cyrillic"], variable: "--ff-hand" });

export const metadata: Metadata = {
  title: {
    default: "ЖК «Уникум на Амирхана» — квартиры в Казани",
    template: "%s — ЖК «Уникум на Амирхана»",
  },
  description:
    "Квартиры в ЖК «Уникум на Амирхана» в Ново-Савиновском районе Казани: цены, планировки, акции, ипотека, отзывы и бесплатная консультация.",
  referrer: "strict-origin-when-cross-origin",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru" className={`${body.variable} ${display.variable} ${hand.variable}`}>
      <body className="min-h-screen flex flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:z-50 focus:m-2 focus:rounded focus:bg-cocoa focus:px-3 focus:py-2 focus:text-paper"
        >
          К содержанию
        </a>
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}

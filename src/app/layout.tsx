import type { Metadata } from "next";
import { Tenor_Sans, Figtree } from "next/font/google";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { ScrollToTop } from "@/shared/ui/ScrollToTop";
import "./globals.css";

const tenorSans = Tenor_Sans({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: "400",
});

const figtree = Figtree({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Purpose Space Realtors",
  description: "Property listings by Purpose Space Realtors.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${tenorSans.variable} ${figtree.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <Header />
        {children}
        <Footer />
        <ScrollToTop />
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Tenor_Sans, Figtree } from "next/font/google";
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
      <body className="min-h-full">{children}</body>
    </html>
  );
}

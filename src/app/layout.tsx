import type { Metadata } from "next";
import { Rethink_Sans, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

const rethinkSans = Rethink_Sans({
  variable: "--font-rethink-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const nohemi = localFont({
  src: "./_fonts/nohemi.ttf",
  variable: "--font-nohemi",
});

export const metadata: Metadata = {
  title: {
    default: "Recommand Docs",
    template: "%s - Recommand Docs",
  },
  description: "Documentation for the Recommand Peppol API",
  metadataBase: new URL("https://docs.recommand.eu"),
  openGraph: {
    siteName: "Recommand Docs",
    type: "website",
    locale: "en_BE",
    images: ["/rcmd-opengraph.jpg"],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/rcmd-opengraph.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${rethinkSans.variable} ${nohemi.variable} ${geistMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Inter_Tight, Inter, Anton } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";

const interTight = Inter_Tight({
  subsets: ["latin"],
  variable: "--font-inter-tight",
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["400", "500", "600", "700"],
});

const anton = Anton({
  subsets: ["latin"],
  variable: "--font-anton",
  weight: ["400"],
});

export const viewport: Viewport = {
  themeColor: "#1b4d32",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Malik Seeds — Helping Farmers Grow with Confidence",
  description:
    "Malik Seeds has been empowering farmers with high-quality seed varieties since 1969. Discover our products, success stories, and agricultural innovations.",
  manifest: "/favicons/site.webmanifest",
  icons: {
    icon: [
      {
        url: "/favicons/favicon-16x16.png",
        sizes: "16x16",
        type: "image/png",
      },
      {
        url: "/favicons/favicon-32x32.png",
        sizes: "32x32",
        type: "image/png",
      },
    ],
    apple: [
      {
        url: "/favicons/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
    shortcut: "/favicons/favicon.ico",
  },
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${anton.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <Navbar />
        <main className="relative flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}

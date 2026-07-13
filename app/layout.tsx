import type { Metadata, Viewport } from "next";
import { Inter_Tight, Inter, Anton, Stack_Sans_Notch } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/sections/Footer";
import { homepageApi } from "@/lib/api";
import LenisProvider from "@/components/LenisProvider";
import "lenis/dist/lenis.css";

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

const stackSansNotch = Stack_Sans_Notch({
  subsets: ["latin"],
  variable: "--font-stack-sans-notch",
  weight: ["200", "300", "400", "500", "600", "700"],
});

export const viewport: Viewport = {
  themeColor: "#1b4d32",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "Malik Seeds - Helping Farmers Grow with Confidence",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let brands: { name: string; description: string; href: string }[] = [];
  try {
    const data = await homepageApi.getServices({ revalidate: 60 });
    if (data && data.length > 0) {
      brands = data.map((s) => ({
        name: s.title,
        description: s.description,
        href: s.link,
      }));
    }
  } catch (err) {
    console.error("Failed to fetch navbar brands on server:", err);
  }

  return (
    <html
      lang="en"
      className={`${interTight.variable} ${inter.variable} ${anton.variable} ${stackSansNotch.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col">
        <LenisProvider>
          <Navbar brands={brands} />
          <main className="relative flex-grow">{children}</main>
          <Footer />
        </LenisProvider>
      </body>
    </html>
  );
}

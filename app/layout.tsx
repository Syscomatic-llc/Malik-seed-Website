import type { Metadata } from "next";
import { Inter_Tight, Inter, Anton } from "next/font/google";
import "./globals.css";

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

export const metadata: Metadata = {
  title: "Malik Seeds — Helping Farmers Grow with Confidence",
  description:
    "Malik Seeds has been empowering farmers with high-quality seed varieties since 1969. Discover our products, success stories, and agricultural innovations.",
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
    >
      <body className="flex min-h-full flex-col">{children}</body>
    </html>
  );
}

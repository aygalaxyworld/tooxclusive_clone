import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import Footer from "./components/Footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

type ExtendedMetadata = Metadata & {
  robots: string;
};

export const metadata: ExtendedMetadata = {
  title: "Music Platform UI System",
  description:
    "Music Content Platform with responsive UI, reusable components, API-driven music posts, authentication, and admin uploads.",
  authors: [{ name: "Music Platform Team" }],
  robots:
    "follow, index, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}

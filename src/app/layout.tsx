import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import FlickeringGrid from "@/components/bg";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "All Events - todos los eventos del ecosistema en un solo sitio",
  description:
    "Todos los eventos del ecosistema emprendedor peruano en un solo sitio, si no encuentras uno, añadelo!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FlickeringGrid
          className="fixed top-0 left-0 w-full h-screen -z-50"
          squareSize={4}
          gridGap={6}
          color="#6B7280"
          maxOpacity={0.5}
          flickerChance={0.1}
        />
        {children}
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Providers } from "./providers";
import StoreProvider from "./StoreProvider";

import NavBar from "@/components/navBar/NavBar";

import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VIDEOGAMES",
  description: "Page that render videogames cards by RAWG API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <StoreProvider>
          <header>
            <NavBar />
          </header>
          <Providers>
            <main className="mx-5 mt-3">{children}</main>
          </Providers>
          <footer></footer>
        </StoreProvider>
      </body>
    </html>
  );
}

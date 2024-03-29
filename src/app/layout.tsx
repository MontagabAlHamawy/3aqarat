import type { Metadata } from "next";
// import { Inter } from "next/font/google";
import "./globals.css";
import Sidpar from "./components/Sidpar";
import MobileSidpar from "./components/mobileSidpar";
import Footer from "./components/Footer";
import Header from "./components/Header";
import { Analytics } from "@vercel/analytics/react";
import { Cairo } from "next/font/google";

const cairo = Cairo({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "3aqarat",
  description: "موقع عقاري",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cairo.className}>
      
      <body className={cairo.className}>
        <div>
          <Header />
          <div className="hidden xl:block">
            <Sidpar />
          </div>
          <div className="block xl:hidden">
            <MobileSidpar />
          </div>
          <div className="wrapper min-h-[71vh] md:min-h-[68vh] xl:min-h-[82.5vh] py-10 xl:pr-20 xl:pt-10">
            {children}
            <Analytics />
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}

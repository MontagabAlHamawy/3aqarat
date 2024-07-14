import type { Metadata } from "next";

import "react-toastify/dist/ReactToastify.css";
import "./globals.css";
import Sidpar from "../components/component/Sidpar";
import MobileSidpar from "../components/component/mobileSidpar";
import Footer from "../components/component/Footer";
import Header from "../components/component/Header";
import { Analytics } from "@vercel/analytics/react";
import { Cairo } from "@next/font/google";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";

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
          <ToastContainer
            stacked
            theme="dark"
            position="top-left"
            className=" mt-14"
          />
          <div className="wrapper min-h-[71vh] md:min-h-[68vh] xl:min-h-[84.3vh] py-10 xl:pr-20 xl:pt-10">
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

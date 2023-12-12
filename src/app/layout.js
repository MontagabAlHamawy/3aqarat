import { Inter } from "next/font/google";
import "./globals.css";
import Head from "next/head";
import Sidpar from "./components/Sidpar";
import Footer from "./components/Footer";
import Header from "./components/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "3aqarat",
  description: "",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* تحديد أيقونة الموقع هنا */}
        <link rel="icon" href="/icon.png" />
      </Head>
      <body className={inter.className}>
        <div>
          {/* <Header /> */}
          <Sidpar />
          <div className="wrapper min-h-[100vh] xl:min-h-[92vh] py-10 xl:pr-20 xl:pt-10">
            {children}
          </div>
          <Footer />
        </div>
      </body>
    </html>
  );
}

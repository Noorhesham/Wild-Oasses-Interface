import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";
import Header from "./components/Header";
import { ReservationProvider } from "./components/ReservationContext";

const Josefin = Josefin_Sans({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "The Wild Oasis ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${Josefin.className} antialiased bg-primary-950 text-primary-100 flex flex-col min-h-screen `}>
        <Header />
        <div className=" grid px-8 py-12">
          <main className=" w-full max-w-7xl mx-auto">
            <ReservationProvider>{children}</ReservationProvider>
          </main>
        </div>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import 'bootstrap/dist/css/bootstrap.css';
import BootstrapClient from "./Components/BootstrapClient";
import  AppWrapper from "@/context"
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogify",
  description: "Hedy Software",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <AppWrapper>
      <Navbar />
      {children}
      {/* <Footer /> */}
      <BootstrapClient />
      </AppWrapper>
      </body>
    </html>
  );
}

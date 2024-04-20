import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavbarBlog from "../Components/NavbarBlog";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blogify",
  description: "Hedy Software",
};

export default function BlogLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <NavbarBlog />
      <main>
          {children}
      </main>
    </div>
  );
}

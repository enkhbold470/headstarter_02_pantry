import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { SquigglyUnderline } from "@/components/navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pantry App",
  description: "A simple pantry app to keep track of your groceries.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} dark:bg-black bg-white dark:text-white text-black`}
      >
        <nav>
          <SquigglyUnderline />
        </nav>
        {children}
      </body>
    </html>
  );
}

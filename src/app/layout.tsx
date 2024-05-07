import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ViewportSizeProvider } from "@/contexts/ViewportSize";
import { Inter as FontSans } from "next/font/google";
import { cn } from "@/lib/utils";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "gTalk",
  description: "A chat app made using Next.js 14 and inspired by WhatsApp.",
};

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ViewportSizeProvider>{children}</ViewportSizeProvider>
      </body>
    </html>
  );
}

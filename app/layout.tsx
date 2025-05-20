import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthButtons } from "@/Components/auth/login/logout";
import { Flame } from "lucide-react";
import Link from "next/link";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Conqueror",
  description: "Conqueror",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <nav className="fixed top-0 left-0 w-full flex justify-between items-center p-4 gap-4 h-16 bg-white shadow-md z-50">
            <Link href="/home">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="p-2 bg-white/10 rounded-lg">
                <Flame className="h-6 w-6 text-blue-600" />
              </div>
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-green-600">
                Conqueror
              </h2>
            </div>
            </Link>
            <div>
              <AuthButtons />
            </div>
          </nav>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/sidebar";
import { MobileNav } from "@/components/mobile-nav";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Airbnb Management",
  description: "Gestión ejecutiva de alquileres temporarios",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col md:flex-row`}>
        <MobileNav />
        <Sidebar />
        <div className="flex w-full flex-col md:pl-64">
          <main className="flex-1 space-y-4 p-4 md:p-8 md:pt-6">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}

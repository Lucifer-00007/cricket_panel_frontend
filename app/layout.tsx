import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Sidebar } from "@/components/dashboard/sidebar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Cricket Panel | Dashboard",
  description: "Live cricket match tracking dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const sites = ['Crickbuzz', 'Espn', 'NW18', 'Sportskeeda']

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex min-h-screen">
          <Sidebar sites={sites} />
          <main className="flex-1 p-6 md:p-8 overflow-auto">
            {children}
            <footer className="mt-12 text-center text-sm text-muted-foreground border-t pt-6">
              Created With 🧡 By Lucifer
            </footer>
          </main>
        </div>
      </body>
    </html>
  );
}

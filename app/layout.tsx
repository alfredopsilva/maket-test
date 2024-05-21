import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/context/ThemeProvider";
const inter = Inter({ subsets: ["latin"] });
import { AuthProvider } from "@/context/AuthProvider";
export const metadata: Metadata = {
  title: "Maket AI - Home Assessment Test",
  description: "Test created for Maket AI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}

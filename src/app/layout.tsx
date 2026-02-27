import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "BKS Kitchens & Cupboards | Pretoria North",
    template: "%s | BKS Kitchens & Cupboards",
  },
  description:
    "BKS Kitchens & Cupboards designs and furnishes premium kitchens and built-in cupboards in Pretoria North. Get a tailored quote and view our recent work.",
  metadataBase: new URL("https://bks-kitchens-and-cupboards.vercel.app"),
  openGraph: {
    title: "BKS Kitchens & Cupboards",
    description:
      "Premium kitchen and cupboard design, fabrication and installation in Pretoria North.",
    type: "website",
    locale: "en_ZA",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-ZA" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-dvh bg-background text-foreground antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

import type { Metadata } from "next";
import { Geist, Geist_Mono, Noto_Sans_Bengali } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const notoBengali = Noto_Sans_Bengali({
  variable: "--font-noto-bengali",
  subsets: ["bengali"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "বাংলাদেশ জাতীয় তথ্য বাতায়ন | Bangladesh National Portal",
  description:
    "গণপ্রজাতন্ত্রী বাংলাদেশ সরকারের অফিসিয়াল জাতীয় তথ্য বাতায়ন - The official national portal of the Government of the People's Republic of Bangladesh.",
  keywords: [
    "Bangladesh",
    "বাংলাদেশ",
    "National Portal",
    "জাতীয় তথ্য বাতায়ন",
    "Government of Bangladesh",
    "বাংলাদেশ সরকার",
    "E-Services",
    "ই-সেবা",
  ],
  authors: [{ name: "Government of Bangladesh" }],
  icons: {
    icon: "/logo.svg",
  },
  openGraph: {
    title: "বাংলাদেশ জাতীয় তথ্য বাতায়ন | Bangladesh National Portal",
    description:
      "The official national portal of the Government of the People's Republic of Bangladesh.",
    siteName: "Bangladesh National Portal",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="bn" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${notoBengali.variable} font-bengali antialiased bg-background text-foreground`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}

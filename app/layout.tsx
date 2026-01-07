import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import Script from "next/script";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChatBot from "@/components/ChatBot";
import { ThemeProvider } from "@/components/ThemeProvider";
import "./globals.css";

const outfit = Outfit({
  variable: "--font-outfit",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Lahiru Cooray | Robotics, AI & Software Engineering",
  description: "Portfolio of Lahiru Cooray - Electronic & Telecommunication Engineering undergraduate at University of Moratuwa. Passionate about robotics, machine learning, and DevOps.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-2J71SV6P0B"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-2J71SV6P0B');
          `}
        </Script>
      </head>
      <body
        className={`${outfit.variable} font-sans antialiased min-h-screen flex flex-col`}
      >
        <ThemeProvider>
          <Navbar />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
          <ChatBot />
        </ThemeProvider>
      </body>
    </html>
  );
}

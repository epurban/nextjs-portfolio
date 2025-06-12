import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/Nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";
import { ThemeProvider } from "./components/ThemeProvider";
import Head from "next/head";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `Edward Urban`,
    template: `%s | Edward Urban`,
  },
  description: "Senior software engineer passionate about creating high quality user experiences and performant applications.",
  openGraph: {
    title: "Edward Urban",
    description: "Senior software engineer passionate about creating high quality user experiences and performant applications.",
    url: baseUrl,
    siteName: "Edward Urban",
    locale: "en_US",
    type: "website",
    images: [{ url: "/avatar.jpeg" }],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={cx("text-black bg-white dark:text-white dark:bg-black", GeistSans.variable, GeistMono.variable)} suppressHydrationWarning>
      <Head>
        {/* Basic favicons */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Apple touch icon */}
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />

        {/* Web App Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <body className="h-screen w-screen flex flex-col items-center overflow-hidden">
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <Navbar />
          <div className="flex-1 w-full overflow-y-auto">
            <main className="min-w-0 w-full flex flex-col px-2 md:px-0 pt-12">{children}</main>
          </div>
          <Analytics />
          <SpeedInsights />
        </ThemeProvider>
      </body>
    </html>
  );
}

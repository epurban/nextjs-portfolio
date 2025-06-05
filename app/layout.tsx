import "./global.css";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: `Edward Urban's Portfolio`,
    template: `%s | Edward Urban's Portfolio`,
  },
  description: "Senior software engineer passionate about creating high quality user experiences and performant applications.",
  openGraph: {
    title: "Edward Urban's Portfolio",
    description: "Senior software engineer passionate about creating high quality user experiences and performant applications.",
    url: baseUrl,
    siteName: "Edward Urban's Portfolio",
    locale: "en_US",
    type: "website",
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
    <html lang="en" className={cx("text-black bg-white dark:text-white dark:bg-black", GeistSans.variable, GeistMono.variable)}>
      <body className="antialiased max-w-xl mx-4 lg:mx-auto min-h-screen overflow-hidden flex flex-col">
        <main className="flex-1 min-w-0 flex flex-col px-2 md:px-0">
          <Navbar />
          {children}
          <Analytics />
          <SpeedInsights />
        </main>
      </body>
    </html>
  );
}

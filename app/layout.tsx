import "./global.css";
import type { Metadata, Viewport } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Navbar } from "./components/Nav";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { baseUrl } from "./sitemap";
import { ThemeProvider } from "./components/ThemeProvider";
import { ViewTransitions } from "next-view-transitions";

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
    siteName: "Edward Urban's Portfolio",
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
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: { url: "/apple-touch-icon.png", sizes: "180x180" },
  },
  manifest: "/site.webmanifest",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#252525" },
  ],
};

const cx = (...classes) => classes.filter(Boolean).join(" ");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <ViewTransitions>
      <html lang="en" className={cx("text-black bg-white dark:text-white dark:bg-black", GeistSans.variable, GeistMono.variable)} suppressHydrationWarning>
        <body className="h-screen w-screen flex flex-col items-center overflow-hidden">
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Navbar />
            <div className="flex-1 w-full overflow-y-auto">
              <main className="min-w-0 w-full flex flex-col px-2 md:px-0 pt-12" style={{ viewTransitionName: "page-content" }}>
                {children}
              </main>
            </div>
            <Analytics />
            <SpeedInsights />
          </ThemeProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}

import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";

import { profile } from "~/data/resume";

export const metadata: Metadata = {
  metadataBase: new URL(profile.websiteUrl),
  title: {
    default: `${profile.name} — ${profile.title}`,
    template: `%s | ${profile.name}`,
  },
  description:
    "Senior Software Engineer specializing in backend development and system design for FinTech, banking, and crypto — Go, Kafka, Kubernetes, and full-stack delivery.",
  keywords: [
    "Natthawat Narin",
    "Senior Software Engineer",
    "Backend Developer",
    "Golang",
    "FinTech",
    "Bangkok",
  ],
  authors: [{ name: profile.name, url: profile.websiteUrl }],
  openGraph: {
    type: "profile",
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
    url: profile.websiteUrl,
    siteName: profile.name,
    images: [
      { url: profile.avatar, width: 400, height: 400, alt: profile.name },
    ],
  },
  twitter: {
    card: "summary",
    title: `${profile.name} — ${profile.title}`,
    description: profile.tagline,
  },
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "apple-touch-icon", url: "/apple-touch-icon.png" },
  ],
};

export const viewport: Viewport = {
  themeColor: "#05070d",
  width: "device-width",
  initialScale: 1,
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        {/* Marks the document as scripted before first paint, which is what
            arms the scroll-reveal styles. Without JS, content just shows.
            The second flag releases the hero entrance once the mascot splash
            has lifted; it lives here, not in React, so the page still animates
            if hydration never happens. */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              `document.documentElement.classList.add('js');` +
              `setTimeout(function(){document.documentElement.classList.add('splash-done')},2100)`,
          }}
        />
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}

import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope, JetBrains_Mono } from "next/font/google";
import { Suspense } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import "./globals.css";

const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  display: "swap",
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-mono-jb",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://timewastecalc.com"),
  title: "TimeWasteCalc — how much of your life are you burning?",
  description:
    "A friendly calculator that turns your daily habits into years. Honest numbers, soft delivery.",
  applicationName: "TimeWasteCalc",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "TimeWasteCalc",
  },
  formatDetection: { telephone: false },
  openGraph: {
    title: "TimeWasteCalc — how much of your life are you burning?",
    description: "Find out in 30 seconds. No login, no tracking, no judgment.",
    siteName: "TimeWasteCalc",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "TimeWasteCalc",
    description: "How much of your life are you actually burning?",
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF8E7",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${manrope.variable} ${mono.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('twc:theme:v1');var resolved=(t==='dark'||t==='light')?t:(matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');document.documentElement.setAttribute('data-theme',resolved);if(t==='system'||!t){document.documentElement.setAttribute('data-theme-mode','system')}var c=resolved==='dark'?'#10131c':'#FFF8E7';document.querySelectorAll('meta[name=\"theme-color\"]').forEach(function(el){el.setAttribute('content',c)});matchMedia('(prefers-color-scheme: dark)').addEventListener('change',function(e){var stored=localStorage.getItem('twc:theme:v1');if(!stored||stored==='system'){var nv=e.matches?'dark':'light';document.documentElement.setAttribute('data-theme',nv);document.querySelectorAll('meta[name=\"theme-color\"]').forEach(function(el){el.setAttribute('content',e.matches?'#10131c':'#FFF8E7')})}})}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <Suspense fallback={null}>
          <NuqsAdapter>{children}</NuqsAdapter>
        </Suspense>
      </body>
    </html>
  );
}

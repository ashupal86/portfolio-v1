import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../styles/globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ScrollToTop from "@/components/ui/ScrollToTop";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { getSiteConfig } from "@/lib/keystatic";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Ashish Pal — Full-Stack Developer & DevOps Engineer",
    template: "%s | Ashish Pal",
  },
  description:
    "Portfolio of Ashish Pal — Full-Stack Developer, DevOps Engineer & UI Architect building production-grade software.",
  keywords: ["developer", "portfolio", "full-stack", "react", "nextjs", "ashish pal", "devops"],
  authors: [{ name: "ASHISH PAL" }],
  openGraph: { 
    type: "website", 
    locale: "en_US", 
    siteName: "ASHU Portfolio",
    images: [{
      url: "/pfp.png",
      width: 800,
      height: 800,
      alt: "ASHU Portfolio"
    }]
  },
  twitter: { 
    card: "summary_large_image",
    images: ["/pfp.png"]
  },
  robots: { index: true, follow: true },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  // Fetch once at layout level — shared by Navbar + Footer across all pages
  let siteConfig = null;
  try {
    siteConfig = await getSiteConfig();
  } catch { /* use fallback data below */ }

  // Typed fallback config
  const cfg = {
    name:        siteConfig?.name        ?? "Ashish Pal",
    email:       siteConfig?.email       ?? "palbro86@gmail.com",
    githubUrl:   siteConfig?.githubUrl   ?? "https://github.com/ashupal86",
    linkedinUrl: siteConfig?.linkedinUrl ?? "https://linkedin.com/in/ashupal86",
    twitterUrl:  siteConfig?.twitterUrl  ?? "",
    footerText:  siteConfig?.footerText  ?? `© ${new Date().getFullYear()} ASHISH PAL. ALL RIGHTS RESERVED.`,
    navLinks: siteConfig?.navLinks?.length
      ? siteConfig.navLinks.map(l => ({ label: l.label, href: l.href }))
      : [
          { label: "WORK",    href: "#projects" },
          { label: "JOURNAL", href: "/blog" },
          { label: "STASH",   href: "/stash" },
          { label: "ABOUT",   href: "#about" },
          { label: "CONTACT", href: "#contact" },
        ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <LoadingScreen />
        <Navbar name={cfg.name} navLinks={cfg.navLinks} />
        <main>{children}</main>
        <Footer
          email={cfg.email}
          githubUrl={cfg.githubUrl}
          linkedinUrl={cfg.linkedinUrl}
          twitterUrl={cfg.twitterUrl}
          footerText={cfg.footerText}
        />
        <ScrollToTop />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

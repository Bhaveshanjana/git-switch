import "./globals.css";
import Provider from "../components/Provider";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { ThemeProvider } from "next-themes";
import { siteConfig } from "@/data/siteconfig";
import { Metadata } from "next";
import Img from "@/app/image.png";

export const metadata: Metadata = {
  icons: {
    icon: "/icon.svg",
  },
  keywords: siteConfig.keywords,
  title: { default: siteConfig.name, template: `%s | ${siteConfig.name}` },
  authors: [{ name: siteConfig.authors }],
  openGraph: {
    title: siteConfig.name,
    description: siteConfig.description,
    siteName: siteConfig.name,
    images: [
      {
        url: Img.src,
        width: Img.width,
        height: Img.height,
        alt: siteConfig.name,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    site: siteConfig.twitterHandle,
    images: [
      {
        url: Img.src,
        width: Img.width,
        height: Img.height,
        alt: siteConfig.name,
      },
    ],
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession(authOptions);
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Provider session={session}>{children}</Provider>
        </ThemeProvider>
      </body>
    </html>
  );
}

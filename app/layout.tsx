import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/navBar/themeProvider/theme-provider"
import { Toaster } from "sonner"
import {
  defaultMetadata,
  organizationJsonLd,
  websiteJsonLd,
  professionalServiceJsonLd
} from "@/lib/seo-config"
import { MobileNavFooterWrapper } from "@/components/mobile/MobileNavFooterWrapper"
import { FloatingWhatsApp } from "@/components/common/FloatingWhatsApp"
import { Analytics } from "@/components/common/Analytics"
import { CookieConsent } from "@/components/common/CookieConsent"
import { CommandMenu } from "@/components/common/CommandMenu"
import { Suspense } from "react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Viewport configuration
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
}

import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { siteConfig } from "@/config/site"

export async function generateMetadata(): Promise<Metadata> {
  // Fetch global site settings
  const settings = await client.fetch(`*[_type == "siteSettings"][0]{
    title,
    description,
    logo,
    seo
  }`)

  const title = settings?.seo?.title || settings?.title || defaultMetadata.title
  const description = settings?.seo?.description || defaultMetadata.description

  let ogImage = ''
  const defaultOgImages = defaultMetadata.openGraph?.images
  if (Array.isArray(defaultOgImages) && defaultOgImages.length > 0) {
    const img = defaultOgImages[0]
    if (typeof img === 'string') ogImage = img
    else if (typeof img === 'object' && 'url' in img) ogImage = img.url.toString()
  }

  if (settings?.seo?.ogImage) {
    ogImage = urlFor(settings.seo.ogImage).width(1200).height(630).url()
  }

  return {
    ...defaultMetadata,
    title: {
      default: typeof title === 'string' ? title : siteConfig.name,
      template: `%s | ${siteConfig.name}`,
    },
    description,
    openGraph: {
      ...defaultMetadata.openGraph,
      title: typeof title === 'string' ? title : siteConfig.name,
      description,
      images: [
        {
          url: ogImage || '',
          width: 1200,
          height: 630,
          alt: siteConfig.name,
        },
      ],
    },
    twitter: {
      ...defaultMetadata.twitter,
      title: typeof title === 'string' ? title : siteConfig.name,
      description,
      images: [ogImage || ''],
    },
  }
}



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data - Organization */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd),
          }}
        />
        {/* Structured Data - Website */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteJsonLd),
          }}
        />
        {/* Structured Data - Professional Service */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(professionalServiceJsonLd),
          }}
        />

      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {children}

          {/* Mobile Navigation Footer */}
          <Suspense fallback={null}>
            <MobileNavFooterWrapper />
          </Suspense>

          {/* Desktop Floating WhatsApp */}
          <FloatingWhatsApp />

          <Toaster
            position="top-right"
            richColors
            closeButton
          />
          <Analytics />
          <CookieConsent />
          <CommandMenu />
        </ThemeProvider>
      </body>
    </html>
  );
}


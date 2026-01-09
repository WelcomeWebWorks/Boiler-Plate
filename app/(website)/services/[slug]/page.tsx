import { Metadata } from "next"
import { client } from "@/sanity/lib/client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { generateBreadcrumbJsonLd, generateServiceJsonLd, generatePageMetadata } from "@/lib/seo-config"
import { siteConfig } from "@/config/site"
import ServiceDetailClient from "./ServiceDetailClient"

export const revalidate = 60

async function getService(slug: string) {
  const query = `*[_type == "service" && slug.current == $slug][0]{..., seo}`
  const data = await client.fetch(query, { slug })
  return data
}

async function getOtherServices(currentSlug: string) {
  const query = `*[_type == "service" && slug.current != $currentSlug][0...3] {
    title,
    slug,
    shortDescription,
    mainImage
  }`
  return await client.fetch(query, { currentSlug })
}

// Generate dynamic metadata for each service
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = await getService(slug)

  if (!service) {
    return {
      title: "Service Not Found",
      description: "The requested service could not be found.",
    }
  }



  return generatePageMetadata(
    `${service.title} - ${siteConfig.name} Services`,
    service.shortDescription || `Discover our ${service.title} service at ${siteConfig.name}.`,
    `/services/${slug}`,
    [
      service.title,
      siteConfig.name,
      "business services",
      "consulting",
      "professional services",
    ],
    service.seo
  )
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getService(slug)
  const otherServices = await getOtherServices(slug)

  // Fetch site settings for stats
  const siteSettings = await client.fetch(`*[_type == "siteSettings"][0]{stats}`)
  const stats = siteSettings?.stats

  if (!service) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="container mx-auto px-6 py-32 text-center">
          <div className="max-w-md mx-auto">
            <h1 className="font-serif text-4xl font-bold mb-6 text-foreground">Service Not Found</h1>
            <p className="text-muted-foreground text-lg mb-8">
              The service you&apos;re looking for doesn&apos;t exist or has been moved.
            </p>
            <Button asChild size="lg" className="rounded-full px-8">
              <Link href="/" className="flex items-center gap-2">
                <ArrowLeft className="size-4" />
                Go Home
              </Link>
            </Button>
          </div>
        </div>
      </main>
    )
  }
  // Generate structured data
  const serviceBreadcrumb = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
    { name: service.title, url: `${siteConfig.url}/services/${slug}` },
  ])

  const serviceJsonLd = generateServiceJsonLd({
    name: service.title,
    description: service.shortDescription,
    url: `${siteConfig.url}/services/${slug}`,
  })

  return (
    <>
      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceBreadcrumb),
        }}
      />
      {/* Service structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceJsonLd),
        }}
      />

      <ServiceDetailClient service={service} otherServices={otherServices || []} stats={stats} />
    </>
  )
}


import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import ServicesPageClient from "./ServicesPageClient"
import { generateBreadcrumbJsonLd, generatePageMetadata } from "@/lib/seo-config"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = generatePageMetadata(
    "Our Services - Business Consulting, Marketing & Logistics",
    `Explore ${siteConfig.name}'s comprehensive range of business services including consulting, marketing solutions, logistics, and digital transformation services to help your business grow.`,
    "/services",
    [
        "business consulting services",
        "marketing solutions",
        "logistics services",
        "digital marketing",
        "supply chain management",
        "business strategy",
        "startup consulting",
        "SME solutions",
        "corporate consulting",
        `${siteConfig.name} services`,
    ]
)

// Breadcrumb for services page
const servicesBreadcrumb = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Services", url: `${siteConfig.url}/services` },
])

async function getServices() {
    const query = `*[_type == "service"] | order(_createdAt desc) {
    title,
    slug,
    shortDescription,
    mainImage
  }`
    return await client.fetch(query)
}

export default async function ServicesPage() {
    const services = await getServices()

    return (
        <>
            {/* Breadcrumb structured data */}
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(servicesBreadcrumb),
                }}
            />
            <ServicesPageClient services={services || []} />
        </>
    )
}

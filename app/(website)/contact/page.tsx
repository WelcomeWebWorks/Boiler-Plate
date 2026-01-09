import { Metadata } from "next"
import { client } from "@/sanity/lib/client"
import ContactPageClient from "./ContactPageClient"
import { generateBreadcrumbJsonLd, generatePageMetadata } from "@/lib/seo-config"
import { siteConfig } from "@/config/site"

export const metadata: Metadata = generatePageMetadata(
  "Contact Us - Get in Touch",
  `Contact ${siteConfig.name} for business consulting, marketing, and logistics services. Call ${siteConfig.contact.phone} or email ${siteConfig.contact.email}.`,
  "/contact",
  [
    `contact ${siteConfig.name}`,
    "business consulting contact",
    "marketing services inquiry",
    "logistics consultation",
    "get in touch",
    "business inquiry",
  ]
)

// Breadcrumb for contact page
const contactBreadcrumb = generateBreadcrumbJsonLd([
  { name: "Home", url: siteConfig.url },
  { name: "Contact", url: `${siteConfig.url}/contact` },
])

// Contact page JSON-LD
const contactPageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ContactPage",
  name: `Contact ${siteConfig.name}`,
  description: `Contact page for ${siteConfig.name}`,
  url: `${siteConfig.url}/contact`,
  mainEntity: {
    "@type": "Organization",
    name: siteConfig.name,
    telephone: siteConfig.contact.phone,
    email: siteConfig.contact.email,
    url: siteConfig.url,
  },
}

async function getContactInfo() {
  const query = `*[_type == "contact"][0] {
    email,
    phoneNumbers,
    address,
    locationLink
  }`
  return await client.fetch(query)
}

export default async function ContactPage() {
  const data = await getContactInfo()

  return (
    <>
      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactBreadcrumb),
        }}
      />
      {/* Contact page structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(contactPageJsonLd),
        }}
      />
      <ContactPageClient data={data || {}} />
    </>
  )
}

import { client } from '@/sanity/lib/client'
import FooterClient from './FooterClient'

async function getContactInfo() {
    const query = `*[_type == "contact"][0] {
    email,
    phoneNumbers,
    address
  }`
    return await client.fetch(query)
}

async function getSocialLinks() {
    const query = `*[_type == "siteSettings"][0] {
        socialLinks[] {
            platform,
            url,
            icon
        }
    }`
    const data = await client.fetch(query)
    return data?.socialLinks || []
}

interface FooterProps {
    logoUrl?: string | null
    logoLightUrl?: string | null
    companyName?: string
}

async function getLegalPages() {
    return await client.fetch(`*[_type == "legalPage"]{ title, "slug": slug.current }`)
}

export default async function Footer({ logoUrl, logoLightUrl, companyName }: FooterProps) {
    const contactInfo = await getContactInfo()
    const socialLinks = await getSocialLinks()
    const legalPages = await getLegalPages()

    return (
        <FooterClient
            logoUrl={logoUrl}
            logoLightUrl={logoLightUrl}
            companyName={companyName}
            contactInfo={contactInfo}
            socialLinks={socialLinks}
            legalPages={legalPages}
        />
    )
}

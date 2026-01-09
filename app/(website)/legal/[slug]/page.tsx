import { client } from "@/sanity/lib/client"

import { generatePageMetadata } from "@/lib/seo-config"
import { notFound } from "next/navigation"
import { Metadata } from "next"
import LegalPageClient from "./LegalPageClient"

// Force regeneration every 60 seconds (ISR)
export const revalidate = 60

interface LegalPageProps {
    params: Promise<{
        slug: string
    }>
}

async function getLegalPage(slug: string) {
    const query = `* [_type == "legalPage" && slug.current == $slug][0]{..., seo}`
    return client.fetch(query, { slug })
}

export async function generateMetadata({ params }: LegalPageProps): Promise<Metadata> {
    const { slug } = await params
    const page = await getLegalPage(slug)

    if (!page) {
        return {
            title: "Page Not Found",
        }
    }

    return generatePageMetadata(
        `${page.title} - Legal`,
        `Read our ${page.title}. Last updated on ${new Date(page.lastUpdated).toLocaleDateString()}.`,
        `/legal/${slug}`,
        undefined,
        page.seo
    )
}

export default async function LegalPage({ params }: LegalPageProps) {
    const { slug } = await params
    const page = await getLegalPage(slug)

    if (!page) {
        return notFound()
    }

    return <LegalPageClient page={page} />
}

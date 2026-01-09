import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { siteConfig } from '@/config/site'

const baseUrl = siteConfig.url



export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    // Get dynamic services
    // Get dynamic content
    const [services, posts, legalPages] = await Promise.all([
        client.fetch(`*[_type == "service" && !(seo.noIndex == true)] { "slug": slug.current, _updatedAt }`),
        client.fetch(`*[_type == "post" && !(seo.noIndex == true)] { "slug": slug.current, _updatedAt }`),
        client.fetch(`*[_type == "legalPage" && !(seo.noIndex == true)] { "slug": slug.current, _updatedAt }`),
    ])

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/services`,
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.9,
        },
        {
            url: `${baseUrl}/contact`,
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/blog`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 0.8,
        },
    ]

    // Service pages
    const serviceUrls = services?.map((page: any) => ({
        url: `${baseUrl}/services/${page.slug}`,
        lastModified: new Date(page._updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    })) || []

    // Blog post pages
    const postUrls = posts?.map((page: any) => ({
        url: `${baseUrl}/blog/${page.slug}`,
        lastModified: new Date(page._updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
    })) || []

    // Legal pages
    const legalUrls = legalPages?.map((page: any) => ({
        url: `${baseUrl}/legal/${page.slug}`,
        lastModified: new Date(page._updatedAt),
        changeFrequency: 'yearly' as const,
        priority: 0.5,
    })) || []

    return [...staticPages, ...serviceUrls, ...postUrls, ...legalUrls]
}

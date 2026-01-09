import type { Metadata } from 'next'

import { siteConfig } from '@/config/site'

const siteUrl = siteConfig.url

// Company Information
export const companyInfo = {
    name: siteConfig.name,
    legalName: siteConfig.name,
    description: siteConfig.description,
    shortDescription: siteConfig.description,
    mission: 'To provide innovative and results-driven solutions that drive sustainable growth for our clients.',
    vision: 'To be the most trusted and sought-after solutions provider worldwide.',
    foundedYear: 2024,
    url: siteUrl,
    email: siteConfig.contact.email,
    phone: siteConfig.contact.phone,
    address: {
        description: siteConfig.contact.address,
        country: 'US',
    },
    social: {
        instagram: siteConfig.links.instagram,
        linkedin: siteConfig.links.linkedin,
        twitter: siteConfig.links.twitter,
        facebook: siteConfig.links.facebook,
    },
    keywords: [
        'business consulting',
        'marketing solutions',
        'logistics services',
        'business growth',
        'startup consulting',
        'SME solutions',
        'corporate consulting',
        'global business solutions',
        'business strategy',
        'digital marketing',
        'supply chain management',
        'business transformation',
        siteConfig.name,
    ],
}

// Default metadata for all pages
export const defaultMetadata: Metadata = {
    metadataBase: new URL(siteUrl),
    title: {
        default: `${siteConfig.name} - Global Business Solutions`,
        template: `%s | ${siteConfig.name}`,
    },
    description: companyInfo.description,
    keywords: companyInfo.keywords,
    authors: [{ name: siteConfig.name, url: siteUrl }],
    creator: siteConfig.name,
    publisher: siteConfig.name,
    formatDetection: {
        email: true,
        address: true,
        telephone: true,
    },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: siteUrl,
        siteName: siteConfig.name,
        title: `${siteConfig.name} - Global Business Solutions`,
        description: companyInfo.description,
        images: [
            {
                url: `${siteUrl}/og-image.png`,
                width: 1200,
                height: 630,
                alt: `${siteConfig.name} - Global Business Solutions`,
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: `${siteConfig.name} - Global Business Solutions`,
        description: companyInfo.shortDescription,
        images: [`${siteUrl}/og-image.png`],
        creator: '@company',
        site: '@company',
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    alternates: {
        canonical: siteUrl,
    },
    verification: {
        // Add your verification codes here
        // google: 'your-google-verification-code',
        // yandex: 'your-yandex-verification-code',
        // bing: 'your-bing-verification-code',
    },
    category: 'Business Services',
}

// JSON-LD Structured Data for Organization
export const organizationJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}/#organization`,
    name: companyInfo.name,
    legalName: companyInfo.legalName,
    url: siteUrl,
    logo: `${siteUrl}/logo.png`,
    description: companyInfo.description,
    email: companyInfo.email,
    telephone: companyInfo.phone,
    foundingDate: companyInfo.foundedYear.toString(),
    sameAs: [
        companyInfo.social.instagram,
        companyInfo.social.linkedin,
        companyInfo.social.twitter,
        companyInfo.social.facebook,
    ],
    contactPoint: {
        '@type': 'ContactPoint',
        telephone: companyInfo.phone,
        email: companyInfo.email,
        contactType: 'customer service',
        availableLanguage: ['English', 'Hindi'],
        areaServed: 'Worldwide',
    },
    address: {
        '@type': 'PostalAddress',
        addressCountry: companyInfo.address.country,
        addressLocality: 'Global',
    },
}

// JSON-LD for Website
export const websiteJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${siteUrl}/#website`,
    url: siteUrl,
    name: companyInfo.name,
    description: companyInfo.description,
    publisher: {
        '@id': `${siteUrl}/#organization`,
    },
    potentialAction: {
        '@type': 'SearchAction',
        target: {
            '@type': 'EntryPoint',
            urlTemplate: `${siteUrl}/services?search={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
    },
}

// JSON-LD for Professional Service
export const professionalServiceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${siteUrl}/#professionalservice`,
    name: companyInfo.name,
    description: companyInfo.description,
    url: siteUrl,
    telephone: companyInfo.phone,
    email: companyInfo.email,
    priceRange: '$$',
    areaServed: {
        '@type': 'GeoCircle',
        geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: 20.5937,
            longitude: 78.9629,
        },
        geoRadius: '50000',
    },
    serviceType: [
        'Business Consulting',
        'Marketing Solutions',
        'Logistics Services',
        'Digital Marketing',
        'Business Strategy',
        'Supply Chain Management',
    ],
    hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Business Services',
        itemListElement: [
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Business Consulting',
                    description: 'Strategic business consulting for startups, SMEs, and corporations',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Marketing Solutions',
                    description: 'Innovative marketing solutions to drive growth and brand awareness',
                },
            },
            {
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: 'Logistics Services',
                    description: 'Comprehensive logistics and supply chain management services',
                },
            },
        ],
    },
}

// Page-specific metadata generators
// Sanity SEO Type definition
export interface SanitySEO {
    title?: string
    description?: string
    canonicalUrl?: string
    noIndex?: boolean
    ogImage?: {
        asset: {
            _ref: string
        }
    }
}

import { urlFor } from '@/sanity/lib/image'

// Page-specific metadata generators
export function generatePageMetadata(
    defaultTitle: string,
    defaultDescription: string,
    path: string = '',
    keywords?: string[],
    sanitySeo?: SanitySEO | null
): Metadata {
    const url = `${siteUrl}${path}`

    // Prefer Sanity data, fallback to defaults
    const title = sanitySeo?.title || defaultTitle
    const description = sanitySeo?.description || defaultDescription
    const noIndex = sanitySeo?.noIndex || false

    // Construct OG image
    let finalOgImage = `${siteUrl}/api/og?title=${encodeURIComponent(title)}&description=${encodeURIComponent(description)}`

    if (sanitySeo?.ogImage) {
        finalOgImage = urlFor(sanitySeo.ogImage).width(1200).height(630).url()
    }

    // Canonical
    const canonical = sanitySeo?.canonicalUrl || url

    return {
        title,
        description,
        keywords: keywords || companyInfo.keywords,
        alternates: {
            canonical: canonical,
        },
        robots: {
            index: !noIndex,
            follow: !noIndex,
            googleBot: {
                index: !noIndex,
                follow: !noIndex,
            },
        },
        openGraph: {
            title: `${title} | ${siteConfig.name}`,
            description,
            url,
            siteName: siteConfig.name,
            type: 'website',
            images: [
                {
                    url: finalOgImage,
                    width: 1200,
                    height: 630,
                    alt: title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: `${title} | ${siteConfig.name}`,
            description,
            images: [finalOgImage],
        },
    }
}

// Breadcrumb JSON-LD generator
export function generateBreadcrumbJsonLd(items: { name: string; url: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url,
        })),
    }
}

// FAQ JSON-LD generator
export function generateFaqJsonLd(faqs: { question: string; answer: string }[]) {
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: faqs.map((faq) => ({
            '@type': 'Question',
            name: faq.question,
            acceptedAnswer: {
                '@type': 'Answer',
                text: faq.answer,
            },
        })),
    }
}

// Service JSON-LD generator
export function generateServiceJsonLd(service: {
    name: string
    description: string
    url: string
}) {
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        name: service.name,
        description: service.description,
        url: service.url,
        provider: {
            '@id': `${siteUrl}/#organization`,
        },
        areaServed: 'Worldwide',
    }
}

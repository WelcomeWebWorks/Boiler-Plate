'use client'

import { siteConfig } from '@/config/site'

import Link from 'next/link'
import Image from 'next/image'
import { Logo } from '@/components/navBar/logo'
import { Mail, Phone, MapPin } from 'lucide-react'
import { NewsletterForm } from './NewsletterForm'
import { motion } from 'framer-motion'
import { staggerContainer, staggerItem, defaultViewport } from '@/lib/animations'
import { urlFor } from '@/sanity/lib/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

const quickLinks = [
    { href: '/', label: 'Home' },
    { href: '/#about', label: 'About Us' },
    { href: '/services', label: 'Services' },
    { href: '/#testimonials', label: 'Testimonials' },
]

const pagesLinks = [
    { href: '/services', label: 'All Services' },
    { href: '/blog', label: 'Blog' },
    { href: '/contact', label: 'Contact Us' },
]

interface FooterClientProps {
    logoUrl?: string | null
    logoLightUrl?: string | null
    companyName?: string
    contactInfo?: {
        email?: string
        phoneNumbers?: string[]
        address?: string
    }
    socialLinks?: Array<{
        platform: string
        url: string
        icon: SanityImageSource
    }>
    legalPages?: Array<{ title: string; slug: string }>
}

export default function FooterClient({ logoUrl, logoLightUrl, companyName, contactInfo, socialLinks, legalPages }: FooterClientProps) {
    return (
        <footer className="relative bg-foreground text-background overflow-hidden">
            <div className="container mx-auto px-6 lg:px-12 py-16 lg:py-20 relative z-10">
                {/* Top Section */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 pb-12 border-b border-background/10"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={defaultViewport}
                >
                    {/* Company Info */}
                    <motion.div variants={staggerItem} className="lg:col-span-3">
                        <Link href="/" aria-label="go home" className="inline-block mb-6">
                            <Logo
                                logoUrl={logoUrl}
                                logoLightUrl={logoLightUrl}
                                companyName={companyName}
                                variant="light"
                            />
                        </Link>
                        <p className="text-background/70 text-sm leading-relaxed mb-6 max-w-sm">
                            We are dedicated to providing exceptional services that help businesses grow and succeed in the digital age.
                        </p>

                        {/* Social Links */}
                        <div className="flex gap-3">
                            {socialLinks && socialLinks.length > 0 && socialLinks.map((social, index) => (
                                <motion.div
                                    key={index}
                                    whileHover={{ scale: 1.1, y: -2 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Link
                                        href={social.url}
                                        aria-label={social.platform}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="size-10 rounded-full bg-background/10 hover:bg-primary hover:text-primary-foreground flex items-center justify-center transition-all duration-300 relative overflow-hidden"
                                    >
                                        {social.icon && (
                                            <div className="relative size-5">
                                                <Image
                                                    src={urlFor(social.icon).url()}
                                                    alt={social.platform}
                                                    fill
                                                    className="object-contain invert" // Invert color for dark mode footer
                                                />
                                            </div>
                                        )}
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>

                    {/* Links */}
                    <motion.div variants={staggerItem} className="lg:col-span-6 grid grid-cols-2 sm:grid-cols-4 gap-8">
                        <div>
                            <h4 className="font-semibold text-background mb-4">Quick Links</h4>
                            <ul className="space-y-3">
                                {quickLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href={link.href}
                                            className="text-background/60 hover:text-primary text-sm transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-semibold text-background mb-4">Pages</h4>
                            <ul className="space-y-3">
                                {pagesLinks.map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            href={link.href}
                                            className="text-background/60 hover:text-primary text-sm transition-colors duration-200"
                                        >
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Legal Docs Section */}
                        <div>
                            <h4 className="font-semibold text-background mb-4">Legal Docs</h4>
                            <ul className="space-y-3">
                                {legalPages && legalPages.length > 0 ? (
                                    legalPages.map((page) => (
                                        <li key={page.slug}>
                                            <Link
                                                href={`/legal/${page.slug}`}
                                                className="text-background/60 hover:text-primary text-sm transition-colors duration-200"
                                            >
                                                {page.title}
                                            </Link>
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-background/40 text-xs italic">
                                        No legal documents added
                                    </li>
                                )}
                            </ul>
                        </div>

                        <div>
                            <h4 className="font-semibold text-background mb-4">Contact</h4>
                            <ul className="space-y-3">
                                {contactInfo?.email && (
                                    <li>
                                        <a
                                            href={`mailto:${contactInfo.email}`}
                                            className="text-background/60 hover:text-primary text-sm flex items-start gap-2 transition-colors duration-200"
                                        >
                                            <Mail className="size-4 mt-0.5 flex-shrink-0" />
                                            <span className="break-all">{contactInfo.email}</span>
                                        </a>
                                    </li>
                                )}
                                {contactInfo?.phoneNumbers?.[0] && (
                                    <li>
                                        <a
                                            href={`tel:${contactInfo.phoneNumbers[0].replace(/\s+/g, '')}`}
                                            className="text-background/60 hover:text-primary text-sm flex items-center gap-2 transition-colors duration-200"
                                        >
                                            <Phone className="size-4 flex-shrink-0" />
                                            <span>{contactInfo.phoneNumbers[0]}</span>
                                        </a>
                                    </li>
                                )}
                                {contactInfo?.address && (
                                    <li className="text-background/60 text-sm flex items-start gap-2">
                                        <MapPin className="size-4 mt-0.5 flex-shrink-0" />
                                        <span className="line-clamp-2">{contactInfo.address}</span>
                                    </li>
                                )}
                            </ul>
                        </div>
                    </motion.div>

                    {/* Newsletter */}
                    <motion.div variants={staggerItem} className="lg:col-span-3">
                        <h4 className="font-semibold text-background mb-4">Subscribe to Newsletter</h4>
                        <p className="text-background/60 text-sm mb-4">
                            Stay updated with our latest news and updates.
                        </p>
                        <NewsletterForm />
                    </motion.div>
                </motion.div>

                {/* Bottom Section */}
                <motion.div
                    className="pt-8 flex flex-col md:flex-row items-center justify-between gap-6 border-t border-background/10 mt-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={defaultViewport}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <div className="flex flex-col gap-2 text-center md:text-left">
                        <p className="text-background/50 text-sm">
                            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
                        </p>
                        <p className="text-sm font-medium bg-gradient-to-r from-blue-200 to-purple-200 bg-clip-text text-transparent hover:from-white hover:to-white transition-all duration-300">
                            <span className="text-background/60">Designed by</span> <a href="#" className="hover:underline decoration-blue-300 underline-offset-4" target="_blank" rel="noopener noreferrer">Your Agency</a>
                        </p>
                    </div>

                    <div className="flex items-center gap-6 flex-wrap justify-center">
                        {legalPages && legalPages.length > 0 && legalPages.map((page) => (
                            <Link
                                key={page.slug}
                                href={`/legal/${page.slug}`}
                                className="text-background/50 hover:text-primary text-sm transition-colors duration-200"
                            >
                                {page.title}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            </div>
        </footer>
    )
}

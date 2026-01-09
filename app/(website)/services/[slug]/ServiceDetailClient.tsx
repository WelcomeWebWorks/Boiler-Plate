'use client'

import { PortableText } from "@portabletext/react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, CheckCircle, Clock, Users, Award } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"
import { motion } from "framer-motion"
import {
    fadeInUp,
    staggerContainer,
    staggerItem,
    defaultViewport,
    slideInFromLeft,
    slideInFromRight,
    scaleIn
} from "@/lib/animations"
import { PortableTextBlock } from "sanity"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

interface ServiceDetailProps {
    service: {
        title: string
        shortDescription: string
        mainImage?: SanityImageSource
        content?: PortableTextBlock[]
    }
    otherServices: Array<{
        title: string
        slug: { current: string }
        shortDescription: string
        mainImage?: SanityImageSource
    }>
    stats?: {
        clientsCount?: string
        clientsLabel?: string
        experienceCount?: string
        experienceLabel?: string
        supportCount?: string
        supportLabel?: string
    }
}

export default function ServiceDetailClient({ service, otherServices, stats }: ServiceDetailProps) {
    return (
        <main className="min-h-screen bg-background">
            {/* Clean Header Section */}
            <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 overflow-hidden bg-gradient-to-b from-muted/50 to-background">
                {/* Subtle Background Pattern */}
                <div className="absolute inset-0 opacity-30">
                    <div
                        className="absolute inset-0"
                        style={{
                            backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.08) 1px, transparent 0)`,
                            backgroundSize: '32px 32px'
                        }}
                    />
                </div>

                <div className="container mx-auto px-6 lg:px-12 relative z-10">
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <Button
                            asChild
                            variant="ghost"
                            className="text-muted-foreground hover:text-foreground rounded-full px-4 -ml-4"
                        >
                            <Link href="/services" className="flex items-center gap-2">
                                <ArrowLeft className="size-4" />
                                Back to Services
                            </Link>
                        </Button>
                    </nav>

                    {/* Header Content */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                        {/* Left Content */}
                        <motion.div
                            className="max-w-xl"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                        >
                            <motion.span
                                variants={staggerItem}
                                className="inline-block text-sm font-medium tracking-widest uppercase text-primary mb-4"
                            >
                                Our Services
                            </motion.span>
                            <motion.h1
                                variants={staggerItem}
                                className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight mb-6"
                            >
                                {service.title}
                            </motion.h1>
                            <motion.p
                                variants={staggerItem}
                                className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-8"
                            >
                                {service.shortDescription}
                            </motion.p>
                            <motion.div variants={staggerItem}>
                                <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
                                    <Link href="/contact" className="flex items-center gap-2">
                                        Get Started
                                        <ArrowRight className="size-5" />
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>

                        {/* Right Image */}
                        {service.mainImage && (
                            <motion.div
                                className="relative"
                                variants={scaleIn}
                                initial="hidden"
                                animate="visible"
                                transition={{ duration: 0.8 }}
                            >
                                <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl">
                                    <Image
                                        src={urlFor(service.mainImage).url()}
                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        alt={(service.mainImage as any).alt || service.title}
                                        fill
                                        className="object-cover"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                {/* Decorative accent */}
                                <div className="absolute -z-10 -bottom-4 -right-4 w-full h-full rounded-2xl bg-primary/10 hidden sm:block" />
                                <div className="absolute -z-10 bottom-0 right-0 w-full h-full rounded-2xl bg-primary/10 translate-x-2 translate-y-2 sm:hidden" />
                            </motion.div>
                        )}
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            {stats && (stats.clientsCount || stats.experienceCount || stats.supportCount) && (
                <section className="py-12 border-b border-border/50">
                    <div className="container mx-auto px-6 lg:px-12">
                        <motion.div
                            className="grid grid-cols-1 sm:grid-cols-3 gap-8"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={defaultViewport}
                        >
                            {stats.clientsCount && (
                                <motion.div variants={staggerItem} className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Users className="size-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-foreground">{stats.clientsCount}</p>
                                        <p className="text-sm text-muted-foreground">{stats.clientsLabel || 'Happy Clients'}</p>
                                    </div>
                                </motion.div>
                            )}
                            {stats.experienceCount && (
                                <motion.div variants={staggerItem} className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Award className="size-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-foreground">{stats.experienceCount}</p>
                                        <p className="text-sm text-muted-foreground">{stats.experienceLabel || 'Years Experience'}</p>
                                    </div>
                                </motion.div>
                            )}
                            {stats.supportCount && (
                                <motion.div variants={staggerItem} className="flex items-center gap-4">
                                    <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                                        <Clock className="size-6 text-primary" />
                                    </div>
                                    <div>
                                        <p className="text-2xl font-bold text-foreground">{stats.supportCount}</p>
                                        <p className="text-sm text-muted-foreground">{stats.supportLabel || 'Support Available'}</p>
                                    </div>
                                </motion.div>
                            )}
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Main Content Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        {/* Main Content */}
                        <motion.div
                            className="lg:col-span-8"
                            variants={slideInFromLeft}
                            initial="hidden"
                            whileInView="visible"
                            viewport={defaultViewport}
                        >
                            {/* Content Card */}
                            <div className="bg-card rounded-2xl border border-border/50 p-6 sm:p-8 md:p-10 shadow-sm">
                                <div className="w-full" style={{ wordWrap: 'break-word', overflowWrap: 'break-word' }}>
                                    {service.content && (
                                        <PortableText
                                            value={service.content}
                                            components={{
                                                types: {
                                                    image: ({ value }) => {
                                                        if (!value?.asset?._ref) {
                                                            return null
                                                        }
                                                        return (
                                                            <div className="my-8 md:my-10">
                                                                <div className="relative w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                                                                    <Image
                                                                        src={urlFor(value).url()}
                                                                        alt={value.alt || "Service image"}
                                                                        fill
                                                                        className="object-cover"
                                                                        sizes="(max-width: 768px) 100vw, 700px"
                                                                    />
                                                                </div>
                                                                {value.alt && (
                                                                    <p className="text-center text-sm text-muted-foreground mt-3 italic">
                                                                        {value.alt}
                                                                    </p>
                                                                )}
                                                            </div>
                                                        )
                                                    },
                                                },
                                                block: {
                                                    h2: ({ children }) => (
                                                        <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-10 mb-4 break-words">
                                                            {children}
                                                        </h2>
                                                    ),
                                                    h3: ({ children }) => (
                                                        <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mt-8 mb-3 break-words">
                                                            {children}
                                                        </h3>
                                                    ),
                                                    h4: ({ children }) => (
                                                        <h4 className="text-lg sm:text-xl font-semibold text-foreground mt-6 mb-2 break-words">
                                                            {children}
                                                        </h4>
                                                    ),
                                                    blockquote: ({ children }) => (
                                                        <blockquote className="my-6 pl-4 border-l-4 border-primary py-2 italic text-muted-foreground break-words">
                                                            {children}
                                                        </blockquote>
                                                    ),
                                                    normal: ({ children }) => (
                                                        <p className="text-muted-foreground leading-relaxed mb-4 break-words">
                                                            {children}
                                                        </p>
                                                    ),
                                                },
                                                list: {
                                                    bullet: ({ children }) => (
                                                        <ul className="my-4 space-y-2">{children}</ul>
                                                    ),
                                                    number: ({ children }) => (
                                                        <ol className="my-4 space-y-2 list-decimal list-inside">{children}</ol>
                                                    ),
                                                },
                                                listItem: {
                                                    bullet: ({ children }) => (
                                                        <li className="flex items-start gap-3 text-muted-foreground">
                                                            <CheckCircle className="size-5 text-primary mt-0.5 flex-shrink-0" />
                                                            <span className="break-words">{children}</span>
                                                        </li>
                                                    ),
                                                    number: ({ children }) => (
                                                        <li className="text-muted-foreground break-words">
                                                            {children}
                                                        </li>
                                                    ),
                                                },
                                                marks: {
                                                    strong: ({ children }) => (
                                                        <strong className="font-semibold text-foreground">{children}</strong>
                                                    ),
                                                    em: ({ children }) => (
                                                        <em className="italic">{children}</em>
                                                    ),
                                                    link: ({ children, value }) => (
                                                        <a
                                                            href={value?.href}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="text-primary hover:underline"
                                                        >
                                                            {children}
                                                        </a>
                                                    ),
                                                },
                                            }}
                                        />
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Sidebar */}
                        <motion.aside
                            className="lg:col-span-4"
                            variants={slideInFromRight}
                            initial="hidden"
                            whileInView="visible"
                            viewport={defaultViewport}
                        >
                            <div className="sticky top-24 space-y-6">
                                {/* CTA Card */}
                                <div className="bg-primary text-primary-foreground rounded-2xl p-6 sm:p-8 relative overflow-hidden">
                                    <div className="relative z-10">
                                        <h3 className="font-serif text-xl sm:text-2xl font-bold mb-3">
                                            Ready to get started?
                                        </h3>
                                        <p className="opacity-90 mb-6 text-sm sm:text-base">
                                            Contact us today to discuss how we can help you.
                                        </p>
                                        <Button
                                            asChild
                                            variant="secondary"
                                            className="w-full rounded-full font-semibold"
                                        >
                                            <Link href="/contact" className="flex items-center justify-center gap-2">
                                                Get in Touch
                                                <ArrowRight className="size-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                    <div className="absolute -bottom-8 -right-8 w-32 h-32 bg-primary-foreground/10 rounded-full blur-2xl" />
                                </div>

                                {/* Contact Card */}
                                <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border/50">
                                    <h4 className="font-semibold text-foreground mb-3">Have questions?</h4>
                                    <p className="text-muted-foreground text-sm mb-4">
                                        Our team is here to help you.
                                    </p>
                                    <Button asChild variant="outline" className="w-full rounded-full">
                                        <Link href="/contact">Contact Us</Link>
                                    </Button>
                                </div>

                                {/* Highlights Card */}
                                <div className="bg-muted/50 rounded-2xl p-6 sm:p-8 border border-border/50">
                                    <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                                        <CheckCircle className="size-5 text-primary" />
                                        Why Choose Us
                                    </h4>
                                    <ul className="space-y-3 text-sm text-muted-foreground">
                                        <li className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                            Expert team with experience
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                            Tailored solutions for your needs
                                        </li>
                                        <li className="flex items-start gap-2">
                                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
                                            Dedicated support throughout
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </motion.aside>
                    </div>
                </div>
            </section>

            {/* Other Services Section */}
            {otherServices && otherServices.length > 0 && (
                <section className="py-16 md:py-24 bg-muted/30 border-t border-border/50">
                    <div className="container mx-auto px-6 lg:px-12">
                        <motion.div
                            className="mb-12"
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={defaultViewport}
                        >
                            <span className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block">
                                Explore More
                            </span>
                            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-foreground">
                                Other Services
                            </h2>
                        </motion.div>

                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={defaultViewport}
                        >
                            {otherServices.map((item, index) => (
                                <motion.div key={index} variants={staggerItem}>
                                    <Link href={`/services/${item.slug.current}`} className="group">
                                        <div className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                                            {item.mainImage && (
                                                <div className="relative aspect-[16/10] overflow-hidden">
                                                    <Image
                                                        src={urlFor(item.mainImage).url()}
                                                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                                                        alt={(item.mainImage as any).alt || item.title}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                                                        sizes="(max-width: 768px) 100vw, 33vw"
                                                    />
                                                </div>
                                            )}
                                            <div className="p-5">
                                                <h3 className="font-serif text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
                                                    {item.title}
                                                </h3>
                                                <p className="text-muted-foreground text-sm line-clamp-2">
                                                    {item.shortDescription}
                                                </p>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>

                        <motion.div
                            className="mt-10 text-center"
                            variants={fadeInUp}
                            initial="hidden"
                            whileInView="visible"
                            viewport={defaultViewport}
                        >
                            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                                <Link href="/#services" className="flex items-center gap-2">
                                    View All Services
                                    <ArrowRight className="size-4" />
                                </Link>
                            </Button>
                        </motion.div>
                    </div>
                </section>
            )}

            {/* Final CTA Section */}
            <section className="py-20 md:py-28">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        className="max-w-3xl mx-auto text-center"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={defaultViewport}
                    >
                        <motion.h2
                            variants={staggerItem}
                            className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-6"
                        >
                            Ready to Get Started?
                        </motion.h2>
                        <motion.p
                            variants={staggerItem}
                            className="text-muted-foreground text-lg sm:text-xl leading-relaxed mb-10 max-w-2xl mx-auto"
                        >
                            Let&apos;s discuss how our {service.title} services can help you achieve your goals.
                        </motion.p>
                        <motion.div
                            variants={staggerItem}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
                                <Link href="/contact" className="flex items-center gap-2">
                                    Start a Project
                                    <ArrowRight className="size-5" />
                                </Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                                <Link href="/services">
                                    Explore Services
                                </Link>
                            </Button>
                        </motion.div>
                    </motion.div>
                </div>
            </section>
        </main>
    )
}

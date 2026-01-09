'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { urlFor } from "@/sanity/lib/image"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { motion } from 'framer-motion'
import {
    staggerContainer,
    staggerItem,
    defaultViewport
} from '@/lib/animations'

interface Service {
    title: string
    slug: { current: string }
    shortDescription: string
    mainImage?: SanityImageSource
}

interface ServicesPageClientProps {
    services: Service[]
}

export default function ServicesPageClient({ services }: ServicesPageClientProps) {
    return (
        <main className="min-h-screen bg-background">
            {/* Hero Section */}
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
                    <motion.div
                        className="max-w-3xl"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.span
                            variants={staggerItem}
                            className="inline-block text-sm font-medium tracking-widest uppercase text-primary mb-4"
                        >
                            What We Offer
                        </motion.span>
                        <motion.h1
                            variants={staggerItem}
                            className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground leading-tight mb-6"
                        >
                            Our Services
                        </motion.h1>
                        <motion.p
                            variants={staggerItem}
                            className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl"
                        >
                            Comprehensive solutions designed to elevate your business to the next level with our expert services.
                        </motion.p>
                    </motion.div>
                </div>
            </section>

            {/* Services Grid Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-12">
                    {services && services.length > 0 ? (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                            variants={staggerContainer}
                            initial="hidden"
                            whileInView="visible"
                            viewport={defaultViewport}
                        >
                            {services.map((service: Service, index: number) => (
                                <motion.div
                                    key={index}
                                    variants={staggerItem}
                                    whileHover={{ y: -8 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <Link
                                        href={`/services/${service.slug.current}`}
                                        className="group block h-full"
                                    >
                                        <div className="bg-card rounded-2xl overflow-hidden border border-border/50 hover:border-primary/30 hover:shadow-xl transition-all duration-500 h-full flex flex-col">
                                            {/* Image */}
                                            {service.mainImage && (
                                                <div className="relative aspect-[16/10] overflow-hidden">
                                                    <Image
                                                        src={urlFor(service.mainImage).url()}
                                                        alt={service.title}
                                                        fill
                                                        className="object-cover transition-transform duration-700 group-hover:scale-110"
                                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                    />
                                                    <div className="absolute inset-0 bg-gradient-to-t from-foreground/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                                </div>
                                            )}

                                            {/* Content */}
                                            <div className="p-6 flex-grow flex flex-col">
                                                <h2 className="font-serif text-xl sm:text-2xl font-bold text-foreground mb-3 group-hover:text-primary transition-colors">
                                                    {service.title}
                                                </h2>
                                                <p className="text-muted-foreground text-sm sm:text-base leading-relaxed mb-6 flex-grow line-clamp-3">
                                                    {service.shortDescription}
                                                </p>
                                                <div className="flex items-center text-primary font-medium text-sm">
                                                    <span>Learn More</span>
                                                    <ArrowRight className="size-4 ml-2 transition-transform group-hover:translate-x-2" />
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </motion.div>
                    ) : (
                        <div className="text-center py-20">
                            <h2 className="font-serif text-2xl font-bold text-foreground mb-4">No Services Available</h2>
                            <p className="text-muted-foreground mb-8">Check back soon for our list of services.</p>
                            <Button asChild>
                                <Link href="/">Go Home</Link>
                            </Button>
                        </div>
                    )}
                </div>
            </section>

            {/* CTA Section */}
            <motion.section
                className="py-20 md:py-28 bg-muted/30 border-t border-border/50"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={defaultViewport}
                transition={{ duration: 0.6 }}
            >
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
                            Let&apos;s discuss how our services can help you achieve your goals and take your business to the next level.
                        </motion.p>
                        <motion.div
                            variants={staggerItem}
                            className="flex flex-col sm:flex-row items-center justify-center gap-4"
                        >
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                <Button asChild size="lg" className="rounded-full px-8 shadow-lg shadow-primary/20">
                                    <Link href="/contact" className="flex items-center gap-2">
                                        Contact Us
                                        <ArrowRight className="size-5" />
                                    </Link>
                                </Button>
                            </motion.div>
                            <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                                    <Link href="/">
                                        Back to Home
                                    </Link>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>
        </main>
    )
}

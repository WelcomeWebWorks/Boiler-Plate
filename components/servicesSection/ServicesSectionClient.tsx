'use client'

import Image from "next/image"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ServicesGrid } from "./ServicesGrid"
import { motion } from 'framer-motion'
import {
    staggerContainer,
    staggerItem,
    defaultViewport
} from '@/lib/animations'

import { SanityImageSource } from "@sanity/image-url/lib/types/types"

interface Service {
    title: string
    slug: { current: string }
    shortDescription: string
    mainImage?: SanityImageSource
}

interface ServicesSectionClientProps {
    services: Service[]
}

export default function ServicesSectionClient({ services }: ServicesSectionClientProps) {
    return (
        <section id="services" className="relative py-24 md:py-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/services-bg.png"
                    alt="Services background"
                    fill
                    className="object-cover"
                    quality={90}
                    priority
                />
            </div>

            {/* Light Overlay for better text readability */}
            <div className="absolute inset-0 bg-background/40" />

            {/* Decorative gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/30 via-transparent to-background/50" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <motion.div
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={defaultViewport}
                >
                    <motion.span
                        variants={staggerItem}
                        className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block"
                    >
                        Our Services
                    </motion.span>
                    <motion.div variants={staggerItem} className="mb-20 max-w-3xl">
                        <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6">
                            How We Help You
                        </h2>
                        <p className="text-muted-foreground text-lg sm:text-xl leading-relaxed">
                            Comprehensive solutions designed to elevate your business to the next level with our expert services.
                        </p>
                    </motion.div>
                </motion.div>

                <ServicesGrid services={services} />

                {/* View All Services Button */}
                <motion.div
                    className="mt-16 text-center"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={defaultViewport}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                        <Button asChild size="lg" variant="outline" className="rounded-full px-8 border-2 hover:bg-primary hover:text-primary-foreground hover:border-primary">
                            <Link href="/services" className="flex items-center gap-2">
                                View All Services
                                <ArrowRight className="size-5" />
                            </Link>
                        </Button>
                    </motion.div>
                </motion.div>
            </div>
        </section>
    )
}

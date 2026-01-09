'use client'

import Image from "next/image"
import { motion } from 'framer-motion'
import {
    staggerContainer,
    staggerItem,
    defaultViewport
} from '@/lib/animations'


import { TestimonialsGrid, type Testimonial } from "./TestimonialsGrid"

interface TestimonialsSectionClientProps {
    testimonials: Testimonial[]
}

export default function TestimonialsSectionClient({ testimonials }: TestimonialsSectionClientProps) {
    return (
        <section id="testimonials" className="relative py-24 md:py-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/testimonials-bg.png"
                    alt="Testimonials background"
                    fill
                    className="object-cover"
                    quality={90}
                    priority
                />
            </div>

            {/* Light Overlay for better text readability */}
            <div className="absolute inset-0 bg-background/50" />

            {/* Decorative gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/60" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="mb-20 max-w-3xl ml-auto text-right"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={defaultViewport}
                >
                    <motion.span
                        variants={staggerItem}
                        className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block"
                    >
                        Testimonials
                    </motion.span>
                    <motion.h2
                        variants={staggerItem}
                        className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight"
                    >
                        Don&apos;t take our word for it!<br />
                        Hear it from our partners.
                    </motion.h2>
                    <motion.p
                        variants={staggerItem}
                        className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl ml-auto"
                    >
                        Hear from those who have experienced our services firsthand and see why they trust us.
                    </motion.p>
                </motion.div>

                <TestimonialsGrid testimonials={testimonials} />
            </div>
        </section>
    )
}

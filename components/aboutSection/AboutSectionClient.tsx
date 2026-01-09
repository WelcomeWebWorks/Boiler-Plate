'use client'

import { Cpu, Zap } from 'lucide-react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { motion } from 'framer-motion'
import {
    fadeInLeft,
    staggerContainer,
    staggerItem,
    defaultViewport
} from '@/lib/animations'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    zap: Zap,
    cpu: Cpu,
}

interface Feature {
    icon?: string
    title: string
    description: string
}

import { PortableTextBlock } from 'sanity'

interface AboutData {
    heading: string
    description?: PortableTextBlock[]
    image?: {
        asset: unknown
        alt?: string
    }
    features?: Feature[]
}

interface AboutSectionClientProps {
    data: AboutData
    imageUrl?: string
}

export default function AboutSectionClient({ data, imageUrl }: AboutSectionClientProps) {
    return (
        <section id="about" className="relative py-24 md:py-32 overflow-hidden">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    src="/about-bg.png"
                    alt="About background"
                    fill
                    className="object-cover"
                    quality={90}
                    priority
                />
            </div>

            {/* Light Overlay for better text readability */}
            <div className="absolute inset-0 bg-background/50" />

            {/* Decorative gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-transparent to-background/50" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-start">

                    {/* Decorative Sunburst Icon */}
                    <motion.div
                        className="hidden lg:block absolute -left-4 top-0 z-20"
                        initial={{ opacity: 0, rotate: -180, scale: 0 }}
                        whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
                        viewport={defaultViewport}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                        <svg
                            width="80"
                            height="80"
                            viewBox="0 0 100 100"
                            fill="none"
                            className="text-foreground"
                        >
                            {[...Array(16)].map((_, i) => (
                                <line
                                    key={i}
                                    x1="50"
                                    y1="50"
                                    x2={50 + 35 * Math.cos((i * 22.5 * Math.PI) / 180)}
                                    y2={50 + 35 * Math.sin((i * 22.5 * Math.PI) / 180)}
                                    stroke="currentColor"
                                    strokeWidth="3"
                                    strokeLinecap="round"
                                />
                            ))}
                            <circle cx="50" cy="50" r="8" fill="currentColor" />
                        </svg>
                    </motion.div>

                    {/* Left Column - Image */}
                    {/* On Mobile: Order 2 (Bottom), Desktop: Order-none (Left) */}
                    <motion.div
                        className="lg:col-span-5 relative order-last lg:order-first"
                        variants={fadeInLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={defaultViewport}
                    >
                        {imageUrl && (
                            <div className="relative">
                                <div className="relative aspect-[3/4] lg:aspect-[4/5] overflow-hidden">
                                    <Image
                                        src={imageUrl}
                                        alt={data.image?.alt || "About us"}
                                        fill
                                        className="object-cover object-center"
                                        sizes="(max-width: 768px) 100vw, 40vw"
                                    />
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Right Column - Content */}
                    <motion.div
                        className="lg:col-span-7 relative z-10"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={defaultViewport}
                    >
                        {/* Large Heading */}
                        <motion.div variants={staggerItem} className="mb-10">
                            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold tracking-tight text-foreground leading-[0.95]">
                                {data.heading}
                            </h2>
                        </motion.div>

                        {/* Description */}
                        {data.description && (
                            <motion.div
                                variants={staggerItem}
                                className="max-w-lg space-y-6 text-muted-foreground text-base sm:text-lg leading-relaxed"
                            >
                                <PortableText
                                    value={data.description}
                                    components={{
                                        block: {
                                            normal: ({ children }) => (
                                                <p className="mb-4 last:mb-0">{children}</p>
                                            ),
                                        },
                                        marks: {
                                            strong: ({ children }) => (
                                                <span className="font-semibold text-foreground">{children}</span>
                                            )
                                        }
                                    }}
                                />
                            </motion.div>
                        )}

                        {/* Features Grid */}
                        {data.features && (
                            <motion.div
                                variants={staggerItem}
                                className="mt-12 grid grid-cols-1 sm:grid-cols-2 gap-8"
                            >
                                {data.features.map((item: Feature, index: number) => {
                                    const Icon = item.icon ? iconMap[item.icon] : null
                                    return (
                                        <motion.div
                                            key={index}
                                            className="group"
                                            initial={{ opacity: 0, y: 20 }}
                                            whileInView={{ opacity: 1, y: 0 }}
                                            viewport={defaultViewport}
                                            transition={{ duration: 0.5, delay: index * 0.1 }}
                                        >
                                            <div className="flex items-center gap-3 mb-3">
                                                {Icon && (
                                                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10 text-primary">
                                                        <Icon className="size-5" />
                                                    </div>
                                                )}
                                                <h3 className="text-lg font-semibold text-foreground">
                                                    {item.title}
                                                </h3>
                                            </div>
                                            <p className="text-muted-foreground text-sm leading-relaxed pl-13">
                                                {item.description}
                                            </p>
                                        </motion.div>
                                    )
                                })}
                            </motion.div>
                        )}

                        {/* Decorative Line */}
                        <motion.div
                            variants={staggerItem}
                            className="mt-12 flex justify-end"
                        >
                            <motion.div
                                className="w-20 h-1 bg-foreground rounded-full"
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                viewport={defaultViewport}
                                transition={{ duration: 0.6, delay: 0.5 }}
                            />
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

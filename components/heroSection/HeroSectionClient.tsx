'use client'

import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Sparkles } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { motion } from 'framer-motion'
import {
    fadeInRight,
    staggerContainer,
    staggerItem,
    heroImageAnimation,
    defaultViewport
} from '@/lib/animations'

interface HeroSectionClientProps {
    heroContent: {
        announcement?: {
            text: string
            link?: string
        }
        heading?: string
        subheading?: string
        primaryButton?: {
            text: string
            link?: string
        }
        secondaryButton?: {
            text: string
            link?: string
        }
        appScreenImages: string[]
    }
}

export default function HeroSectionClient({ heroContent }: HeroSectionClientProps) {
    const mainImage = heroContent.appScreenImages[0]
    const badgeImages = heroContent.appScreenImages.slice(1, 8)

    return (
        <section id="hero" className="relative min-h-screen overflow-hidden bg-gradient-to-br from-background via-muted/30 to-muted/50">
            {/* Elegant Background Pattern */}
            <div className="absolute inset-0 opacity-20">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--primary) / 0.08) 1px, transparent 0)`,
                        backgroundSize: '48px 48px'
                    }}
                />
            </div>

            <div className="container mx-auto px-6 lg:px-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center min-h-screen py-20 lg:py-24">

                    {/* Left Content Column */}
                    <motion.div
                        className="relative z-10 max-w-2xl"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >

                        {/* Announcement Badge */}
                        {heroContent.announcement && (
                            <motion.div variants={staggerItem} className="flex justify-end mb-8">
                                <Link
                                    href={heroContent.announcement.link || "#"}
                                    className="group inline-flex items-center gap-3 rounded-full bg-gradient-to-r from-primary/15 to-primary/5 px-5 py-2.5 text-sm font-medium text-primary ring-1 ring-primary/20 transition-all duration-300 hover:ring-primary/40 hover:shadow-lg hover:shadow-primary/10"
                                >
                                    <Sparkles className="size-4" />
                                    <span>{heroContent.announcement.text}</span>
                                    <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
                                </Link>
                            </motion.div>
                        )}

                        {/* Main Heading */}
                        {heroContent.heading && (
                            <motion.h1
                                variants={staggerItem}
                                className="font-serif text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold tracking-tight text-foreground leading-[1.08]"
                            >
                                <span className="bg-gradient-to-r from-foreground via-foreground/90 to-foreground/70 bg-clip-text">
                                    {heroContent.heading}
                                </span>
                            </motion.h1>
                        )}

                        {/* Subheading/Description */}
                        {heroContent.subheading && (
                            <motion.p
                                variants={staggerItem}
                                className="mt-8 text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg"
                            >
                                {heroContent.subheading}
                            </motion.p>
                        )}

                        {/* Premium CTA Buttons */}
                        {(heroContent.primaryButton || heroContent.secondaryButton) && (
                            <motion.div
                                variants={staggerItem}
                                className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5"
                            >
                                {heroContent.primaryButton && (
                                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            asChild
                                            size="lg"
                                            className="group relative h-14 rounded-full px-8 text-base font-semibold shadow-xl shadow-primary/25 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/35"
                                        >
                                            <Link href={heroContent.primaryButton.link || "#"}>
                                                {heroContent.primaryButton.text}
                                                <ArrowRight className="ml-2 size-5 transition-transform duration-300 group-hover:translate-x-1" />
                                            </Link>
                                        </Button>
                                    </motion.div>
                                )}
                                {heroContent.secondaryButton && (
                                    <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                        <Button
                                            asChild
                                            variant="outline"
                                            size="lg"
                                            className="h-14 rounded-full px-8 text-base font-semibold border-2 border-border/80 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:bg-muted hover:border-primary/30"
                                        >
                                            <Link href={heroContent.secondaryButton.link || "#"}>
                                                {heroContent.secondaryButton.text}
                                            </Link>
                                        </Button>
                                    </motion.div>
                                )}
                            </motion.div>
                        )}
                    </motion.div>

                    {/* Right Image Column with Decorative Elements */}
                    <motion.div
                        className="relative lg:h-[650px] flex items-center justify-center"
                        variants={fadeInRight}
                        initial="hidden"
                        animate="visible"
                        viewport={defaultViewport}
                    >
                        {/* Decorative Curved Lines SVG */}
                        <svg
                            className="absolute inset-0 w-full h-full pointer-events-none z-0"
                            viewBox="0 0 500 500"
                            fill="none"
                            preserveAspectRatio="xMidYMid slice"
                        >
                            <motion.path
                                d="M50 200 Q150 180 200 250 Q250 320 350 280 Q450 240 480 320"
                                className="stroke-primary/30"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 2, ease: "easeInOut", delay: 0.5 }}
                            />
                            <motion.path
                                d="M20 280 Q120 260 180 330 Q240 400 340 360 Q440 320 490 400"
                                className="stroke-primary/20"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 2, ease: "easeInOut", delay: 0.7 }}
                            />
                            <motion.path
                                d="M80 150 Q180 130 250 180 Q320 230 400 200 Q460 180 500 220"
                                className="stroke-primary/25"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                fill="none"
                                initial={{ pathLength: 0, opacity: 0 }}
                                animate={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 2, ease: "easeInOut", delay: 0.3 }}
                            />
                        </svg>

                        {/* Main Hero Image */}
                        {mainImage && (
                            <motion.div
                                className="relative z-10 w-full max-w-lg lg:max-w-xl xl:max-w-2xl"
                                variants={heroImageAnimation}
                                initial="hidden"
                                animate="visible"
                            >
                                <div className="relative aspect-[4/5]">
                                    <Image
                                        src={mainImage}
                                        alt="Hero"
                                        fill
                                        priority
                                        className="object-contain"
                                        sizes="(max-width: 768px) 90vw, (max-width: 1200px) 50vw, 600px"
                                    />
                                </div>
                            </motion.div>
                        )}

                        {/* Floating Circular Image Badges */}
                        {/* Floating Circular Image Badges */}
                        {badgeImages.length > 0 && badgeImages.map((image, index) => {
                            // Configuration for up to 7 badge positions associated with the main image
                            const badgeConfig = [
                                // Pos 0: Top Right (Original) - Large
                                {
                                    className: "top-4 right-0 lg:top-8 lg:-right-6 w-20 h-20 lg:w-24 lg:h-24",
                                    delay: 0.8,
                                    floatDuration: 4
                                },
                                // Pos 1: Middle Left (Original) - Medium
                                {
                                    className: "top-1/3 -left-6 lg:-left-10 w-16 h-16 lg:w-20 lg:h-20",
                                    delay: 1.0,
                                    floatDuration: 5
                                },
                                // Pos 2: Bottom Right (Original) - Large
                                {
                                    className: "bottom-12 right-2 lg:bottom-20 lg:right-6 w-20 h-20 lg:w-24 lg:h-24",
                                    delay: 1.2,
                                    floatDuration: 4.5
                                },
                                // Pos 3: Top Left - Small
                                {
                                    className: "top-12 left-0 lg:top-16 lg:-left-12 w-14 h-14 lg:w-16 lg:h-16",
                                    delay: 1.4,
                                    floatDuration: 3.5
                                },
                                // Pos 4: Bottom Left - Medium
                                {
                                    className: "bottom-20 left-4 lg:bottom-32 lg:-left-8 w-16 h-16 lg:w-20 lg:h-20",
                                    delay: 1.6,
                                    floatDuration: 5.5
                                },
                                // Pos 5: Middle Right - Medium/Large
                                {
                                    className: "top-1/2 -right-4 lg:-right-12 w-18 h-18 lg:w-22 lg:h-22",
                                    delay: 1.8,
                                    floatDuration: 4.2
                                },
                                // Pos 6: Top Center/Right - Small
                                {
                                    className: "-top-2 right-[20%] lg:-top-6 lg:right-[25%] w-12 h-12 lg:w-16 lg:h-16",
                                    delay: 2.0,
                                    floatDuration: 3.8
                                }
                            ]

                            // Safely get config or fallback if we somehow have more images than configs
                            const config = badgeConfig[index] || badgeConfig[0]

                            return (
                                <motion.div
                                    key={index}
                                    className={`absolute z-20 rounded-full border-4 border-background shadow-xl overflow-hidden ${config.className}`}
                                    initial={{ opacity: 0, scale: 0 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: config.delay,
                                        ease: "easeOut"
                                    }}
                                >
                                    {/* Inner Floating Animation */}
                                    <motion.div
                                        className="relative w-full h-full"
                                        animate={{ y: [0, -10, 0] }}
                                        transition={{
                                            duration: config.floatDuration,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    >
                                        <Image
                                            src={image}
                                            alt={`Feature ${index + 1}`}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 100px, 150px"
                                        />
                                    </motion.div>
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

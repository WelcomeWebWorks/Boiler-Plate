'use client'

import { PortableText } from "@portabletext/react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CalendarDays, ArrowRight } from "lucide-react"
import { motion } from "framer-motion"
import {
    fadeInUp,
    staggerContainer,
    staggerItem,
    defaultViewport,
} from "@/lib/animations"
import { PortableTextBlock } from "sanity"

interface LegalPageClientProps {
    page: {
        title: string
        lastUpdated: string
        content: PortableTextBlock[]
    }
}

export default function LegalPageClient({ page }: LegalPageClientProps) {
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
                    {/* Breadcrumb */}
                    <nav className="mb-8">
                        <Button
                            asChild
                            variant="ghost"
                            className="text-muted-foreground hover:text-foreground rounded-full px-4 -ml-4"
                        >
                            <Link href="/" className="flex items-center gap-2">
                                <ArrowLeft className="size-4" />
                                Back to Home
                            </Link>
                        </Button>
                    </nav>

                    <motion.div
                        className="max-w-4xl"
                        variants={staggerContainer}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.span
                            variants={staggerItem}
                            className="inline-block text-sm font-medium tracking-widest uppercase text-primary mb-4"
                        >
                            Legal & Policy
                        </motion.span>
                        <motion.h1
                            variants={staggerItem}
                            className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight mb-6"
                        >
                            {page.title}
                        </motion.h1>

                        <motion.div
                            variants={staggerItem}
                            className="flex items-center gap-3 text-muted-foreground text-sm sm:text-base bg-muted/50 inline-flex px-4 py-2 rounded-full border border-border/50"
                        >
                            <CalendarDays className="size-4 text-primary" />
                            <span>Last Updated: {new Date(page.lastUpdated).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}</span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-16 md:py-24">
                <div className="container mx-auto px-6 lg:px-12">
                    <motion.div
                        className="max-w-4xl mx-auto"
                        variants={fadeInUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={defaultViewport}
                    >
                        <div className="bg-card rounded-2xl border border-border/50 p-6 sm:p-8 md:p-12 shadow-sm">
                            <div className="prose prose-lg dark:prose-invert max-w-none text-muted-foreground">
                                <PortableText
                                    value={page.content}
                                    components={{
                                        block: {
                                            h2: ({ children }) => (
                                                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-foreground mt-10 mb-6 flex items-center gap-3">
                                                    <span className="w-1.5 h-8 bg-primary rounded-full block" />
                                                    {children}
                                                </h2>
                                            ),
                                            h3: ({ children }) => (
                                                <h3 className="text-xl sm:text-2xl font-serif font-bold text-foreground mt-8 mb-4">
                                                    {children}
                                                </h3>
                                            ),
                                            normal: ({ children }) => (
                                                <p className="mb-6 leading-relaxed text-base sm:text-lg">
                                                    {children}
                                                </p>
                                            ),
                                        },
                                        list: {
                                            bullet: ({ children }) => (
                                                <ul className="my-6 space-y-3 pl-2">{children}</ul>
                                            ),
                                            number: ({ children }) => (
                                                <ol className="my-6 space-y-3 list-decimal list-inside">{children}</ol>
                                            ),
                                        },
                                        listItem: {
                                            bullet: ({ children }) => (
                                                <li className="flex items-start gap-3 pl-2 border-l-2 border-primary/20 hover:border-primary/50 transition-colors py-1">
                                                    <span className="block mt-1">•</span>
                                                    <span>{children}</span>
                                                </li>
                                            ),
                                            number: ({ children }) => (
                                                <li className="pl-4">
                                                    {children}
                                                </li>
                                            ),
                                        },
                                        marks: {
                                            strong: ({ children }) => (
                                                <strong className="font-semibold text-foreground bg-primary/5 px-1 py-0.5 rounded">
                                                    {children}
                                                </strong>
                                            ),
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Simple Contact CTA */}
            <section className="pb-24 pt-8">
                <div className="container mx-auto px-6 lg:px-12">
                    <div className="max-w-3xl mx-auto text-center bg-muted/30 rounded-3xl p-8 md:p-12 border border-border/50">
                        <h3 className="font-serif text-2xl font-bold mb-4">Have questions about this policy?</h3>
                        <p className="text-muted-foreground mb-8">
                            If you have any questions or concerns about our {page.title}, please don&apos;t hesitate to reach out to our team.
                        </p>
                        <Button asChild className="rounded-full pl-6 pr-6 shadow-lg shadow-primary/20">
                            <Link href="/contact" className="flex items-center gap-2">
                                Contact Us
                                <ArrowRight className="size-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </section>
        </main>
    )
}

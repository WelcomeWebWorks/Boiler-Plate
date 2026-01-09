'use client'

import Link from "next/link"
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ContactForm } from "@/components/contact/ContactForm"
import { motion } from 'framer-motion'
import {
    fadeInRight,
    staggerContainer,
    staggerItem,
    defaultViewport
} from '@/lib/animations'

interface ContactData {
    email?: string
    phoneNumbers?: string[]
    address?: string
    locationLink?: string
}

interface ContactSectionClientProps {
    data: ContactData
}

export default function ContactSectionClient({ data }: ContactSectionClientProps) {
    return (
        <section id="contact" className="relative py-24 md:py-32 overflow-hidden">
            {/* Background with gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-muted/50 via-background to-muted/30" />

            {/* Decorative Elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent" />

            <div className="container mx-auto px-6 lg:px-12 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="mb-16 max-w-3xl"
                    variants={staggerContainer}
                    initial="hidden"
                    whileInView="visible"
                    viewport={defaultViewport}
                >
                    <motion.span
                        variants={staggerItem}
                        className="text-sm font-medium tracking-widest uppercase text-primary mb-4 block"
                    >
                        Get In Touch
                    </motion.span>
                    <motion.h2
                        variants={staggerItem}
                        className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mb-6 leading-tight"
                    >
                        Let&apos;s Start a<br />
                        Conversation
                    </motion.h2>
                    <motion.p
                        variants={staggerItem}
                        className="text-muted-foreground text-lg sm:text-xl leading-relaxed max-w-2xl"
                    >
                        Have a project in mind? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
                    {/* Contact Info Cards */}
                    <motion.div
                        className="lg:col-span-1 space-y-6"
                        variants={staggerContainer}
                        initial="hidden"
                        whileInView="visible"
                        viewport={defaultViewport}
                    >
                        {/* Email Card */}
                        {data.email && (
                            <motion.div
                                variants={staggerItem}
                                className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                        <Mail className="size-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground mb-1">Email Us</p>
                                        <a
                                            href={`mailto:${data.email}`}
                                            className="text-muted-foreground hover:text-primary transition-colors"
                                        >
                                            {data.email}
                                        </a>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Phone Card */}
                        {data.phoneNumbers && data.phoneNumbers.length > 0 && (
                            <motion.div
                                variants={staggerItem}
                                className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                        <Phone className="size-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground mb-1">Call Us</p>
                                        <div className="flex flex-col gap-1">
                                            {data.phoneNumbers.map((phone: string, index: number) => (
                                                <a
                                                    key={index}
                                                    href={`tel:${phone.replace(/\s+/g, '')}`}
                                                    className="text-muted-foreground hover:text-primary transition-colors"
                                                >
                                                    {phone}
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* Address Card */}
                        {data.address && (
                            <motion.div
                                variants={staggerItem}
                                className="group bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50 hover:border-primary/30 hover:shadow-lg transition-all duration-300"
                            >
                                <div className="flex items-start gap-4">
                                    <div className="bg-primary/10 p-3 rounded-full text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                                        <MapPin className="size-5" />
                                    </div>
                                    <div>
                                        <p className="font-semibold text-foreground mb-1">Visit Us</p>
                                        {data.locationLink ? (
                                            <a
                                                href={data.locationLink}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-muted-foreground hover:text-primary transition-colors whitespace-pre-line text-sm"
                                            >
                                                {data.address}
                                            </a>
                                        ) : (
                                            <p className="text-muted-foreground whitespace-pre-line text-sm">
                                                {data.address}
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {/* CTA Card */}
                        <motion.div
                            variants={staggerItem}
                            className="bg-foreground text-background rounded-2xl p-6 relative overflow-hidden"
                        >
                            <div className="relative z-10">
                                <h3 className="font-serif text-xl font-bold mb-3">Ready to build?</h3>
                                <p className="mb-5 opacity-80 text-sm">
                                    Let&apos;s turn your vision into reality. Our team is ready to help.
                                </p>
                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                                    <Button
                                        asChild
                                        variant="secondary"
                                        className="group/btn rounded-full"
                                    >
                                        <Link href="/contact" className="flex items-center gap-2">
                                            Contact Page
                                            <ArrowRight className="size-4 transition-transform group-hover/btn:translate-x-1" />
                                        </Link>
                                    </Button>
                                </motion.div>
                            </div>
                            <div className="absolute -bottom-12 -right-12 bg-background/10 size-48 rounded-full blur-3xl" />
                            <div className="absolute -top-12 -left-12 bg-background/10 size-48 rounded-full blur-3xl" />
                        </motion.div>
                    </motion.div>

                    {/* Contact Form */}
                    <motion.div
                        className="lg:col-span-2"
                        variants={fadeInRight}
                        initial="hidden"
                        whileInView="visible"
                        viewport={defaultViewport}
                    >
                        <div className="bg-card/90 backdrop-blur-sm rounded-2xl border border-border/50 p-8 md:p-10 shadow-sm">
                            <h3 className="font-serif text-2xl font-bold mb-6 text-foreground">Send a Message</h3>
                            <ContactForm />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

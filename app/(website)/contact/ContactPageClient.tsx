'use client'

import { ContactForm } from "@/components/contact/ContactForm"
import { Badge } from "@/components/ui/badge"
import { Mail, MapPin, Phone } from "lucide-react"
import { motion } from 'framer-motion'
import {
    fadeInLeft,
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

interface ContactPageClientProps {
    data: ContactData
}

export default function ContactPageClient({ data }: ContactPageClientProps) {
    return (
        <main className="min-h-screen bg-background pt-24 pb-20 overflow-x-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    className="max-w-2xl mx-auto text-center mb-16"
                    variants={staggerContainer}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.div variants={staggerItem}>
                        <Badge variant="secondary" className="mb-4 rounded-full px-4 py-1">
                            Get in Touch
                        </Badge>
                    </motion.div>
                    <motion.h1
                        variants={staggerItem}
                        className="font-serif text-4xl md:text-5xl font-bold mb-6 tracking-tight"
                    >
                        Let&apos;s Start a Conversation
                    </motion.h1>
                    <motion.p
                        variants={staggerItem}
                        className="text-xl text-muted-foreground leading-relaxed"
                    >
                        Have a project in mind? We&apos;d love to hear from you. Send us a message and we&apos;ll respond as soon as possible.
                    </motion.p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
                    {/* Contact Info */}
                    <motion.div
                        className="lg:col-span-1 space-y-8"
                        variants={fadeInLeft}
                        initial="hidden"
                        whileInView="visible"
                        viewport={defaultViewport}
                    >
                        <div className="bg-muted/30 rounded-2xl p-8 border border-border/50">
                            <h3 className="font-serif text-2xl font-bold mb-6">Contact Info</h3>
                            <motion.div
                                className="space-y-6"
                                variants={staggerContainer}
                                initial="hidden"
                                whileInView="visible"
                                viewport={defaultViewport}
                            >
                                {data?.email && (
                                    <motion.div variants={staggerItem} className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-full text-primary">
                                            <Mail className="size-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium mb-1">Email Us</p>
                                            <a href={`mailto:${data.email}`} className="text-muted-foreground hover:text-primary transition-colors">
                                                {data.email}
                                            </a>
                                        </div>
                                    </motion.div>
                                )}

                                {data?.phoneNumbers && data.phoneNumbers.length > 0 && (
                                    <motion.div variants={staggerItem} className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-full text-primary">
                                            <Phone className="size-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium mb-1">Call Us</p>
                                            <div className="flex flex-col gap-1">
                                                {data.phoneNumbers.map((phone: string, index: number) => (
                                                    <a key={index} href={`tel:${phone.replace(/\s+/g, '')}`} className="text-muted-foreground hover:text-primary transition-colors">
                                                        {phone}
                                                    </a>
                                                ))}
                                            </div>
                                        </div>
                                    </motion.div>
                                )}

                                {data?.address && (
                                    <motion.div variants={staggerItem} className="flex items-start gap-4">
                                        <div className="bg-primary/10 p-3 rounded-full text-primary">
                                            <MapPin className="size-5" />
                                        </div>
                                        <div>
                                            <p className="font-medium mb-1">Visit Us</p>
                                            {data.locationLink ? (
                                                <a href={data.locationLink} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors whitespace-pre-line">
                                                    {data.address}
                                                </a>
                                            ) : (
                                                <p className="text-muted-foreground whitespace-pre-line">
                                                    {data.address}
                                                </p>
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>

                        <motion.div
                            className="bg-primary text-primary-foreground rounded-2xl p-8 relative overflow-hidden"
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={defaultViewport}
                            transition={{ duration: 0.5, delay: 0.2 }}
                        >
                            <div className="relative z-10">
                                <h3 className="font-serif text-2xl font-bold mb-4">Ready to build?</h3>
                                <p className="mb-6 opacity-90">
                                    Let&apos;s turn your vision into reality. Our team is ready to help you achieve your goals.
                                </p>
                            </div>
                            <div className="absolute -bottom-12 -right-12 bg-primary-foreground/10 size-48 rounded-full blur-3xl" />
                            <div className="absolute -top-12 -left-12 bg-primary-foreground/10 size-48 rounded-full blur-3xl" />
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
                        <div className="bg-card rounded-2xl border border-border/50 p-8 md:p-10 shadow-sm">
                            <h2 className="font-serif text-2xl font-bold mb-6">Send a Message</h2>
                            <ContactForm />
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    )
}

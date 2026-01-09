"use client"

import { siteConfig } from "@/config/site"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Phone, Share2, Grid, ArrowRight } from "lucide-react"
import { toast } from "sonner"
import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"

interface Service {
    title: string
    slug: { current: string }
}

interface MobileNavFooterProps {
    services: Service[]
}

export function MobileNavFooter({ services }: MobileNavFooterProps) {
    const [isOpen, setIsOpen] = useState(false)

    const whatsappNumber = siteConfig.contact.phone.replace(/\D/g, '') // Remove non-digits
    const whatsappMessage = "Hi, I'm interested in your services."

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: siteConfig.name,
                    text: `Check out ${siteConfig.name} for global business solutions!`,
                    url: window.location.href,
                })
            } catch (error) {
                console.log('Error sharing:', error)
            }
        } else {
            navigator.clipboard.writeText(window.location.href)
            toast.success("Link copied to clipboard!")
        }
    }

    const openWhatsApp = () => {
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`, '_blank')
    }

    // Animation variants for menu items
    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: (i: number) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.05,
                duration: 0.3,
                ease: "easeOut" as const
            }
        })
    }

    return (
        <>
            <div className="fixed bottom-0 left-0 right-0 z-50 lg:hidden padding-safe-bottom">
                <nav className="bg-background/80 backdrop-blur-lg border-t border-border/50 pb-safe">
                    <div className="grid grid-cols-4 h-16 items-center justify-items-center">
                        {/* 1. Call */}
                        <a
                            href={`tel:${siteConfig.contact.phone}`}
                            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-primary transition-colors active:scale-95 duration-200"
                        >
                            <Phone className="size-5" />
                            <span className="text-[10px] font-medium">Call</span>
                        </a>

                        {/* 2. WhatsApp */}
                        <button
                            onClick={openWhatsApp}
                            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-green-500 transition-colors active:scale-95 duration-200"
                        >
                            <Image
                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/512px-WhatsApp.svg.png?20220228223904"
                                alt="WhatsApp"
                                width={20}
                                height={20}
                                className="size-5 object-contain"
                            />
                            <span className="text-[10px] font-medium">WhatsApp</span>
                        </button>

                        {/* 3. Services (Drawer) */}
                        <Drawer open={isOpen} onOpenChange={setIsOpen}>
                            <DrawerTrigger asChild>
                                <button className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-primary transition-colors active:scale-95 duration-200">
                                    <Grid className="size-5" />
                                    <span className="text-[10px] font-medium">Services</span>
                                </button>
                            </DrawerTrigger>
                            <DrawerContent>
                                <div className="mx-auto w-full max-w-sm">
                                    <DrawerHeader>
                                        <DrawerTitle className="text-2xl font-bold font-serif text-center">Our Services</DrawerTitle>
                                        <DrawerDescription className="text-center">
                                            Everything you need to grow your business.
                                        </DrawerDescription>
                                    </DrawerHeader>

                                    <div className="p-4 pl-6 overflow-y-auto max-h-[60vh] space-y-2">
                                        <AnimatePresence>
                                            {isOpen && services.map((service, i) => (
                                                <motion.div
                                                    key={service.slug.current}
                                                    custom={i}
                                                    initial="hidden"
                                                    animate="visible"
                                                    variants={itemVariants}
                                                >
                                                    <Link
                                                        href={`/services/${service.slug.current}`}
                                                        onClick={() => setIsOpen(false)}
                                                        className="flex items-center justify-between p-3 rounded-xl bg-muted/40 hover:bg-primary/10 hover:text-primary border border-transparent hover:border-primary/20 transition-all duration-300 group"
                                                    >
                                                        <span className="font-medium">{service.title}</span>
                                                        <ArrowRight className="size-4 opacity-50 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                                                    </Link>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>

                                        {services.length === 0 && (
                                            <p className="text-center text-muted-foreground py-8">No services available at the moment.</p>
                                        )}
                                    </div>

                                    <DrawerFooter>
                                        <DrawerClose asChild>
                                            <Button variant="outline">Close</Button>
                                        </DrawerClose>
                                    </DrawerFooter>
                                </div>
                            </DrawerContent>
                        </Drawer>

                        {/* 4. Share */}
                        <button
                            onClick={handleShare}
                            className="flex flex-col items-center gap-1 p-2 text-muted-foreground hover:text-blue-500 transition-colors active:scale-95 duration-200"
                        >
                            <Share2 className="size-5" />
                            <span className="text-[10px] font-medium">Share</span>
                        </button>
                    </div>
                </nav>
            </div>

            {/* Custom Safe Area Spacer for Content */}
            <div className="h-16 lg:hidden" />
        </>
    )
}

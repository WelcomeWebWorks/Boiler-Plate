'use client'

import { siteConfig } from '@/config/site'

import { useEffect, useState, useActionState, startTransition, useRef } from 'react'
import { X, Loader2, Send, Check, MessageCircle, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select'
import { submitPopupForm } from '@/app/actions/popup'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { motion, AnimatePresence } from 'framer-motion'

interface Service {
    title: string
    slug: { current: string }
}

interface ContactPopupProps {
    services: Service[]
}

const POPUP_STORAGE_KEY = 'company_popup_shown'
const POPUP_DELAY_MS = 5000 // 5 seconds

export function ContactPopup({ services }: ContactPopupProps) {
    const [isOpen, setIsOpen] = useState(false)
    const [submissionMethod, setSubmissionMethod] = useState<'email' | 'whatsapp'>('email')
    const [selectedService, setSelectedService] = useState('')
    const formRef = useRef<HTMLFormElement>(null)

    const [state, formAction, isPending] = useActionState(submitPopupForm, {
        success: false,
        message: '',
    })

    // Check if popup should be shown
    useEffect(() => {
        const checkAndShowPopup = () => {
            // Check localStorage for last shown date
            const lastShown = localStorage.getItem(POPUP_STORAGE_KEY)
            const today = new Date().toDateString()

            // If shown today, don't show again
            if (lastShown === today) {
                return
            }

            // Check if user is in hero section (top of page)
            const isInHeroSection = window.scrollY < window.innerHeight

            if (isInHeroSection) {
                setIsOpen(true)
                // Mark as shown for today
                localStorage.setItem(POPUP_STORAGE_KEY, today)
            }
        }

        // Set timeout for 5 seconds
        const timer = setTimeout(checkAndShowPopup, POPUP_DELAY_MS)

        return () => clearTimeout(timer)
    }, [])

    // Handle successful submission
    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message)
                // Defer setState to avoid cascading renders
                const timer = setTimeout(() => {
                    setIsOpen(false)
                }, 0)
                return () => clearTimeout(timer)
            } else {
                toast.error(state.message)
            }
        }
    }, [state])

    const handleClose = () => {
        setIsOpen(false)
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()

        const formData = new FormData(formRef.current!)

        if (submissionMethod === 'whatsapp') {
            const name = formData.get('name') as string
            const email = formData.get('email') as string
            const service = selectedService
            const message = formData.get('message') as string

            const text = `*New Inquiry*\n\n*Name:* ${name}\n*Email:* ${email}\n*Service Interested:* ${service}\n*Message:* ${message || 'No message'}`
            const phone = siteConfig.contact.phone.replace(/\D/g, '')
            const url = `https://wa.me/${phone}?text=${encodeURIComponent(text)}`
            window.open(url, '_blank')
            toast.success('Redirecting to WhatsApp...')
            setIsOpen(false)
        } else {
            startTransition(() => {
                formAction(formData)
            })
        }
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                    {/* Backdrop */}
                    <motion.div
                        className="absolute inset-0 bg-foreground/60 backdrop-blur-sm"
                        onClick={handleClose}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    />

                    {/* Popup */}
                    <motion.div
                        className="relative w-full max-w-md bg-card rounded-2xl shadow-2xl overflow-hidden"
                        initial={{ opacity: 0, scale: 0.9, y: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 20 }}
                        transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                    >
                        {/* Close Button */}
                        <motion.button
                            onClick={handleClose}
                            className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-muted/80 hover:bg-muted flex items-center justify-center transition-colors"
                            aria-label="Close popup"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                        >
                            <X className="size-4 text-muted-foreground" />
                        </motion.button>

                        {/* Header */}
                        <div className="bg-primary/10 px-6 pt-8 pb-6">
                            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-foreground mb-2">
                                Let&apos;s Connect!
                            </h2>
                            <p className="text-muted-foreground text-sm sm:text-base">
                                Tell us what you&apos;re looking for and we&apos;ll get back to you shortly.
                            </p>
                        </div>

                        {/* Form */}
                        <form ref={formRef} onSubmit={handleSubmit} className="p-6 space-y-4">
                            {/* Name */}
                            <div className="space-y-2">
                                <Label htmlFor="popup-name" className="text-sm font-medium">
                                    Your Name <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="popup-name"
                                    name="name"
                                    placeholder="John Doe"
                                    required
                                    autoComplete="name"
                                    disabled={isPending}
                                    className="rounded-lg"
                                />
                            </div>

                            {/* Email */}
                            <div className="space-y-2">
                                <Label htmlFor="popup-email" className="text-sm font-medium">
                                    Email Address <span className="text-destructive">*</span>
                                </Label>
                                <Input
                                    id="popup-email"
                                    name="email"
                                    type="email"
                                    placeholder="john@example.com"
                                    required
                                    autoComplete="email"
                                    disabled={isPending}
                                    className="rounded-lg"
                                />
                            </div>

                            {/* Service Dropdown */}
                            <div className="space-y-2">
                                <Label htmlFor="popup-service" className="text-sm font-medium">
                                    Service You&apos;re Looking For <span className="text-destructive">*</span>
                                </Label>
                                <Select
                                    name="service"
                                    value={selectedService}
                                    onValueChange={setSelectedService}
                                    required
                                    disabled={isPending}
                                >
                                    <SelectTrigger className="rounded-lg" id="popup-service">
                                        <SelectValue placeholder="Select a service" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {services.map((service, index) => (
                                            <SelectItem key={index} value={service.title}>
                                                {service.title}
                                            </SelectItem>
                                        ))}
                                        <SelectItem value="Other">Other</SelectItem>
                                    </SelectContent>
                                </Select>
                                <input type="hidden" name="service" value={selectedService} />
                            </div>

                            {/* Message */}
                            <div className="space-y-2">
                                <Label htmlFor="popup-message" className="text-sm font-medium">
                                    Message <span className="text-muted-foreground">(Optional)</span>
                                </Label>
                                <Textarea
                                    id="popup-message"
                                    name="message"
                                    placeholder="Tell us more about your requirements..."
                                    rows={3}
                                    disabled={isPending}
                                    className="rounded-lg resize-none"
                                />
                            </div>

                            {/* Submission Method */}
                            <div className="space-y-3 pt-2">
                                <Label className="text-sm font-medium">How would you like us to connect?</Label>
                                <RadioGroup
                                    value={submissionMethod}
                                    onValueChange={(val) => setSubmissionMethod(val as 'email' | 'whatsapp')}
                                    className="flex gap-4"
                                    disabled={isPending}
                                >
                                    <div className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors",
                                        submissionMethod === 'email' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                                    )}>
                                        <RadioGroupItem value="email" id="popup-email-option" />
                                        <label htmlFor="popup-email-option" className="flex items-center gap-2 cursor-pointer text-sm">
                                            <Mail className="size-4" />
                                            Email
                                        </label>
                                    </div>
                                    <div className={cn(
                                        "flex items-center gap-2 px-4 py-2 rounded-lg border cursor-pointer transition-colors",
                                        submissionMethod === 'whatsapp' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                                    )}>
                                        <RadioGroupItem value="whatsapp" id="popup-whatsapp-option" />
                                        <label htmlFor="popup-whatsapp-option" className="flex items-center gap-2 cursor-pointer text-sm">
                                            <MessageCircle className="size-4" />
                                            WhatsApp
                                        </label>
                                    </div>
                                </RadioGroup>
                            </div>

                            {/* Submit Button */}
                            <Button
                                type="submit"
                                className="w-full rounded-lg py-5"
                                disabled={isPending || !selectedService}
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 size-4 animate-spin" />
                                        Sending...
                                    </>
                                ) : state.success ? (
                                    <>
                                        <Check className="mr-2 size-4" />
                                        Sent!
                                    </>
                                ) : (
                                    <>
                                        {submissionMethod === 'whatsapp' ? 'Open WhatsApp' : 'Submit'}
                                        <Send className="ml-2 size-4" />
                                    </>
                                )}
                            </Button>

                            <p className="text-xs text-center text-muted-foreground">
                                We respect your privacy and won&apos;t spam you.
                            </p>
                        </form>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    )
}

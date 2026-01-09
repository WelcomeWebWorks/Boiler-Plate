'use client'

import { useActionState, startTransition, useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { subscribeNewsletter } from '@/app/actions/newsletter'
import { Loader2, Send, Check } from 'lucide-react'
import { toast } from 'sonner'

export function NewsletterForm() {
    const [state, formAction, isPending] = useActionState(subscribeNewsletter, {
        success: false,
        message: '',
    })

    const formRef = useRef<HTMLFormElement>(null)

    useEffect(() => {
        if (state.message) {
            if (state.success) {
                toast.success(state.message)
                formRef.current?.reset()
            } else {
                toast.error(state.message)
            }
        }
    }, [state])

    return (
        <form
            ref={formRef}
            action={formAction}
            onSubmit={(e) => {
                e.preventDefault()
                const formData = new FormData(formRef.current!)

                // Add device details
                formData.append('userAgent', navigator.userAgent)

                startTransition(() => {
                    formAction(formData)
                })
            }}
            className="w-full"
        >
            <div className="flex flex-col sm:flex-row gap-3">
                <label htmlFor="newsletter-email" className="sr-only">
                    Email address
                </label>
                <Input
                    className="bg-neutral-100 text-neutral-900 placeholder:text-neutral-500 border-none focus-visible:ring-2 focus-visible:ring-primary/50 rounded-full px-5 py-6 flex-grow shadow-lg"
                    placeholder="Enter your email address"
                    type="email"
                    id="newsletter-email"
                    required
                    name="email"
                    autoComplete="email"
                    disabled={isPending}
                />
                <Button
                    type="submit"
                    disabled={isPending}
                    className="rounded-full px-8 py-6 whitespace-nowrap shadow-lg font-medium text-base transition-transform active:scale-95"
                >
                    {isPending ? (
                        <>
                            <Loader2 className="mr-2 size-4 animate-spin" />
                            Subscribing...
                        </>
                    ) : state.success ? (
                        <>
                            <Check className="mr-2 size-4" />
                            Subscribed!
                        </>
                    ) : (
                        <>
                            Subscribe
                            <Send className="ml-2 size-4" />
                        </>
                    )}
                </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-3">
                Get the latest updates and news delivered to your inbox.
            </p>
        </form>
    )
}

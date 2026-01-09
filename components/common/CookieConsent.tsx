"use client"

import * as React from "react"
import { Cookie, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function CookieConsent() {
    const [isVisible, setIsVisible] = React.useState(false)

    React.useEffect(() => {
        // Check if user has already made a choice
        const consent = localStorage.getItem("cookie_consent")
        if (consent === null) {
            // Small delay to prevent layout shift/jarring effect on load
            const timer = setTimeout(() => setIsVisible(true), 1000)
            return () => clearTimeout(timer)
        }
    }, [])

    const acceptCookies = () => {
        localStorage.setItem("cookie_consent", "granted")
        setIsVisible(false)
        window.dispatchEvent(new Event("cookie-consent-update"))
    }

    const declineCookies = () => {
        localStorage.setItem("cookie_consent", "denied")
        setIsVisible(false)
        window.dispatchEvent(new Event("cookie-consent-update"))
    }

    if (!isVisible) return null

    return (
        <div className={cn(
            "fixed bottom-4 left-4 right-4 md:left-auto md:right-4 md:max-w-md z-50",
            "p-6 rounded-lg shadow-2xl border border-border bg-background/95 backdrop-blur-sm",
            "flex flex-col gap-4 animate-in slide-in-from-bottom-2 duration-500"
        )}>
            <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-2 font-semibold">
                    <Cookie className="h-5 w-5 text-primary" />
                    <span>We use cookies</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-6 w-6 -mt-1 -mr-1"
                    onClick={() => setIsVisible(false)}
                >
                    <X className="h-4 w-4" />
                    <span className="sr-only">Close</span>
                </Button>
            </div>

            <p className="text-sm text-muted-foreground">
                We use analytics cookies to understand how you use our website and improve your experience.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2">
                <Button variant="outline" size="sm" onClick={declineCookies}>
                    Decline
                </Button>
                <Button size="sm" onClick={acceptCookies}>
                    Accept
                </Button>
            </div>
        </div>
    )
}

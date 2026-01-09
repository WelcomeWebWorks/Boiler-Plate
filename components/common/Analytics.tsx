'use client'

import Script from 'next/script'
import * as React from 'react'


export function Analytics() {
    const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID
    const [consentGranted, setConsentGranted] = React.useState(false)

    React.useEffect(() => {
        // Check initial consent
        const consent = localStorage.getItem("cookie_consent")
        if (consent === "granted") {
            setConsentGranted(true)
        }

        // Listen for updates
        const handleConsentUpdate = () => {
            const newConsent = localStorage.getItem("cookie_consent")
            if (newConsent === "granted") {
                setConsentGranted(true)
            } else {
                setConsentGranted(false)
            }
        }

        window.addEventListener("cookie-consent-update", handleConsentUpdate)
        return () => window.removeEventListener("cookie-consent-update", handleConsentUpdate)
    }, [])

    if (!GA_MEASUREMENT_ID || !consentGranted) {
        return null
    }

    return (
        <>
            <Script
                strategy="afterInteractive"
                src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
            />
            <Script
                id="google-analytics"
                strategy="afterInteractive"
                dangerouslySetInnerHTML={{
                    __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_MEASUREMENT_ID}', {
              page_path: window.location.pathname,
            });
          `,
                }}
            />
        </>
    )
}

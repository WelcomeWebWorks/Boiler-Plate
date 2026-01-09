import { Metadata } from 'next'
import Link from 'next/link'
import { siteConfig } from '@/config/site'
import { Button } from '@/components/ui/button'
import { ArrowLeft, Home } from 'lucide-react'

export const metadata: Metadata = {
    title: `Page Not Found - ${siteConfig.name}`,
    description: 'The page you are looking for does not exist.',
    robots: {
        index: false,
        follow: true,
    },
}

export default function NotFound() {
    return (
        <main className="min-h-screen bg-background flex items-center justify-center px-6">
            <div className="text-center max-w-lg">
                <div className="mb-8">
                    <span className="text-9xl font-serif font-bold text-primary/20">404</span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl font-bold text-foreground mb-4">
                    Page Not Found
                </h1>
                <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
                    Oops! The page you&apos;re looking for doesn&apos;t exist or has been moved.
                    Let&apos;s get you back on track.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                    <Button asChild size="lg" className="rounded-full px-8">
                        <Link href="/" className="flex items-center gap-2">
                            <Home className="size-4" />
                            Go to Homepage
                        </Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-full px-8">
                        <Link href="/services" className="flex items-center gap-2">
                            <ArrowLeft className="size-4" />
                            View Services
                        </Link>
                    </Button>
                </div>
            </div>
        </main>
    )
}

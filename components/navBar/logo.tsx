import Image from 'next/image'
import { cn } from '@/lib/utils'
import { siteConfig } from '@/config/site'

interface LogoProps {
    className?: string
    variant?: 'default' | 'light'
    logoUrl?: string | null
    logoLightUrl?: string | null
    companyName?: string
    alt?: string
}

export function Logo({
    className,
    variant = 'default',
    logoUrl,
    logoLightUrl,
    companyName = siteConfig.name,
    alt = `${siteConfig.name} Logo`
}: LogoProps) {
    // Choose the right logo based on variant
    const currentLogoUrl = variant === 'light' && logoLightUrl ? logoLightUrl : logoUrl

    // Text color based on variant - dark text for default (light bg), light text for light variant (dark bg)
    const textColorClass = variant === 'light' ? 'text-background' : 'text-foreground'

    if (currentLogoUrl) {
        return (
            <div
                className={cn('relative h-12', className)}
                style={{ aspectRatio: '180/48' }}
            >
                <Image
                    src={currentLogoUrl}
                    alt={alt}
                    fill
                    className="object-contain"
                    priority
                    sizes="(max-width: 768px) 100vw, 200px"
                />
            </div>
        )
    }

    // Fallback to company name text
    return (
        <span className={cn(
            'font-serif font-bold text-xl sm:text-2xl tracking-tight',
            textColorClass,
            className
        )}>
            {companyName}
        </span>
    )
}

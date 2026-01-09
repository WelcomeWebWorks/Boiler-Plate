
import { ImageResponse } from '@vercel/og'
import { NextRequest } from 'next/server'
import { siteConfig } from '@/config/site'

export const runtime = 'edge'

export async function GET(request: NextRequest) {
    try {
        const { searchParams } = new URL(request.url)

        // ?title=<title>
        const hasTitle = searchParams.has('title')
        const title = hasTitle
            ? searchParams.get('title')?.slice(0, 100)
            : siteConfig.name

        // ?description=<description>
        const hasDescription = searchParams.has('description')
        const description = hasDescription
            ? searchParams.get('description')?.slice(0, 200)
            : siteConfig.description

        return new ImageResponse(
            (
                <div
                    style={{
                        height: '100%',
                        width: '100%',
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundImage: 'linear-gradient(to bottom right, #0F172A, #1E293B)',
                        color: 'white',
                        fontFamily: 'sans-serif',
                        padding: '40px 80px',
                        textAlign: 'center',
                    }}
                >
                    {/* Logo / Brand Name */}
                    <div
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginBottom: 40,
                        }}
                    >
                        <div
                            style={{
                                fontSize: 32,
                                fontWeight: 700,
                                color: '#3B82F6',
                                marginRight: 16,
                                letterSpacing: '-0.02em',
                            }}
                        >
                            {siteConfig.name}
                        </div>
                    </div>

                    {/* Title */}
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <div
                            style={{
                                fontSize: 60,
                                fontWeight: 900,
                                lineHeight: 1.1,
                                marginBottom: 24,
                                width: '100%',
                                wordWrap: 'break-word',
                                backgroundClip: 'text',
                                backgroundImage: 'linear-gradient(to right, #60A5FA, #ffffff)',
                                color: 'transparent',
                            }}
                        >
                            {title}
                        </div>

                        {/* Description */}
                        <div
                            style={{
                                fontSize: 32,
                                color: '#94A3B8',
                                lineHeight: 1.4,
                                width: '80%',
                            }}
                        >
                            {description}
                        </div>
                    </div>
                </div>
            ),
            {
                width: 1200,
                height: 630,
            }
        )
    } catch (e: unknown) {
        console.log(`${(e as Error).message}`)
        return new Response(`Failed to generate the image`, {
            status: 500,
        })
    }
}

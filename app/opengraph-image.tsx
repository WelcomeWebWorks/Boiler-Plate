import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config/site'

export const runtime = 'edge'

export const alt = `${siteConfig.name} - Global Business Solutions`
export const size = {
    width: 1200,
    height: 630,
}
export const contentType = 'image/png'

export default async function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    fontSize: 60,
                    background: 'linear-gradient(to bottom right, #ffffff, #f0f0f0)',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    fontWeight: 800,
                    color: '#000',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 20,
                    }}
                >
                    {/* Replace with your logo SVG if available or use text */}
                    <div style={{ fontSize: 80 }}>Example Logo</div>
                </div>
                <div style={{ marginTop: 40, fontSize: 60, textAlign: 'center' }}>
                    {siteConfig.name}
                </div>
                <div style={{ marginTop: 20, fontSize: 30, color: '#666', fontWeight: 'normal', maxWidth: 800, textAlign: 'center' }}>
                    {siteConfig.description}
                </div>
            </div>
        ),
        {
            ...size,
        }
    )
}

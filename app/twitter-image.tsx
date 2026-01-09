import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config/site'



export const alt = `${siteConfig.name}`
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
                    fontSize: 48,
                    background: '#ffffff',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'sans-serif',
                    fontWeight: 700,
                    color: '#000',
                    border: '20px solid #f0f0f0',
                }}
            >
                <div style={{ marginTop: 0, fontSize: 80 }}>{siteConfig.name}</div>
            </div>
        ),
        {
            ...size,
        }
    )
}

import { ImageResponse } from 'next/og'
import { siteConfig } from '@/config/site'

// Image metadata
export const size = {
    width: 180,
    height: 180,
}
export const contentType = 'image/png'

// Image generation
export default function Icon() {
    return new ImageResponse(
        (
            // ImageResponse JSX element
            <div
                style={{
                    fontSize: 120,
                    background: 'black',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    borderRadius: 20, // matching typical apple icon rounding (though iOS does it too)
                }}
            >
                {siteConfig.name[0]}
            </div>
        ),
        // ImageResponse options
        {
            ...size,
        }
    )
}

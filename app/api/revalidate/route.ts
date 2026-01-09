import { revalidatePath } from 'next/cache'
import { type NextRequest, NextResponse } from 'next/server'
import { parseBody } from 'next-sanity/webhook'

export async function POST(req: NextRequest) {
    try {
        const { isValidSignature, body } = await parseBody<{
            _type: string
            slug?: { current: string }
        }>(
            req,
            process.env.SANITY_REVALIDATE_SECRET
        )

        if (!isValidSignature) {
            return new Response('Invalid signature', { status: 401 })
        }

        if (!body?._type) {
            return new Response('Bad Request', { status: 400 })
        }

        // Revalidate the home page
        revalidatePath('/')

        // Revalidate the blog page
        revalidatePath('/blog')

        // Ideally, we should revalidate specific paths based on the document type
        // For now, revalidating key paths is a good start. 
        // If it's a post, revalidate the specific post page too.
        if (body._type === 'post' && body.slug?.current) {
            revalidatePath(`/blog/${body.slug.current}`)
        }

        if (body._type === 'service' && body.slug?.current) {
            revalidatePath(`/services/${body.slug.current}`)
            revalidatePath('/services')
        }

        return NextResponse.json({
            status: 200,
            revalidated: true,
            now: Date.now(),
            body,
        })
    } catch (err) {
        console.error(err)
        return new Response(err instanceof Error ? err.message : 'Unknown Error', { status: 500 })
    }
}

import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import HeroSectionClient from './HeroSectionClient'

async function getHeroData() {
    const query = `*[_type == "hero"][0]`
    const data = await client.fetch(query)
    return data
}

export default async function HeroSection() {
    const data = await getHeroData()

    if (!data) {
        return null
    }

    const heroContent = {
        announcement: data.announcement,
        heading: data.heading,
        subheading: data.subheading,
        primaryButton: data.primaryButton,
        secondaryButton: data.secondaryButton,
        appScreenImages: data.appScreenImages?.map((img: SanityImageSource) => urlFor(img).url()) || [],
    }

    return <HeroSectionClient heroContent={heroContent} />
}

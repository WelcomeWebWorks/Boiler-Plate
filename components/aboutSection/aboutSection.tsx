import { client } from '@/sanity/lib/client'
import { urlFor } from '@/sanity/lib/image'
import AboutSectionClient from './AboutSectionClient'

async function getAboutData() {
    const query = `*[_type == "about"][0]`
    const data = await client.fetch(query)
    return data
}

export default async function ContentSection() {
    const data = await getAboutData()

    if (!data) {
        return null
    }

    const imageUrl = data.image ? urlFor(data.image).url() : undefined

    return <AboutSectionClient data={data} imageUrl={imageUrl} />
}

import { client } from '@/sanity/lib/client'
import { ContactPopup } from './ContactPopup'

async function getServices() {
    const query = `*[_type == "service"] | order(_createdAt desc) {
        title,
        slug
    }`
    return await client.fetch(query)
}

export default async function PopupWrapper() {
    const services = await getServices()

    return <ContactPopup services={services || []} />
}

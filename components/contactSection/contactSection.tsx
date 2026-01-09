import { client } from "@/sanity/lib/client"
import ContactSectionClient from "./ContactSectionClient"

async function getContactInfo() {
    const query = `*[_type == "contact"][0] {
    email,
    phoneNumbers,
    address,
    locationLink
  }`
    return await client.fetch(query)
}

export default async function ContactSection() {
    const data = await getContactInfo()

    if (!data) {
        return null
    }

    return <ContactSectionClient data={data} />
}

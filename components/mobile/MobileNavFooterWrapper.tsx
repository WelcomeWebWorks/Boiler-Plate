
import { client } from "@/sanity/lib/client"
import { MobileNavFooter } from "./MobileNavFooter"

export async function MobileNavFooterWrapper() {
    const services = await client.fetch(`*[_type == "service"]{ title, slug }`)
    return <MobileNavFooter services={services} />
}

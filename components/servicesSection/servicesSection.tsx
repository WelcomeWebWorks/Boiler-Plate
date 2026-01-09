import { client } from "@/sanity/lib/client"
import ServicesSectionClient from "./ServicesSectionClient"

async function getServices() {
  const query = `*[_type == "service"]`
  const data = await client.fetch(query)
  return data
}

export default async function ServicesSection() {
  const services = await getServices()

  if (!services || services.length === 0) {
    return null
  }

  return <ServicesSectionClient services={services} />
}

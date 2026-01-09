import { client } from "@/sanity/lib/client"
import TestimonialsSectionClient from "./TestimonialsSectionClient"

async function getTestimonials() {
  const query = `*[_type == "testimonial"]`
  const data = await client.fetch(query)
  return data
}

export default async function TestimonialsSection() {
  const testimonials = await getTestimonials()

  if (!testimonials || testimonials.length === 0) {
    return null
  }

  return <TestimonialsSectionClient testimonials={testimonials} />
}

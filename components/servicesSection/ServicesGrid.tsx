"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { urlFor } from "@/sanity/lib/image"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"
import { motion, Variants } from "framer-motion"
import { ArrowRight } from "lucide-react"

interface Service {
  title: string
  slug: { current: string }
  shortDescription: string
  mainImage?: SanityImageSource
}

interface ServicesGridProps {
  services: Service[]
}

const container: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15
    }
  }
}

const item: Variants = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
}

export function ServicesGrid({ services }: ServicesGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-50px" }}
      className="space-y-16 lg:space-y-24"
    >
      {services.map((service, index) => {
        const isEven = index % 2 === 0

        return (
          <motion.div
            key={index}
            variants={item}
            className={`group relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${isEven ? '' : 'lg:flex-row-reverse'
              }`}
          >
            {/* Image Section */}
            <div className={`lg:col-span-5 ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
              <div className="relative">
                {/* Decorative Shape Behind Image */}
                <div className={`absolute -z-10 w-full h-full rounded-[2rem] bg-muted/50 ${isEven ? '-right-4 -bottom-4' : '-left-4 -bottom-4'
                  }`} />

                {/* Image Container */}
                <div className="relative overflow-hidden rounded-[2rem] bg-muted">
                  {service.mainImage && (
                    <div className="aspect-[4/3] relative">
                      <Image
                        src={urlFor(service.mainImage).url()}
                        // eslint-disable-next-line @typescript-eslint/no-explicit-any
                        alt={(service.mainImage as any).alt || service.title}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 40vw"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Content Section */}
            <div className={`lg:col-span-7 ${isEven ? 'lg:order-2 lg:pl-8' : 'lg:order-1 lg:pr-8'}`}>
              <div className="max-w-lg">
                {/* Service Title */}
                <h3 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4 group-hover:text-primary transition-colors duration-300">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground text-base sm:text-lg leading-relaxed mb-8">
                  {service.shortDescription}
                </p>

                {/* CTA Button */}
                <Button
                  asChild
                  variant="outline"
                  className="group/btn rounded-full px-6 py-5 border-2 border-primary/30 hover:border-primary hover:bg-primary hover:text-primary-foreground transition-all duration-300"
                >
                  <Link href={`/services/${service.slug.current}`} className="flex items-center gap-2">
                    Learn More
                    <ArrowRight className="size-4 transition-transform duration-300 group-hover/btn:translate-x-1" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { urlFor } from "@/sanity/lib/image"
import { motion, Variants } from "framer-motion"
import { Quote, Star } from "lucide-react"
import { SanityImageSource } from "@sanity/image-url/lib/types/types"

export interface Testimonial {
  name: string
  role?: string
  company?: string
  testimonial: string
  avatar?: SanityImageSource
  rating?: number
}

export interface TestimonialsGridProps {
  testimonials: Testimonial[]
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

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`size-4 ${star <= rating
            ? "fill-yellow-400 text-yellow-400"
            : "fill-none text-muted-foreground/30"
            }`}
        />
      ))}
    </div>
  )
}

export function TestimonialsGrid({ testimonials }: TestimonialsGridProps) {
  // Determine if we should show featured layout (3+ testimonials)
  const showFeatured = testimonials.length >= 3

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-50px" }}
      className={`grid gap-8 ${showFeatured
        ? 'grid-cols-1 lg:grid-cols-3 lg:grid-rows-[auto_1fr]'
        : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}
    >
      {testimonials.map((testimonial, index) => {
        // Featured card in center for first 3 testimonials
        const isFeatured = showFeatured && index === 1

        return (
          <motion.div
            key={index}
            variants={item}
            className={`${isFeatured ? 'lg:row-span-2' : ''}`}
          >
            <div className={`group h-full flex flex-col rounded-2xl transition-all duration-500 ${isFeatured
              ? 'bg-foreground text-background p-8 lg:p-10'
              : 'bg-card/80 backdrop-blur-sm border border-border/50 p-6 lg:p-8 hover:shadow-xl hover:-translate-y-2'
              }`}>

              {/* Quote Icon */}
              <Quote className={`size-8 mb-6 ${isFeatured ? 'text-background/30' : 'text-primary/30'
                }`} />

              {/* Testimonial Text */}
              <blockquote className={`text-base lg:text-lg leading-relaxed mb-8 flex-grow ${isFeatured ? 'text-background/90' : 'text-muted-foreground'
                }`}>
                &quot;{testimonial.testimonial}&quot;
              </blockquote>

              {/* Rating */}
              {testimonial.rating && (
                <div className="mb-6">
                  <StarRating rating={testimonial.rating} />
                </div>
              )}

              {/* Divider */}
              <div className={`w-full h-px mb-6 ${isFeatured ? 'bg-background/20' : 'bg-border'
                }`} />

              {/* Author Info */}
              <div className="flex items-center gap-4">
                <Avatar className={`size-12 ring-2 ${isFeatured ? 'ring-background/30' : 'ring-border'
                  }`}>
                  {testimonial.avatar ? (
                    <AvatarImage
                      src={urlFor(testimonial.avatar).url()}
                      alt={testimonial.name}
                    />
                  ) : (
                    <AvatarFallback className={`font-semibold ${isFeatured ? 'bg-background/20 text-background' : 'bg-primary/10 text-primary'
                      }`}>
                      {testimonial.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    </AvatarFallback>
                  )}
                </Avatar>
                <div className="flex-1 min-w-0">
                  <h3 className={`font-semibold text-base ${isFeatured ? 'text-background' : 'text-foreground'
                    }`}>
                    {testimonial.name}
                  </h3>
                  <p className={`text-sm ${isFeatured ? 'text-background/70' : 'text-muted-foreground'
                    }`}>
                    {testimonial.role}
                    {testimonial.company && ` at ${testimonial.company}`}
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )
      })}
    </motion.div>
  )
}

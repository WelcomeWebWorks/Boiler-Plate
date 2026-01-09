import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock } from "lucide-react"
import { urlFor } from "@/sanity/lib/image"

import { SanityImageSource } from "@sanity/image-url/lib/types/types"

export interface BlogPost {
  id: string
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  image: SanityImageSource
  author: {
    name: string
    role: string
    avatarUrl: SanityImageSource
  }
}

interface BlogCardProps {
  post: BlogPost
  featured?: boolean
}

export function BlogCard({ post, featured = false }: BlogCardProps) {
  const imageUrl = post.image ? urlFor(post.image).url() : ''
  const avatarUrl = post.author.avatarUrl ? urlFor(post.author.avatarUrl).url() : ''

  if (featured) {
    return (
      <Link href={`/blog/${post.id}`} className="block group">
        <div className="grid md:grid-cols-2 gap-8 items-center">
          <div className="relative aspect-4/3 md:aspect-16/10 w-full overflow-hidden rounded-2xl bg-muted">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            )}
          </div>
          <div className="flex flex-col justify-center space-y-4">
            <div className="flex items-center gap-3 text-sm text-muted-foreground">
              <Badge variant="secondary" className="rounded-full px-4 py-1 font-medium">{post.category}</Badge>
              <span className="flex items-center gap-1"><Calendar className="size-3.5" /> {post.date}</span>
              <span className="flex items-center gap-1"><Clock className="size-3.5" /> {post.readTime}</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl font-bold leading-tight group-hover:text-primary transition-colors duration-300">
              {post.title}
            </h2>
            <p className="text-muted-foreground text-lg leading-relaxed line-clamp-3">
              {post.excerpt}
            </p>
            <div className="flex items-center gap-3 pt-4">
              <Avatar className="size-10 border border-border">
                <AvatarImage src={avatarUrl} alt={post.author.name} />
                <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{post.author.name}</p>
                <p className="text-xs text-muted-foreground">{post.author.role}</p>
              </div>
            </div>
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link href={`/blog/${post.id}`} className="h-full">
      <Card className="group h-full flex flex-col overflow-hidden border-transparent shadow-none hover:shadow-none bg-transparent">
        <CardHeader className="p-0 mb-4">
          <div className="relative aspect-3/2 w-full overflow-hidden rounded-xl bg-muted">
            {imageUrl && (
              <Image
                src={imageUrl}
                alt={post.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="p-0 grow flex flex-col gap-3">
          <div className="flex items-center gap-3 text-xs text-muted-foreground font-medium uppercase tracking-wider">
            <span className="text-primary">{post.category}</span>
            <span>•</span>
            <span>{post.date}</span>
          </div>
          <h3 className="font-serif text-2xl font-bold leading-snug group-hover:text-primary transition-colors duration-300 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-muted-foreground leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>
        </CardContent>
        <CardFooter className="p-0 pt-6 mt-auto flex items-center justify-between border-t border-border/40">
          <div className="flex items-center gap-3">
            <Avatar className="size-8">
              <AvatarImage src={avatarUrl} alt={post.author.name} />
              <AvatarFallback>{post.author.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium text-muted-foreground">{post.author.name}</span>
          </div>
          <span className="text-xs text-muted-foreground font-medium flex items-center gap-1">
            <Clock className="size-3" /> {post.readTime}
          </span>
        </CardFooter>
      </Card>
    </Link>
  )
}

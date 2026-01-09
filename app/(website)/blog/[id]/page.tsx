import { Metadata } from "next"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, Clock } from "lucide-react"
import { BlogCard, BlogPost } from "@/components/blog/BlogCard"
import { ShareButton } from "@/components/blog/ShareButton"
import { client } from "@/sanity/lib/client"
import { urlFor } from "@/sanity/lib/image"
import { PortableText } from "@portabletext/react"
import { generateBreadcrumbJsonLd, generatePageMetadata } from "@/lib/seo-config"
import { siteConfig } from "@/config/site"

async function getPost(slug: string) {
  const query = `*[_type == "post" && slug.current == $slug][0] {
    "id": slug.current,
    title,
    excerpt,
    content,
    date,
    readTime,
    category,
    image,
    "author": {
      "name": authorName,
      "role": authorRole,
      "avatarUrl": authorAvatar
    },
    seo
  }`
  return await client.fetch(query, { slug })
}

async function getRelatedPosts(category: string, currentSlug: string) {
  const query = `*[_type == "post" && category == $category && slug.current != $currentSlug][0...3] {
    "id": slug.current,
    title,
    excerpt,
    date,
    readTime,
    category,
    image,
    "author": {
      "name": authorName,
      "role": authorRole,
      "avatarUrl": authorAvatar
    }
  }`
  return await client.fetch(query, { category, currentSlug })
}

// Generate dynamic metadata for blog post
export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const post = await getPost(id)

  if (!post) {
    return {
      title: "Post Not Found",
      description: "The requested blog post could not be found.",
    }
  }

  const imageUrl = post.image ? urlFor(post.image).url() : siteConfig.ogImage
  const siteName = siteConfig.name

  return generatePageMetadata(
    `${post.title} - ${siteName} Blog`,
    post.excerpt || `Read ${post.title} on the ${siteName} blog.`,
    `/blog/${id}`,
    [
      post.category,
      `${siteName} blog`,
      "business insights",
      "industry articles",
    ],
    post.seo
  )
}

export default async function BlogDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const post = await getPost(id)

  if (!post) {
    return (
      <div className="container mx-auto px-6 py-32 text-center">
        <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
        <Button asChild>
          <Link href="/blog">Back to Blog</Link>
        </Button>
      </div>
    )
  }

  const relatedPosts = await getRelatedPosts(post.category, id)
  const imageUrl = post.image ? urlFor(post.image).url() : ''
  const avatarUrl = post.author.avatarUrl ? urlFor(post.author.avatarUrl).url() : ''

  // Breadcrumb structured data
  const blogPostBreadcrumb = generateBreadcrumbJsonLd([
    { name: "Home", url: siteConfig.url },
    { name: "Blog", url: `${siteConfig.url}/blog` },
    { name: post.title, url: `${siteConfig.url}/blog/${id}` },
  ])

  // Article structured data
  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.date,
    author: {
      "@type": "Person",
      name: post.author?.name || siteConfig.name,
      jobTitle: post.author?.role,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: siteConfig.ogImage,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${siteConfig.url}/blog/${id}`,
    },
  }

  return (
    <>
      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogPostBreadcrumb),
        }}
      />
      {/* Article structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(articleJsonLd),
        }}
      />
      <main className="min-h-screen bg-background pt-24">
        {/* Navigation */}
        <div className="sticky top-24 z-10 pointer-events-none">
          <div className="container mx-auto px-6 h-16 flex items-center justify-between pointer-events-auto">
            <Button asChild variant="ghost" size="sm" className="hover:bg-muted/50 -ml-2 bg-background/50 backdrop-blur-sm border border-border/20 shadow-sm">
              <Link href="/blog" className="flex items-center gap-2">
                <ArrowLeft className="size-4" />
                <span className="hidden sm:inline">Back to Journal</span>
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <ShareButton className="bg-background/50 backdrop-blur-sm border border-border/20 shadow-sm" />
            </div>
          </div>
        </div>

        <article>
          {/* Header */}
          <header className="container mx-auto px-6 py-12 md:py-20">
            <div className="max-w-4xl mx-auto text-center">
              <div className="flex items-center justify-center gap-2 mb-8">
                <Badge variant="secondary" className="rounded-full px-4 py-1 text-sm font-medium">
                  {post.category}
                </Badge>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground font-medium">{post.date}</span>
              </div>

              <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl font-bold mb-8 tracking-tight leading-[1.1]">
                {post.title}
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground font-light leading-relaxed mb-12 max-w-2xl mx-auto">
                {post.excerpt}
              </p>

              <div className="flex items-center justify-center gap-4">
                <Avatar className="size-12 border border-border">
                  <AvatarImage src={avatarUrl} alt={post.author.name} />
                  <AvatarFallback>{post.author.name.split(' ').map((n: string) => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div className="text-left">
                  <p className="font-medium">{post.author.name}</p>
                  <p className="text-sm text-muted-foreground">{post.author.role}</p>
                </div>
              </div>
            </div>
          </header>

          {/* Cover Image */}
          <div className="container mx-auto px-6 mb-16 md:mb-24">
            <div className="max-w-6xl mx-auto relative aspect-21/9 overflow-hidden rounded-2xl shadow-sm bg-muted">
              {imageUrl && (
                <Image
                  src={imageUrl}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 1200px) 100vw, 1200px"
                />
              )}
            </div>
          </div>

          {/* Content */}
          <div className="container mx-auto px-6 pb-20">
            <div className="max-w-3xl mx-auto prose prose-lg md:prose-xl dark:prose-invert prose-headings:font-serif prose-headings:font-bold prose-p:leading-relaxed prose-p:text-muted-foreground prose-strong:text-foreground prose-a:text-primary hover:prose-a:text-primary/80 prose-img:rounded-2xl prose-img:shadow-lg">
              <PortableText
                value={post.content}
                components={{
                  block: {
                    normal: ({ children }) => <p>{children}</p>,
                    h2: ({ children }) => <h2 className="mt-10 mb-6">{children}</h2>,
                    h3: ({ children }) => <h3 className="mt-8 mb-4">{children}</h3>,
                    blockquote: ({ children }) => <blockquote className="border-l-4 border-primary pl-4 italic my-6">{children}</blockquote>,
                  },
                  list: {
                    bullet: ({ children }) => <ul className="list-disc pl-6 my-4 space-y-2">{children}</ul>,
                    number: ({ children }) => <ol className="list-decimal pl-6 my-4 space-y-2">{children}</ol>,
                  }
                }}
              />
            </div>

            <div className="max-w-3xl mx-auto mt-16 pt-8 border-t border-border/40 flex items-center justify-between text-muted-foreground">
              <div className="flex items-center gap-2">
                <Clock className="size-4" />
                <span className="text-sm font-medium">{post.readTime}</span>
              </div>
            </div>
          </div>
        </article>

        {/* Related Posts */}
        {relatedPosts.length > 0 && (
          <section className="bg-muted/30 py-20 md:py-32 border-t border-border/40">
            <div className="container mx-auto px-6">
              <div className="mb-12 flex items-center justify-between">
                <h2 className="font-serif text-3xl md:text-4xl font-bold">
                  Read Next
                </h2>
                <Button asChild variant="link" className="text-primary">
                  <Link href="/blog">View all stories <ArrowRight className="ml-2 size-4" /></Link>
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {relatedPosts.map((relatedPost: BlogPost) => (
                  <BlogCard key={relatedPost.id} post={relatedPost} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </>
  )
}

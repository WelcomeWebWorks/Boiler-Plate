import { Metadata } from "next"
import { siteConfig } from "@/config/site"
import { BlogCard } from "@/components/blog/BlogCard"
import { BlogGrid } from "@/components/blog/BlogGrid"
import { client } from "@/sanity/lib/client"
import { generateBreadcrumbJsonLd } from "@/lib/seo-config"

export const revalidate = 60;

import { generatePageMetadata } from "@/lib/seo-config"

export const metadata: Metadata = generatePageMetadata(
  `Blog - Insights & Articles`,
  `Read the latest insights and articles from ${siteConfig.name}. Explore topics on business consulting, marketing strategies, logistics, and digital transformation.`,
  "/blog",
  [
    "business blog",
    "consulting insights",
    "marketing articles",
    "logistics tips",
    "business growth strategies",
    `${siteConfig.name} blog`,
    "industry insights",
    "thought leadership",
  ]
)

// Breadcrumb for blog page
const blogBreadcrumb = generateBreadcrumbJsonLd([
  { name: "Home", url: siteConfig.url },
  { name: "Blog", url: `${siteConfig.url}/blog` },
])

// Blog JSON-LD
const blogJsonLd = {
  "@context": "https://schema.org",
  "@type": "Blog",
  name: `${siteConfig.name} Blog`,
  description: "Insights, articles, and thought leadership on business consulting, marketing, and logistics.",
  url: `${siteConfig.url}/blog`,
  publisher: {
    "@type": "Organization",
    name: siteConfig.name,
    logo: {
      "@type": "ImageObject",
      url: siteConfig.ogImage,
    },
  },
}

async function getPosts() {
  const query = `*[_type == "post" && !(seo.noIndex == true)] | order(date desc) {
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
  return await client.fetch(query)
}

export default async function BlogPage() {
  const posts = await getPosts()

  if (!posts || posts.length === 0) {
    return (
      <main className="min-h-screen bg-background pt-32 pb-16">
        <div className="container mx-auto px-6 text-center">
          <h1 className="font-serif text-4xl font-bold mb-4">No posts found</h1>
          <p className="text-muted-foreground">Check back later for new stories.</p>
        </div>
      </main>
    )
  }

  const [featuredPost, ...otherPosts] = posts

  return (
    <>
      {/* Breadcrumb structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogBreadcrumb),
        }}
      />
      {/* Blog structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(blogJsonLd),
        }}
      />
      <main className="min-h-screen bg-background">
        {/* Header */}
        <div className="border-b border-border/40">
          <div className="container mx-auto px-6 pt-32 pb-16 md:pt-40 md:pb-24">
            <div className="max-w-4xl">
              <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight leading-[0.9]">
                The Journal
              </h1>
              <p className="text-muted-foreground text-xl md:text-2xl max-w-2xl font-light leading-relaxed">
                Thoughts on technology, design, and the future of digital experiences. Curated by our team of experts.
              </p>
            </div>
          </div>
        </div>

        {/* Featured Post */}
        <section className="container mx-auto px-6 py-16 md:py-24 border-b border-border/40">
          <div className="mb-12 flex items-end justify-between">
            <h2 className="font-serif text-3xl font-medium">Featured Story</h2>
          </div>
          <BlogCard post={featuredPost} featured />
        </section>

        {/* All Posts Grid */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-6">
            <div className="mb-16">
              <h2 className="font-serif text-3xl font-medium mb-4">Latest Articles</h2>
              <div className="h-1 w-20 bg-primary/20"></div>
            </div>

            <BlogGrid posts={otherPosts} />
          </div>
        </section>
      </main>
    </>
  )
}

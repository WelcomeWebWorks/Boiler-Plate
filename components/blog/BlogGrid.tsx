"use client"

import { motion } from "framer-motion"
import { BlogCard, type BlogPost } from "./BlogCard"

interface BlogGridProps {
  posts: BlogPost[]
}

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export function BlogGrid({ posts }: BlogGridProps) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: "-50px" }}
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12"
    >
      {posts.map((post) => (
        <motion.div key={post.id} variants={item} className="h-full">
          <BlogCard post={post} />
        </motion.div>
      ))}
    </motion.div>
  )
}

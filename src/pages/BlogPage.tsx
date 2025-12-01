import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { blogPosts } from '../data/catalog'
import { SectionHeading } from '../components/ui/SectionHeading'

export const BlogPage = () => {
  const categories = Array.from(new Set(blogPosts.map((post) => post.category)))
  const [activeCategory, setActiveCategory] = useState<string>('All')
  const filteredPosts = useMemo(
    () =>
      blogPosts.filter((post) =>
        activeCategory === 'All' ? true : post.category === activeCategory
      ),
    [activeCategory]
  )

  return (
    <div className="container section-padding space-y-10">
      <SectionHeading
        eyebrow="Blog"
        title="News & insights"
        description="Editorial workflow supports drafts, reviews, scheduling, and attachments."
      />
      <div className="flex flex-wrap gap-3">
        {['All', ...categories].map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`rounded-full px-4 py-2 text-sm font-semibold ${
              activeCategory === category ? 'bg-accent text-base-900' : 'bg-white/10 text-white/70'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {filteredPosts.map((post) => (
          <article key={post.id} className="glass-panel overflow-hidden">
            <img src={post.hero} alt={post.title} className="h-56 w-full object-cover" />
            <div className="space-y-3 p-6">
              <p className="text-xs uppercase text-white/40">
                {post.category} • {post.readTime}
              </p>
              <h3 className="text-2xl font-semibold text-white">{post.title}</h3>
              <p className="text-sm text-white/70">{post.excerpt}</p>
              <Link to={`/blog/${post.slug}`} className="text-sm text-accent">
                Read more →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </div>
  )
}


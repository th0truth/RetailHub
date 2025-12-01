import { useParams } from 'react-router-dom'
import { blogPosts } from '../data/catalog'
import { formatDate } from '../lib/format'
import { SectionHeading } from '../components/ui/SectionHeading'

export const BlogArticlePage = () => {
  const { slug } = useParams()
  const article = blogPosts.find((post) => post.slug === slug) ?? blogPosts[0]

  return (
    <div className="container section-padding space-y-10">
      <SectionHeading
        eyebrow={article.category}
        title={article.title}
        description={`Published ${formatDate(article.date)} by ${article.author}`}
      />
      <img src={article.hero} alt={article.title} className="w-full rounded-[32px] object-cover" />
      <article className="prose prose-invert max-w-none text-lg leading-relaxed text-white/80">
        <p>{article.content}</p>
        <p>
          Attachments, PDFs, and related articles can be linked here. Comments are moderated via admin.
        </p>
      </article>
    </div>
  )
}


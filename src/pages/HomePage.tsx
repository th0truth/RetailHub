import { ArrowUpRight, MapPin, Phone, Mail, ShieldCheck, Award, Rocket, Headphones } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HeroSlider } from '../components/commerce/HeroSlider'
import { SectionHeading } from '../components/ui/SectionHeading'
import { categories, advantages, products, blogPosts } from '../data/catalog'
import { ProductCard } from '../components/commerce/ProductCard'
import { Button } from '../components/ui/Button'
import { formatCurrency } from '../lib/format'
import { useFastOrder } from '../features/fast-order/FastOrderContext'

const advantageIcons = {
  ShieldCheck,
  Award,
  Rocket,
  Headphones,
}

export const HomePage = () => {
  const openFastOrder = useFastOrder().open
  const promotedProduct = products[0]
  const bestsellerProducts = products.filter((product) => product.badges.includes('bestseller'))

  return (
    <div className="space-y-20">
      <HeroSlider />

      <section className="container section-padding space-y-10">
        <SectionHeading
          eyebrow="Catalog"
          title="Categories engineered for conversions"
          description="Each category is fully filterable, SEO-friendly, and plugs directly into Fast Order."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((category) => (
            <article key={category.id} className="glass-panel p-6">
              <p className="text-sm text-white/50 uppercase tracking-widest">{category.slug}</p>
              <h3 className="mt-2 text-xl font-semibold text-white">{category.name}</h3>
              <p className="text-sm text-white/60">{category.description}</p>
              <Button asChild variant="secondary" size="sm" className="mt-6">
                <Link to={`/catalog/${category.slug}`} className="inline-flex items-center gap-2">
                  Open catalog <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </article>
          ))}
        </div>
      </section>

      <section className="container section-padding space-y-10">
        <SectionHeading
          eyebrow="Why buyers convert"
          title="Outcomes-focused advantages"
          description="Reassure non-technical buyers with social proof and compliance-first messaging."
        />
        <div className="grid gap-6 md:grid-cols-4">
          {advantages.map((advantage) => {
            const Icon = advantageIcons[advantage.icon as keyof typeof advantageIcons] ?? ShieldCheck
            return (
              <article key={advantage.title} className="glass-panel p-6 text-center space-y-3">
                <Icon className="mx-auto h-8 w-8 text-accent" />
                <h4 className="text-lg font-semibold text-white">{advantage.title}</h4>
                <p className="text-sm text-white/60">{advantage.copy}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="container section-padding space-y-10">
        <SectionHeading
          eyebrow="Bestsellers"
          title="Fast-moving hardware with order buttons upfront"
          description="Cards expose price, stock, and Fast Order CTA to keep acquisition cost low."
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {bestsellerProducts.map((product) => (
            <ProductCard key={product.id} product={product} origin="homepage" />
          ))}
        </div>
      </section>

      <section className="container section-padding">
        <div className="grid gap-10 rounded-[32px] border border-white/5 bg-gradient-to-r from-base-800 to-base-700 p-10 md:grid-cols-2">
          <div className="space-y-6">
            <p className="eyebrow">Fast buy</p>
            <h3 className="text-3xl font-semibold text-white">
              {promotedProduct.title} fast order spotlight
            </h3>
            <p className="text-white/70">{promotedProduct.shortDescription}</p>
            <div className="flex items-center gap-6">
              <div>
                <p className="text-xs uppercase text-white/40">Price</p>
                <p className="text-2xl font-semibold text-white">
                  {formatCurrency(promotedProduct.price, promotedProduct.currency)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-white/40">Stock</p>
                <p className="text-lg text-white">{promotedProduct.stockQty} units</p>
              </div>
            </div>
            <Button
              size="lg"
              onClick={() =>
                openFastOrder({ product: promotedProduct, origin: { type: 'homepage', ref: 'hero_fast_buy' } })
              }
            >
              Order {promotedProduct.title}
            </Button>
          </div>
          <div className="relative">
            <img
              src={promotedProduct.images[0]?.url}
              alt={promotedProduct.title}
              className="h-full w-full rounded-3xl object-cover"
            />
          </div>
        </div>
      </section>

      <section className="container section-padding space-y-10">
        <SectionHeading
          eyebrow="Contact"
          title="Concise contact block with micro form"
          description="Anonymous visitors can reach out without leaving the page. Map shows service center coverage."
        />
        <div className="grid gap-6 lg:grid-cols-[1.2fr,0.8fr]">
          <form className="glass-panel grid gap-4 p-6">
            <div className="grid gap-4 md:grid-cols-2">
              <label className="text-sm text-white/80">
                Name
                <input className="input mt-2" placeholder="Jane Buyer" required />
              </label>
              <label className="text-sm text-white/80">
                Phone
                <input className="input mt-2" placeholder="+48 501 234 567" required />
              </label>
            </div>
            <label className="text-sm text-white/80">
              Message
              <textarea className="input mt-2" rows={4} placeholder="Short project summary..." />
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <Button type="submit">Request callback</Button>
              <p className="text-xs text-white/40">Protected by reCAPTCHA v3, GDPR-compliant.</p>
            </div>
          </form>
          <div className="glass-panel space-y-4 p-6">
            <iframe
              title="Map preview"
              className="h-56 w-full rounded-2xl"
              src="https://maps.google.com/maps?q=Warsaw%20Poland&t=&z=12&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
            />
            <div className="space-y-3 text-sm text-white/70">
              <p className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-accent" />
                Złota 59, Warsaw, Poland
              </p>
              <p className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-accent" /> +48 22 123 45 67
              </p>
              <p className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-accent" /> sales@mint-hardware.com
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="container section-padding space-y-10">
        <SectionHeading
          eyebrow="Insights"
          title="Latest blog posts"
          description="Editorial workflow ready content boosts SEO & trust."
        />
        <div className="grid gap-6 md:grid-cols-3">
          {blogPosts.map((post) => (
            <article key={post.id} className="glass-panel flex flex-col overflow-hidden">
              <img src={post.hero} alt={post.title} className="h-48 w-full object-cover" />
              <div className="flex flex-1 flex-col gap-4 p-6">
                <p className="text-xs uppercase text-white/40">
                  {post.category} • {post.readTime}
                </p>
                <h3 className="text-xl font-semibold text-white">{post.title}</h3>
                <p className="text-sm text-white/60">{post.excerpt}</p>
            <Button asChild variant="ghost" className="mt-auto justify-start px-0">
                  <Link to={`/blog/${post.slug}`} className="inline-flex items-center gap-2">
                    Read article <ArrowUpRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </div>
  )
}


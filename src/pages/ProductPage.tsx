import { useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { ChevronRight, ZoomIn, ShoppingCart, PhoneCall, Heart, GitCompareArrows } from 'lucide-react'
import { products } from '../data/catalog'
import { Button } from '../components/ui/Button'
import { formatCurrency } from '../lib/format'
import { useFastOrder } from '../features/fast-order/FastOrderContext'
import { ProductCard } from '../components/commerce/ProductCard'
import { useCommerceStore } from '../store/commerce'

const tabs = ['Description', 'Specifications', 'Manuals', 'Reviews'] as const

export const ProductPage = () => {
  const { slug } = useParams()
  const product = products.find((item) => item.slug === slug)
  const [activeImage, setActiveImage] = useState(0)
  const [activeTab, setActiveTab] = useState<(typeof tabs)[number]>('Description')
  const openFastOrder = useFastOrder().open
  const addToCart = useCommerceStore((state) => state.addToCart)
  const toggleFavorite = useCommerceStore((state) => state.toggleFavorite)
  const toggleCompare = useCommerceStore((state) => state.toggleCompare)

  if (!product) {
    return <Navigate to="/catalog/fiscal-printers" replace />
  }

  const relatedProducts = useMemo(
    () => products.filter((item) => product.relatedIds.includes(item.id)),
    [product.relatedIds]
  )

  const structuredData = {
    '@context': 'https://schema.org/',
    '@type': 'Product',
    name: product.title,
    sku: product.sku,
    image: product.images.map((image) => image.url),
    offers: {
      '@type': 'Offer',
      priceCurrency: product.currency,
      price: product.price,
      availability: product.stockStatus === 'in_stock' ? 'InStock' : 'PreOrder',
    },
  }

  return (
    <div className="container section-padding space-y-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <div className="flex flex-wrap items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40">
        <Link to="/">Home</Link>
        <ChevronRight className="h-3 w-3" />
        <Link to="/catalog/fiscal-printers">Catalog</Link>
        <ChevronRight className="h-3 w-3" />
        <span>{product.title}</span>
      </div>

      <div className="grid gap-10 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-[120px,1fr]">
            <div className="flex md:flex-col gap-3 overflow-auto">
              {product.images.map((image, idx) => (
                <button
                  key={image.url}
                  className={`rounded-2xl border p-1 ${idx === activeImage ? 'border-accent' : 'border-white/10'}`}
                  onClick={() => setActiveImage(idx)}
                >
                  <img src={image.url} alt={image.alt} className="h-24 w-24 rounded-xl object-cover" />
                </button>
              ))}
            </div>
            <div className="relative overflow-hidden rounded-[32px] border border-white/5">
              <img
                src={product.images[activeImage]?.url}
                alt={product.images[activeImage]?.alt}
                className="w-full object-cover transition duration-300 hover:scale-105"
              />
              <div className="absolute bottom-4 right-4 rounded-full border border-white/20 bg-base-900/70 px-4 py-2 text-sm">
                <ZoomIn className="mr-2 inline h-4 w-4" />
                Zoom / pinch
              </div>
            </div>
          </div>
        </div>

        <aside className="space-y-6 rounded-[32px] border border-white/5 bg-base-800/60 p-8">
          <div>
            <p className="text-sm uppercase text-white/40">{product.brand}</p>
            <h1 className="text-3xl font-semibold text-white">{product.title}</h1>
            <p className="text-sm text-white/60">{product.shortDescription}</p>
          </div>
          <div className="rounded-3xl border border-white/5 p-4">
            <p className="text-xs uppercase text-white/40">Price (VAT included)</p>
            <p className="text-4xl font-semibold text-white">
              {formatCurrency(product.price, product.currency)}
            </p>
            <p className="text-xs text-white/40">Price history available in admin.</p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Button
              className="flex-1"
              onClick={() => addToCart(product.id)}
              icon={<ShoppingCart className="h-4 w-4" />}
            >
              Buy
            </Button>
            <Button
              className="flex-1"
              variant="secondary"
              onClick={() => openFastOrder({ product, origin: { type: 'product_page', ref: product.id } })}
            >
              Order
            </Button>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button variant="ghost" className="flex-1" onClick={() => toggleFavorite(product.id)}>
              <Heart className="h-4 w-4" />
              Favorites
            </Button>
            <Button variant="ghost" className="flex-1" onClick={() => toggleCompare(product.id)}>
              <GitCompareArrows className="h-4 w-4" />
              Compare
            </Button>
            <Button variant="ghost" className="flex-1" onClick={() => alert('Consultation request routed')}>
              <PhoneCall className="h-4 w-4" />
              Consultation
            </Button>
          </div>
          <ul className="space-y-2 text-sm text-white/70">
            <li>Stock status: {product.stockStatus.replace('_', ' ')}</li>
            <li>Lead time: {product.leadTime}</li>
            <li>SKU: {product.sku}</li>
            <li>Rating: {product.rating} ({product.reviews} reviews)</li>
          </ul>
        </aside>
      </div>

      <div className="space-y-4 rounded-[32px] border border-white/5 bg-base-800/50 p-8">
        <div className="flex flex-wrap gap-3">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`rounded-full px-4 py-2 text-sm font-semibold ${
                activeTab === tab ? 'bg-accent text-base-900' : 'bg-white/5 text-white/70'
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        {activeTab === 'Description' && (
          <article className="prose prose-invert max-w-none text-white/80">
            <p>
              Long description placeholder with HTML support. Explain usage scenarios, integrations, and
              compliance.
            </p>
          </article>
        )}
        {activeTab === 'Specifications' && (
          <div className="grid gap-4 md:grid-cols-2">
            {Object.entries(product.specs).map(([key, value]) => (
              <div key={key} className="rounded-2xl border border-white/5 p-4">
                <p className="text-xs uppercase text-white/40">{key}</p>
                <p className="text-white">{value}</p>
              </div>
            ))}
          </div>
        )}
        {activeTab === 'Manuals' && (
          <div className="space-y-3">
            {product.files.map((file) => (
              <a
                key={file.url}
                href={file.url}
                target="_blank"
                rel="noreferrer"
                className="flex justify-between rounded-2xl border border-white/5 p-4 hover:border-accent/40"
              >
                <div>
                  <p className="font-semibold text-white">{file.label}</p>
                  <p className="text-xs text-white/40">{file.type}</p>
                </div>
                <span className="text-sm text-accent">{file.lang.toUpperCase()}</span>
              </a>
            ))}
          </div>
        )}
        {activeTab === 'Reviews' && (
          <div className="rounded-2xl border border-white/5 p-6 text-sm text-white/60">
            Reviews module integrates with moderation and Q&A in later phase.
          </div>
        )}
      </div>

      <section className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-semibold text-white">Related products</h2>
          <Link to="/catalog/fiscal-printers" className="text-sm text-accent">
            View catalog
          </Link>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedProducts.map((related) => (
            <ProductCard key={related.id} product={related} origin="catalog" />
          ))}
        </div>
      </section>
    </div>
  )
}


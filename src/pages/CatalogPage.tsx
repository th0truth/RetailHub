import { useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { LayoutGrid, LayoutList, ChevronRight } from 'lucide-react'
import { categories, products as allProducts } from '../data/catalog'
import { ProductCard } from '../components/commerce/ProductCard'
import { Button } from '../components/ui/Button'

const sorters = {
  relevance: (a: typeof allProducts[number], b: typeof allProducts[number]) => a.title.localeCompare(b.title),
  priceAsc: (a: typeof allProducts[number], b: typeof allProducts[number]) => a.price - b.price,
  priceDesc: (a: typeof allProducts[number], b: typeof allProducts[number]) => b.price - a.price,
  newest: (a: typeof allProducts[number], b: typeof allProducts[number]) => b.badges.length - a.badges.length,
}

export const CatalogPage = () => {
  const { slug = 'fiscal-printers' } = useParams()
  const [brandFilters, setBrandFilters] = useState<string[]>([])
  const [availabilityFilter, setAvailabilityFilter] = useState<string[]>([])
  const [price, setPrice] = useState(5000)
  const [sortKey, setSortKey] = useState<keyof typeof sorters>('relevance')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const category = categories.find((cat) => cat.slug === slug) ?? categories[0]
  const brands = Array.from(new Set(allProducts.map((product) => product.brand)))

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter((product) => product.categories.includes(category.id))
      .filter((product) => (brandFilters.length ? brandFilters.includes(product.brand) : true))
      .filter((product) =>
        availabilityFilter.length ? availabilityFilter.includes(product.stockStatus) : true
      )
      .filter((product) => product.price <= price)
      .sort(sorters[sortKey])
  }, [category.id, brandFilters, availabilityFilter, price, sortKey])

  const toggleFilter = (value: string, updater: typeof setBrandFilters) => {
    updater((prev) => (prev.includes(value) ? prev.filter((item) => item !== value) : [...prev, value]))
  }

  return (
    <div className="container section-padding grid gap-10 lg:grid-cols-[280px,1fr]">
      <aside className="space-y-8 rounded-3xl border border-white/5 bg-base-800/60 p-6">
        <div>
          <p className="eyebrow">Category tree</p>
          <div className="mt-4 space-y-2 text-sm text-white/70">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={`/catalog/${cat.slug}`}
                className={`block rounded-2xl px-3 py-2 ${cat.id === category.id ? 'bg-white/10 text-white' : 'hover:bg-white/5'}`}
              >
                {cat.name}
              </Link>
            ))}
          </div>
        </div>
        <FilterGroup title="Brand">
          {brands.map((brand) => (
            <label key={brand} className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                className="rounded border-white/20 bg-base-900 text-accent focus:ring-accent"
                checked={brandFilters.includes(brand)}
                onChange={() => toggleFilter(brand, setBrandFilters)}
              />
              {brand}
            </label>
          ))}
        </FilterGroup>
        <FilterGroup title="Availability">
          {['in_stock', 'low_stock', 'preorder'].map((status) => (
            <label key={status} className="flex items-center gap-2 text-sm text-white/70">
              <input
                type="checkbox"
                className="rounded border-white/20 bg-base-900 text-accent focus:ring-accent"
                checked={availabilityFilter.includes(status)}
                onChange={() => toggleFilter(status, setAvailabilityFilter)}
              />
              {status.replace('_', ' ')}
            </label>
          ))}
        </FilterGroup>
        <FilterGroup title="Price cap">
          <input
            type="range"
            min={500}
            max={6000}
            step={100}
            value={price}
            onChange={(event) => setPrice(Number(event.target.value))}
            className="w-full accent-accent"
          />
          <p className="text-sm text-white/70">Up to €{price}</p>
        </FilterGroup>
      </aside>

      <section className="space-y-6">
        <div className="flex flex-wrap items-center gap-4 rounded-3xl border border-white/5 bg-base-800/70 px-6 py-4 text-sm text-white/70">
          <div className="flex items-center gap-2 text-xs uppercase tracking-[0.3em] text-white/40">
            <Link to="/">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <span>{category.name}</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <label className="flex items-center gap-2">
              Sort
              <select
                value={sortKey}
                onChange={(event) => setSortKey(event.target.value as keyof typeof sorters)}
                className="rounded-full border border-white/10 bg-transparent px-3 py-1"
              >
                <option value="relevance">Relevance</option>
                <option value="priceAsc">Price: Low to High</option>
                <option value="priceDesc">Price: High to Low</option>
                <option value="newest">New</option>
              </select>
            </label>
            <div className="flex items-center gap-2">
              <button
                className={`rounded-full border p-2 ${view === 'grid' ? 'border-accent text-accent' : 'border-white/10'}`}
                onClick={() => setView('grid')}
                aria-label="Grid view"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                className={`rounded-full border p-2 ${view === 'list' ? 'border-accent text-accent' : 'border-white/10'}`}
                onClick={() => setView('list')}
                aria-label="List view"
              >
                <LayoutList className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        <div className={view === 'grid' ? 'grid gap-6 md:grid-cols-2 xl:grid-cols-3' : 'space-y-6'}>
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} origin="catalog" />
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="rounded-3xl border border-white/5 bg-base-800/70 p-10 text-center text-white/60">
            No products match the filters. Adjust filters or{' '}
            <Button asChild variant="ghost" className="px-2 py-0 text-accent">
              <Link to="/contacts">contact sales</Link>
            </Button>
            .
          </div>
        )}
      </section>
    </div>
  )
}

const FilterGroup = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="space-y-3">
    <p className="text-xs uppercase tracking-[0.3em] text-white/40">{title}</p>
    <div className="space-y-2">{children}</div>
  </div>
)


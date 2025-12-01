import { useMemo, useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import {
  Phone,
  Menu,
  ChevronDown,
  Search,
  ShoppingCart,
  Heart,
  GitCompareArrows,
  Globe,
} from 'lucide-react'
import clsx from 'clsx'
import { categories, contactInfo, products } from '../../data/catalog'
import { Button } from '../ui/Button'
import { useCommerceStore } from '../../store/commerce'

const navLinks = [
  { label: 'Catalog', to: '/catalog/fiscal-printers' },
  { label: 'Services', to: '/services' },
  { label: 'Blog', to: '/blog' },
  { label: 'Company', to: '/company' },
  { label: 'Contacts', to: '/contacts' },
]

const languages = ['EN', 'DE', 'PL']

const SearchAutocomplete = () => {
  const [query, setQuery] = useState('')
  const suggestions = useMemo(() => {
    if (!query) return []
    const normalized = query.toLowerCase()
    return products
      .filter(
        (product) =>
          product.title.toLowerCase().includes(normalized) ||
          product.sku.toLowerCase().includes(normalized) ||
          product.tags.some((tag) => tag.toLowerCase().includes(normalized))
      )
      .slice(0, 5)
  }, [query])

  return (
    <div className="relative w-full">
      <div className="flex items-center gap-3 rounded-full border border-white/10 bg-base-800/70 px-5 py-2.5 focus-within:border-accent transition-colors">
        <Search className="h-5 w-5 text-slate-400" />
        <input
          type="search"
          placeholder="Search SKUs, categories, specs..."
          className="bg-transparent text-sm text-white placeholder:text-white/40 outline-none flex-1"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          aria-label="Search catalog"
        />
      </div>
      {query && suggestions.length > 0 && (
        <div className="absolute left-0 right-0 top-14 z-30 rounded-3xl border border-white/5 bg-base-800/95 backdrop-blur-xl p-4 shadow-soft">
          <p className="text-xs uppercase text-white/50 mb-2">Suggestions</p>
          <ul className="space-y-2">
            {suggestions.map((item) => (
              <li key={item.id}>
                <Link
                  to={`/product/${item.slug}`}
                  className="flex items-center justify-between rounded-2xl px-3 py-2 hover:bg-white/5"
                  onClick={() => setQuery('')}
                >
                  <div>
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="text-xs text-white/50">{item.sku}</p>
                  </div>
                  <p className="text-sm text-accent">{item.tags.slice(0, 2).join(', ')}</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const cartCount = useCommerceStore((state) =>
    state.cart.reduce((total, item) => total + item.qty, 0)
  )
  const favoriteCount = useCommerceStore((state) => state.favorites.size)
  const compareCount = useCommerceStore((state) => state.compare.size)

  return (
    <header className="sticky top-0 z-40 border-b border-white/5 bg-base-900/85 backdrop-blur-xl">
      <div className="hidden md:flex items-center justify-between border-b border-white/5 px-6 py-2 text-xs text-white/60">
        <div className="flex items-center gap-6">
          <span>{contactInfo.hours}</span>
          <a href={`tel:${contactInfo.phone}`} className="inline-flex items-center gap-2 text-white">
            <Phone className="h-4 w-4" />
            {contactInfo.phone}
          </a>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-xs px-3 py-1.5">
            {contactInfo.supportCta}
          </Button>
          <div className="flex items-center gap-1 text-white">
            <Globe className="h-4 w-4" />
            <select className="bg-transparent text-xs focus:outline-none">
              {languages.map((lang) => (
                <option key={lang} value={lang} className="text-base-900">
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="container flex items-center gap-6 py-4">
        <Link to="/" className="text-2xl font-semibold text-white tracking-tight">
          Mint<span className="text-accent">Commerce</span>
        </Link>

        <nav className="hidden lg:flex items-center gap-2 text-sm font-medium text-white/70">
          {navLinks.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                clsx(
                  'rounded-full px-4 py-2 transition-colors',
                  isActive ? 'bg-white/10 text-white' : 'hover:text-white'
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <div className="relative group">
            <button className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white/70 hover:text-white">
              Categories
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 absolute left-0 mt-2 grid grid-cols-2 gap-4 rounded-3xl border border-white/5 bg-base-800/95 p-6 text-left shadow-soft transition-all">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/catalog/${category.slug}`}
                  className="rounded-2xl border border-white/5 p-4 hover:border-accent/40"
                >
                  <p className="text-sm font-semibold text-white">{category.name}</p>
                  <p className="text-xs text-white/50">{category.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </nav>

        <div className="hidden md:block flex-1">
          <SearchAutocomplete />
        </div>

        <div className="ml-auto flex items-center gap-3 text-white">
          <button className="relative rounded-full border border-white/10 p-2 hover:border-accent/40">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -right-1 -top-1 h-5 min-w-[20px] rounded-full bg-accent text-xs font-semibold text-base-900">
                {cartCount}
              </span>
            )}
          </button>
          <button className="relative rounded-full border border-white/10 p-2 hover:border-accent/40">
            <Heart className="h-5 w-5" />
            {favoriteCount > 0 && (
              <span className="absolute -right-1 -top-1 h-5 min-w-[20px] rounded-full bg-white text-xs font-semibold text-base-900">
                {favoriteCount}
              </span>
            )}
          </button>
          <button className="relative rounded-full border border-white/10 p-2 hover:border-accent/40">
            <GitCompareArrows className="h-5 w-5" />
            {compareCount > 0 && (
              <span className="absolute -right-1 -top-1 h-5 min-w-[20px] rounded-full bg-white text-xs font-semibold text-base-900">
                {compareCount}
              </span>
            )}
          </button>
          <Link
            to="/account"
            className="hidden md:inline-flex items-center rounded-3xl border border-white/15 px-4 py-2 text-sm font-semibold text-white transition hover:border-accent/50"
          >
            User cabinet
          </Link>
          <button className="lg:hidden rounded-full border border-white/10 p-2" onClick={() => setMenuOpen((prev) => !prev)} aria-label="Toggle navigation">
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="lg:hidden border-t border-white/5 bg-base-900 px-6 py-6 space-y-6">
          <SearchAutocomplete />
          <div className="grid gap-3">
            {navLinks.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  clsx(
                    'rounded-2xl px-4 py-3 font-semibold',
                    isActive ? 'bg-white/10 text-white' : 'bg-white/5 text-white/80'
                  )
                }
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </NavLink>
            ))}
          </div>
          <div>
            <p className="text-xs uppercase text-white/40 mb-2">Categories</p>
            <div className="grid gap-3">
              {categories.map((category) => (
                <Link
                  key={category.id}
                  to={`/catalog/${category.slug}`}
                  className="rounded-2xl border border-white/5 px-4 py-3"
                  onClick={() => setMenuOpen(false)}
                >
                  <p className="text-sm font-semibold text-white">{category.name}</p>
                  <p className="text-xs text-white/50">{category.description}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}


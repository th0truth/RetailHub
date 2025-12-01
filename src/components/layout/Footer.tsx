import { Link } from 'react-router-dom'
import { contactInfo, categories } from '../../data/catalog'
import { Button } from '../ui/Button'

const quickLinks = [
  { label: 'Services', to: '/services' },
  { label: 'Blog', to: '/blog' },
  { label: 'Company', to: '/company' },
  { label: 'Privacy policy', to: '#' },
  { label: 'Returns', to: '#' },
]

const socialLinks = [
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'YouTube', href: 'https://youtube.com' },
  { label: 'X / Twitter', href: 'https://x.com' },
]

export const Footer = () => (
  <footer className="border-t border-white/5 bg-base-900">
    <div className="container grid gap-10 py-16 md:grid-cols-4">
      <div className="space-y-4">
        <Link to="/" className="text-2xl font-semibold text-white">
          Mint<span className="text-accent">Commerce</span>
        </Link>
        <p className="text-sm text-white/60">
          Clean, conversion-focused commerce infrastructure for non-technical buyers.
        </p>
        <Button variant="secondary" size="sm" className="px-5">
          Newsletter signup
        </Button>
      </div>

      <div>
        <p className="text-xs uppercase text-white/50 tracking-[0.3em] mb-4">Catalog</p>
        <ul className="space-y-2 text-sm text-white/70">
          {categories.map((category) => (
            <li key={category.id}>
              <Link to={`/catalog/${category.slug}`} className="hover:text-white">
                {category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="text-xs uppercase text-white/50 tracking-[0.3em] mb-4">Quick links</p>
        <ul className="space-y-2 text-sm text-white/70">
          {quickLinks.map((link) => (
            <li key={link.label}>
              <Link to={link.to} className="hover:text-white">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-4">
        <p className="text-xs uppercase text-white/50 tracking-[0.3em]">Contact</p>
        <div className="text-sm text-white/70 space-y-2">
          <p>{contactInfo.address}</p>
          <p>
            Phone:{' '}
            <a href={`tel:${contactInfo.phone}`} className="text-white">
              {contactInfo.phone}
            </a>
          </p>
          <p>
            Email:{' '}
            <a href={`mailto:${contactInfo.email}`} className="text-white">
              {contactInfo.email}
            </a>
          </p>
          <p>Working hours: {contactInfo.hours}</p>
        </div>
        <div className="flex gap-3 text-sm text-white/70">
          {socialLinks.map((link) => (
            <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="hover:text-white">
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </div>
    <div className="border-t border-white/5 py-6 text-center text-xs text-white/40">
      © {new Date().getFullYear()} MintCommerce. All rights reserved.
    </div>
  </footer>
)


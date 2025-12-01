export type Category = {
  id: string
  name: string
  slug: string
  icon: string
  description: string
  parentId?: string | null
}

export type ProductImage = {
  url: string
  alt: string
}

export type ProductFile = {
  type: 'manual' | 'certificate'
  url: string
  label: string
  lang: string
}

export type Product = {
  id: string
  sku: string
  slug: string
  title: string
  brand: string
  shortDescription: string
  price: number
  currency: string
  stockStatus: 'in_stock' | 'low_stock' | 'preorder'
  stockQty: number
  rating: number
  reviews: number
  badges: Array<'new' | 'bestseller' | 'promo'>
  categories: string[]
  tags: string[]
  attributes: Record<string, string | string[] | boolean>
  specs: Record<string, string>
  images: ProductImage[]
  files: ProductFile[]
  leadTime?: string
  relatedIds: string[]
}

export type BlogPost = {
  id: string
  slug: string
  title: string
  excerpt: string
  date: string
  author: string
  category: string
  hero: string
  readTime: string
  content: string
}

export type Service = {
  id: string
  name: string
  summary: string
  deliverables: string[]
  leadTime: string
  priceModel: string
}

export const categories: Category[] = [
  {
    id: 'cat-1',
    name: 'Fiscal Printers',
    slug: 'fiscal-printers',
    icon: 'ReceiptText',
    description: 'Certified printers for retail and hospitality',
  },
  {
    id: 'cat-2',
    name: 'Point of Sale',
    slug: 'point-of-sale',
    icon: 'Store',
    description: 'POS terminals, software, and accessories',
  },
  {
    id: 'cat-3',
    name: 'Self-Service',
    slug: 'self-service',
    icon: 'Touchpad',
    description: 'Kiosks and self-checkout units',
  },
  {
    id: 'cat-4',
    name: 'Mobile Scanners',
    slug: 'mobile-scanners',
    icon: 'Scan',
    description: 'Inventory-grade scanners with Wi-Fi/LTE',
  },
  {
    id: 'cat-5',
    name: 'Labeling',
    slug: 'labeling',
    icon: 'Tag',
    description: 'Industrial label and barcode printers',
  },
  {
    id: 'cat-6',
    name: 'Accessories',
    slug: 'accessories',
    icon: 'Cable',
    description: 'Mounts, batteries, cables',
  },
]

export const heroSlides = [
  {
    id: 'slide-1',
    headline: 'Zero-friction checkout hardware',
    subline: 'Certified fiscal printers with instant Fast Order flow',
    cta: 'Shop bestsellers',
    href: '/catalog/fiscal-printers',
    accentLabel: 'Up to 20% off',
    image:
      'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'slide-2',
    headline: 'Self-service kiosks with remote monitoring',
    subline: 'Deploy nationwide with managed support SLAs',
    cta: 'Book a demo',
    href: '/services',
    accentLabel: 'Deployment in 10 days',
    image:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
  },
  {
    id: 'slide-3',
    headline: 'B2B purchasing, reimagined',
    subline: 'Fast quotes, saved carts, transparent delivery timelines',
    cta: 'Enter catalog',
    href: '/catalog/point-of-sale',
    accentLabel: 'New arrivals',
    image:
      'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
  },
]

const baseFiles: ProductFile[] = [
  {
    type: 'manual',
    url: 'https://example.com/manual.pdf',
    label: 'User manual (EN)',
    lang: 'en',
  },
  {
    type: 'certificate',
    url: 'https://example.com/cert.pdf',
    label: 'Compliance certificate',
    lang: 'en',
  },
]

export const products: Product[] = [
  {
    id: 'prod-1',
    sku: 'SKU-TRX-01',
    slug: 'trx-01-fiscal-printer',
    title: 'TRX-01 Neo Fiscal Printer',
    brand: 'Mint Hardware',
    shortDescription: 'USB / Ethernet fiscal printer with onboard encryption.',
    price: 1249,
    currency: 'EUR',
    stockStatus: 'in_stock',
    stockQty: 34,
    rating: 4.8,
    reviews: 128,
    badges: ['bestseller'],
    categories: ['cat-1'],
    tags: ['receipt', 'fiscal', 'usb', 'ethernet'],
    attributes: {
      connectivity: ['USB', 'Ethernet'],
      certification: 'EU Fiscal Class A',
    },
    specs: {
      Interface: 'USB-C, RJ45',
      Speed: '300mm/s',
      Power: '24V',
      Dimensions: '130×140×120mm',
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1517430816045-df4b7de11d1d?auto=format&fit=crop&w=1200&q=80',
        alt: 'TRX-01 Fiscal Printer front',
      },
      {
        url: 'https://images.unsplash.com/photo-1507209696998-3c532be9b2b1?auto=format&fit=crop&w=900&q=80',
        alt: 'TRX-01 Fiscal Printer detail',
      },
    ],
    files: baseFiles,
    leadTime: 'Ships same day',
    relatedIds: ['prod-2', 'prod-3'],
  },
  {
    id: 'prod-2',
    sku: 'SKU-KIO-09',
    slug: 'kio-09-self-service',
    title: 'KIO-09 Self Checkout',
    brand: 'Northwind',
    shortDescription: 'Modular kiosk with 27” touchscreen, barcode, payment tray.',
    price: 4890,
    currency: 'EUR',
    stockStatus: 'low_stock',
    stockQty: 5,
    rating: 4.6,
    reviews: 64,
    badges: ['new'],
    categories: ['cat-3'],
    tags: ['self-service', 'touchscreen', 'wifi'],
    attributes: {
      connectivity: ['Wi-Fi', 'Ethernet'],
      power: '220V',
    },
    specs: {
      Display: '27" 4K',
      Processor: 'Intel i5',
      Scanner: '2D omnidirectional',
      OS: 'Ubuntu LTS + kiosk shell',
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1454165205744-3b78555e5572?auto=format&fit=crop&w=1200&q=80',
        alt: 'Self checkout kiosk',
      },
    ],
    files: baseFiles,
    leadTime: 'Ships in 7 days',
    relatedIds: ['prod-1', 'prod-4'],
  },
  {
    id: 'prod-3',
    sku: 'SKU-MBL-04',
    slug: 'mbl-04-scanner',
    title: 'MBL-04 Mobile Scanner Pro',
    brand: 'NovaLink',
    shortDescription: 'Rugged Android-based scanner with LTE backup.',
    price: 990,
    currency: 'EUR',
    stockStatus: 'in_stock',
    stockQty: 62,
    rating: 4.7,
    reviews: 201,
    badges: ['bestseller', 'promo'],
    categories: ['cat-4'],
    tags: ['mobile', 'scanner', 'lte'],
    attributes: {
      connectivity: ['Wi-Fi 6', 'LTE'],
      rating: 'IP67',
    },
    specs: {
      Display: '5.5" Gorilla Glass',
      Battery: '9000mAh swappable',
      Scanner: 'Honeywell N6703',
      Weight: '395g',
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
        alt: 'Mobile scanner hero',
      },
    ],
    files: baseFiles,
    leadTime: 'Ships next day',
    relatedIds: ['prod-1'],
  },
  {
    id: 'prod-4',
    sku: 'SKU-LBL-88',
    slug: 'lbl-88-label-printer',
    title: 'LBL-88 Industrial Label Suite',
    brand: 'Mint Hardware',
    shortDescription: 'Metal chassis 600dpi label printer with auto-cutter.',
    price: 1640,
    currency: 'EUR',
    stockStatus: 'preorder',
    stockQty: 0,
    rating: 4.5,
    reviews: 89,
    badges: [],
    categories: ['cat-5'],
    tags: ['label', 'industrial'],
    attributes: {
      connectivity: ['Ethernet', 'Wi-Fi'],
      cutter: true,
    },
    specs: {
      Resolution: '600dpi',
      Speed: '12ips',
      MediaWidth: '4.7"',
      Input: 'Roll + fanfold',
    },
    images: [
      {
        url: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=1200&q=80',
        alt: 'Label printer closeup',
      },
    ],
    files: baseFiles,
    leadTime: 'Preorder - ships in 3 weeks',
    relatedIds: ['prod-2'],
  },
]

export const services: Service[] = [
  {
    id: 'svc-1',
    name: 'Consulting & Discovery',
    summary: 'Hybrid workshops to map your in-store or field sales workflows.',
    deliverables: ['Process map', 'Gap analysis', 'Pilot backlog'],
    leadTime: '2-3 weeks',
    priceModel: 'Fixed scope + optional retainer',
  },
  {
    id: 'svc-2',
    name: 'Technical Support (SLA)',
    summary: 'Tiered SLA with 24/7 PagerDuty-style escalations.',
    deliverables: ['Monitoring dashboard', 'On-call escalation tree', 'Monthly RCA reports'],
    leadTime: 'Go-live in 5 days',
    priceModel: 'Tiered monthly subscription',
  },
  {
    id: 'svc-3',
    name: 'Warranty & Post-warranty',
    summary: 'Extended coverage with spare pool management.',
    deliverables: ['Advance replacement', 'Field engineer dispatch', 'Inventory sync'],
    leadTime: 'Activation within 48h',
    priceModel: 'Per device / per month',
  },
  {
    id: 'svc-4',
    name: 'Calibration & Installation',
    summary: 'On-site deployment team with checklists and certificates.',
    deliverables: ['Installation report', 'Calibration logbook', 'Operator training'],
    leadTime: 'Scheduling within 72h',
    priceModel: 'Hourly + travel',
  },
  {
    id: 'svc-5',
    name: 'Software Integration',
    summary: 'POS + ERP integrations, APIs, and middleware adapters.',
    deliverables: ['API design', 'Integration tests', 'Knowledge transfer'],
    leadTime: 'Project-based',
    priceModel: 'Fixed + T&M blend',
  },
]

export const blogPosts: BlogPost[] = [
  {
    id: 'blog-1',
    slug: 'fiscal-readiness-checklist',
    title: 'Fiscal readiness checklist for 2025 retail rollouts',
    excerpt: 'From certificates to telemetry, here is how to prep in under 10 days.',
    date: '2025-11-12',
    author: 'Marta Kovalenko',
    category: 'Compliance',
    hero:
      'https://images.unsplash.com/photo-1474631245212-32dc3c8310c6?auto=format&fit=crop&w=1200&q=80',
    readTime: '6 min read',
    content:
      'We worked with 40+ retail teams to prioritize fiscal readiness. This guide covers certificates, firmware, and SLA design...',
  },
  {
    id: 'blog-2',
    slug: 'self-service-ux',
    title: 'Designing self-service kiosks buyers actually use',
    excerpt: 'Progressive disclosure, visual cues, and service checklists for kiosks.',
    date: '2025-10-28',
    author: 'Nikita Marchenko',
    category: 'Product',
    hero:
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80',
    readTime: '8 min read',
    content:
      'Self-service adoption hinges on three signals: confidence, visible support, and frictionless payments...',
  },
  {
    id: 'blog-3',
    slug: 'iot-service-centers',
    title: 'IoT monitoring for service centers',
    excerpt: 'From MQTT beacons to Ops dashboards—less downtime, fewer site visits.',
    date: '2025-09-15',
    author: 'Ihor Danyliv',
    category: 'Operations',
    hero:
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=1200&q=80',
    readTime: '5 min read',
    content:
      'Service centers thrive on telemetry. Learn how we wrap device signals into alerts operators actually use...',
  },
]

export const companyHighlights = [
  { label: 'Deployments', value: '1.2K+', detail: 'Retail & service sites live' },
  { label: 'Avg. SLA', value: '3h', detail: 'Critical response across EU' },
  { label: 'NPS', value: '72', detail: 'B2B buyer satisfaction' },
  { label: 'Partners', value: '48', detail: 'OEMs & logistics' },
]

export type ServiceCenter = {
  id: string
  city: string
  status: 'operational' | 'limited' | 'maintenance'
  phone: string
  hours: string
}

export const serviceCenters: ServiceCenter[] = [
  {
    id: 'ctr-1',
    city: 'Warsaw',
    status: 'operational',
    phone: '+48 22 123 45 67',
    hours: 'Mon-Fri 08:00–20:00',
  },
  {
    id: 'ctr-2',
    city: 'Prague',
    status: 'operational',
    phone: '+420 2 555 444',
    hours: 'Mon-Sat 09:00–18:00',
  },
  {
    id: 'ctr-3',
    city: 'Vilnius',
    status: 'limited',
    phone: '+370 5 777 888',
    hours: 'Mon-Fri 10:00–17:00',
  },
]

export const contactInfo = {
  phone: '+48 22 123 45 67',
  email: 'sales@mint-hardware.com',
  hours: 'Mon–Fri 08:00 – 20:00 CET',
  supportCta: 'Request support',
  address: 'Złota 59, Warsaw, Poland',
}

export const advantages = [
  { title: '5-year warranty', icon: 'ShieldCheck', copy: 'Extended coverage with swap pools.' },
  { title: 'Certified equipment', icon: 'Award', copy: 'Fiscal & safety compliant in EU.' },
  { title: 'Fast delivery', icon: 'Rocket', copy: 'Regional warehouses + drop ship.' },
  { title: 'Tech support', icon: 'Headphones', copy: 'Dedicated engineer desk 24/7.' },
]


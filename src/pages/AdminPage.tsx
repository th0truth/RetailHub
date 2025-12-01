import { Button } from '../components/ui/Button'

const adminSections = [
  {
    title: 'Products',
    items: [
      'Create / edit products with specs and SEO metadata',
      'Image upload with WebP conversion and reordering',
      'Bulk import/export (CSV/XLSX/JSON) with dry-run',
    ],
  },
  {
    title: 'Orders',
    items: [
      'Dashboard with filters, quick status change, print invoice',
      'Fast orders flagged with SLA timers',
      'Automated emails per status, resend template action',
    ],
  },
  {
    title: 'Homepage blocks',
    items: [
      'Hero slider editor, reorder blocks, toggle visibility',
      'Product carousel powered by tags/categories',
    ],
  },
  {
    title: 'Users & roles',
    items: [
      'Search users, impersonate, reset password, change roles',
      'Generate API tokens with scopes for B2B integrations',
    ],
  },
  {
    title: 'Imports & jobs',
    items: [
      'Upload file -> map columns -> validate -> process',
      'Background Celery jobs with progress + notifications',
    ],
  },
]

export const AdminPage = () => (
  <div className="container section-padding space-y-10">
    <header className="space-y-4">
      <p className="eyebrow">Admin panel</p>
      <h1 className="text-4xl font-semibold text-white">Operations cockpit</h1>
      <p className="text-white/70">
        FastAPI admin API secured with JWT & roles. UI manages products, orders, homepage, users, imports.
      </p>
    </header>

    <div className="grid gap-6 md:grid-cols-2">
      {adminSections.map((section) => (
        <article key={section.title} className="glass-panel space-y-3 p-6">
          <h3 className="text-xl font-semibold text-white">{section.title}</h3>
          <ul className="space-y-2 text-sm text-white/70">
            {section.items.map((item) => (
              <li key={item} className="rounded-2xl border border-white/5 px-3 py-2">
                {item}
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>

    <Button size="lg">Launch admin (coming soon)</Button>
  </div>
)


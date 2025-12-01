import { products } from '../data/catalog'
import { Button } from '../components/ui/Button'
import { ProductCard } from '../components/commerce/ProductCard'
import { formatCurrency, formatStatus } from '../lib/format'

const orders = [
  { id: 'MINT-2025-0002', date: '2025-11-20', status: 'processing', total: 2480 },
  { id: 'MINT-2025-0001', date: '2025-10-10', status: 'completed', total: 990 },
]

export const AccountPage = () => (
  <div className="container section-padding space-y-10">
    <header className="space-y-3">
      <p className="eyebrow">User cabinet</p>
      <h1 className="text-4xl font-semibold text-white">Welcome back, Anna</h1>
      <p className="text-white/60">Manage profile, orders, favorites, compare, notification settings.</p>
    </header>

    <section className="grid gap-6 md:grid-cols-2">
      <article className="glass-panel space-y-4 p-6">
        <h3 className="text-xl font-semibold text-white">Profile</h3>
        <div className="space-y-2 text-sm text-white/70">
          <p>Name: Anna S.</p>
          <p>Email: anna@example.com</p>
          <p>Phone: +48 500 888 999</p>
          <p>Company: Retail Labs</p>
          <p>VAT: EU1234567</p>
        </div>
        <Button variant="secondary">Edit profile</Button>
      </article>
      <article className="glass-panel space-y-4 p-6">
        <h3 className="text-xl font-semibold text-white">Notifications</h3>
        <label className="flex items-center gap-3 text-white/70">
          <input type="checkbox" defaultChecked className="rounded border-white/20 bg-base-900 text-accent focus:ring-accent" />
          Order status emails
        </label>
        <label className="flex items-center gap-3 text-white/70">
          <input type="checkbox" className="rounded border-white/20 bg-base-900 text-accent focus:ring-accent" />
          SMS alerts
        </label>
      </article>
    </section>

    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-2xl font-semibold text-white">Order history</h3>
        <Button variant="secondary" size="sm">
          Export
        </Button>
      </div>
      <div className="overflow-x-auto rounded-[32px] border border-white/5">
        <table className="min-w-full divide-y divide-white/5 text-sm">
          <thead className="bg-base-800/80 text-white/60">
            <tr>
              <th className="px-4 py-3 text-left">Order</th>
              <th className="px-4 py-3 text-left">Date</th>
              <th className="px-4 py-3 text-left">Status</th>
              <th className="px-4 py-3 text-left">Total</th>
              <th className="px-4 py-3"></th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="odd:bg-white/5">
                <td className="px-4 py-3 font-semibold text-white">{order.id}</td>
                <td className="px-4 py-3 text-white/60">{order.date}</td>
                <td className="px-4 py-3">
                  <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/70">
                    {formatStatus(order.status)}
                  </span>
                </td>
                <td className="px-4 py-3 text-white">
                  {formatCurrency(order.total)}
                </td>
                <td className="px-4 py-3 text-right">
                  <Button variant="ghost" size="sm">
                    Download invoice
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>

    <section className="space-y-4">
      <h3 className="text-2xl font-semibold text-white">Saved products</h3>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.slice(0, 3).map((product) => (
          <ProductCard key={product.id} product={product} origin="homepage" />
        ))}
      </div>
    </section>
  </div>
)


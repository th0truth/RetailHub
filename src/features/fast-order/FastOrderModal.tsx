import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { X, ShieldCheck } from 'lucide-react'
import { Button } from '../../components/ui/Button'
import { useFastOrder } from './FastOrderContext'
import { formatCurrency } from '../../lib/format'

const schema = z.object({
  customerName: z.string().min(2, 'Name is required'),
  phone: z.string().min(6, 'Phone is required'),
  email: z.string().email().optional().or(z.literal('')),
  quantity: z.number().min(1).max(50),
  comment: z.string().max(280).optional(),
  company: z.string().optional(),
  vatId: z.string().optional(),
  deliveryDate: z.string().optional(),
  deliveryMethod: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

export const FastOrderModal = () => {
  const { isOpen, payload, close } = useFastOrder()
  const [submitting, setSubmitting] = useState(false)
  const [orderNumber, setOrderNumber] = useState<string>()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { quantity: 1 },
  })

  useEffect(() => {
    if (!isOpen) {
      reset({ quantity: 1 })
      setSubmitting(false)
      setOrderNumber(undefined)
    }
  }, [isOpen, reset])

  if (!isOpen || !payload) return null

  const requiresExtraInfo = payload.product.tags.includes('self-service') || payload.product.price > 4000

  const onSubmit = (values: FormValues) => {
    setSubmitting(true)
    setTimeout(() => {
      const nameFragment = values.customerName.replace(/\s+/g, '').slice(0, 3).toUpperCase()
      setOrderNumber(`FAST-${nameFragment}-${Math.floor(Math.random() * 99999)}`)
      setSubmitting(false)
    }, 800)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 py-10"
      role="dialog"
      aria-modal="true"
    >
      <div className="glass-panel relative w-full max-w-3xl p-8">
        <button
          onClick={close}
          className="absolute right-4 top-4 rounded-full border border-white/10 p-2"
          aria-label="Close fast order form"
        >
          <X className="h-4 w-4" />
        </button>
        <div className="grid gap-8 md:grid-cols-[1.2fr,1fr]">
          <div>
            <p className="eyebrow mb-2">Fast order</p>
            <h3 className="text-2xl font-semibold text-white">{payload.product.title}</h3>
            <p className="text-sm text-white/60">{payload.product.shortDescription}</p>

            <div className="mt-4 flex items-center gap-6 rounded-2xl border border-white/5 p-4 text-sm text-white/70">
              <div>
                <p className="text-xs uppercase text-white/40">SKU</p>
                <p className="font-semibold text-white">{payload.product.sku}</p>
              </div>
              <div>
                <p className="text-xs uppercase text-white/40">Price snapshot</p>
                <p className="font-semibold text-accent">
                  {formatCurrency(payload.product.price, payload.product.currency)}
                </p>
              </div>
              <div>
                <p className="text-xs uppercase text-white/40">Origin</p>
                <p className="font-semibold text-white">{payload.origin.type}</p>
              </div>
            </div>

            <form className="mt-6 space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Customer name" error={errors.customerName?.message}>
                  <input
                    {...register('customerName')}
                    className="input"
                    placeholder="Jane Buyer"
                    required
                  />
                </FormField>
                <FormField label="Phone" error={errors.phone?.message}>
                  <input
                    {...register('phone')}
                    className="input"
                    placeholder="+48 500 123 123"
                    required
                  />
                </FormField>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <FormField label="Email (optional)" error={errors.email?.message}>
                  <input {...register('email')} className="input" placeholder="you@company.com" />
                </FormField>
                <FormField label="Quantity" error={errors.quantity?.message}>
                  <input
                    type="number"
                    min={1}
                    max={payload.product.stockQty || 50}
                    {...register('quantity', { valueAsNumber: true })}
                    className="input"
                  />
                </FormField>
              </div>

              {requiresExtraInfo && (
                <div className="grid gap-4 md:grid-cols-2">
                  <FormField label="Company name">
                    <input {...register('company')} className="input" placeholder="Mint Retail GmbH" />
                  </FormField>
                  <FormField label="VAT ID">
                    <input {...register('vatId')} className="input" placeholder="EU123456" />
                  </FormField>
                  <FormField label="Preferred delivery date">
                    <input {...register('deliveryDate')} className="input" type="date" />
                  </FormField>
                  <FormField label="Delivery method">
                    <select {...register('deliveryMethod')} className="input">
                      <option value="">Select</option>
                      <option value="courier">Courier</option>
                      <option value="pickup">Pickup</option>
                    </select>
                  </FormField>
                </div>
              )}

              <FormField label="Comment" error={errors.comment?.message}>
                <textarea
                  {...register('comment')}
                  className="input"
                  rows={3}
                  placeholder="Need invoice to ABC company, backorder allowed."
                />
              </FormField>

              <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                <p className="text-xs text-white/40 flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-accent" />
                  Protected by anti-spam & rate limits.
                </p>
                <Button type="submit" disabled={submitting} loading={submitting}>
                  Submit order
                </Button>
              </div>
            </form>
          </div>

          <aside className="space-y-4 rounded-3xl border border-white/5 bg-base-800/60 p-6">
            <img
              src={payload.product.images[0]?.url}
              alt={payload.product.images[0]?.alt}
              className="h-48 w-full rounded-2xl object-cover"
            />
            <ul className="space-y-3 text-sm text-white/70">
              <li>
                <span className="text-white/40">Stock:</span> {payload.product.stockStatus} (
                {payload.product.stockQty || 'unlimited'})
              </li>
              <li>
                <span className="text-white/40">Lead time:</span> {payload.product.leadTime || '1-2 days'}
              </li>
              <li>
                <span className="text-white/40">Support:</span> Instant email + SMS confirmation
              </li>
              <li>
                <span className="text-white/40">reCAPTCHA ready:</span> Enabled on anonymous orders
              </li>
            </ul>
            {orderNumber && (
              <div className="rounded-2xl border border-accent/40 bg-accent/10 p-4 text-sm">
                <p className="text-accent font-semibold">Order submitted</p>
                <p className="text-white/70">
                  Fast order ID <span className="font-mono text-white">{orderNumber}</span>. Team will confirm shortly.
                </p>
                <Button variant="secondary" size="sm" className="mt-3" onClick={close}>
                  Close
                </Button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </div>
  )
}

const FormField = ({
  label,
  error,
  children,
}: {
  label: string
  error?: string
  children: React.ReactNode
}) => (
  <label className="block space-y-2 text-sm font-medium text-white">
    <span>{label}</span>
    {children}
    {error && <span className="text-xs text-danger">{error}</span>}
  </label>
)


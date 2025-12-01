export const formatCurrency = (value: number, currency = 'EUR') =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
    maximumFractionDigits: 0,
  }).format(value)

export const formatDate = (value: string, options?: Intl.DateTimeFormatOptions) =>
  new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options,
  }).format(new Date(value))

export const formatStatus = (status: string) =>
  status
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (s) => s.toUpperCase())


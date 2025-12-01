import clsx from 'clsx'

type BadgeProps = {
  label: string
  tone?: 'accent' | 'success' | 'warning' | 'danger' | 'soft'
  icon?: React.ReactNode
  className?: string
}

const toneStyles: Record<Required<BadgeProps>['tone'], string> = {
  accent: 'bg-accent/15 text-accent border border-accent/30',
  success: 'bg-success/15 text-success border border-success/30',
  warning: 'bg-warning/15 text-warning border border-warning/30',
  danger: 'bg-danger/15 text-danger border border-danger/30',
  soft: 'bg-white/5 text-slate-200 border border-white/10',
}

export const Badge = ({ label, tone = 'accent', icon, className }: BadgeProps) => (
  <span
    className={clsx(
      'inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide',
      toneStyles[tone],
      className
    )}
  >
    {icon}
    {label}
  </span>
)


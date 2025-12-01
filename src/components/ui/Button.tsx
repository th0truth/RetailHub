import { type ButtonHTMLAttributes, forwardRef, type ReactNode } from 'react'
import clsx from 'clsx'
import { Slot } from '@radix-ui/react-slot'

type Variant = 'primary' | 'secondary' | 'ghost'
type Size = 'sm' | 'md' | 'lg'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant
  size?: Size
  loading?: boolean
  icon?: ReactNode
  asChild?: boolean
}

const variantStyles: Record<Variant, string> = {
  primary:
    'bg-gradient-to-r from-accent to-emerald-400 text-base-900 hover:from-accent-600 hover:to-emerald-300 shadow-card',
  secondary:
    'bg-base-700/80 border border-white/10 text-slate-100 hover:border-white/30 hover:bg-base-600/80',
  ghost: 'bg-transparent text-slate-200 hover:text-white hover:bg-white/5',
}

const sizeStyles: Record<Size, string> = {
  sm: 'text-sm px-4 py-2 rounded-2xl',
  md: 'text-base px-6 py-3 rounded-3xl',
  lg: 'text-lg px-8 py-3.5 rounded-3xl',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    { variant = 'primary', size = 'md', className, loading, icon, children, disabled, asChild, ...rest },
    ref
  ) => {
    const Component = asChild ? Slot : 'button'
    const componentProps = asChild ? rest : { type: rest.type ?? 'button', ...rest }
    return (
      <Component
      ref={ref}
      className={clsx(
        'inline-flex items-center justify-center gap-2 font-semibold transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-base-900 disabled:cursor-not-allowed disabled:opacity-60',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
        disabled={disabled || loading}
        {...componentProps}
    >
      {loading && (
        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
      )}
      {icon}
      <span>{children}</span>
      </Component>
    )
  }
)

Button.displayName = 'Button'


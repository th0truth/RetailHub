type SectionHeadingProps = {
  eyebrow: string
  title: string
  description?: string
  align?: 'left' | 'center'
}

export const SectionHeading = ({
  eyebrow,
  title,
  description,
  align = 'left',
}: SectionHeadingProps) => (
  <div className={align === 'center' ? 'text-center space-y-3' : 'space-y-3'}>
    <p className="eyebrow">{eyebrow}</p>
    <h2 className="text-3xl md:text-4xl font-semibold text-white">{title}</h2>
    {description && (
      <p className="text-base md:text-lg text-slate-300 max-w-2xl mx-auto">{description}</p>
    )}
  </div>
)


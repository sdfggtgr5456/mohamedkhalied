export function SectionHeading({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string
  title: string
  subtitle?: string
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center">
      {eyebrow && (
        <span className="inline-block rounded-full border border-gold/30 bg-gold/10 px-4 py-1 text-sm font-semibold text-gold">
          {eyebrow}
        </span>
      )}
      <h2 className="mt-4 text-3xl font-extrabold text-foreground sm:text-4xl text-balance">{title}</h2>
      <div className="mx-auto mt-4 h-1 w-16 rounded-full bg-gold" />
      {subtitle && <p className="mt-4 text-muted-foreground text-pretty">{subtitle}</p>}
    </div>
  )
}

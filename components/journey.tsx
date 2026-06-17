import { SectionHeading } from "@/components/section-heading"
import { journey } from "@/lib/data"

export function Journey() {
  return (
    <section id="journey" className="section-seam cv-auto relative py-20">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <SectionHeading eyebrow="رحلة العمل" title="مسيرتي المهنية عبر السنوات" />

        <ol className="relative border-r-2 border-border pr-6">
          {journey.map((item, i) => (
            <li key={item.year} className="relative mb-8 last:mb-0">
              <span className="absolute right-[-2.1rem] top-1 grid size-6 place-items-center rounded-full border-2 border-gold bg-background">
                <span className="size-2.5 rounded-full bg-gold" />
              </span>
              <div className="rounded-2xl border border-border bg-card p-5 transition-colors hover:border-gold/50">
                <span className="text-sm font-extrabold text-gold">{item.year}</span>
                <p className="mt-1 text-foreground">{item.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}

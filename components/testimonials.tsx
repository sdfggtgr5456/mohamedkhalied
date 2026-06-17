"use client"

import { useRef } from "react"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { testimonials } from "@/lib/data"

export function Testimonials() {
  const scrollerRef = useRef<HTMLDivElement>(null)

  const scrollByPage = (dir: "next" | "prev") => {
    const el = scrollerRef.current
    if (!el) return
    // In RTL, scrolling toward older content uses negative offset for "next"
    const amount = el.clientWidth
    el.scrollBy({ left: dir === "next" ? -amount : amount, behavior: "smooth" })
  }

  return (
    <section id="testimonials" className="section-seam relative py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow="آراء العملاء"
          title="ماذا يقول عنّي عملائي"
          subtitle="ثقة عملائي وشهاداتهم هي أصدق دليل على جودة العمل، وأكبر دافع لي لتقديم الأفضل في كل مشروع."
        />

        <div className="relative">
          <div
            ref={scrollerRef}
            className="flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            {testimonials.map((t) => (
              <figure
                key={t.name}
                className="flex w-[85%] shrink-0 snap-start flex-col rounded-2xl border border-border bg-card p-6 sm:w-[calc((100%-1.5rem)/2)] md:w-[calc((100%-3rem)/3)]"
              >
                <Quote className="size-8 text-gold/50" />
                <blockquote className="mt-4 flex-1 leading-relaxed text-foreground">{t.text}</blockquote>
                <div className="mt-4 flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="size-4 fill-gold text-gold" />
                  ))}
                </div>
                <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                  <span className="grid size-10 place-items-center rounded-full bg-gold/15 font-bold text-gold">
                    {t.name.charAt(0)}
                  </span>
                  <div>
                    <div className="font-bold text-foreground">{t.name}</div>
                    <div className="text-xs text-muted-foreground">{t.title}</div>
                  </div>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => scrollByPage("prev")}
              aria-label="السابق"
              className="grid size-11 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronRight className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => scrollByPage("next")}
              aria-label="التالي"
              className="grid size-11 place-items-center rounded-full border border-border bg-card text-foreground transition-colors hover:border-gold hover:text-gold"
            >
              <ChevronLeft className="size-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

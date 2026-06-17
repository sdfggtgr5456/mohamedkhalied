"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { faqs } from "@/lib/data"
import { cn } from "@/lib/utils"

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section id="faq" className="section-seam cv-auto relative py-20">
      <div className="mx-auto max-w-3xl px-4 lg:px-8">
        <SectionHeading eyebrow="الأسئلة الشائعة" title="إجابات على أسئلتك" />

        <Reveal className="space-y-3" stagger={70}>
          {faqs.map((faq, i) => {
            const isOpen = open === i
            return (
              <div key={faq.q} className="reveal overflow-hidden rounded-xl border border-border bg-card">
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 p-5 text-right"
                  aria-expanded={isOpen}
                >
                  <span className="font-bold text-foreground">{faq.q}</span>
                  <ChevronDown
                    className={cn(
                      "size-5 shrink-0 text-gold transition-transform duration-300",
                      isOpen && "rotate-180",
                    )}
                  />
                </button>
                <div
                  className={cn(
                    "grid transition-all duration-300",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-5 leading-relaxed text-muted-foreground">{faq.a}</p>
                  </div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

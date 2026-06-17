"use client"

import { useEffect, useRef } from "react"
import {
  CheckCircle2,
  Briefcase,
  GraduationCap,
  MapPin,
  Code2,
  Smartphone,
  Gauge,
  Database,
  LifeBuoy,
  CalendarClock,
} from "lucide-react"
import { SectionHeading } from "@/components/section-heading"

const points = [
  { text: "هندسة أنظمة مؤسسية (ERP) قابلة للتوسّع", icon: Database },
  { text: "تطوير منصات وواجهات بأحدث التقنيات", icon: Code2 },
  { text: "تصميم متجاوب يعمل بسلاسة على كل الأجهزة", icon: Smartphone },
  { text: "تحسين الأداء والسرعة لتجربة مثالية", icon: Gauge },
  { text: "دعم فني وصيانة متكاملة بعد التسليم", icon: LifeBuoy },
  { text: "التزام كامل بالمواعيد ومعايير الجودة", icon: CalendarClock },
]

const facts = [
  { icon: Briefcase, label: "الخبرة", value: "+5 سنوات" },
  { icon: GraduationCap, label: "التخصص", value: "أنظمة ERP" },
  { icon: MapPin, label: "العمل", value: "عن بُعد · عالمياً" },
]

/**
 * Reveals children with a staggered scroll animation. Instead of relying on a
 * single high threshold over a very tall container (which never fired reliably
 * on mobile), we watch the wrapper with a negative bottom rootMargin so the
 * reveal triggers as soon as the section enters the lower part of the viewport,
 * then stagger each `.reveal` child via a CSS transition-delay.
 */
function useReveal<T extends HTMLElement>(stagger = 90) {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const items = Array.from(el.querySelectorAll<HTMLElement>(".reveal"))
    items.forEach((item, i) => {
      item.style.transitionDelay = `${i * stagger}ms`
    })

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (prefersReduced) {
      items.forEach((item) => item.classList.add("is-visible"))
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            items.forEach((item) => item.classList.add("is-visible"))
            observer.disconnect()
            break
          }
        }
      },
      // Fire when the block is ~12% into the viewport from the bottom — reliable
      // on both tall mobile layouts and wide desktop screens.
      { threshold: 0, rootMargin: "0px 0px -12% 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [stagger])

  return ref
}

export function About() {
  const ref = useReveal<HTMLDivElement>(90)

  return (
    <section id="about" className="section-seam relative py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading eyebrow="نبذة عني" title="من أنا وماذا أقدم" />

        <div ref={ref} className="grid items-stretch gap-8 lg:grid-cols-2">
          {/* Bio + facts */}
          <div className="reveal reveal-right flex flex-col items-center text-center lg:items-start lg:text-right">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/5 px-4 py-1.5 text-xs font-semibold text-gold">
              <span className="size-1.5 rounded-full bg-gold" />
              متاح لمشاريع جديدة
            </span>

            <h3 className="mt-5 text-balance text-2xl font-bold leading-relaxed text-foreground sm:text-3xl">
              مبرمج متمكّن يبني أنظمة مؤسسية <span className="gold-text">استثنائية</span>
            </h3>

            <p className="mt-5 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              أتمتع بخبرة تتجاوز خمس سنوات في هندسة وتطوير المنصات الرقمية والأنظمة المؤسسية (ERP) للشركات ورواد الأعمال
              حول العالم. أُحوّل احتياجات الأعمال المعقّدة إلى حلول برمجية دقيقة ونظيفة تجمع بين الأداء العالي والأمان
              وقابلية التوسّع.
            </p>
            <p className="mt-4 max-w-xl text-pretty leading-relaxed text-muted-foreground">
              هدفي أن أمنح مؤسستك بنية رقمية قوية تُدير عملياتها بكفاءة وتقود تحوّلها الرقمي، مع تركيز دائم على جودة
              الكود، وتجربة المستخدم، والجاهزية لتحدّيات المستقبل.
            </p>

            <div className="mt-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-3">
              {facts.map((f) => {
                const Icon = f.icon
                return (
                  <div key={f.label} className="stat-card reveal">
                    <div className="stat-card-inner flex flex-col items-center bg-card p-5">
                      <span className="flex size-10 items-center justify-center rounded-full bg-gold/10">
                        <Icon className="size-5 text-gold" />
                      </span>
                      <div className="mt-3 text-xs text-muted-foreground">{f.label}</div>
                      <div className="mt-0.5 text-sm font-bold text-foreground">{f.value}</div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Services list */}
          <div className="reveal reveal-left rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm sm:p-8">
            <h4 className="mb-6 flex items-center gap-2 text-lg font-bold text-foreground">
              <span className="h-5 w-1 rounded-full bg-gold" />
              ما الذي أقدمه لك
            </h4>
            <ul className="grid gap-3">
              {points.map((p) => {
                const Icon = p.icon
                return (
                  <li
                    key={p.text}
                    className="reveal group flex items-center gap-4 rounded-2xl border border-border bg-background/40 p-4 transition-colors duration-300 hover:border-gold/50 hover:bg-gold/5"
                  >
                    <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gold/10 text-gold transition-transform duration-300 group-hover:scale-110">
                      <Icon className="size-5" />
                    </span>
                    <span className="flex-1 text-sm font-medium text-foreground">{p.text}</span>
                    <CheckCircle2 className="size-5 shrink-0 text-gold/40 transition-colors group-hover:text-gold" />
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

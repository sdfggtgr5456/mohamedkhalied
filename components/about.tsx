"use client"

import { useEffect, useRef, useState } from "react"
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

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return { ref, inView }
}

export function About() {
  const { ref, inView } = useInView<HTMLDivElement>()

  return (
    <section id="about" className="section-seam relative py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading eyebrow="نبذة عني" title="من أنا وماذا أقدم" />

        <div ref={ref} className="grid items-stretch gap-8 lg:grid-cols-2">
          {/* Bio + facts */}
          <div
            className={`flex flex-col items-center text-center transition-all duration-700 lg:items-start lg:text-right ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
          >
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
              {facts.map((f, i) => {
                const Icon = f.icon
                return (
                  <div
                    key={f.label}
                    className={`stat-card transition-all duration-700 ${
                      inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
                    }`}
                    style={{ transitionDelay: `${150 + i * 120}ms` }}
                  >
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
          <div
            className={`rounded-3xl border border-border bg-card/60 p-6 backdrop-blur-sm transition-all duration-700 sm:p-8 ${
              inView ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"
            }`}
            style={{ transitionDelay: "200ms" }}
          >
            <h4 className="mb-6 flex items-center gap-2 text-lg font-bold text-foreground">
              <span className="h-5 w-1 rounded-full bg-gold" />
              ما الذي أقدمه لك
            </h4>
            <ul className="grid gap-3">
              {points.map((p, i) => {
                const Icon = p.icon
                return (
                  <li
                    key={p.text}
                    className={`group flex items-center gap-4 rounded-2xl border border-border bg-background/40 p-4 transition-all duration-500 hover:border-gold/50 hover:bg-gold/5 ${
                      inView ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0"
                    }`}
                    style={{ transitionDelay: `${250 + i * 90}ms` }}
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

"use client"

import { useEffect, useRef, useState } from "react"
import { Code2 } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { skills, technologies } from "@/lib/data"

function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null)
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
      { threshold },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return { ref, inView }
}

function SkillBar({ name, value, delay }: { name: string; value: number; delay: number }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.3)
  const [display, setDisplay] = useState(0)

  useEffect(() => {
    if (!inView) return
    let raf = 0
    let start: number | null = null
    const duration = 1600
    const startTimeout = window.setTimeout(() => {
      const tick = (now: number) => {
        if (start === null) start = now
        const progress = Math.min((now - start) / duration, 1)
        // easeOutCubic for a smooth, professional fill
        const eased = 1 - Math.pow(1 - progress, 3)
        setDisplay(Math.round(eased * value))
        if (progress < 1) raf = requestAnimationFrame(tick)
      }
      raf = requestAnimationFrame(tick)
    }, delay)

    return () => {
      window.clearTimeout(startTimeout)
      cancelAnimationFrame(raf)
    }
  }, [inView, value, delay])

  return (
    <div ref={ref}>
      <div className="mb-2 flex items-center justify-between text-sm">
        <span className="font-semibold text-foreground">{name}</span>
        <span className="font-bold text-gold tabular-nums">{display}%</span>
      </div>
      <div className="h-2.5 w-full overflow-hidden rounded-full bg-card">
        <div
          className="h-full rounded-full bg-gradient-to-l from-gold to-gold/60 transition-[width] duration-100 ease-out"
          style={{ width: `${display}%` }}
        />
      </div>
    </div>
  )
}

export function Skills() {
  return (
    <section id="skills" className="section-seam relative py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow="المهارات"
          title="التقنيات التي أعمل بها"
          subtitle="منظومة تقنية متكاملة أتقنها وأوظّفها بثقة عبر كامل مراحل التطوير — من بناء واجهات أمامية تفاعلية وسريعة، إلى تصميم أنظمة خلفية وقواعد بيانات قوية، وبناء واجهات برمجية (APIs) آمنة وقابلة للتوسّع، إضافة إلى أدوات النشر والحوسبة السحابية وأتمتة العمليات. أختار لكل مشروع التقنية الأنسب لتحقيق أعلى مستويات الأداء والموثوقية والجودة."
        />

        <div className="grid gap-10 lg:grid-cols-2">
          {/* Tech grid */}
          <div className="rounded-2xl border border-border bg-card p-6">
            <div className="mb-6 flex items-center gap-2 text-gold">
              <Code2 className="size-5" />
              <span className="font-bold">أدواتي</span>
            </div>
            <Reveal className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5" stagger={45}>
              {technologies.map((tech) => {
                const Icon = tech.icon
                return (
                  <div
                    key={tech.name}
                    className="reveal group flex flex-col items-center justify-center gap-2.5 rounded-xl border border-border bg-background p-3 text-center transition-all duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5"
                  >
                    <Icon
                      className="size-7 transition-transform duration-300 group-hover:scale-110"
                      style={{ color: tech.color }}
                      aria-hidden
                    />
                    <span className="text-xs font-medium leading-tight text-muted-foreground transition-colors group-hover:text-foreground">
                      {tech.name}
                    </span>
                  </div>
                )
              })}
            </Reveal>
          </div>

          {/* Skill bars */}
          <div className="flex flex-col justify-center gap-5 rounded-2xl border border-border bg-card p-6">
            {skills.map((skill, i) => (
              <SkillBar key={skill.name} name={skill.name} value={skill.value} delay={i * 150} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

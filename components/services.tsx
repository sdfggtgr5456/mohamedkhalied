import { ArrowLeft } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { services, profile } from "@/lib/data"

export function Services() {
  return (
    <section id="services" className="section-seam relative py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow="الخدمات"
          title="الخدمات التي أقدمها"
          subtitle="أقدّم حلولاً رقمية متكاملة تغطي دورة المشروع بالكامل — من تحليل المتطلبات وتصميم تجربة المستخدم، إلى تطوير الواجهات الأمامية والأنظمة الخلفية، وبناء واجهات برمجية (APIs) آمنة وقابلة للتوسّع، وصولاً إلى النشر والصيانة والدعم المستمر. هدفي هو تحويل أفكارك إلى منتجات رقمية عالية الأداء تواكب نمو أعمالك وتمنحك ميزة تنافسية حقيقية."
        />

        <Reveal className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3" stagger={80}>
          {services.map((service) => {
            const Icon = service.icon
            return (
              <article
                key={service.title}
                className="reveal group rounded-2xl border border-border bg-card p-6 transition-colors duration-300 hover:-translate-y-1 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/5"
              >
                <div className="grid size-12 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-gold-foreground">
                  <Icon className="size-6 transition-transform duration-300 group-hover:scale-110" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-foreground">{service.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{service.desc}</p>
              </article>
            )
          })}
        </Reveal>

        <Reveal className="mt-10 text-center reveal">
          <a
            href={`https://wa.me/${profile.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative inline-flex items-center gap-2.5 overflow-hidden rounded-xl bg-gold px-8 py-3.5 font-bold text-gold-foreground shadow-[0_8px_24px_-6px_var(--gold)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-6px_var(--gold)]"
          >
            <span
              className="absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
              aria-hidden
            />
            <span className="relative">اطلب خدمتك الآن</span>
            <ArrowLeft className="relative size-5 shrink-0 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden />
          </a>
        </Reveal>
      </div>
    </section>
  )
}

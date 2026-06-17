import Image from "next/image"
import { ArrowUpLeft } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { projects } from "@/lib/data"

export function Projects() {
  return (
    <section id="work" className="section-seam cv-auto relative py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow="أعمالي"
          title="مشاريع نفّذتها"
          subtitle="مجموعة مختارة من الحلول الرقمية التي صمّمتها وطوّرتها من الفكرة حتى الإطلاق — من المتاجر الإلكترونية والمنصات التجارية إلى الأنظمة المؤسسية ولوحات التحكم الإدارية. كل مشروع يعكس التزامي ببناء أنظمة قابلة للتوسّع، عالية الأداء، وآمنة، تحقق أهداف العميل وتترك أثراً ملموساً في أعماله."
        />

        <div className="grid gap-6 sm:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.title}
              className="group overflow-hidden rounded-2xl border border-border bg-card transition-colors hover:border-gold/50"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 640px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold text-gold">{project.category}</span>
                <h3 className="mt-1.5 flex items-center justify-between text-lg font-bold text-foreground">
                  {project.title}
                  <ArrowUpLeft className="size-4 text-muted-foreground transition-colors group-hover:text-gold" />
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{project.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

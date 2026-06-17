import Image from "next/image"
import { MessageCircle, Mail, ArrowLeft } from "lucide-react"
import { profile, stats } from "@/lib/data"
import { CodeBackground } from "@/components/code-background"
import { Reveal } from "@/components/reveal"

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-12 lg:pt-32">
      <CodeBackground />
      <div
        className="pointer-events-none absolute -top-32 left-1/2 size-[480px] -translate-x-1/2 rounded-full bg-gold/10 blur-[120px]"
        aria-hidden
      />

      <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2 lg:px-8">
        {/* Photo - appears on the right in RTL */}
        <div className="flex justify-center lg:order-1 lg:justify-end">
          <div className="hero-intro-photo relative">
            <div className="absolute -inset-2 rounded-[2rem] bg-gradient-to-br from-gold/40 to-transparent blur-md" aria-hidden />
            <div className="photo-frame relative gold-glow">
              <div className="relative overflow-hidden rounded-[1.85rem] bg-background">
                <Image
                  src={profile.photo || "/placeholder.svg"}
                  alt={profile.name}
                  width={400}
                  height={500}
                  priority
                  className="h-[400px] w-[330px] object-cover object-top sm:h-[480px] sm:w-[390px]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Text - appears on the left in RTL */}
        <div className="flex flex-col items-center text-center">
          <span className="hero-intro hero-d1 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5 text-sm font-medium text-gold">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-500 opacity-75" />
              <span className="relative inline-flex size-2.5 rounded-full bg-green-500" />
            </span>
            {profile.badge}
          </span>

          <h1 className="name-glow hero-intro hero-d2 mt-5 text-3xl font-black leading-[1.2] tracking-tight text-foreground sm:text-4xl lg:text-5xl">
            محمد <span className="text-gold [text-shadow:none]">خالد</span> محمد محمود
          </h1>

          <div className="hero-intro hero-d3 mt-4 flex items-center justify-center gap-3 sm:gap-4">
            <span className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-1.5 w-1.5 rotate-45 bg-gold shadow-[0_0_8px_var(--gold)]" />
              <span className="h-px w-8 bg-gradient-to-l from-gold to-transparent sm:w-14" />
            </span>
            <span className="text-lg font-bold text-gold sm:text-xl lg:text-2xl">{profile.role}</span>
            <span className="flex items-center gap-1.5" aria-hidden="true">
              <span className="h-px w-8 bg-gradient-to-r from-gold to-transparent sm:w-14" />
              <span className="h-1.5 w-1.5 rotate-45 bg-gold shadow-[0_0_8px_var(--gold)]" />
            </span>
          </div>

          <p className="hero-intro hero-d4 mx-auto mt-6 max-w-xl text-sm leading-relaxed text-muted-foreground sm:text-base">
            {profile.bio}
          </p>

          <div className="hero-intro hero-d5 mt-8 flex w-full flex-col items-center justify-center gap-3.5 sm:w-auto sm:flex-row">
            <a
              href={`https://wa.me/${profile.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gold px-7 py-3.5 font-bold text-gold-foreground shadow-[0_8px_24px_-6px_var(--gold)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_12px_32px_-6px_var(--gold)] sm:w-auto"
            >
              <span
                className="absolute inset-0 -translate-x-full bg-gradient-to-l from-transparent via-white/30 to-transparent transition-transform duration-700 group-hover:translate-x-full"
                aria-hidden
              />
              <MessageCircle className="size-5 shrink-0 transition-transform duration-300 group-hover:scale-110" />
              <span className="relative">تواصل عبر واتساب</span>
              <ArrowLeft className="size-4 shrink-0 transition-transform duration-300 group-hover:-translate-x-1" aria-hidden />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="group relative inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-gold/30 bg-card/60 px-7 py-3.5 font-semibold text-foreground backdrop-blur-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-gold hover:bg-gold/10 hover:text-gold hover:shadow-[0_8px_24px_-10px_var(--gold)] sm:w-auto"
            >
              <Mail className="size-5 shrink-0 text-gold transition-transform duration-300 group-hover:scale-110" />
              <span>راسلني عبر البريد</span>
            </a>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="relative mx-auto mt-14 max-w-7xl px-4 lg:px-8">
        <Reveal className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6" stagger={100}>
          {stats.map((stat) => {
            const Icon = stat.icon
            return (
              <div
                key={stat.label}
                className="reveal stat-card group h-full transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="stat-card-inner flex h-full flex-col items-center border border-border bg-card p-6 text-center transition-colors duration-300 group-hover:border-gold/40 lg:p-7">
                  <span className="flex size-14 items-center justify-center rounded-full border border-gold/20 bg-gold/10 transition-all duration-300 group-hover:scale-110 group-hover:border-gold/40 group-hover:bg-gold/15">
                    <Icon className="size-6 text-gold" />
                  </span>
                  <div dir="ltr" className="mt-4 text-3xl font-extrabold leading-none text-foreground lg:text-4xl">
                    {stat.value}
                  </div>
                  <div className="mt-2 h-px w-8 bg-gold/30 transition-all duration-300 group-hover:w-12 group-hover:bg-gold/60" aria-hidden />
                  <div className="mt-3 text-sm font-bold text-foreground lg:text-base">{stat.label}</div>
                  <div className="mt-1 text-xs leading-relaxed text-muted-foreground">{stat.sub}</div>
                </div>
              </div>
            )
          })}
        </Reveal>
      </div>
    </section>
  )
}

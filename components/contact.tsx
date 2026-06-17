"use client"

import { useActionState, useEffect, useRef } from "react"
import { MessageCircle, Mail, Phone, Send, Loader2, Check, ArrowUpLeft } from "lucide-react"
import { SectionHeading } from "@/components/section-heading"
import { Reveal } from "@/components/reveal"
import { profile, socials } from "@/lib/data"
import { sendMessage, type SendMessageState } from "@/app/actions/send-message"

const initialState: SendMessageState = { ok: false }

export function Contact() {
  const [state, formAction, isPending] = useActionState(sendMessage, initialState)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    if (state.ok) {
      formRef.current?.reset()
    }
  }, [state.ok])

  const contactItems = [
    { icon: MessageCircle, label: "واتساب", value: profile.phone, href: `https://wa.me/${profile.whatsapp}` },
    { icon: Mail, label: "البريد الإلكتروني", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "الهاتف", value: profile.phone, href: `tel:${profile.phone}` },
  ]

  return (
    <section id="contact" className="section-seam relative py-20">
      <div className="mx-auto max-w-7xl px-4 lg:px-8">
        <SectionHeading
          eyebrow="تواصل معي"
          title="لنبدأ مشروعك القادم"
          subtitle="هل لديك فكرة أو مشروع تريد تحويله إلى منتج رقمي ناجح؟ شاركني التفاصيل وسأعود إليك باستشارة واضحة وخطة تنفيذ عملية تناسب أهدافك وميزانيتك."
        />

        <Reveal className="grid items-stretch gap-6 lg:grid-cols-2" stagger={140}>
          {/* Contact info */}
          <div className="reveal reveal-right space-y-4">
            {contactItems.map((item) => {
              const Icon = item.icon
              return (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 rounded-2xl border border-border bg-card p-5 transition-colors hover:border-gold/50"
                >
                  <span className="grid size-12 place-items-center rounded-xl border border-gold/30 bg-gold/10 text-gold">
                    <Icon className="size-6" />
                  </span>
                  <div>
                    <div className="text-sm text-muted-foreground">{item.label}</div>
                    <div className="font-bold text-foreground" dir="ltr">
                      {item.value}
                    </div>
                  </div>
                </a>
              )
            })}
            <p className="rounded-2xl border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
              أرد عادةً خلال ساعات قليلة في أيام العمل. كل المراسلات تُعامل بسرية تامة، ولك مطلق الحرية في طلب اتفاقية عدم إفشاء (NDA) قبل مشاركة تفاصيل مشروعك.
            </p>

            <div className="rounded-2xl border border-border bg-card p-5">
              <div className="mb-4 flex items-center gap-2">
                <span className="h-px flex-1 bg-gradient-to-l from-gold/40 to-transparent" />
                <span className="text-sm font-semibold text-foreground">تابعني على وسائل التواصل</span>
                <span className="h-px flex-1 bg-gradient-to-r from-gold/40 to-transparent" />
              </div>
              <div className="grid gap-3">
                {socials.map((social) => {
                  const Icon = social.icon
                  return (
                    <a
                      key={social.href}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="group flex items-center gap-3.5 rounded-xl border border-border bg-background p-3 transition-all duration-300 hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-lg hover:shadow-gold/10"
                    >
                      <span className="grid size-11 shrink-0 place-items-center rounded-lg border border-gold/30 bg-gold/10 text-gold transition-colors group-hover:bg-gold group-hover:text-gold-foreground">
                        <Icon className="size-5" />
                      </span>
                      <div className="min-w-0 flex-1">
                        <div className="text-sm font-bold text-foreground">{social.label}</div>
                        <div className="truncate text-xs text-muted-foreground" dir="ltr">
                          @{social.handle}
                        </div>
                      </div>
                      <ArrowUpLeft className="size-4 shrink-0 text-muted-foreground transition-all duration-300 group-hover:-translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-gold" />
                    </a>
                  )
                })}
              </div>
            </div>
          </div>

          {/* Form */}
          <form ref={formRef} action={formAction} className="reveal reveal-left flex flex-col rounded-2xl border border-border bg-card p-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="الاسم" name="name" placeholder="اكتب اسمك" />
              <Field label="البريد الإلكتروني" name="email" type="email" placeholder="example@mail.com" />
            </div>
            <div className="mt-4">
              <Field label="الموضوع" name="subject" placeholder="موضوع الرسالة" required={false} />
            </div>
            <div className="mt-4 flex flex-1 flex-col">
              <label htmlFor="message" className="mb-1.5 block text-sm font-semibold text-foreground">
                رسالتك
              </label>
              <textarea
                id="message"
                name="message"
                required
                placeholder="اكتب تفاصيل مشروعك..."
                className="min-h-32 w-full flex-1 resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
              />
            </div>
            <button
              type="submit"
              disabled={isPending || state.ok}
              className="group relative mt-5 inline-flex w-full items-center justify-center gap-2.5 overflow-hidden rounded-xl bg-gold px-6 py-3.5 font-bold text-gold-foreground shadow-lg shadow-gold/20 outline-none ring-gold/40 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-gold/30 focus-visible:ring-2 active:translate-y-0 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:shadow-lg"
            >
              {/* Shimmer sweep */}
              <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/30 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-full" />

              <span className="relative flex items-center gap-2.5">
                {isPending ? (
                  <>
                    <Loader2 className="size-5 animate-spin" />
                    جارٍ الإرسال...
                  </>
                ) : state.ok ? (
                  <>
                    <Check className="size-5" />
                    تم الإرسال بنجاح
                  </>
                ) : (
                  <>
                    إرسال الرسالة
                    <Send className="size-5 transition-transform duration-300 group-hover:-translate-x-1 group-hover:-translate-y-0.5" />
                  </>
                )}
              </span>
            </button>
            {state.ok && (
              <p className="mt-3 text-center text-sm text-gold" role="status">
                شكراً لتواصلك! وصلتني رسالتك وسأرد عليك في أقرب وقت.
              </p>
            )}
            {!state.ok && state.error && (
              <p className="mt-3 text-center text-sm text-destructive" role="alert">
                {state.error}
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  )
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required = true,
}: {
  label: string
  name: string
  type?: string
  placeholder?: string
  required?: boolean
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-semibold text-foreground">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-gold"
      />
    </div>
  )
}

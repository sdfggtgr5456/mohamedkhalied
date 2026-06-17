import { MessageCircle } from "lucide-react"
import { profile } from "@/lib/data"

export function WhatsappButton() {
  return (
    <a
      href={`https://wa.me/${profile.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="تواصل عبر واتساب"
      className="group fixed bottom-6 left-6 z-50 flex items-center gap-2 rounded-full bg-gold px-5 py-3 font-bold text-gold-foreground shadow-[0_8px_30px_-6px_rgba(0,0,0,0.4)] ring-1 ring-gold/30 transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_40px_-4px_rgba(0,0,0,0.5)]"
    >
      {/* Balanced pulsing ring that follows the exact pill shape */}
      <span
        className="pointer-events-none absolute inset-0 animate-ping rounded-full bg-gold/30"
        aria-hidden
      />
      <span
        className="pointer-events-none absolute inset-0 rounded-full ring-2 ring-gold/40"
        aria-hidden
      />
      <MessageCircle className="relative size-6 shrink-0" />
      <span className="relative hidden text-sm leading-none sm:inline">تواصل الآن</span>
    </a>
  )
}

"use client"

import { useState, useEffect } from "react"
import { Mail, Phone, Menu, X } from "lucide-react"
import { navLinks, profile } from "@/lib/data"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    onScroll()
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-background/85 backdrop-blur-md border-b border-border" : "bg-transparent",
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 lg:px-8">
        {/* Brand */}
        <a href="#home" className="flex items-center gap-3">
          <span className="relative grid size-10 place-items-center">
            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full" aria-hidden>
              <polygon
                points="50,4 91,27 91,73 50,96 9,73 9,27"
                fill="none"
                stroke="var(--gold)"
                strokeWidth="5"
              />
            </svg>
            <span className="text-sm font-bold tracking-tight text-gold">MK</span>
          </span>
          <div className="text-right leading-tight">
            <div className="text-sm font-bold text-foreground">{profile.name}</div>
            <div className="text-xs text-gold">{profile.role}</div>
          </div>
        </a>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-1 xl:flex">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:text-gold"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Contact icons + mobile toggle */}
        <div className="flex items-center gap-2">
          <a
            href={`mailto:${profile.email}`}
            aria-label="البريد الإلكتروني"
            className="hidden size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold sm:grid"
          >
            <Mail className="size-4" />
          </a>
          <a
            href={`tel:${profile.phone}`}
            aria-label="اتصال"
            className="hidden size-9 place-items-center rounded-md border border-border text-muted-foreground transition-colors hover:border-gold hover:text-gold sm:grid"
          >
            <Phone className="size-4" />
          </a>
          <button
            type="button"
            aria-label="القائمة"
            onClick={() => setOpen((v) => !v)}
            className="grid size-9 place-items-center rounded-md border border-border text-foreground xl:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <nav className="border-t border-border bg-background/95 backdrop-blur-md xl:hidden">
          <div className="mx-auto grid max-w-7xl grid-cols-2 gap-1 px-4 py-3">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-card hover:text-gold"
              >
                {link.label}
              </a>
            ))}
          </div>
        </nav>
      )}
    </header>
  )
}

import { navLinks, profile, socials } from "@/lib/data"

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-10 lg:px-8">
        <div className="flex flex-col items-center justify-between gap-6 md:flex-row">
          <div className="flex items-center gap-3">
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
            <div className="text-right">
              <div className="text-sm font-bold text-foreground">{profile.name}</div>
              <div className="text-xs text-gold">{profile.role}</div>
            </div>
          </div>

          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {navLinks.slice(0, 6).map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-muted-foreground hover:text-gold">
                {link.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {socials.map((social) => {
              const Icon = social.icon
              return (
                <a
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="group relative grid size-11 place-items-center overflow-hidden rounded-xl border border-border bg-background text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-gold/60 hover:text-gold-foreground hover:shadow-lg hover:shadow-gold/20"
                >
                  <span className="absolute inset-0 translate-y-full bg-gold transition-transform duration-300 ease-out group-hover:translate-y-0" />
                  <Icon className="relative size-5 transition-transform duration-300 group-hover:scale-110" />
                </a>
              )
            })}
          </div>
        </div>

        <div className="mt-8 border-t border-border pt-6 text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} {profile.name} — جميع الحقوق محفوظة.
        </div>
      </div>
    </footer>
  )
}

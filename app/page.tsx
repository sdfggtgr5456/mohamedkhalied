import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { About } from "@/components/about"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Services } from "@/components/services"
import { Journey } from "@/components/journey"
import { Testimonials } from "@/components/testimonials"
import { Faq } from "@/components/faq"
import { Contact } from "@/components/contact"
import { SiteFooter } from "@/components/site-footer"
import { WhatsappButton } from "@/components/whatsapp-button"

export default function Page() {
  return (
    <div className="ambient-bg relative min-h-screen">
      <SiteHeader />
      <main>
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <Journey />
        <Testimonials />
        <Faq />
        <Contact />
      </main>
      <SiteFooter />
      <WhatsappButton />
    </div>
  )
}

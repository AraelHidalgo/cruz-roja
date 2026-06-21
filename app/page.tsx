import { db } from '@/lib/db'
import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { EventsSection } from "@/components/events-section"
import { CorazonSection } from "@/components/corazon-section"
import { FreeServicesSection } from "@/components/free-services-section"
import { RedSection } from "@/components/red-section"
import { EscudoSection } from "@/components/escudo-section"
import { SemillaSection } from "@/components/semilla-section"
import { VoluntariosSection } from "@/components/voluntarios-section"
import { CTASection } from "@/components/cta-section"
import { Footer } from "@/components/footer"
import { PanicButton } from "@/components/panic-button"
import { EmergencyBot } from "@/components/emergency-bot"

import { getBloodStock } from "@/app/actions/admin"

export default async function HomePage() {
  // Fetch dynamic content from the database on the server
  const savedSections = await db.sectionContent.findMany()
  const events = await db.event.findMany({ orderBy: { date: 'desc' } })
  const galleryPosts = await db.galleryPost.findMany({ orderBy: { createdAt: 'desc' } })
  const stock = await getBloodStock()

  // Convert array to a record map for easy access in the client
  const sectionsData = savedSections.reduce((acc, sec) => {
    acc[sec.sectionId] = sec
    return acc
  }, {} as Record<string, any>)

  const heroData = sectionsData['hero'] || {}

  const criticalTypes = Object.entries(stock)
    .filter(([_, status]) => status === "Critico")
    .map(([type]) => type)

  return (
    <SmoothScroll>
      <Navbar />
      <main className="min-h-screen bg-white overflow-x-hidden pt-20">
        {/* Emergency Flashing Alert Banner */}
        {criticalTypes.length > 0 && (
          <div className="bg-red-600 text-white py-3.5 px-4 text-center font-bold tracking-wide border-b-4 border-black relative z-40 flex items-center justify-center flex-wrap gap-2.5 shadow-md">
            <span className="inline-flex items-center justify-center bg-white text-red-600 rounded-full w-6 h-6 text-sm font-black animate-bounce shadow-sm">!</span>
            <span className="font-clash tracking-wide uppercase text-sm sm:text-base">
              ATENCIÓN URGENTE: Se requieren donantes de tipo {criticalTypes.join(', ')} en Tapachula.
            </span>
            <a href="/banco-de-sangre#requisitos" className="underline bg-black text-white hover:bg-zinc-800 transition-colors ml-3 px-3 py-1 rounded-md text-xs font-mono border border-white">
              ¿CÓMO DONAR?
            </a>
          </div>
        )}

        <section id="inicio">
          <Hero
            title={heroData.title}
            content={heroData.content}
            imageUrl={heroData.imageUrl}
          />
        </section>

        <EventsSection events={events} posts={galleryPosts} bloodStock={stock} />

        <section id="corazon">
          <CorazonSection />
        </section>
        <section id="servicios-gratuitos">
          <FreeServicesSection />
        </section>
        <section id="red">
          <RedSection />
        </section>
        <section id="escudo">
          <EscudoSection />
        </section>
        <section id="semilla">
          <SemillaSection />
        </section>
        <section id="requisitos-voluntarios">
          <VoluntariosSection />
        </section>

        <section id="actua">
          <CTASection />
        </section>
      </main>

      <Footer />

      {/* Componentes flotantes */}
      <PanicButton />
      <EmergencyBot />
    </SmoothScroll>
  )
}

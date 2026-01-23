"use client"
import { useState } from "react"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { EmergencySimulation } from "@/components/emergency-simulation"
import { CorazonSection } from "@/components/corazon-section"
import { FreeServicesSection } from "@/components/free-services-section"
import { RedSection } from "@/components/red-section"
import { EscudoSection } from "@/components/escudo-section"
import { SemillaSection } from "@/components/semilla-section"
import { CTASection } from "@/components/cta-section"

export default function HomePage() {
  const [isSimulationOpen, setIsSimulationOpen] = useState(false)

  return (
    <SmoothScroll>
      <Navbar />
      <main className="min-h-screen bg-background overflow-x-hidden pt-20">
        <section id="inicio">
          <Hero onOpenSimulation={() => setIsSimulationOpen(true)} />
        </section>

        <EmergencySimulation isOpen={isSimulationOpen} onClose={() => setIsSimulationOpen(false)} />

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
        <section id="actua">
          <CTASection />
        </section>
      </main>
    </SmoothScroll>
  )
}

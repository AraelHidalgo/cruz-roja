"use client"
import { useState } from "react"
import dynamic from "next/dynamic"
import { SmoothScroll } from "@/components/smooth-scroll"
import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { CorazonSection } from "@/components/corazon-section"
import { FreeServicesSection } from "@/components/free-services-section"
import { RedSection } from "@/components/red-section"
import { EscudoSection } from "@/components/escudo-section"
import { SemillaSection } from "@/components/semilla-section"
import { CTASection } from "@/components/cta-section"
import { PanicButton } from "@/components/panic-button"
import { EmergencyBot } from "@/components/emergency-bot"

// Lazy load componentes pesados
const EmergencySimulation = dynamic(
  () => import("@/components/emergency-simulation").then(mod => ({ default: mod.EmergencySimulation })),
  { ssr: false }
)

const RouteSimulator = dynamic(
  () => import("@/components/route-simulator").then(mod => ({ default: mod.RouteSimulator })),
  { ssr: false }
)

export default function HomePage() {
  const [isSimulationOpen, setIsSimulationOpen] = useState(false)
  const [isRouteSimulatorOpen, setIsRouteSimulatorOpen] = useState(false)

  return (
    <SmoothScroll>
      <Navbar />
      <main className="min-h-screen bg-background overflow-x-hidden pt-20">
        <section id="inicio">
          <Hero
            onOpenSimulation={() => setIsSimulationOpen(true)}
            onOpenRouteSimulator={() => setIsRouteSimulatorOpen(true)}
          />
        </section>

        <EmergencySimulation isOpen={isSimulationOpen} onClose={() => setIsSimulationOpen(false)} />
        <RouteSimulator isOpen={isRouteSimulatorOpen} onClose={() => setIsRouteSimulatorOpen(false)} />

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

      {/* Componentes flotantes */}
      <PanicButton />
      <EmergencyBot />
    </SmoothScroll>
  )
}
